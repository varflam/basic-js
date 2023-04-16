const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *  
 * @param {String} str string to repeat
 * @param {Object} options options object 
 * @return {String} repeating string
 * 
 *
 * @example
 * 
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  const result = [];

  let {repeatTimes, separator, addition, additionRepeatTimes, additionSeparator} = options;

  if(typeof str !== 'string') {
    str = String(str);
  }
  if(addition !== undefined && typeof addition !== 'string') {
    addition = String(addition);
  }

  if(!repeatTimes) {
    repeatTimes = 1;
  }

  if(addition && !additionRepeatTimes) {
    additionRepeatTimes = 1;
  }

  for(let i = 0; i < repeatTimes; i++) {
    if(addition) {
      const subArr = [];
      for(let j = 0; j < additionRepeatTimes; j++) {
        subArr.push(addition);
      }
      result.push(`${str}${subArr.join(additionSeparator || '|')}`);
    } else {
      result.push(str);
    }
  }

  return result.join(separator || '+');
}


module.exports = {
  repeater
};
