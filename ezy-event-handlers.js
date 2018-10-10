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

export default EzyEventHandlers