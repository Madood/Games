import React, { useState, useEffect } from 'react';
import './croco.css';
import dinosaurImage from './dinosaur.png';
import bushImage from './bush.png';

function DinosaurGame() {
  const [dinosaurJumping, setDinosaurJumping] = useState(false);
  const [hurdles, setHurdles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [paused, setPaused] = useState(false); // Add paused state

  const addHurdle = () => {
    setHurdles((prevHurdles) => {
      const newHurdles = [...prevHurdles, { left: 100 }];
      return newHurdles.slice(Math.max(newHurdles.length - 6, 0));
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === ' ' || e.key === 'Enter') && !dinosaurJumping && !gameOver && !paused) {
        jump();
      }
    };

    const startGame = () => {
      resetGame();
      addHurdle();
      const hurdleInterval = setInterval(() => {
        if (!gameOver && !paused) { // Check if the game is not paused
          addHurdle();
        }
      }, 20000);

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('click', startGame);

      return () => {
        clearInterval(hurdleInterval);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('click', startGame);
      };
    };

    startGame();
  }, [dinosaurJumping, gameOver, paused]); // Include paused in the dependency array

  useEffect(() => {
    const moveHurdles = () => {
      const interval = setInterval(() => {
        if (!gameOver && !paused) { // Check if the game is not paused
          setHurdles((prevHurdles) => {
            const newHurdles = prevHurdles
              .map((hurdle) => ({
                ...hurdle,
                left: hurdle.left - 1,
              }))
              .filter((hurdle) => hurdle.left > -100);

            const hurdlesCrossed = prevHurdles.length - newHurdles.length;
            setScore((prevScore) => prevScore + hurdlesCrossed);

            if (
              newHurdles.some(
                (hurdle) =>
                  hurdle.left < 0 && hurdle.left > -0 && !hurdle.passed
              )
            ) {
              setGameOver(true);
            }

            return newHurdles.map((hurdle) =>
              hurdle.left <= 10 ? { ...hurdle, passed: true } : hurdle
            );
          });
        }
      }, 10);

      return () => clearInterval(interval);
    };

    moveHurdles();
  }, [gameOver, paused]); // Include paused in the dependency array

  const jump = () => {
    setDinosaurJumping(true);
    setTimeout(() => {
      setDinosaurJumping(false);
    }, 1000);
  };

  const resetGame = () => {
    setDinosaurJumping(false);
    setHurdles([]);
    setScore(0);
    setGameOver(false);
    setPaused(false); // Reset paused state
  };

  // Function to toggle the paused state
  const togglePause = () => {
    setPaused((prevState) => !prevState);
  };

  return (
    <>
      <h1 className='title'>Dinosour Game in <span>React</span></h1>
      <div className={`dinosaur-game-container ${gameOver ? 'crash' : ''}`}>

        <img
          src={dinosaurImage}
          alt="Dinosaur"
          className={`dinosaur ${dinosaurJumping ? 'jump' : ''}`}
        />
        {hurdles.map((hurdle, index) => (
          <img
            key={index}
            src={bushImage}
            alt="Bush"
            className="hurdle"
            style={{ left: `${hurdle.left}%` }}
          />
        ))}
        <hr className="ground" />
        {gameOver && <div className="game-over claculate">Game Over</div>}
        <div className="score">Score: {score}</div>
        <button className="reset-button" onClick={resetGame}>
          Restart
        </button>
        <button className="pause-button claculate" onClick={togglePause}>
          {paused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </>
  );
}

export default DinosaurGame;
