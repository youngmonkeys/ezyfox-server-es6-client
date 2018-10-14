import EzyApp from './ezy-app'

class EzyAppAccessHandler {
    handle(data) {
        var zone = this.client.zone;
        var appManager = zone.appManager;
        var app = this.newApp(zone, data);
        appManager.addApp(app);
        this.client.addApp(app);
        this.postHandle(app, data);
        console.log("access app: " + app.name + " successfully");
    }

    newApp(zone, data) {
        var appId = data[0];
        var appName = data[1];
        var app = new EzyApp(this.client, zone, appId, appName);
        return app;
    }

    postHandle(app, data) {
    }
}

export default EzyAppAccessHandler