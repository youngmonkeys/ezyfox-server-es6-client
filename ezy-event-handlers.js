import Const from './ezy-constants'
import Util from './ezy-util'

export class EzyConnectionSuccessHandler {

    constructor() {
        this.clientType = "JSEMACS6";
        this.clientVersion = "1.0.0";
    }

    handle() {
        this.sendHandshakeRequest();
        this.postHandle();
    }

    postHandle() {
    }

    sendHandshakeRequest() {
        var request = this.newHandshakeRequest();
        this.client.sendRequest(Const.EzyCommand.HANDSHAKE, request);
    }

    newHandshakeRequest() {
        var clientId = this.getClientId();
        var clientKey = this.getClientKey();
        var enableEncryption = this.isEnableEncryption();
        var token = this.getStoredToken();
        var request = [clientId, clientKey, this.clientType, this.clientVersion, enableEncryption, token];
        return request;
    }

    getClientKey() {
        return "";
    }

    getClientId() {
        const guid = Util.EzyGuid.generate();
        return guid;
    }

    isEnableEncryption() {
        return false;
    }

    getStoredToken() {
        return "";
    }

}

//======================================

export class EzyConnectionFailureHandler {

    handle(event) {
        console.log("connection failure, reason = " + event.reason);
        var config = this.client.config;
        var reconnectConfig = config.reconnect;
        var should = this.shouldReconnect(event);
        var must = reconnectConfig.enable && should;
        var reconnecting = false;
        if(must)
            reconnecting = this.client.reconnect();
        if(!reconnecting) {
            this.client.status = Const.EzyConnectionStatus.FAILURE;
            this.control(event);
        }
    }

    shouldReconnect(event) {
        return true;
    }

    control(event) {
    }

}

//======================================

export class EzyDisconnectionHandler {
    handle(event) {
        console.log("handle disconnection, reason = " + event.reason);
        this.preHandle(event);
        var config = this.client.config;
        var reconnectConfig = config.reconnect;
        var should = this.shouldReconnect(event);
        var must = reconnectConfig.enable && should;
        var reconnecting = false;
        if(must)
            reconnecting = this.client.reconnect();
        if(!reconnecting) {
            this.client.status = Const.EzyConnectionStatus.DISCONNECTED;
            this.control(event);
        }
    }

    preHandle(event) {
    }

    shouldReconnect(event) {
        return true;
    }

    control(event) {
    }
}

//======================================

class EzyEventHandlers {
    constructor(client) {
        this.handlers = {};
        this.client = client;
        this.pingSchedule = client.pingSchedule;
    }

    addHandler(eventType, handler) {
        handler.client = this.client;
        handler.pingSchedule = this.pingSchedule;
        this.handlers[eventType] = handler;
    }

    getHandler(eventType) {
        var handler = this.handlers[eventType];
        return handler;
    }
}

export default {
    EzyConnectionSuccessHandler,
    EzyConnectionFailureHandler,
    EzyDisconnectionHandler,
    EzyEventHandlers
}