import EzyCommand from './ezy-command'
import EzyGuid from './ezy-guid'

class EzyConnectionSuccessHandler {

    constructor() {
        this.clientType = "JSEMACS6";
        this.clientVersion = "1.0.0";
    }

    handle() {
        this.sendHandshakeRequest();
        this.postHandle();
    }

    postHandle() {
    }

    sendHandshakeRequest() {
        var request = this.newHandshakeRequest();
        this.client.sendRequest(EzyCommand.HANDSHAKE, request);
    }

    newHandshakeRequest() {
        var clientId = this.getClientId();
        var clientKey = this.getClientKey();
        var enableEncryption = this.isEnableEncryption();
        var token = this.getToken();
        var request = [clientId, clientKey, this.clientType, this.clientVersion, enableEncryption, token];
        return request;
    }

    getClientKey() {
        return "";
    }

    getClientId() {
        return EzyGuid.generate();
    }

    isEnableEncryption() {
        return false;
    }

    getToken() {
        return "";
    }

}

export default EzyConnectionSuccessHandler