
import React, { useState } from 'react';
import "./Paper.css";

function App() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const choices = ['rock', 'paper', 'scissors'];

  // Function to generate a random choice for the computer
  const generateComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  // Function to determine the winner
  const determineWinner = (player, computer) => {
    if (player === computer) {
      return 'It\'s a tie!';
    }
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'You win!';
    }
    return 'Computer wins!';
  };

  // Function to handle player's choice
  const handlePlayerChoice = (choice) => {
    const computerChoice = generateComputerChoice();
    const result = determineWinner(choice, computerChoice);

    setPlayerChoice(choice);
    setComputerChoice(computerChoice);
    setResult(result);
  };

  return (
    <div className="App">
     <h1 className='title'>Paper Rock Scissor Game in <span>React</span></h1>
      <div className="choices">
        {choices.map((choice) => (
          <button key={choice} className='claculate' onClick={() => handlePlayerChoice(choice)}>
            {choice}
          </button>
        ))}
      </div>
      {playerChoice && computerChoice && (
        <div className="result">
          <p>You chose: {playerChoice}</p>
          <p>Computer chose: {computerChoice}</p>
          <h2>{result}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
