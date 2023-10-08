import React, { useState, useEffect } from 'react';
import "./tictac.css";
import Cross from '@mui/icons-material/Close';
import Circle from '@mui/icons-material/RadioButtonUnchecked';

function Tictac() {
  // State variables
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [isComputerMode, setIsComputerMode] = useState(false);

  // Effect for computer's turn in single-player mode
  useEffect(() => {
    if (isComputerMode && currentPlayer === "O" && !winner) {
      makeComputerMove();
    }
  }, [currentPlayer, isComputerMode, winner]);

  // Handle a box click
  const handleBoxClick = (index) => {
    if (board[index] === "" && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      checkWinner(newBoard);
    }
  }

  // Calculate the winner
  const calculateWinner = (squares) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  }

  // Check for a winner
  const checkWinner = (squares) => {
    const winner = calculateWinner(squares);
    if (winner) {
      setWinner(winner);
    }
  }

  // Make a computer move (random)
  const makeComputerMove = () => {
    const emptyIndexes = board.map((value, index) => (value === "") ? index : null).filter((index) => index !== null);

    // Check for a winning move
    for (let i = 0; i < emptyIndexes.length; i++) {
      const testBoard = [...board];
      testBoard[emptyIndexes[i]] = "O";
      if (calculateWinner(testBoard) === "O") {
        handleBoxClick(emptyIndexes[i]);
        return;
      }
    }

    // Check for a move to block the opponent from winning
    for (let i = 0; i < emptyIndexes.length; i++) {
      const testBoard = [...board];
      testBoard[emptyIndexes[i]] = "X";
      if (calculateWinner(testBoard) === "X") {
        handleBoxClick(emptyIndexes[i]);
        return;
      }
    }

    // If no winning or blocking move, make a random move
    const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    handleBoxClick(randomIndex);
  };


  // Handle game reset
  const handleReset = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner(null);
  };

  // Handle mode selection (against computer or multiplayer)
  const handleComputerMode = () => {
    setIsComputerMode(true);
    handleReset();
  };

  const handleMultiplayerMode = () => {
    setIsComputerMode(false);
    handleReset();
  };

  return (
    <div className='tictak_container' id='tictac'>
      <h1 className='title'>Tic Tac Toe Game in <span>React</span></h1>

      {/* Mode selection buttons */}
      <div className="mode-buttons">
        <button className="option" onClick={handleComputerMode}>Play Against Computer</button>
        <button className="option" onClick={handleMultiplayerMode}>Play Multiplayer</button>
      </div>

      {/* Game board */}
      <div className="tictac_board">
        {board.map((value, index) => (
          <div
            key={index}
            className="boxes"
            onClick={() => handleBoxClick(index)}
          >
            {value === "X" ? <Cross /> : value === "O" ? <Circle /> : null}
          </div>
        ))}
      </div>

      {/* Game status */}
      {winner ? (
        <div className="status">Winner: {winner}</div>
      ) : board.every((value) => value !== "") ? (
        <div className="status">It's a draw!</div>
      ) : (
        <div className="status">Current Player: {currentPlayer}</div>
      )}

      {/* Reset button */}
      <button className="reset" onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Tictac;
