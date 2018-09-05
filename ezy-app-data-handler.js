class EzyAppDataHandler {
    handlers = {};

    addHandler(cmd, handler) {
        this.handlers[cmd] = handler;
    }

    handle(app, data) {
        var cmd = this.getCommand(data);
        var responseData = this.getResponseData(data);
        var handler = this.handlers[cmd];
        if(handler)
            handler(app, responseData);
        else
            console.log("app: " + app.name + " has no handler with command: " + cmd);
    }

    getCommand(data) {
        return data[0];
    }

    getResponseData(data) {
        return data[1];
    }
}

export default EzyAppDataHandler