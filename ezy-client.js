import Const from './ezy-constants'
import Util from './ezy-util'
import Event from './ezy-events'
import Manager from './ezy-managers'
import Socket from './ezy-sockets'
import EzySetup from './ezy-setup'
import EzyEventMessageHandler from './ezy-event-message-handler'

class EzyConnector {
    constructor() {
        this.ws = null;
        this.destroyed = false;
    }

    connect (client, url) {
        this.ws = new WebSocket(url);
        var thiz = this;
        var failed = false;
        var pingManager = client.pingManager;
        var eventMessageHandler = client.eventMessageHandler;

        this.ws.onerror = function (e) {
            Util.EzyLogger.console('connect to: ' + url + ' error : ' + JSON.stringify(e));
            failed = true;
            var event = new Event.EzyConnectionFailureEvent(
                Const.EzyConnectionFailedReason.UNKNOWN);
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
            if(failed)
                return;
            if(thiz.destroyed)
                return;
            if(client.isConnected()) {
                var reason = Const.EzyDisconnectReason.UNKNOWN;
                eventMessageHandler.handleDisconnection(reason);
            }
            else {
                Util.EzyLogger.console('connection to: ' + url + " has disconnected before");
            }
        }

        this.ws.onmessage = function (event) {
            if(thiz.destroyed) 
                return;
            pingManager.lostPingCount = 0;
            var data = event.data;
            var message = JSON.parse(data);
            eventMessageHandler.handleMessage(message);
        }
    }

    disconnect() {
        if(this.ws)
            this.ws.close();
    }

    destroy() {
        this.destroyed = true;
        this.disconnect();
    }

    send(data) {
        var json = JSON.stringify(data);
        this.ws.send(json);
    }
}

class EzyClient {
    constructor(config) {
        this.config = config;
        this.name = config.getClientName();
        this.url = null;
        this.connector = null;
        this.zone = null;
        this.me = null;
        this.status = Const.EzyConnectionStatus.NULL;
        this.reconnectCount = 0;
        this.disconnected = false;
        this.reconnectTimeout = null;
        this.pingManager = new Manager.EzyPingManager();
        this.pingSchedule = new Socket.EzyPingSchedule(this);
        this.handlerManager = new Manager.EzyHandlerManager(this);
        this.setup = new EzySetup(this.handlerManager);
        this.unloggableCommands = [Const.EzyCommand.PING, Const.EzyCommand.PONG];
        this.eventMessageHandler = new EzyEventMessageHandler(this);
        this.pingSchedule.eventMessageHandler = this.eventMessageHandler;
    }
    
    connect(url) {
        this.url = url ? url : this.url;
        this.preconnect();
        this.reconnectCount = 0;
        this.status = Const.EzyConnectionStatus.CONNECTING;
        this.connector = new EzyConnector();
        this.connector.connect(this, this.url);
    }

    reconnect() {
        var reconnectConfig = this.config.reconnect;
        var maxReconnectCount = reconnectConfig.maxReconnectCount;
        if(this.reconnectCount >= maxReconnectCount)
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
        this.reconnectCount ++;
        var event = new Event.EzyTryConnectEvent(this.reconnectCount);
        this.eventMessageHandler.handleEvent(event);
    }

    preconnect() {
        this.zone = null;
        this.me = null;
        this.appsById = {};
        if(this.connector)
            this.connector.destroy();
        if(this.reconnectTimeout)
            clearTimeout(this.reconnectTimeout);
    }

    disconnect() {
        if(this.connector)
            this.connector.disconnect();
    }

    send(data) {
        this.connector.send(data);
    }

    sendRequest(cmd, data) {
        if(!this.unloggableCommands.includes(cmd)) {
            Util.EzyLogger.console('send cmd: ' + cmd.name + ", data: " + JSON.stringify(data));
        }
        var request = [cmd.id, data];
        this.send(request);
    }

    onDisconnected(reason) {
        const reasonName = Const.EzyDisconnectReasonNames.parse(reason);
        Util.EzyLogger.console('disconnect with: ' + this.url + ", reason: " + reasonName);
        this.status = Const.EzyConnectionStatus.DISCONNECTED;
        this.pingSchedule.stop();
        this.disconnect();
    }

    isConnected() {
        var connected = (this.status == Const.EzyConnectionStatus.CONNECTED);
        return connected;
    }

    getAppById(appId) {
        if(!this.zone) return null;
        var appManager = this.zone.appManager;
        return appManager.getAppById(appId);
    }

    getPluginById(pluginId) {
        if(!this.zone) return null;
        var pluginManager = this.zone.pluginManager;
        return pluginManager.getPluginById(pluginId);
    }
}

export default EzyClient