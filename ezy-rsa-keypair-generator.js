import JSEncrypt from 'jsencrypt';

class EzyRSAKeyPairGenerator {
    generateKeyPair(keySize) {
        var crypt = new JSEncrypt({default_key_size: keySize});
        var key = crypt.getKey();
        return key;
    }
}

export default EzyRSAKeyPairGenerator