class EzyClients {
    constructor() {
        this.clients = {};
        this.defaultClientName = "___ezyfox_client___";
    }

    static getInstance() {
        if (!EzyClients.instance) {
            EzyClients.instance = new EzyClients();
        }
        return EzyClients.instance;
    }

    addClient(client) {
        this.clients[client.name] = client;
    }

    addDefaultClient(client) {
        client.name = this.defaultClientName;
        this.addClient(client);
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
        var connected = client && client.connected;
        return connected;
    }

    isConnectedDefaultClient() {
        return this.isConnectedClient(this.defaultClientName);
    }
}

export default EzyClients