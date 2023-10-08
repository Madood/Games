import React, { useState } from 'react';
import './sudoko.css';

function Sudoku() {
  const [solved, setSolved] = useState(false);
  const [originalBoard, setOriginalBoard] = useState(generateRandomBoard()); // Store the original board
  const [board, setBoard] = useState([...originalBoard]);

  // Function to generate a random Sudoku board
  function generateRandomBoard() {
    // Initialize an empty 9x9 Sudoku board
    const newBoard = Array.from({ length: 9 }, () => Array(9).fill(0));

    // Fill the diagonal 3x3 subgrids with random numbers
    for (let i = 0; i < 9; i += 3) {
      fillRandomSubgrid(newBoard, i, i);
    }

    // Solve the board to create a valid Sudoku puzzle
    solveSudoku(newBoard);

    // Remove some numbers to make it a puzzle (adjust the difficulty level)
    removeNumbers(newBoard, 45); // You can adjust the number of cells to remove

    return newBoard;
  }

  // Function to fill a 3x3 subgrid with random numbers
  function fillRandomSubgrid(board, row, col) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffleArray(numbers);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Get the next random number from the shuffled array
        const nextNumber = numbers.pop();

        // Check if the number is already present in the subgrid
        if (!isNumberInSubgrid(board, row, col, nextNumber)) {
          board[row + i][col + j] = nextNumber;
        } else {
          // If the number is already present, put it back into the numbers array
          numbers.push(nextNumber);
        }
      }
    }
  }

  // Function to check if a number is already present in the 3x3 subgrid
  function isNumberInSubgrid(board, row, col, number) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[row + i][col + j] === number) {
          return true;
        }
      }
    }
    return false;
  }

  // Function to shuffle an array (Fisher-Yates shuffle)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Function to solve the Sudoku board (Backtracking algorithm)
  function solveSudoku(sudokuBoard) {
    function solve() {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (sudokuBoard[row][col] === 0) {
            for (let num = 1; num <= 9; num++) {
              if (isValidMove(row, col, num)) {
                sudokuBoard[row][col] = num;
                if (solve()) {
                  return true; // Move successful, continue solving
                }
                sudokuBoard[row][col] = 0; // If the move doesn't lead to a solution, backtrack
              }
            }
            return false; // No valid moves for this cell, backtrack
          }
        }
      }
      return true; // All cells filled, puzzle solved
    }

    function isValidMove(row, col, num) {
      // Check if 'num' is not present in the current row, current column, and current 3x3 subgrid
      for (let i = 0; i < 9; i++) {
        if (sudokuBoard[row][i] === num || sudokuBoard[i][col] === num) {
          return false; // 'num' is already present in the row or column
        }
      }
      const subgridRow = Math.floor(row / 3) * 3;
      const subgridCol = Math.floor(col / 3) * 3;
      for (let i = subgridRow; i < subgridRow + 3; i++) {
        for (let j = subgridCol; j < subgridCol + 3; j++) {
          if (sudokuBoard[i][j] === num) {
            return false; // 'num' is already present in the 3x3 subgrid
          }
        }
      }
      return true; // 'num' can be placed in this cell
    }

    solve(); // Solve the Sudoku board
  }

  // Function to remove numbers from the board to create a puzzle
  function removeNumbers(sudokuBoard, count) {
    let cellsRemoved = 0;

    while (cellsRemoved < count) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);

      if (sudokuBoard[row][col] !== 0) {
        sudokuBoard[row][col] = 0;
        cellsRemoved++;
      }
    }
  }

  // Function to handle input changes
  const handleInputChange = (row, col, value) => {
    const updatedBoard = board.map((rowArr, rowIndex) =>
      row === rowIndex
        ? rowArr.map((cell, colIndex) => (col === colIndex ? value : cell))
        : rowArr
    );
    setBoard(updatedBoard);
  };

  // Function to solve the Sudoku puzzle
  const handleSolveClick = () => {
    if (solved) {
      // If the puzzle is already solved, reset to the original position
      setBoard([...originalBoard]); // Reset to the original board
    } else {
      // If the puzzle is not solved, solve it
      const solvedBoard = JSON.parse(JSON.stringify(board)); // Clone the board
      solveSudoku(solvedBoard);
      setBoard(solvedBoard);
    }
    // Toggle the solved state
    setSolved(!solved);
  };

  // Function to generate a new random Sudoku game
  const handleNewGameClick = () => {
    const newRandomBoard = generateRandomBoard();
    setBoard(newRandomBoard);
    setOriginalBoard([...newRandomBoard]); // Update the original board
  };

  // Function to render a single Sudoku cell as an input field
  const renderSudokuCell = (cellValue, row, col) => (
    <input
      className="sudoku-cell"
      type="number"
      min="1"
      max="9"
      value={cellValue === 0 ? '' : cellValue}
      onChange={(e) => handleInputChange(row, col, +e.target.value)}
    />
  );

  // Function to render the entire Sudoku board
  const renderSudokuBoard = () => (
    <div className="sudoku-board">
      {board.map((row, rowIndex) => (
        <div className="sudoku-row" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <div className="sudoku-cell-container" key={colIndex}>
              {renderSudokuCell(cell, rowIndex, colIndex)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="Sudoku_container">
      <h1 className="title">Sudoku Game in <span>React</span></h1>
       {renderSudokuBoard()}
      <button className="claculate" onClick={handleNewGameClick}>New Game</button>
      <button className="claculate" onClick={handleSolveClick}>Solve</button>
     
    </div>
  );
}

export default Sudoku;
