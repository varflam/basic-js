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
  }
  encrypt(message, key) {
    if(!message || !key) {
      throw Error('Incorrect arguments!');
    }
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const result = [];

    const makeKey = () => {
      while(key.length < message.length) {
        key = `${key}${key}`;
      }
    };

    if(key.length < message.length) {
      makeKey();
    }

    let count = 0;
    for(let i = 0; i < message.length; i++) {
      if(message[i] === ' ') {
        result.push(' ');
      } else {
        const code = alphabet.indexOf(message[i].toUpperCase());
        const keyCode = alphabet.indexOf(key[count].toUpperCase());
        
        if(code === -1 || keyCode === -1) {
          result.push(message[i]);
        } else {
          const sum = code + keyCode;
          if(sum < alphabet.length) {
            result.push(alphabet[sum]);
          } else {
            result.push(alphabet[sum - alphabet.length]);
          }
        }
        count++; 
      }
    }

    return this.IsReverse ? result.reverse().join('') : result.join('');

  }
  decrypt(encryptedMessage, key) {
    console.log(this.IsReverse);
    if(!encryptedMessage || !key) {
      throw Error('Incorrect arguments!');
    }

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const result = [];

    const makeKey = () => {
      while(key.length < encryptedMessage.length) {
        key = `${key}${key}`;
      }
    };

    if(key.length < encryptedMessage.length) {
      makeKey();
    }

    let count = 0;
    for(let i = 0; i < encryptedMessage.length; i++) {
      if(encryptedMessage[i] === ' ') {
        result.push(' ');
      } else {
        const code = alphabet.indexOf(encryptedMessage[i].toUpperCase());
        const keyCode = alphabet.indexOf(key[count].toUpperCase());
        
        if(code === -1 || keyCode === -1) {
          result.push(encryptedMessage[i]);
        } else {
          const diff = code - keyCode;
          if(diff >= 0) {
            result.push(alphabet[code - keyCode]);
          } else {
            result.push(alphabet[alphabet.length + diff]);
          }
        }
        count++; 
      }
    }

    return this.IsReverse ? result.reverse().join('') : result.join('');
  }
}

const directMachine = new VigenereCipheringMachine();

console.log(directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse'));

module.exports = {
  VigenereCipheringMachine
};
