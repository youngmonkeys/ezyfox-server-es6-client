import EzyCommand from './ezy-command'

class EzyApp {
    constructor(context, id, name) {
        this.id = id;
        this.name = name;
        this.context = context;
        this.dataHandler = context.getAppDataHandler(name);
    }

    sendRequest(cmd, data) {
        var requestData = [this.id, [cmd, data]];
        this.context.sendRequest(EzyCommand.APP_REQUEST, requestData);
    }
}

export default EzyApp