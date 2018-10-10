class EzyPingManager {
    constructor() {
        this.pingPeriod = 5000;
        this.lostPingCount = 0;
        this.maxLostPingCount = 5;
    }

    increaseLostPingCount() {
        return (++ this.lostPingCount);
    }
}

export default EzyPingManager;