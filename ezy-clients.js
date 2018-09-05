class EzyClients {
    constructor() {
        this.clients = {};
        this.defaultClientName = "defaultClient";
    }

    static getInstance() {
        if (!EzyClients.instance) {
            EzyClients.instance = new EzyClients();
        }
        return EzyClients.instance;
    }

    addClient(name, client) {
        this.clients[name] = client;
    }

    addDefaultClient(client) {
        this.clients[this.defaultClientName] = client;
    }

    removeClient(clientName) {
        delete this.clients[clientName];
    }

    removeDefaultClient() {
        delete this.clients[this.defaultClientName];
    }

    getClient(clientName) {
        return this.clients[clientName];
    }

    getDefaultClient() {
        return this.clients[this.defaultClientName];
    }

    isConnectedClient(clientName) {
        var client = this.getClient(clientName);
        return client && client.connected;
    }

    isConnectedDefaultClient() {
        return this.isConnectedClient(this.defaultClientName);
    }
}

export default EzyClients