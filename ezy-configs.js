class EzyClientConfig {
    constructor() {
        this.zoneName = "";
        this.clientName = "";
        this.reconnect = new EzyReconnectConfig();
    }

    /**
     * Get client name of a zone
     * @returns {string} Client name
     */
    getClientName() {
        if (this.clientName == "")
            return this.zoneName;
        return this.clientName;
    }
}

class EzyReconnectConfig {
    constructor() {
        this.enable = true;
        this.maxReconnectCount = 5;
        this.reconnectPeriod = 3000;
    }
}

export default {EzyClientConfig}
