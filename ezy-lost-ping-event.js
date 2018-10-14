import EzyEvenType from './ezy-event-type'

class EzyLostPingEvent {
    constructor(count) {
        this.count = count;
    }

    getType() {
        EzyEvenType.LOST_PING;
    }
}

export default EzyLostPingEvent