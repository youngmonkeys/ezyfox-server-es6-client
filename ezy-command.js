const EzyCommand =  {
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

export default EzyCommand