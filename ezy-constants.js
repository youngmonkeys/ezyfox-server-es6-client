export const EzyCommand =  {
    ERROR : {id: 10, name: "ERROR"},
    HANDSHAKE : {id: 11, name: "HANDSHAKE"},
    PING : {id: 12, name: "PING"},
    PONG : {id: 13, name: "PONG"},
    DISCONNECT : {id: 14, name: "DISCONNECT"},
    LOGIN : {id: 20, name: "LOGIN"},
    LOGIN_ERROR : {id: 21, name: "LOGIN_ERROR"},
    LOGOUT : {id: 22, name: "LOGOUT"},
    APP_ACCESS : {id: 30, name: "APP_ACCESS"},
    APP_REQUEST : {id: 31, name: "APP_REQUEST"},
    APP_EXIT : {id: 33, name: "APP_EXIT"},
    APP_ACCESS_ERROR : {id: 34, name: "APP_ACCESS_ERROR"},
    PLUGIN_INFO : {id: 40, name: "PLUGIN_INFO"},
    PLUGIN_REQUEST_BY_NAME : {id: 41, name: "PLUGIN_REQUEST_BY_NAME"},
    PLUGIN_REQUEST_BY_ID : {id: 42, name: "PLUGIN_REQUEST_BY_ID"}
}

export var EzyCommands = EzyCommands || {};
EzyCommands[EzyCommand.ERROR.id] = EzyCommand.ERROR;
EzyCommands[EzyCommand.HANDSHAKE.id] = EzyCommand.HANDSHAKE;
EzyCommands[EzyCommand.PING.id] = EzyCommand.PING;
EzyCommands[EzyCommand.PONG.id] = EzyCommand.PONG;
EzyCommands[EzyCommand.DISCONNECT.id] = EzyCommand.DISCONNECT;
EzyCommands[EzyCommand.LOGIN.id] = EzyCommand.LOGIN;
EzyCommands[EzyCommand.LOGIN_ERROR.id]  = EzyCommand.LOGIN_ERROR;
EzyCommands[EzyCommand.LOGOUT.id]  = EzyCommand.LOGOUT;
EzyCommands[EzyCommand.APP_ACCESS.id]  = EzyCommand.APP_ACCESS;
EzyCommands[EzyCommand.APP_REQUEST.id] = EzyCommand.APP_REQUEST;
EzyCommands[EzyCommand.APP_EXIT.id] = EzyCommand.APP_EXIT;
EzyCommands[EzyCommand.APP_ACCESS_ERROR.id] = EzyCommand.APP_ACCESS_ERROR;
EzyCommands[EzyCommand.PLUGIN_INFO.id] = EzyCommand.PLUGIN_INFO;
EzyCommands[EzyCommand.PLUGIN_REQUEST_BY_NAME.id] = EzyCommand.PLUGIN_REQUEST_BY_NAME;
EzyCommands[EzyCommand.PLUGIN_REQUEST_BY_ID.id] = EzyCommand.PLUGIN_REQUEST_BY_ID;

Object.freeze(EzyCommands);

export const EzyEventType = {
    CONNECTION_SUCCESS: "CONNECTION_SUCCESS",
    CONNECTION_FAILURE: "CONNECTION_FAILURE",
    DISCONNECTION : "DISCONNECTION",
    LOST_PING : "LOST_PING",
    TRY_CONNECT : "TRY_CONNECT"
}

export const EzyConnectionStatus = {
    NULL: "NULL",
    CONNECTING: "CONNECTING",
    CONNECTED: "CONNECTED",
    DISCONNECTED: "DISCONNECTED",
    FAILURE: "FAILURE",
    RECONNECTING: "RECONNECTING"
}

export const EzyConnectionFailedReason =  {
    NETWORK_UNREACHABLE: "NETWORK_UNREACHABLE",
    UNKNOWN_HOST: "UNKNOWN_HOST",
    CONNECTION_REFUSED: "CONNECTION_REFUSED",
    UNKNOWN: "UNKNOWN"
}

export const EzyDisconnectReason = {
    UNKNOWN : {id : 0, name : "UNKNOWN"},
    IDLE : {id : 1, name : "IDLE"},
    NOT_LOGGED_IN : {id : 2, name : "NOT_LOGGED_IN"},
    ANOTHER_SESSION_LOGIN : {id : 3, name : "ANOTHER_SESSION_LOGIN"},
    ADMIN_BAN : {id : 4, name : "ADMIN_BAN"},
    ADMIN_KICK : {id : 5, name : "ADMIN_KICK"},
    MAX_REQUEST_PER_SECOND : {id : 6, name : "MAX_REQUEST_PER_SECOND"},
    MAX_REQUEST_SIZE : {id : 7, name : "MAX_REQUEST_SIZE"},
    SERVER_ERROR : {id : 8, name : "SERVER_ERROR"},
    SERVER_NOT_RESPONDING : {id : 400, name : "SERVER_NOT_RESPONSE"},
    CONNECTION_REFUSE : {id : 401, name : "CONNECTION_REFUSE"}
}

var EzyDisconnectReasons = EzyDisconnectReasons || {};
EzyDisconnectReasons[EzyDisconnectReason.UNKNOWN.id] = EzyDisconnectReason.UNKNOWN;
EzyDisconnectReasons[EzyDisconnectReason.IDLE] = EzyDisconnectReason.IDLE;
EzyDisconnectReasons[EzyDisconnectReason.NOT_LOGGED_IN] = EzyDisconnectReason.NOT_LOGGED_IN;
EzyDisconnectReasons[EzyDisconnectReason.ANOTHER_SESSION_LOGIN] = EzyDisconnectReason.ANOTHER_SESSION_LOGIN;
EzyDisconnectReasons[EzyDisconnectReason.ADMIN_BAN] = EzyDisconnectReason.ADMIN_BAN;
EzyDisconnectReasons[EzyDisconnectReason.ADMIN_KICK] = EzyDisconnectReason.ADMIN_KICK;
EzyDisconnectReasons[EzyDisconnectReason.MAX_REQUEST_PER_SECOND] = EzyDisconnectReason.MAX_REQUEST_PER_SECOND;
EzyDisconnectReasons[EzyDisconnectReason.MAX_REQUEST_SIZE] = EzyDisconnectReason.MAX_REQUEST_SIZE;
EzyDisconnectReasons[EzyDisconnectReason.SERVER_ERROR] = EzyDisconnectReason.SERVER_ERROR;
EzyDisconnectReasons[EzyDisconnectReason.SERVER_NOT_RESPONDING] = EzyDisconnectReason.SERVER_NOT_RESPONSE;
EzyDisconnectReasons[EzyDisconnectReason.CONNECTION_REFUSE] = EzyDisconnectReason.CONNECTION_REFUSE;

Object.freeze(EzyDisconnectReasons);

export default {
    EzyCommand, 
    EzyCommands, 
    EzyEventType, 
    EzyConnectionStatus, 
    EzyConnectionFailedReason,
    EzyDisconnectReason,
    EzyDisconnectReasons
}