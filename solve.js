// sudokuSolver.js
function isSafe(board, row, col, num) {
    // Check if 'num' is not in the given row
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) {
        return false;
      }
    }
  
    // Check if 'num' is not in the given column
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) {
        return false;
      }
    }
  
    // Check if 'num' is not in the 3x3 box
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + startRow][j + startCol] === num) {
          return false;
        }
      }
    }
    return true;
  }
  
  function solveSudoku(board) {
    let emptySpot = findEmptySpot(board);
    if (!emptySpot) {
      return true; // Puzzle solved
    }
    const [row, col] = emptySpot;
  
    for (let num = 1; num <= 9; num++) {
      if (isSafe(board, row, col, num)) {
        board[row][col] = num;
  
        if (solveSudoku(board)) {
          return true;
        }
  
        board[row][col] = 0; // Reset on backtrack
      }
    }
    return false; // Trigger backtracking
  }
  
  function findEmptySpot(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          return [row, col]; // Return row, col of empty spot
        }
      }
    }
    return null; // No empty spots
  }
  
  function solve(numbers) {
    // Convert the flat array into a 2D array
    const board = [];
    for (let i = 0; i < 9; i++) {
      board.push(numbers.slice(i * 9, i * 9 + 9));
    }
  
    if (solveSudoku(board)) {
      return board.flat(); // Return the solved board as a flat array
    } else {
      return null; // No solution found
    }
  }
  
  module.exports = { solve };