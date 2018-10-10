class EzyDataHandlers {
    constructor(client) {
        this.handlers = {};
        this.client = client;
        this.pingSchedule = client.pingSchedule;
    }

    addHandler(cmd, handler) {
        handler.client = this.client;
        handler.pingSchedule = this.pingSchedule;
        this.handlers[cmd.id] = handler;
    }

    getHandler(cmd) {
        var handler = this.handlers[cmd.id];
        return handler;
    }
}

export default EzyDataHandlers