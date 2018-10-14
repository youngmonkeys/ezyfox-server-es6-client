import EzyClient from './ezy-client'

class EzyClients {
    constructor() {
        this.clients = {};
        this.defaultClientName = "";
    }

    static getInstance() {
        if (!EzyClients.instance) {
            EzyClients.instance = new EzyClients();
        }
        return EzyClients.instance;
    }

    newClient(config) {
        var client = new EzyClient(config);
        this.addClient(client);
        if(this.defaultClientName == "")
            this.defaultClientName = client.name;
        return client;
    }

    newDefaultClient(config) {
        var client = this.newClient(config);
        this.defaultClientName = client.name;
        return client;
    }

    addClient(client) {
        this.clients[client.name] = client;
    }

    getClient(clientName) {
        return this.clients[clientName];
    }

    getDefaultClient() {
        return this.clients[this.defaultClientName];
    }
}

export default EzyClients