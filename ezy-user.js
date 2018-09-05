class EzyUser {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.joinedAppList = [];
        this.joinedAppsById = {};
        this.joinedAppsByName = {};
    }

    addJoinedApp(app) {
        this.joinedAppList.push(app);
        this.joinedAppsById[app.id] = app;
        this.joinedAppsByName[app.name] = app;
    }
}

export default EzyUser;