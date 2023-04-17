const { NotImplementedError } = require('../extensions/index.js');

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {
  const result = [];

  for(let i = 0; i < matrix.length; i++) {
    let up, down;

    if(i > 0) {
      up = i - 1;
    }

    if(i < matrix.length - 1) {
      down = i + 1;
    }
    result.push([]);
    for(let j = 0; j < matrix[i].length; j++) {
      let left, right;
      let count = 0;
      if(j > 0) {
        left = j - 1;
      }

      if(j < matrix[i].length - 1) {
        right = j + 1;
      }

      if(up !== undefined) {
        if(matrix[up][j] === true) {
          ++count;
        }

        if(left !== undefined) {
          if(matrix[up][left] === true) {
            ++count;
          }
        }

        if(right !== undefined) {
          if(matrix[up][right] === true) {
            ++count;
          }
        }
      }

      if(down !== undefined) {
        if(matrix[down][j] === true) {
          ++count;
        }

        if(left !== undefined) {
          if(matrix[down][left] === true) {
            ++count;
          }
        }

        if(right !== undefined) {
          if(matrix[down][right] === true) {
            ++count;
          }
        }
      }

      if(left !== undefined) {
        if(matrix[i][left] === true) {
          ++count;
        }
      }

      if(right !== undefined) {
        if(matrix[i][right] === true) {
          ++count;
        }
      }

      result[i].push(count);
    }
  }

  return result;
}

const matrix = [
    [true, false, false],
    [false, true, false],
    [false, false, false]
   ];

  console.log(minesweeper(matrix));

module.exports = {
  minesweeper
};
