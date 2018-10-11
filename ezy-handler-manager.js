import EzyCommand from './ezy-command'
import EzyEventType from './ezy-event-type'
import EzyDataHandlers from './ezy-data-handlers'
import EzyEventHandlers from './ezy-event-handlers'
import EzyConnectionSuccessHandler from './ezy-connection-success-handler'
import EzyDisconnectionHandler from './ezy-disconnection-handler'
import EzyPongHandler from './ezy-pong-handler'
import EzyHandshakeHandler from './ezy-handshake-handler'
import EzyLoginHandler from './ezy-login-handler'
import EzyAppAccessHandler from './ezy-app-access-handler'
import EzyAppResponseHandler from './ezy-app-response-handler'

class EzyHandlerManager {

    constructor(client) {
        this.client = client;
        this.dataHandlers = this.newDataHandlers();
        this.eventHandlers = this.newEventHandlers();
        this.zoneAppDataHandlerss = {};
    }

    newEventHandlers() {
        var handlers = new EzyEventHandlers(this.client);
        handlers.addHandler(EzyEventType.CONNECTION_SUCCESS, new EzyConnectionSuccessHandler());
        handlers.addHandler(EzyEventType.DISCONNECTION, new EzyDisconnectionHandler());
        return handlers;
    }

    newDataHandlers() {
        var handlers = new EzyDataHandlers(this.client);
        handlers.addHandler(EzyCommand.PONG, new EzyPongHandler());
        handlers.addHandler(EzyCommand.HANDSHAKE, new EzyHandshakeHandler());
        handlers.addHandler(EzyCommand.LOGIN, new EzyLoginHandler());
        handlers.addHandler(EzyCommand.APP_ACCESS, new EzyAppAccessHandler());
        handlers.addHandler(EzyCommand.APP_REQUEST, new EzyAppResponseHandler());
        return handlers;
    }

    getDataHandler(cmd) {
        var handler = this.dataHandlers.getHandler(cmd);
        return handler;
    }

    getEventHandler(eventType) {
        var handler = this.eventHandlers.getHandler(eventType);
        return handler;
    }

    getAppDataHandlerss(zoneName) {
        var answer = this.zoneAppDataHandlerss[zoneName];
        if(!answer) {
            answer = {};
            this.zoneAppDataHandlerss[zoneName] = answer;
        }
        return answer;
    }

    addDataHandler(cmd, dataHandler) {
       this.dataHandlers.addHandler(cmd, dataHandler);
    }

    addEventHandler(eventType, eventHandler) {
        this.eventHandlers.addHandler(eventType, eventHandler);
    }
}

export default EzyHandlerManager