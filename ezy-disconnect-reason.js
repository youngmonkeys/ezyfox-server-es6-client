const EzyDisconnectReason = {
    UNKNOWN : {id : 0, name : "UNKNOWN"},
    IDLE : {id : 1, name : "IDLE"},
    NOT_LOGGED_IN : {id : 2, name : "NOT_LOGGED_IN"},
    ANOTHER_SESSION_LOGIN : {id : 3, name : "ANOTHER_SESSION_LOGIN"},
    ADMIN_BAN : {id : 4, name : "ADMIN_BAN"},
    ADMIN_KICK : {id : 5, name : "ADMIN_KICK"},
    MAX_REQUEST_PER_SECOND : {id : 6, name : "MAX_REQUEST_PER_SECOND"},
    MAX_REQUEST_SIZE : {id : 7, name : "MAX_REQUEST_SIZE"},
    SERVER_ERROR : {id : 8, name : "SERVER_ERROR"},
    SERVER_NOT_RESPONSE : {id : 300, name : "SERVER_NOT_RESPONSE"},
    CONNECTION_REFUSE : {id : 301, name : "CONNECTION_REFUSE"}
}

export default EzyDisconnectReason