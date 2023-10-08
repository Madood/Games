import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import "./navigation.css";

function Navigation() {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const openNav = () => {
    setIsNavVisible(true);
  };

  const closeNav = () => {
    setIsNavVisible(false);
  };

  return (
    <section className="Navigation">
      <button className="nav-btn open-btn" onClick={openNav}>
      <MenuIcon />
      </button>
      <div className={`nav ${isNavVisible ? 'visible' : ''}`}>
        <button className="nav-btn close-btn" onClick={closeNav}>
          {<ClearIcon />}
        </button>
        <ul className="list">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tictac">Tic Tac Toe</Link></li>
          <li><Link to="/croco">Crocodile Game</Link></li>
          <li><Link to="/Sudoko">Sudoko</Link></li>
          <li><Link to="/LoveCalc">Love Calculator</Link></li>
          <li><Link to="/Snake">Snake</Link></li>
          <li><Link to="/Paper">Paper Rock Scissors</Link></li>
          <li><Link to="/Rolling">Rolling Dice</Link></li>
          <li><Link to="/BMI">BMI Calculator</Link></li>
        </ul>
      </div>
    </section>
  );
}

export default Navigation;
