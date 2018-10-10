import EzyEventType from './ezy-event-type'

class EzyConnectionFailureEvent {

    constructor(reason) {
        this.reason = reason;
    }

    getType() {
        return EzyEventType.CONNECTION_FAILURE;
    }

}

export default EzyConnectionFailureEvent