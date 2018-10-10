import EzyAppManager from './ezy-app-manager'
import EzyAppDataHandlers from './ezy-app-data-handlers'

class EzyZone {
    constructor(client, id, name) {
        this.id = id;
        this.name = name;
        this.client = client;
        this.me = null;
        this.appManager = new EzyAppManager(name);
        this.appDataHandlerss = client.handlerManager.getAppDataHandlerss(name);
    }

    getAppDataHandlers(appName) {
        var answer = this.appDataHandlerss[appName];
        if(answer == null) {
            answer = new EzyAppDataHandlers();
            this.appDataHandlerss[appName] = answer;
        }
        return answer;
    }

}

export default EzyZone