import EzyEvenType from './ezy-event-type'

class EzyTryConnectEvent {
    constructor(count) {
        this.count = count;
    }

    getType() {
        return EzyEvenType.TRY_CONNECT;
    }
}

export default EzyTryConnectEvent