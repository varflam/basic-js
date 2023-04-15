const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 * 
 */
const chainMaker = {
  chain: [],
  getLength() {
    return this.chain.length;
  },
  addLink(value = '') {
    this.chain.push(`( ${value} )`);
    return this;
  },
  removeLink(position) {
    if(position > this.chain.length || !(Number.isInteger(position)) || position <= 0 || typeof position !== 'number') {
      this.chain = [];
      throw new Error("You can't remove incorrect link!");
    } else {
      this.chain = this.chain.filter((item, i) => i + 1 !== position);
    }
    return this;
  },
  reverseChain() {
    this.chain = this.chain.reverse();
    return this;
  },
  finishChain() {
    const result = [...this.chain];
    this.chain = [];
    return result.join('~~');
  }
};

module.exports = {
  chainMaker
};
