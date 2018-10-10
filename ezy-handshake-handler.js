import EzyCommand from './ezy-command'

class EzyHandshakeHandler {

	handle(data) {
		this.startPing();
		this.handleLogin();
		this.postHandle(data);
	}

	postHandle(data) {
    }

	handleLogin() {
		var loginRequest = this.getLoginRequest();
		this.client.sendRequest(EzyCommand.LOGIN, loginRequest);
    }
    
    getLoginRequest() {
        return ["test", "test", "test", []];
	}
	
	startPing() {
		this.client.pingSchedule.start();
	}
}

export default EzyHandshakeHandler