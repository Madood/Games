// import React from 'react';
// import "./snake.css";

// function Snake() {
//   return (
//      <div className="container">
//       <h1 className="title">Snake Game in <span>-React</span></h1>
   
  
//       <div className="game-board">
//         <div className="box">

//         </div>
//       </div>
     
//     </div>
//   )
// }

// export default Snake;

import React, { useState, useEffect, useCallback } from 'react';
import './snake.css';

const SnakeGame = () => {
  // Constants for game dimensions and speed
  const gridSize = 20; // Size of each grid cell
  const initialSnake = [
    [5, 5], // Initial snake head position (x, y)
  ];

  // State variables
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(generateRandomFoodPosition());
  const [direction, setDirection] = useState('RIGHT');
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  // Function to generate a random position for food
  function generateRandomFoodPosition() {
    const maxX = gridSize - 1;
    const maxY = gridSize - 1;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    return [randomX, randomY];
  }

  // Function to check if the snake collides with itself or the game boundaries
  const checkCollision = useCallback(() => {
    const head = snake[0];
    if (
      head[0] < 0 ||
      head[0] >= gridSize ||
      head[1] < 0 ||
      head[1] >= gridSize
    ) {
      setIsGameOver(true); // Snake hit the boundary
      return true;
    }
    for (let i = 1; i < snake.length; i++) {
      if (snake[i][0] === head[0] && snake[i][1] === head[1]) {
        setIsGameOver(true); // Snake collided with itself
        return true;
      }
    }
    return false;
  }, [snake]);

  // Function to handle key presses and change direction
// Function to handle key presses and change direction
const handleKeyPress = (e) => {
  switch (e.key) {
    case 'ArrowUp':
       if (direction !== 'LEFT') {
        setDirection('LEFT');
      }
      break;
    case 'ArrowDown':
      if (direction !== 'RIGHT') {
        setDirection('RIGHT');
      }
      break;
    case 'ArrowLeft':
      if (direction !== 'UP') {
        setDirection('UP');
      }
      break;
    case 'ArrowRight':
      if (direction !== 'DOWN') {
        setDirection('DOWN');
      }
     
      break;
    default:
      break;
  }
};

  // Function to update the game state
  const updateGame = useCallback(() => {
    if (!isGameOver) {
      const newSnake = [...snake];
      const head = [...newSnake[0]];

      switch (direction) {
        case 'UP':
          head[1] -= 1;
          break;
        case 'DOWN':
          head[1] += 1;
          break;
        case 'LEFT':
          head[0] -= 1;
          break;
        case 'RIGHT':
          head[0] += 1;
          break;
        default:
          break;
      }

      newSnake.unshift(head);

      // Check if the snake eats the food
      if (head[0] === food[0] && head[1] === food[1]) {
        setScore(score + 1);
        setFood(generateRandomFoodPosition());
      } else {
        newSnake.pop(); // Remove the tail segment
      }

      setSnake(newSnake);
      checkCollision();
    }
  }, [direction, snake, food, score, isGameOver, checkCollision]);

  // Game loop
  useEffect(() => {
    const gameInterval = setInterval(updateGame, 150);
    return () => clearInterval(gameInterval);
  }, [updateGame]);

  // Handle key presses
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
    <div className="snake_container">
      <h1 className="title">Snake Game in - <span> React</span></h1>
      <div className="game-board">
        {Array.from({ length: gridSize }, (_, rowIndex) => (
          <div key={rowIndex} className="row">
            {Array.from({ length: gridSize }, (_, colIndex) => (
              <div
                key={colIndex}
                className={`box ${
                  snake.some(([x, y]) => x === colIndex && y === rowIndex)
                    ? 'snake'
                    : ''
                } ${
                  food[0] === colIndex && food[1] === rowIndex ? 'food' : ''
                }`}
              ></div>
            ))}
          </div>
        ))}
      </div>
      
    </div>
    <div className="score">Score: {score}</div>
      { isGameOver && <div className="game-over">Game Over</div> }
  </>
  );
};

export default SnakeGame;
