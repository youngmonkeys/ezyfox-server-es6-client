import Const from './ezy-constants'

export class EzyConnectionSuccessEvent {

    getType() {
        return Const.EzyEventType.CONNECTION_SUCCESS;
    }

}

export class EzyTryConnectEvent {
    constructor(count) {
        this.count = count;
    }

    getType() {
        return Const.EzyEvenType.TRY_CONNECT;
    }
}

export class EzyConnectionFailureEvent {

    constructor(reason) {
        this.reason = reason;
    }

    getType() {
        return Const.EzyEventType.CONNECTION_FAILURE;
    }

}

export class EzyLostPingEvent {
    constructor(count) {
        this.count = count;
    }

    getType() {
        Const.EzyEvenType.LOST_PING;
    }
}

export class EzyDisconnectionEvent {

    constructor(reason) {
        this.reason = reason;
    }

    getType() {
        return Const.EzyEventType.DISCONNECTION;
    }

}

export default {
    EzyConnectionSuccessEvent,
    EzyTryConnectEvent,
    EzyConnectionFailureEvent,
    EzyLostPingEvent,
    EzyDisconnectionEvent
}