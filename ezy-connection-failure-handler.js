import EzyConnectionStatus from './ezy-connection-status'

class EzyConnectionFailureHandler {

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
            this.client.status = EzyConnectionStatus.FAILURE;
            this.control(event);
        }
    }

    shouldReconnect(event) {
        return true;
    }

    control(event) {
    }

}

export default EzyConnectionFailureHandler