import EzyCommand from './ezy-command'
import EzyGuid from './ezy-guid'

class EzyConnectionEventHandler {

    constructor() {
        this.clientType = "JAVASCRIPT";
        this.clientVersion = "1.0.0";
    }

    handle(context) {
        this.sendHandshake(context);
    }

    sendHandshake(context) {
        var clientId = this.getClientId();
        var clientKey = getClientKey();
        var enableEncryption = this.isEnableEncryption();
        var token = this.getToken();
        var request = [clientId, clientKey, this.clientType, this.clientVersion, enableEncryption, token];
        context.sendRequest(EzyCommand.HANDSHAKE, request);
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

export default EzyConnectionEventHandler