
import EzyEventType from './ezy-event-type'
import EzyDisconnectReason from './ezy-disconnect-reason'
import EzyCommand from './ezy-command'
import EzyUnlogCommands from './ezy-unlog-commands'
import EzyConnectionEventHandler from './ezy-connection-event-handler'
import EzyMessageEventHandler from './ezy-message-event-handler'
import EzyDisconnectionEventHandler from './ezy-disconnection-event-handler'
import EzyPongHandler from './ezy-pong-handler'
import EzyHandshakeHandler from './ezy-handshake-handler'
import EzyLoginHandler from './ezy-login-handler'
import EzyAppAccessHandler from './ezy-app-access-handler'
import EzyAppResponseHandler from './ezy-app-response-handler'

class EzyConnector {
    constructor() {
        this.ws = null;
    }

    connect (context, url) {

        this.ws = new WebSocket(url);

        this.ws.onerror = function (e) {
            console.log('error : ' + JSON.stringify(e));
            var eventHandler = context.getEventHandler(EzyEventType.DISCONNECTION);
            eventHandler.handle(context, EzyDisconnectReason.CONNECTION_REFUSE);
        }

        this.ws.onopen = function () {
            console.log('connected');
            context.connected = true;
            context.disconnected = false;
            var handler = context.getEventHandler(EzyEventType.CONNECTION_SUCCESS);
            handler.handle(context);
        }

        this.ws.onclose = function () {
            if(context.connected) {
                var handler = context.getEventHandler(EzyEventType.DISCONNECTION);
                handler.handle(context, EzyDisconnectReason.UNKNOWN);
            }
            context.connected = false;
            context.disconnected = true;
        }

        this.ws.onmessage = function (event) {
            context.lostPingCount = 0;
            var data = event.data;
            var message = JSON.parse(data);
            var handler = context.getEventHandler(EzyEventType.MESSAGE);
            handler.handle(context, message);
        }
    }

    disconnect() {
        this.ws.close();
    }

    send(data) {
        var json = JSON.stringify(data);
        this.ws.send(json);
    }
}

class EzyClient {
    constructor() {
        this.connector = null;
        this.pingInterval = null;
        this.pingIntervalTime = 3000;
        this.connected = false;
        this.disconnected = false;
        this.lostPingCount = 0;
        this.maxLostPingCount = 3;
        this.zone = null;
        this.eventHandlers = {};
        this.eventHandlers[EzyEventType.CONNECTION_SUCCESS] = new EzyConnectionEventHandler();
        this.eventHandlers[EzyEventType.MESSAGE] = new EzyMessageEventHandler();
        this.eventHandlers[EzyEventType.DISCONNECTION] = new EzyDisconnectionEventHandler();
        this.dataHandlers = {};
        this.dataHandlers[EzyCommand.PONG.id] = new EzyPongHandler();
        this.dataHandlers[EzyCommand.HANDSHAKE.id] = new EzyHandshakeHandler();
        this.dataHandlers[EzyCommand.LOGIN.id] = new EzyLoginHandler();
        this.dataHandlers[EzyCommand.APP_ACCESS.id] = new EzyAppAccessHandler();
        this.dataHandlers[EzyCommand.APP_REQUEST.id] = new EzyAppResponseHandler();
        this.appDataHandlers = {};
    }
    
    connect(url) {
        this.connector = new EzyConnector();
        this.connector.connect(this, url);
    }

    disconnect() {
        this.connector.disconnect();
    }

    send(data) {
        this.connector.send(data);
    }

    sendRequest(cmd, data) {
        if(!EzyUnlogCommands.includes(cmd)) {
            console.log('send cmd: ' + cmd.name + ", data: " + JSON.stringify(data));
        }
        var request = [cmd.id, data];
        this.send(request);
    }

    addEventHandler(eventType, handler) {
        this.eventHandlers[eventType] = handler;
    }

    addDataHandler(cmd, handler) {
        this.dataHandlers[cmd.id] = handler;
    }

    addAppDataHandler(appName, handler) {
        this.appDataHandlers[appName] = handler;
    }

    getEventHandler(eventType) {
        return this.eventHandlers[eventType];
    }

    getDataHandler(cmd) {
        return this.dataHandlers[cmd.id];
    }

    getAppDataHandler(appName) {
        return this.appDataHandlers[appName];
    }

    startPing() {
        var startPingNow = function(client) {
            var pingInterval = setInterval(
                function() {
                    if(client.lostPingCount < client.maxLostPingCount) {
                        client.lostPingCount ++;
                        client.sendRequest(EzyCommand.PING, []);
                    }
                    else {
                        client.connected = false;
                        client.disconnected = true;
                        var handler = client.getEventHandler(EzyEventType.DISCONNECTION);
                        handler.handle(client, EzyDisconnectReason.SERVER_NOT_RESPONSE);
                        client.disconnect();
                    }
                }, 
                client.pingIntervalTime
            );
            return pingInterval;
        }
        this.stopPing();
        this.pingInterval = startPingNow(this);
    }

    stopPing() {
        if(this.pingInterval)
            clearInterval(this.pingInterval);
    }
}

export default EzyClient