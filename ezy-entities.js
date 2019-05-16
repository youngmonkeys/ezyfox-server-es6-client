import Const from './ezy-constants'
import Manager from './ezy-managers'

export class EzyUser {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

export class EzyZone {
    constructor(client, id, name) {
        this.id = id;
        this.name = name;
        this.client = client;
        this.appManager = new Manager.EzyAppManager(name);
        this.pluginManager = new Manager.EzyPluginManager(name);
    }
}

export class EzyApp {
    constructor(client, zone, id, name) {
        this.id = id;
        this.name = name;
        this.client = client;
        this.zone = zone;
        this.dataHandlers = client.handlerManager.getAppDataHandlers(name);
    }

    sendRequest(cmd, data) {
        var validData = data;
        if(!validData)
            validData = {};
        var requestData = [this.id, [cmd, validData]];
        this.client.sendRequest(Const.EzyCommand.APP_REQUEST, requestData);
    }

    getDataHandler(cmd) {
        var handler = this.dataHandlers.getHandler(cmd);
        return handler;
    }
}

export class EzyPlugin {
    constructor(client, zone, id, name) {
        this.id = id;
        this.name = name;
        this.client = client;
        this.zone = zone;
        this.dataHandlers = client.handlerManager.getPluginDataHandlers(name);
    }

    sendRequest(cmd, data) {
        var validData = data;
        if(!validData)
            validData = {};
        var requestData = [this.id, [cmd, validData]];
        this.client.sendRequest(Const.EzyCommand.PLUGIN_REQUEST, requestData);
    }

    getDataHandler(cmd) {
        var handler = this.dataHandlers.getHandler(cmd);
        return handler;
    }
}

export default {EzyUser, EzyZone, EzyApp, EzyPlugin}