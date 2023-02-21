import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Navigator from "./components/Navigator";
import PantallaEncuestas from "./components/PantallaEncuestas";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<><LandingPage /> <Home/></>}  />
        <Route exact path='/nuevaEncuesta' element={<><Navigator/><PantallaEncuestas/></>}    />
      </Routes>
    </Router>
  );
}

export default App;
