class EzyZone {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.me = null;
        this.appList = [];
        this.appsById = {};
        this.appsByName = {};
    }

    getApp() {
        return this.appList[0];
    }

    addApp(app) {
        this.appList.push(app);
        this.appsById[app.id] = app;
        this.appsByName[app.name] = app;
    }
}

export default EzyZone