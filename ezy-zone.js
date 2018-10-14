import EzyAppManager from './ezy-app-manager'

class EzyZone {
    constructor(client, id, name) {
        this.id = id;
        this.name = name;
        this.client = client;
        this.appManager = new EzyAppManager(name);
    }
}

export default EzyZone