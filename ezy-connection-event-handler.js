import EzyCommand from './ezy-command'
import EzyGuid from './ezy-guid'
import EzyRSAKeyPairGenerator from './ezy-rsa-keypair-generator'

class EzyConnectionEventHandler {

    constructor() {
        this.clientType = "JAVASCRIPT";
        this.clientVersion = "1.0.0";
    }

    handle(context) {
        this.sendHandshake(context);
    }

    sendHandshake(context) {
        var keyPair = this.loadKeyPair();
        var clientId = this.getClientId();
        var clientKey = keyPair.getPublicBaseKeyB64();
        var reconnectToken = this.getReconnectToken();
        var request = [clientId, clientKey, reconnectToken, this.clientType, this.clientVersion];
        context.sendRequest(EzyCommand.HANDSHAKE, request);
    }

    getReconnectToken() {
        return "";
    }

    getClientId() {
        return EzyGuid.generate();
    }

    loadKeyPair() {
        var keyPairGenerator = new EzyRSAKeyPairGenerator();
        var keyPair = keyPairGenerator.generateKeyPair(1024);
        return keyPair;
    }
}

export default EzyConnectionEventHandler