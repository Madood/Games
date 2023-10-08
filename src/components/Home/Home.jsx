import React from 'react';
import './Home.css';
import Dice from './dice.jpg';
import Dino from './dino.png';
import Love from './Love.jpeg';
import Paper from './Paper.jpg';
import Snake from './snake.jpg';
import Sudoko from './sudoko.jpg';
import Tictac from './tictac.avif';
import BMI from './BMI.webp';
import Profile from './Profile.jpg';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
        <div className="tictac_board">
      
        <div className="boxes"><Link to="/Rolling"> <img src={Dice} alt="dice" className="picture" /></Link></div>
        <div className="boxes"> <Link to="/croco"><img src={Dino} alt="dino" className="picture" /></Link></div>
        <div className="boxes">  <Link to="/LoveCalc"><img src={Love} alt="love" className="picture" /></Link> </div>
        <div className="boxes">  <Link to="/Paper"><img src={Paper} alt="paper" className="picture" /></Link> </div>
        <div className="boxes"> <Link to="/Snake"><img src={Snake} alt="snake" className="picture" /></Link> </div>
        <div className="boxes">  <Link to="/Sudoko"><img src={Sudoko} alt="sudoko" className="picture" /></Link></div>
        <div className="boxes"><Link to="/tictac"><img src={Tictac} alt="tictac" className="picture" /> </Link> </div>
        <div className="boxes">  <Link to="/BMI"><img src={BMI} alt="tictac" className="picture" /> </Link></div>
        <div className="boxes"><Link to="https://www.linkedin.com/in/madood-maharvi-a1a480173/"> <img src={Profile} alt="Profile" className="picture" /></Link></div>
      
      </div>
    </div>
  )
}

export default Home