import EzyCommand from './ezy-command'

class EzyHandshakeHandler {

	handle(context, data) {
		this.sendLoginRequest(context);
		this.startPing(context);
	}

	startPing(context) {
		context.startPing();
	}

	sendLoginRequest(context) {
		var loginRequest = this.newLoginRequest(context);
		context.sendRequest(EzyCommand.LOGIN, loginRequest);
    }
    
    newLoginRequest(context) {
        return ["test", "test", "test", []];
    }
}

export default EzyHandshakeHandler