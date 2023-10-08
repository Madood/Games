import React, { useState } from 'react';
import './bmi.css';

function App() {
  // State variables for height, weight, and BMI
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState(null);

  // Function to calculate BMI
  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBMI(bmiValue);
    }
  };

  return (
    <div className="App">
      <h1 className='title'>BMI Calculator Game in <span>React</span></h1>
      <div className="input-container">
        <label htmlFor="height">Height (cm):</label>
        <input
          type="number"
          id="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="weight">Weight (kg):</label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <button onClick={calculateBMI} className='claculate'>Calculate BMI</button>
      {bmi && (
        <div className="result">
          <h2>Your BMI is: {bmi}</h2>
          <p>
            BMI Categories:
            <br />
            Underweight: Less than 18.5
            <br />
            Normal weight: 18.5 - 24.9
            <br />
            Overweight: 25 - 29.9
            <br />
            Obesity: 30 or greater
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
