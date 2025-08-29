
const sodium = require('libsodium-wrappers');
const fs = require('fs');

/**
 * Class for Encrypt and Decrypt the data
 */
class MCrypt {
    /**
     * Constructor
     */
    constructor() {
        this.SECRET_KEY_FILEPATH = process.env.SECRET_KEY_FILEPATH
        this.NONCE_KEY_FILEPATH = process.env.NONCE_KEY_FILEPATH
        this.decryptStatusMessage = ''
        this.encryptStatusMessage = ''
    }

    /**
     * 
     * @param {*} filepath 
     * @returns {string}
     */
    async getDecodedFileContents(filepath) { 
        const content = fs.readFileSync(filepath, 'utf8').trim();
        return sodium.from_hex(content); // Convert hex to binary buffer
    }
    /**
     * 
     * @param {*} message 
     * @returns {boolean}
     */
    async encrypt(message) {
        try {
            await sodium.ready;
            message = message.trim();
            //If the message is empty
            if (!message) return false;

            const nonce = await this.getDecodedFileContents(this.NONCE_KEY_FILEPATH);
            const key = await this.getDecodedFileContents(this.SECRET_KEY_FILEPATH);

            // Encrypt message
            const cipher = sodium.crypto_secretbox_easy(message, nonce, key);

            // Return cipher in hex
            this.encryptStatusMessage = sodium.to_hex(cipher);
            return true
        } catch (e) {
            this.encryptStatusMessage = e.message;
            return false
        }
    }
     /**
     * 
     * @param {*} cipherHex 
     * @returns {boolean}
     */
    async decrypt(cipherHex) {
        try {
            await sodium.ready;
            cipherHex = cipherHex.trim();
            if (!cipherHex) return '';

            const cipher = sodium.from_hex(cipherHex); // Decode hex cipher
            const nonce = await this.getDecodedFileContents(this.NONCE_KEY_FILEPATH);
            const key = await this.getDecodedFileContents(this.SECRET_KEY_FILEPATH);

            // Decrypt message
            const decryptedMessage = sodium.crypto_secretbox_open_easy(cipher, nonce, key);
            if (!decryptedMessage) {
                this.decryptStatusMessage = 'Decryption error: message was tampered with in transit';
                return false
            }

            // Return the decrypted message as a string
            this.decryptStatusMessage = new TextDecoder().decode(decryptedMessage);
            return true
        } catch (e) {
            this.decryptStatusMessage= e.message
            return false;
        }
    }
    /**
     * 
     * @param {*} type 
     * @returns {string}
     */
    async getMessage(type) {
        return (type === "encrypt") ? this.encryptStatusMessage : this.decryptStatusMessage
    }
}

const mcrypt = new MCrypt();
/**
 * 
 * @param {*} message 
 * @returns {string}
 */
function encryptData(message){
    return mcrypt.encrypt(message);
}

/* 
* @param {*} message 
* @returns {*}
*/
 async function  encryptMessage(message){
    
   if(process.env.IS_INPUT_OUTPUT_ENCRYPT == '0'){
       return message
   } 
   await mcrypt.encrypt(JSON.stringify(message));
   var result = await  mcrypt.getMessage('encrypt')
   return {"result" : result}
}

/**
 * 
 * @param {*} encryptedMessage 
 * @returns  {string}
 */
function decryptData(encryptedMessage){
    return mcrypt.decrypt(encryptedMessage);

}

/**
 * 
 * @param {string} type 
 * @returns {string}
 */
function getdata(type ='encrypt'){
    return mcrypt.getMessage(type)
}

module.exports = {
    encryptData,
    decryptData,
    getdata,
    encryptMessage
};