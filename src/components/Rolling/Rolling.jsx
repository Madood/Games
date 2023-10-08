import React, { useState } from 'react';
import './rolling.css';

const Player = ({ playerName }) => {
  const [diceResult1, setDiceResult1] = useState(null);
  const [diceResult2, setDiceResult2] = useState(null);

  const rollDice = () => {
    const result1 = Math.floor(Math.random() * 6) + 1; // Generate a random number between 1 and 6 for the first die
    const result2 = Math.floor(Math.random() * 6) + 1; // Generate a random number between 1 and 6 for the second die

    setDiceResult1(result1);
    setDiceResult2(result2);
  };

  const getImageForDiceResult = (result) => {
    switch (result) {
      case 1:
        return require('./dice-1.png');
      case 2:
        return require('./dice-2.png');
      case 3:
        return require('./dice-3.png');
      case 4:
        return require('./dice-4.png');
      case 5:
        return require('./dice-5.png');
      case 6:
        return require('./dice-6.png');
      default:
        return null;
    }
  };

  const determineWinner = () => {
    if (diceResult1 === diceResult2) {
      return "It's a tie!";
    } else if (diceResult1 > diceResult2) {
      return `Player 1 wins!`;
    } else {
      return "Player 2 wins!";
    }
  };

  const winnerMessage = determineWinner();

  return (
    <>
      <h1 className='title'>Rolling dice Game in <span>React</span></h1>
      <h2>Dice Results:{winnerMessage}</h2>
     <div className='rolling_container'>
      <div className="player1">
        <img src={getImageForDiceResult(diceResult1)} alt={`Dice result ${diceResult1}`} />
      </div>
      <div className="player2">
        <img src={getImageForDiceResult(diceResult2)} alt={`Dice result ${diceResult2}`} />
      </div>
     
      </div>
       <button className='result claculate' onClick={rollDice}>Roll</button>
      </>
  );
};

export default Player;
