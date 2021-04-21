import EzyClient from './ezy-client'

/**
 * Singleton object to manage all clients of a server.
 * - Each server has many zones
 * - Each zone has its own client
 */
class EzyClients {
    constructor() {
        this.clients = {};
        this.defaultClientName = "";
    }

    /**
     * Singleton implementation
     * @returns {EzyClients} Singleton object
     */
    static getInstance() {
        if (!EzyClients.instance) {
            EzyClients.instance = new EzyClients();
        }
        return EzyClients.instance;
    }

    /**
     * Create and save a new client
     * @param {EzyClientConfig} config
     * @returns {EzyClient} The newly created client
     */
    newClient(config) {
        var client = new EzyClient(config);
        this.addClient(client);
        if (this.defaultClientName == "")
            this.defaultClientName = client.name;
        return client;
    }

    /**
     * Create a new client and set it as default one
     * @param {EzyClientConfig} config
     * @returns {EzyClient} The newly created client
     */
    newDefaultClient(config) {
        var client = this.newClient(config);
        this.defaultClientName = client.name;
        return client;
    }

    /**
     * Add a client to this singleton object
     * @param {EzyClient} client Client to be added
     */
    addClient(client) {
        this.clients[client.name] = client;
    }

    /**
     * Get a client by name
     * @param {string} clientName Name of client
     * @returns {EzyClient} The queried client
     */
    getClient(clientName) {
        return this.clients[clientName];
    }

    /**
     * Get default client
     * @returns {EzyClient} The default client
     */
    getDefaultClient() {
        return this.clients[this.defaultClientName];
    }
}

export default EzyClients
