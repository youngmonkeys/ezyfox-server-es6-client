import EzyEventType from './ezy-event-type'

class EzyDisconnectionEvent {

    constructor(reason) {
        this.reason = reason;
    }

    getType() {
        return EzyEventType.DISCONNECTION;
    }

}

export default EzyDisconnectionEvent