import EzyCommand from './ezy-command'
import EzyZone from './ezy-zone'
import EzyApp from './ezy-app'
import EzyUser from './ezy-user'

class EzyLoginHandler {
    handle(context, data) {
        var zoneId = data[0];
        var zoneName = data[1];
        var userId = data[2];
        var username = data[3];
        var joinedAppArray = data[4];
        var responseData = data[5];

        var zone = new EzyZone(zoneId, zoneName);
        var user = new EzyUser(userId, username);
        joinedAppArray.forEach(function(item) {
            var app = new EzyApp(context, item[0], item[1]);
            zone.addApp(app);
            user.addJoinedApp(app);
        });
        zone.me = user;
        context.zone = zone;
        this.handleResponseData(context, responseData);
        this.handleLoginSuccess(context);
        console.log("user: " + user.name + " logged in successfully")
        var appAccessHandler = context.getDataHandler(EzyCommand.APP_ACCESS);
        if(appAccessHandler) {
            zone.appList.forEach(function(app) {
                appAccessHandler.handleAccessApp(context, app);
            });
        } else {
            console.log("has no app access handler, ignore handling apps on user logged in");
        }
    }

    handleResponseData(context, data) {
    }

    handleLoginSuccess(context) {
        var me = context.zone.me;
        if(me.joinedAppList.length <= 0) 
            this.handleHasntJoinedApp(context);
        else
            this.handleHasJoinedApps(context);
    }

    handleHasntJoinedApp(context) {
    }

    handleHasJoinedApps(context) {
        var zone = context.zone;
        var appList = zone.appList;
        appList.forEach(function(app) {
            
        });
    }
}

export default EzyLoginHandler
