import EzyCommand from './ezy-command'
import EzyZone from './ezy-zone'
import EzyUser from './ezy-user'

class EzyLoginHandler {
    handle(data) {
        var zoneId = data[0];
        var zoneName = data[1];
        var userId = data[2];
        var username = data[3];
        var joinedAppArray = data[4];
        var responseData = data[5];

        var zone = new EzyZone(this.client, zoneId, zoneName);
        var user = new EzyUser(userId, username);
        var zoneManager = this.client.zoneManager;
        zone.me = user;
        zoneManager.addZone(zone);
        this.handleResponseAppDatas(zoneId, joinedAppArray);
        this.handleResponseData(responseData);
        if(joinedAppArray.length <= 0)
            this.handleLoginSuccess(responseData);
        else
            this.handleReconnectSuccess(responseData);
        console.log("user: " + user.name + " logged in successfully");
    }
    
    handleResponseData(data) {
    }

    handleResponseAppDatas(zoneId, appDatas) {
        var handlerManager = this.client.handlerManager;
        var appAccessHandler = handlerManager.getDataHandler(EzyCommand.APP_ACCESS);
        appDatas.forEach(app => {
            appAccessHandler.handle([zoneId].concat(app));
        });
    }

    handleLoginSuccess(data) {
    }

    handleReconnectSuccess(data) {
    }
}

export default EzyLoginHandler
