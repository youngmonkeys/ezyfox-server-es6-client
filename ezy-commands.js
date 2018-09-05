import EzyCommand from './ezy-command'

var EzyCommands = EzyCommands || {};
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

export default EzyCommands;