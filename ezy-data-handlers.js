import Const from './ezy-constants'
import Entity from './ezy-entities'

export class EzyHandshakeHandler {

	handle(data) {
		this.startPing();
		this.handleLogin();
		this.postHandle(data);
	}

	postHandle(data) {
    }

	handleLogin() {
		var loginRequest = this.getLoginRequest();
		this.client.sendRequest(Const.EzyCommand.LOGIN, loginRequest);
    }
    
    getLoginRequest() {
        return ["test", "test", "test", []];
	}
	
	startPing() {
		this.client.pingSchedule.start();
	}
}

//======================================

export class EzyLoginSuccessHandler {
    handle(data) {
        var zoneId = data[0];
        var zoneName = data[1];
        var userId = data[2];
        var username = data[3];
        var joinedAppArray = data[4];
        var responseData = data[5];

        var zone = new Entity.EzyZone(this.client, zoneId, zoneName);
        var user = new Entity.EzyUser(userId, username);
        this.client.me = user;
        this.client.zone = zone;
        var allowReconnect = this.allowReconnection();
        var appCount = joinedAppArray.length;
        var shouldReconnect = allowReconnect && appCount > 0
        this.handleResponseData(responseData);
        if(shouldReconnect) {
            this.handleResponseAppDatas(joinedAppArray);
            this.handleReconnectSuccess(responseData);
        }
        else {
            this.handleLoginSuccess(responseData);
        }            
        console.log("user: " + user.name + " logged in successfully");
    }

    allowReconnection() {
        return false;
    }
    
    handleResponseData(data) {
    }

    handleResponseAppDatas(appDatas) {
        var handlerManager = this.client.handlerManager;
        var appAccessHandler = handlerManager.getDataHandler(Const.EzyCommand.APP_ACCESS);
        appDatas.forEach(app => {
            appAccessHandler.handle(app);
        });
    }

    handleLoginSuccess(data) {
    }

    handleReconnectSuccess(data) {
        this.handleLoginSuccess(data);
    }
}

//======================================

export class EzyAppAccessHandler {
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
        var app = new Entity.EzyApp(this.client, zone, appId, appName);
        return app;
    }

    postHandle(app, data) {
    }
}

//======================================

class EzyPongHandler {
    handle(client) {
    }
}

//======================================

export class EzyAppResponseHandler {
    handle(data) {
        var appId = data[0];
        var responseData = data[1];
        var cmd = responseData[0];
        var commandData = responseData[1];

        var app = this.client.getAppById(appId);
        var handler = app.getDataHandler(cmd);
        if(handler)
            handler(app, commandData);
        else
            console.log("app: " + app.name + " has no handler for command: " + cmd);
    }
}

//======================================

export class EzyDataHandlers {
    constructor(client) {
        this.handlers = {};
        this.client = client;
        this.pingSchedule = client.pingSchedule;
    }

    addHandler(cmd, handler) {
        handler.client = this.client;
        handler.pingSchedule = this.pingSchedule;
        this.handlers[cmd.id] = handler;
    }

    getHandler(cmd) {
        var handler = this.handlers[cmd.id];
        return handler;
    }
}

//======================================

export class EzyAppDataHandlers {

    constructor() {
        this.handlers = {}
    }

    addHandler(cmd, handler) {
        this.handlers[cmd] = handler;
    }

    getHandler(cmd) {
        var handler = this.handlers[cmd];
        return handler;
    }

}

export default {
    EzyHandshakeHandler,
    EzyLoginSuccessHandler,
    EzyAppAccessHandler,
    EzyPongHandler,
    EzyAppResponseHandler,
    EzyAppDataHandlers,
    EzyDataHandlers
}