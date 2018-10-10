class EzyAppManager {

    constructor(zoneName) {
        this.zoneName = zoneName;
        this.appList = [];
        this.appsById = {};
        this.appsByName = {};
    }

    getApp() {
        var app = null;
        if(this.appList.length > 0)
           app = this.appList[0];
        else
            console.log('has no app in zone: ' + this.zoneName);
        return app;
    }

    addApp(app) {
        this.appList.push(app);
        this.appsById[app.id] = app;
        this.appsByName[app.name] = app;
    }

    getAppById(id) {
        var app = this.appsById[id];
        return app;
    }

    getAppByName(name) {
        var app = this.appsByName[name];
        return app;
    }
}

export default EzyAppManager;