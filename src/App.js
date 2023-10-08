import './App.css';
import Navigation from './components/Navigation/navigation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter as Router
import Tictac from "../src/components/tictac/tictac";
import Croco from '../src/components/croco/croco';
import Sudoko from '../src/components/sudoko/sudoko';
import Love from '../src/components/LoveCalc/Love';
import Snake from '../src/components/Snake/Snake';
import Paper from '../src/components/PaperRock/Paper';
import Rolling from '../src/components/Rolling/Rolling';
import BMI from '../src/components/BMI/Bmi';
import Footer from '../src/components/Footer/Footer';
import Home from '../src/components/Home/Home'

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        {/* <Home /> */}
        <Footer />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tictac" element={<Tictac />} />
        <Route path="/croco" element={<Croco />} />
        <Route path="/Sudoko" element={<Sudoko />} />
        <Route path="/LoveCalc" element={<Love />} />
        <Route path="/Snake" element={<Snake />} />
        <Route path="/Paper" element={<Paper />} />
        <Route path="/Rolling" element={<Rolling />} /> 
        <Route path="/BMI" element={<BMI />} /> 
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
