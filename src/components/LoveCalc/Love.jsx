// src/LoveCalculator.js
import React, { useState } from 'react';

function LoveCalculator() {
  const [boyName, setBoyName] = useState('');
  const [girlName, setGirlName] = useState('');
  const [loading, setLoading] = useState(false);
  const [lovePercentage, setLovePercentage] = useState(null);

  const calculateLove = () => {
    // Simulate loading for 3 seconds
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Generate a random love percentage between 0 and 100
      const randomPercentage = Math.floor(Math.random() * 61) + 41;
      setLovePercentage(randomPercentage);
    }, 3000);
  };

  return (
    <div className="love-calculator">
      <h2 className='title'>Love Calculator in -<span>React</span></h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Boy's Name"
          value={boyName}
          onChange={(e) => setBoyName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Girl's Name"
          value={girlName}
          onChange={(e) => setGirlName(e.target.value)}
        />
      </div>
      <button onClick={calculateLove} className='claculate'>Calculate Love</button>
      {loading && <p>Loading...</p>}
      {lovePercentage !== null && !loading && (
        <p>{boyName} and {girlName}'s Love is {lovePercentage}%</p>
      )}
    </div>
  );
}

export default LoveCalculator;
