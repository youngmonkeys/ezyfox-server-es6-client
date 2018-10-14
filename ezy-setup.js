class EzySetup {
    constructor(handlerManager) {
        this.handlerManager = handlerManager;
        this.appSetups = {};
    }

    addDataHandler(cmd, dataHandler) {
        this.handlerManager.addDataHandler(cmd, dataHandler);
        return this;
    }

    addEventHandler(eventType, eventHandler) {
        this.handlerManager.addEventHandler(eventType, eventHandler);
        return this;
    }

    setupApp(appName) {
        var appSetup = this.appSetups[appName];
        if(!appSetup) {
            var appDataHandlers = this.handlerManager.getAppDataHandlers(appName);
            appSetup = new EzyAppSetup(appDataHandlers, this);
            this.appSetups[appName] = appSetup;
        }
        return appSetup;
    }
}

class EzyAppSetup {

    constructor(dataHandlers, parent) {
        this.parent = parent;
        this.dataHandlers = dataHandlers;
    }

    addDataHandler(cmd, dataHandler) {
        this.dataHandlers.addHandler(cmd, dataHandler);
        return this;
    }

    done() {
        return this.parent;
    }
}


export default EzySetup