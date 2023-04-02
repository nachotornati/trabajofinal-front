import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Navigator from "./components/Navigator";
import PantallaEncuestas from "./components/PantallaEncuestas";
import Login from "./components/Login";
import NuevoComedor from "./components/NuevoComedor";
import Comedor from "./components/Comedor";
import Gestion from "./components/Gestion";
import EncuestasHistoricas from "./components/EncuestasHistoricas";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path= '/' element={<><Login/></>}/>
        <Route exact path='/home' element={<><LandingPage /> <Home/></>}  />
        <Route exact path='/login' element={<><Login/>     </>}  />
        <Route exact path='/nueva-encuesta' element={<><Navigator/><PantallaEncuestas/></>}    />
        <Route exact path='/nuevo-comedor' element={<><Navigator/><NuevoComedor/></>}    />
        <Route exact path='/comedor/:id' element={<><Navigator/><Comedor/></>}    />
        <Route exact path='/admin' element={<><Navigator/><Gestion/></>}    />
        <Route exact path='/comedor/:id/encuestas' element={<><Navigator/><EncuestasHistoricas/></>} />
      </Routes>
    </Router>
  );
}

export default App;
