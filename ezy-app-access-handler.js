import EzyApp from './ezy-app'

class EzyAppAccessHandler {
    handle(context, data) {
        var appId = data[0];
        var appName = data[1];
        var app = new EzyApp(context, appId, appName);
        var zone = context.zone;
        var me = zone.me;
        zone.addApp(app);
        me.addJoinedApp(app);
        this.handleAccessAppSuccess(context, app);
    }

    handleAccessApp(context, app) {
        console.log("access app: " + app.name + " successfully");
        this.handleAccessAppSuccess(context, app);
    }

    handleAccessAppSuccess(context, app) {
    }
}

export default EzyAppAccessHandler