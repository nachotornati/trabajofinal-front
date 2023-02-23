import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Navigator from "./components/Navigator";
import PantallaEncuestas from "./components/PantallaEncuestas";
import NuevoComedor from "./components/NuevoComedor";
import Comedor from "./components/Comedor";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<><LandingPage /> <Home/></>}  />
        <Route exact path='/nuevaEncuesta' element={<><Navigator/><PantallaEncuestas/></>}    />
        <Route exact path='/nuevoComedor' element={<><Navigator/><NuevoComedor/></>}    />
        <Route exact path='/comedor' element={<><Navigator/><Comedor/></>}    />
      </Routes>
    </Router>
  );
}

export default App;
