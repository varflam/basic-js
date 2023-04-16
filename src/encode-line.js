const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  let res = [];

  let count = 1;
  for(let i = 0; i < str.length; i++) {
    if(i === str.length - 1) {
      if(count === 1) {
        res.push(str[i]);
      } else {
        res.push(`${count}${str[i]}`);
      }
    } else {
      if(str[i] === str[i + 1]) {
        count++;
      } else {
        if(count === 1) {
          res.push(str[i]);
        } else {
          res.push(`${count}${str[i]}`);
        }
        count = 1;
      }
    }
  }

  return res.join('');
}

module.exports = {
  encodeLine
};
