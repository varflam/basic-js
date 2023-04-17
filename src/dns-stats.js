const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  const domainObj = {};
  const domainsArr = [];

  for(let i = 0; i < domains.length; i++) {
    domainsArr.push(domains[i].split('.').reverse());
    for(let j = 0; j < domainsArr[i].length; j++) {
      domainsArr[i][j] = `.${domainsArr[i][j]}`;
    }
    domainsArr[i] = domainsArr[i].join('');
  }

  const putInObj = (value) => {
    if(domainObj[value]) {
        domainObj[value] = domainObj[value] + 1;
    } else {
      domainObj[value] = 1;
    }
  };

  for(let i = 0; i < domainsArr.length; i++) {
    for(let j = 0; j < domainsArr[i].length; j++) { 
      const char = domainsArr[i][j];
      if(char === '.' && j !== 0) {
        putInObj(domainsArr[i].slice(0, j));
      }
      if(j === domainsArr[i].length - 1) {
        putInObj(domainsArr[i]);
      }
    }
  }
  return domainObj;
}

module.exports = {
  getDNSStats
};
