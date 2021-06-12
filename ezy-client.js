import Const from './ezy-constants'
import Util from './ezy-util'
import Event from './ezy-events'
import Manager from './ezy-managers'
import Socket from './ezy-sockets'
import EzySetup from './ezy-setup'
import EzyEventMessageHandler from './ezy-event-message-handler'

/**
 * Wrapper for JS built-in WebSocket to communicate with websocket server
 */
class EzyConnector {
    constructor() {
        this.ws = null;
        this.destroyed = false;
        this.disconnectReason = null;
    }

    /**
     * Create connection to a websocket server
     * Websocket events:
     *      - onerror: fire when connection to server is unsuccessful
     *      - onopen: fire when connection to server is successful
     *      - onclose: fire when connection to server is closed
     *      - onmessage: fire when client receives a message from server
     * @param {EzyClient} client The client from which this connect function is called
     * @param {string} url The websocket url
     */
    connect(client, url) {
        this.disconnectReason = null;
        this.ws = new WebSocket(url);
        var thiz = this;
        var failed = false;
        var pingManager = client.pingManager;
        var eventMessageHandler = client.eventMessageHandler;

        this.ws.onerror = function (e) {
            Util.EzyLogger.console('connect to: ' + url + ' error : ' + JSON.stringify(e));
            failed = true;
            var event = new Event.EzyConnectionFailureEvent(Const.EzyConnectionFailedReason.UNKNOWN);
            eventMessageHandler.handleEvent(event);
        }

        this.ws.onopen = function (e) {
            Util.EzyLogger.console('connected to: ' + url);
            client.reconnectCount = 0;
            client.status = Const.EzyConnectionStatus.CONNECTED;
            var event = new Event.EzyConnectionSuccessEvent();
            eventMessageHandler.handleEvent(event);
        }

        this.ws.onclose = function (e) {
            if (failed)
                return;
            if (thiz.destroyed)
                return;
            if (client.isConnected()) {
                var reason = thiz.disconnectReason || Const.EzyDisconnectReason.UNKNOWN;
                eventMessageHandler.handleDisconnection(reason);
            } else {
                Util.EzyLogger.console('connection to: ' + url + " has disconnected before");
            }
        }

        this.ws.onmessage = function (event) {
            if (thiz.destroyed)
                return;
            pingManager.lostPingCount = 0;
            var data = event.data;
            var message = JSON.parse(data);
            eventMessageHandler.handleMessage(message);
        }
    }

    /**
     * Close the websocket connection with a reason
     * @param {string} reason
     */
    disconnect(reason) {
        if (this.ws) {
            this.disconnectReason = reason;
            this.ws.close();
        }
    }

    /**
     * Client purposely closes the websocket connection
     */
    destroy() {
        this.destroyed = true;
        this.disconnect();
    }

    /**
     * Send data from client to websocket server
     * @param {string} data
     */
    send(data) {
        var json = JSON.stringify(data);
        this.ws.send(json);
    }
}

/**
 * A proxy class that combine all needed functions into one.
 * Each zone has a client, which manages the connection to server within that zone
 */
class EzyClient {
    /**
     * Create a client
     * @param {EzyClientConfig} config Client name configuration and reconnect configuration
     */
    constructor(config) {
        this.config = config;
        this.name = config.getClientName();
        this.url = null;
        this.connector = null;
        this.zone = null;
        this.me = null;
        this.status = Const.EzyConnectionStatus.NULL;
        this.reconnectCount = 0;
        this.reconnectTimeout = null;
        this.pingManager = new Manager.EzyPingManager();
        this.pingSchedule = new Socket.EzyPingSchedule(this);
        this.handlerManager = new Manager.EzyHandlerManager(this);
        this.setup = new EzySetup(this.handlerManager);
        this.unloggableCommands = [Const.EzyCommand.PING, Const.EzyCommand.PONG];
        this.eventMessageHandler = new EzyEventMessageHandler(this);
        this.pingSchedule.eventMessageHandler = this.eventMessageHandler;
    }

