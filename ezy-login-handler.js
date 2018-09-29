import EzyCommand from './ezy-command'
import EzyZone from './ezy-zone'
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
        zone.me = user;
        context.zone = zone;
        this.handleResponseAppDatas(context, joinedAppArray);
        this.handleResponseData(context, responseData);
        if(joinedAppArray.length <= 0)
            this.handleLoginSuccess(context, responseData);
        else
            this.handleReconnectSuccess(context, responseData);
        console.log("user: " + user.name + " logged in successfully");
    }
    
    handleResponseData(context, data) {
    }

    handleResponseAppDatas(context, appDatas) {
        var appAccessHandler = context.getDataHandler(EzyCommand.APP_ACCESS);
        appDatas.forEach(app => {
            appAccessHandler.handle(context, app);
        });
    }

    handleLoginSuccess(context, data) {
    }

    handleReconnectSuccess(context, data) {
    }
}

export default EzyLoginHandler
