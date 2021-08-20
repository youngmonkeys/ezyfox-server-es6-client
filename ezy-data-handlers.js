import Const from './ezy-constants';
import Util from './ezy-util';
import Entity from './ezy-entities';

/**
 * A listener which fires when client receives Const.EzyCommand.HANDSHAKE command from server.
 * After that, it automatically sends a login request to server with username
 * and password returned from getLoginRequest()
 * - Requirement: getLoginRequest() need to be implemented
 * - Usage:
 * ```
 *      let handshakeHandler = new Ezy.HandshakeHandler();
 *      handshakeHandler.getLoginRequest = function () {
 *          let username = "test";
 *          let password = "test1234";
 *              return ["freechat", username, password, []];
 *      };
 *
 *      let loginSuccessHandler = new Ezy.LoginSuccessHandler();
 *      loginSuccessHandler.handleLoginSuccess = function () {
 *          // What to do when login successfully login
 *      };
 *
 *      let loginErrorHandler = new Ezy.LoginErrorHandler();
 *      loginErrorHandler.handleLoginError = function (event) {
 *          // What to do when login unsuccessfully
 *      };
 *
 *      // connect to server
 *      client.connect(url);
 * ```
 */
export class EzyHandshakeHandler {
    /**
     * Automatically call this function when client receives HANDSHAKE command
     * from server.
     * @param data [encryptedServerPublicKey, token, sessionId]
     */
    handle(data) {
        this.startPing();
        this.handleLogin();
        this.postHandle(data);
    }

    /**
     * This function need to be manually defined to specify
     * what to do after sending login request
     * @param data: [encryptedServerPublicKey, token, sessionId]
     */
    postHandle(data) {}

    /**
     * Send loginRequest to server
     */
    handleLogin() {
        var loginRequest = this.getLoginRequest();
        this.client.sendRequest(Const.EzyCommand.LOGIN, loginRequest);
    }

    /**
     * This function need to be manually defined to specify
     * needed login information
     * @returns [zonename, username, password, data]
     */
    getLoginRequest() {
        return ['test', 'test', 'test', []];
    }

    /**
     * Start sending ping request
     */
    startPing() {
        this.client.pingSchedule.start();
    }
}

//======================================
/**
 * A listener which fires when client receives Const.EzyCommand.LOGIN
 * command from server, meaning that login is successful.
 * - Usage:
 * ```
 *      let loginSuccessHandler = new Ezy.LoginSuccessHandler();
 *      loginSuccessHandler.handleLoginSuccess = function () {
 *          // What to do when login successfully login
 *      };
 * ```
 */
export class EzyLoginSuccessHandler {
    /**
     * Automatically call this function when client receives LOGIN command
     * from server
     * @param data [zoneId, zoneName, userId, username, responseData=null]
     */
    handle(data) {
        var zoneId = data[0];
        var zoneName = data[1];
        var userId = data[2];
        var username = data[3];
        var responseData = data[4];

        var zone = new Entity.EzyZone(this.client, zoneId, zoneName);
        var user = new Entity.EzyUser(userId, username);
        this.client.me = user;
        this.client.zone = zone;
        this.handleLoginSuccess(responseData);
        Util.EzyLogger.console(
            'user: ' + user.name + ' logged in successfully'
        );
    }

    /**
     * This function need to be manually defined to specify what to
     * do after successful login
     * @param responseData Additional data received from server
     */
    handleLoginSuccess(responseData) {}
}

//======================================
/**
 * A listener which fires when client receives Const.EzyCommand.LOGIN_ERROR
 * command from server, meaning that login is unsuccessfully.
 * - Usage
 * ```
 *      let loginErrorHandler = new Ezy.LoginErrorHandler();
 *      loginErrorHandler.handleLoginError = function (event) {
 *          // What to do when login unsuccessfully
 *      };
 * ```
 */
export class EzyLoginErrorHandler {
    /**
     * Automatically call this function when client receives LOGIN_ERROR command
     * from server
     * @param data [errorId, errorMessage]
     */
    handle(data) {
        this.client.disconnect(401);
        this.handleLoginError(data);
    }

    /**
     * This function need to be manually defined to specify what to
     * do after unsuccessful login
     * @param data [errorId, errorMessage]
     */
    handleLoginError(data) {}
}

