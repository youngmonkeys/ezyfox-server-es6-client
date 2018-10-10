import EzyCommand from './ezy-command'

class EzyApp {
    constructor(client, zone, id, name) {
        this.id = id;
        this.name = name;
        this.client = client;
        this.zone = zone;
        this.dataHandlers = zone.getAppDataHandlers(name);
    }

    sendRequest(cmd, data) {
        var requestData = [this.id, [cmd, data]];
        this.client.sendRequest(EzyCommand.APP_REQUEST, requestData);
    }
}

export default EzyApp