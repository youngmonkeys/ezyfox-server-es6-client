import EzyAppDataHandlers from './ezy-app-data-handler'

class EzySetup {
    constructor(handlerManager) {
        this.handlerManager = handlerManager;
        this.zoneSetups = {};
    }

    addDataHandler(cmd, dataHandler) {
        this.handlerManager.addDataHandler(cmd, dataHandler);
        return this;
    }

    addEventHandler(eventType, eventHandler) {
        this.handlerManager.addEventHandler(eventType, eventHandler);
        return this;
    }

    setupZone(zoneName) {
        var zoneSetup = this.zoneSetups[zoneName];
        if(!zoneSetup) {
            var appDataHandlerss = this.handlerManager.getDataHandlers(zoneName);
            zoneSetup = new EzyZoneSetup(appDataHandlerss, this);
        }
        return zoneSetup;
    }
}

class EzyZoneSetup {
    constructor(appDataHandlerss, parent) {
        this.parent = parent;
        this.appSetups = {};
        this.appDataHandlerss = appDataHandlerss;
    }

    setupApp(appName) {
        var appSetup = this.appSetups[appName];
        if(!appSetup) {
            var handlers = this.appDataHandlerss[appName];
            if(!handlers) {
                handlers = new EzyAppDataHandlers();
                this.appDataHandlerss[appName] = handlers;
            }
            appSetup = new EzyAppSetup(handlers, this);
            this.appSetups[appName] = appSetup;
        }
        return appSetup;
    }
    
    done() {
        return this.parent;
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