//======================================
/**
 * A listener which fires when client receives Const.EzyCommand.APP_ACCESS command
 * from server, meaning that the client is allowed to access the app. This is the
 * response from server after client sends APP_ACCESS request
 * - Usage:
 * ```
 *      let accessAppHandler = new Ezy.AppAccessHandler();
 *      accessAppHandler.postHandle = function (app, data) {
 *          // What to do after being allowed to access app
 *      };
 * ```
 */
export class EzyAppAccessHandler {
    /**
     * Automatically call this function when client receives APP_ACCESS command
     * from server
     * @param data [appId, appName, data=[]]
     */
    handle(data) {
        var zone = this.client.zone;
        var appManager = zone.appManager;
        var app = this.newApp(zone, data);
        appManager.addApp(app);
        this.postHandle(app, data);
        Util.EzyLogger.console('access app: ' + app.name + ' successfully');
    }

    /**
     * Create an EzyApp entity for client
     * @param zone {EzyZone}
     * @param data {array} [appId, appName, data=[]]
     * @returns {EzyApp} Created app
     */
    newApp(zone, data) {
        var appId = data[0];
        var appName = data[1];
        var app = new Entity.EzyApp(this.client, zone, appId, appName);
        return app;
    }

    /**
     * This function need to be manually defined to specify what to
     * do after server allows client to access the app
     * @param app {EzyApp} App has just been created
     * @param data {array} [appId, appName, data=[]]
     */
    postHandle(app, data) {}
}

//======================================
/**
 * A listener which fires when client receives Const.EzyCommand.APP_EXIT command
 * from server, meaning that server tells client to exit the app
 * - Usage:
 * ```
 *      let exitAppHandler = new Ezy.EzyAppExitHandler();
 *      exitAppHandler.postHandle = function (app, data) {
 *          // What to do after exiting the app
 *      };
 */
export class EzyAppExitHandler {
    /**
     * Automatically call this function when client receives APP_EXIT command
     * from server
     * @param data {array} [appId, reasonId]
     */
    handle(data) {
        var zone = this.client.zone;
        var appManager = zone.appManager;
        var appId = data[0];
        var reasonId = data[1];
        var app = appManager.removeApp(appId);
        if (app) {
            this.postHandle(app, data);
            Util.EzyLogger.console(
                'user exit app: ' + app.name + ', reason: ' + reasonId
            );
        }
    }

    /**
     * This function need to be manually defined to specify what to
     * do after server allows client to access the app
     * @param app {EzyApp} App has just been removed
     * @param data {array} [appId, reasonId]
     */
    postHandle(app, data) {}
}

//======================================
/**
 * A listener which fires when client receives Const.EzyCommand.APP_REQUEST command
 * from server (response from server when clients send an APP_REQUEST request).
 * This handler calls an appropriate app's handler to process corresponding app's command
 * and data in the received server response.
 *
 * **Note**: This is an automatic handler, no need to manually define actions for it
 */
export class EzyAppResponseHandler {
    /**
     * Automatically call this function when client receives APP_REQUEST command
     * from server
     * @param data {array} [appId, responseData=[command, commandData]]
     */
    handle(data) {
        var appId = data[0];
        var responseData = data[1];
        var cmd = responseData[0];
        var commandData = responseData[1];

        var app = this.client.getAppById(appId);
        if (!app) {
            Util.EzyLogger.console(
                'receive message when has not joined app yet'
            );
            return;
        }
        var handler = app.getDataHandler(cmd);
        if (handler) handler(app, commandData);
        else
            Util.EzyLogger.console(
                'app: ' + app.name + ' has no handler for command: ' + cmd
            );
    }
}

//======================================
/**
 * A listener which fires when client receives Const.EzyCommand.PLUGIN_INFO command
 * from server, meaning that server allows client to access plugin
 * - Usage:
 * ```
 *      let pluginInfoHandler = new Ezy.EzyPluginInfoHandler();
 *      pluginInfoHandler.postHandle = function (plugin, data) {
 *          // What to do after being allowed to access plugin
 *      };
 * ```
 */
