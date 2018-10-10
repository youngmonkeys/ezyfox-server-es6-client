import EzyEventType from './ezy-event-type'
import EzyDisconnectReason from './ezy-disconnect-reason'
import EzyCommand from './ezy-command'
import EzyDisconnectionEvent from './ezy-disconnection-event'

class EzyPingSchedule {

    constructor(client) {
        this.client = client;
        this.pingManager = client.pingManager;
        this.eventMessageHandler = null;
    }

    start() {
        var startPingNow = function(thiz) {
            var pingInterval = setInterval(
                () => {
                    thiz.sendPingRequest();
                }, 
                thiz.pingManager.pingPeriod
            );
            return pingInterval;
        }
        this.stop();
        this.pingInterval = startPingNow(this);
    }

    sendPingRequest() {
        const maxLostPingCount = this.pingManager.maxLostPingCount;
        const lostPingCount = this.pingManager.increaseLostPingCount();
        if(lostPingCount >= maxLostPingCount) {
            var reason = EzyDisconnectReason.SERVER_NOT_RESPONDING;
            this.eventMessageHandler.handleDisconnection(reason);
        }
        else {
            this.client.sendRequest(EzyCommand.PING, []);
        }
    }

    stop() {
        if(this.pingInterval)
            clearInterval(this.pingInterval);
    }
}

export default EzyPingSchedule