    /**
     * Connect to server via a websocket url
     * @param url Websocket url
     */
    connect(url) {
        this.url = url ? url : this.url;
        this.preconnect();
        this.reconnectCount = 0;
        this.status = Const.EzyConnectionStatus.CONNECTING;
        this.connector = new EzyConnector();
        this.connector.connect(this, this.url);
    }

    /**
     * Call to connect to server again
     * @returns {boolean} - Whether or not the maxReconnectCount is reached
     *      - `false`: reach maxReconnectCount
     *      - `true`: otherwise
     */
    reconnect() {
        var reconnectConfig = this.config.reconnect;
        var maxReconnectCount = reconnectConfig.maxReconnectCount;
        if (this.reconnectCount >= maxReconnectCount)
            return false;
        this.preconnect();
        this.status = Const.EzyConnectionStatus.RECONNECTING;
        this.reconnectTimeout = setTimeout(
            () => {
                this.connector = new EzyConnector();
                this.connector.connect(this, this.url);
            },
            reconnectConfig.reconnectPeriod
        );
        this.reconnectCount++;
        var event = new Event.EzyTryConnectEvent(this.reconnectCount);
        this.eventMessageHandler.handleEvent(event);
    }

    /**
     * Reset state before creating a new connection
     */
    preconnect() {
        this.zone = null;
        this.me = null;
        this.appsById = {};
        if (this.connector)
            this.connector.destroy();
        if (this.reconnectTimeout)
            clearTimeout(this.reconnectTimeout);
    }

    /**
     * Call to disconnect from websocket server with a reason
     * @param {string} reason Reason to disconnect
     */
    disconnect(reason) {
        var actualReason = reason || Const.EzyDisconnectReason.CLOSE;
        this.internalDisconnect(actualReason);
    }

    close() {
        this.disconnect();
    }

    internalDisconnect(reason) {
        if (this.connector)
            this.connector.disconnect(reason);
    }

    /**
     * Send data to websocket server
     * @param data
     */
    send(cmd, data) {
        this.sendRequest(cmd, data)
    }

    /**
     * Send a command and data to server
     * @param {string} cmd Command to be sent
     * @param {string} data Data to be sent
     */
    sendRequest(cmd, data) {
        if (!this.unloggableCommands.includes(cmd)) {
            Util.EzyLogger.console('send cmd: ' + cmd.name + ", data: " + JSON.stringify(data));
        }
        var request = [cmd.id, data];
        this.connector.send(request);
    }

    /**
     * Listen to `disconnect` event from server
     * @param reason Reason that server disconnect
     */
    onDisconnected(reason) {
        this.status = Const.EzyConnectionStatus.DISCONNECTED;
        this.pingSchedule.stop();
        this.internalDisconnect();
    }

    /**
     * Check connection status
     * @returns {boolean} Whether or not the status is CONNECTED
     */
    isConnected() {
        var connected = (this.status == Const.EzyConnectionStatus.CONNECTED);
        return connected;
    }

    /**
     * Get first app from this client zone
     * @returns {EzyApp} Queried app
     */
     getApp() {
        if (!this.zone) return null;
        var appManager = this.zone.appManager;
        return appManager.getApp();
    }

    /**
     * Get app from this client zone by id
     * @param appId id of queried app
     * @returns {EzyApp} Queried app
     */
    getAppById(appId) {
        if (!this.zone) return null;
        var appManager = this.zone.appManager;
        return appManager.getAppById(appId);
    }

    /**
     * Get plugin from this client zone by id
     * @param pluginId id of queried plugin
     * @returns {EzyPlugin} Queried plugin
     */
    getPluginById(pluginId) {
        if (!this.zone) return null;
        var pluginManager = this.zone.pluginManager;
        return pluginManager.getPluginById(pluginId);
    }

    /**
     * Get the app manager of this client zone
     * @returns {EzyAppManager} App manager of current client zone
     */
    getAppManager() {
        if (!this.zone) return null;
        return this.zone.appManager;
    }

    /**
     * Get the plugin manager of this client zone
     * @returns {EzyPluginManager} Plugin manager of current client zone
     */
    getPluginManager() {
        if (!this.zone) return null;
        return this.zone.pluginManager;
    }
}

export default EzyClient
