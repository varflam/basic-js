const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(reverse = true) {
    this.IsReverse = !reverse;
    this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  throwError(message, key) {
    if(!message || !key) {
      throw Error('Incorrect arguments!');
    }
  }
  makeKey(key, message) {
    while(key.length < message.length) {
      key = `${key}${key}`;
    }
    return key;
  }
  formStr(message, key, isEncrypting) {
    const result = [];
    let count = 0;
    for(let i = 0; i < message.length; i++) {
      if(message[i] === ' ') {
        result.push(' ');
      } else {
        const code = this.alphabet.indexOf(message[i].toUpperCase());
        const keyCode = this.alphabet.indexOf(key[count].toUpperCase());
        
        if(code === -1 || keyCode === -1) {
          result.push(message[i]);
        } else {
          if(isEncrypting) {
            const sum = code + keyCode;
            if(sum < this.alphabet.length) {
              result.push(this.alphabet[sum]);
            } else {
              result.push(this.alphabet[sum - this.alphabet.length]);
            }
          } else {
            const diff = code - keyCode;
            if(diff >= 0) {
              result.push(this.alphabet[code - keyCode]);
            } else {
              result.push(this.alphabet[this.alphabet.length + diff]);
            }
          }
        }
        count++; 
      }
    }
    return result;
  }
  encrypt(message, key) {
    this.throwError(message, key);
    if(key.length < message.length) {
      key = this.makeKey(key, message);
    }
    const result = this.formStr(message, key, true);

    return this.IsReverse ? result.reverse().join('') : result.join('');

  }
  decrypt(encryptedMessage, key) {
    this.throwError(encryptedMessage, key);

    if(key.length < encryptedMessage.length) {
      key = this.makeKey(key, encryptedMessage);
    }

    const result = this.formStr(encryptedMessage, key, false);

    return this.IsReverse ? result.reverse().join('') : result.join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};
