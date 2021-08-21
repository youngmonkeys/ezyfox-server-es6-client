import Const from './ezy-constants';

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
        return Const.EzyEventType.TRY_CONNECT;
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
        return Const.EzyEventType.LOST_PING;
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
    EzyDisconnectionEvent,
};