export class EzyPluginInfoHandler {
    /**
     * Automatically call this function when client receives PLUGIN_INFO command
     * from server
     * @param data {array} [pluginId, pluginName, data=[]]
     */
    handle(data) {
        var zone = this.client.zone;
        var pluginManager = zone.pluginManager;
        var plugin = this.newPlugin(zone, data);
        pluginManager.addPlugin(plugin);
        this.postHandle(plugin, data);
        Util.EzyLogger.console(
            'request plugin: ' + plugin.name + ' info successfully'
        );
    }
    /**
     * Create an EzyPlugin entity for client
     * @param zone {EzyZone}
     * @param data {array} [pluginId, pluginName, data=[]]
     * @returns {EzyPlugin} Created plugin
     */
    newPlugin(zone, data) {
        var pluginId = data[0];
        var pluginName = data[1];
        var plugin = new Entity.EzyPlugin(
            this.client,
            zone,
            pluginId,
            pluginName
        );
        return plugin;
    }

    /**
     * This function need to be manually defined to specify what to
     * do after server allows client to access the app
     * @param plugin {EzyPlugin} Plugin has just been created
     * @param data {array} [pluginId, pluginName, data=[]]
     */
    postHandle(plugin, data) {}
}

//======================================
/**
 * A listener which fires when client receives Const.EzyCommand.PLUGIN_REQUEST command
 * from server (response from server when clients send an PLUGIN_REQUEST request).
 * This handler calls an appropriate plugin's handler to process corresponding plugin's command
 * and data in the received server response.
 *
 * **Note**: This is an automatic handler, no need to manually define actions for it
 */
export class EzyPluginResponseHandler {
    /**
     * Automatically call this function when client receives PLUGIN_REQUEST command
     * from server
     * @param data {array} [pluginId, responseData=[command, commandData]]
     */
    handle(data) {
        var pluginId = data[0];
        var responseData = data[1];
        var cmd = responseData[0];
        var commandData = responseData[1];

        var plugin = this.client.getPluginById(pluginId);
        var handler = plugin.getDataHandler(cmd);
        if (handler) handler(plugin, commandData);
        else
            Util.EzyLogger.console(
                'plugin: ' + plugin.name + ' has no handler for command: ' + cmd
            );
    }
}

//======================================
/**
 * A listener which fires when client receives Const.EzyCommand.PONG command
 * from server
 */
export class EzyPongHandler {
    handle(client) {}
}

//======================================
/**
 * Manager class of all data handlers of a zone. A data handler is a listener
 * that fires when server send a command **with data** to client.
 */
export class EzyDataHandlers {
    /**
     * @param client {EzyClient}
     */
    constructor(client) {
        this.handlers = {};
        this.client = client;
        this.pingSchedule = client.pingSchedule;
    }

    /**
     * Map a handler to a specific command
     * @param cmd {{name: string, id: number}}
     * @param handler
     */
    addHandler(cmd, handler) {
        handler.client = this.client;
        handler.pingSchedule = this.pingSchedule;
        this.handlers[cmd.id] = handler;
    }

    /**
     * Get a handle by command
     * @param cmd {{name: string, id: number}}
     * @returns {*}
     */
    getHandler(cmd) {
        var handler = this.handlers[cmd.id];
        return handler;
    }
}

//======================================
/**
 * Manager class of all data handlers of an app
 */
export class EzyAppDataHandlers {
    constructor() {
        this.handlers = {};
    }

    /**
     * Map a user-defined handler to a user-defined command
     * @param cmd {string} User-defined command
     * @param handler {function} User-defined handler
     */
    addHandler(cmd, handler) {
        this.handlers[cmd] = handler;
    }

    /**
     * Get handler by command
     * @param cmd {string}
     * @returns {function}
     */
    getHandler(cmd) {
        var handler = this.handlers[cmd];
        return handler;
    }
}

//======================================
/**
 * Manager class of all data handlers of a plugin.
 */
export class EzyPluginDataHandlers {
    constructor() {
        this.handlers = {};
    }

    /**
     * Map a user-defined handler to a user-defined command
     * @param cmd {string} User-defined command
     * @param handler {function} User-defined handler
     */
    addHandler(cmd, handler) {
        this.handlers[cmd] = handler;
    }

    /**
     * Get handler by command
     * @param cmd {string}
     * @returns {function}
     */
    getHandler(cmd) {
        var handler = this.handlers[cmd];
        return handler;
    }
}

//======================================

export default {
    EzyHandshakeHandler,
    EzyLoginSuccessHandler,
    EzyLoginErrorHandler,
    EzyAppAccessHandler,
    EzyAppExitHandler,
    EzyAppResponseHandler,
    EzyPluginInfoHandler,
    EzyPluginResponseHandler,
    EzyPongHandler,
    EzyAppDataHandlers,
    EzyPluginDataHandlers,
    EzyDataHandlers,
};
