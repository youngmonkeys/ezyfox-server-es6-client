
import EzyConnectionStatus from './ezy-connection-status'

class EzyDisconnectionHandler {
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
            this.client.status = EzyConnectionStatus.DISCONNECTED;
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

export default EzyDisconnectionHandler