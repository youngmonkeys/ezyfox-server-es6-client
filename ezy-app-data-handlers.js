class EzyAppDataHandlers {

    constructor() {
        this.handlers = {}
    }

    addHandler(cmd, handler) {
        this.handlers[cmd] = handler;
    }

    getHandler(cmd) {
        var handler = this.handlers[cmd];
        return handler;
    }

}

export default EzyAppDataHandlers