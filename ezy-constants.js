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
    APP_REQUEST_ERROR: {id: 35, name: "APP_REQUEST_ERROR"},
    PLUGIN_INFO : {id: 40, name: "PLUGIN_INFO"},
    PLUGIN_REQUEST : {id: 41, name: "PLUGIN_REQUEST"}
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
EzyCommands[EzyCommand.APP_REQUEST_ERROR.id] = EzyCommand.APP_REQUEST_ERROR;
EzyCommands[EzyCommand.PLUGIN_INFO.id] = EzyCommand.PLUGIN_INFO;
EzyCommands[EzyCommand.PLUGIN_REQUEST.id] = EzyCommand.PLUGIN_REQUEST;

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
    CLOSE: -1,
    UNKNOWN : 0,
    IDLE : 1,
    NOT_LOGGED_IN : 2,
    ANOTHER_SESSION_LOGIN : 3,
    ADMIN_BAN : 4,
    ADMIN_KICK : 5,
    MAX_REQUEST_PER_SECOND : 6,
    MAX_REQUEST_SIZE : 7,
    SERVER_ERROR : 8,
    SERVER_NOT_RESPONDING : 400,
    UNAUTHORIZED: 401
}

export var EzyDisconnectReasonNames = EzyDisconnectReasonNames || {};
EzyDisconnectReasonNames[EzyDisconnectReason.CLOSE] = "CLOSE";
EzyDisconnectReasonNames[EzyDisconnectReason.UNKNOWN] = "UNKNOWN";
EzyDisconnectReasonNames[EzyDisconnectReason.IDLE] = "IDLE";
EzyDisconnectReasonNames[EzyDisconnectReason.NOT_LOGGED_IN] = "NOT_LOGGED_IN";
EzyDisconnectReasonNames[EzyDisconnectReason.ANOTHER_SESSION_LOGIN] = "ANOTHER_SESSION_LOGIN";
EzyDisconnectReasonNames[EzyDisconnectReason.ADMIN_BAN] = "ADMIN_BAN";
EzyDisconnectReasonNames[EzyDisconnectReason.ADMIN_KICK] = "ADMIN_KICK";
EzyDisconnectReasonNames[EzyDisconnectReason.MAX_REQUEST_PER_SECOND] = "MAX_REQUEST_PER_SECOND";
EzyDisconnectReasonNames[EzyDisconnectReason.MAX_REQUEST_SIZE] = "MAX_REQUEST_SIZE";
EzyDisconnectReasonNames[EzyDisconnectReason.SERVER_ERROR] = "SERVER_ERROR";
EzyDisconnectReasonNames[EzyDisconnectReason.SERVER_NOT_RESPONDING] = "SERVER_NOT_RESPONSE";
EzyDisconnectReasonNames[EzyDisconnectReason.UNAUTHORIZED] = "UNAUTHORIZED";

EzyDisconnectReasonNames.parse = function(reasonId) {
    const answer = EzyDisconnectReasonNames[reasonId];
    if(answer)
        return answer;
    return reasonId.toString();
}

Object.freeze(EzyDisconnectReasonNames);

export default {
    EzyCommand, 
    EzyCommands, 
    EzyEventType, 
    EzyConnectionStatus, 
    EzyConnectionFailedReason,
    EzyDisconnectReason,
    EzyDisconnectReasonNames
}