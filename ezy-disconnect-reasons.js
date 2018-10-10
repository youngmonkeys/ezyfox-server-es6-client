import EzyDisconnectReason from './ezy-disconnect-reason'

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

export default EzyDisconnectReasons