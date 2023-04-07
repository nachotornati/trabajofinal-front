import LandingPage from "./components/LandingPage";
import Home from "./components/Screens/Home";
import Navigator from "./components/Navigator";
import PantallaEncuestas from "./components/Screens/PantallaEncuestas";
import Login from "./components/Screens/Login";
import NuevoComedor from "./components/NuevoComedor";
import Comedor from "./components/Screens/Comedor";
import Gestion from "./components/Screens/Gestion";
import EncuestaRealizada from "./components/Screens/EncuestaRealizada";
import EncuestasHistoricas from "./components/Screens/EncuestasHistoricas";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EditarEncuesta from "./components/Screens/EditarEncuesta";
import { useContext } from 'react';
import { AuthContext } from './components/Context/AuthContext';
import './App.css';

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? (children) : window.location.href = "/login"
  }

  return (
    <Router>
      <Routes>
        <Route exact path= '/' element={<><Login/></>}/>
        <Route exact path='/home' element={<><RequireAuth/><LandingPage /> <Home/></>}  />
        <Route exact path='/login' element={<><Login/>     </>}  />
        <Route exact path='/nuevo-comedor' element={<><Navigator/><NuevoComedor/></>}    />
        <Route exact path='/comedor/:id' element={<><Navigator/><Comedor/></>}    />
        <Route exact path='/admin' element={<><Navigator/><Gestion/></>}    />
        <Route exact path='/comedor/:id/encuestas' element={<><Navigator/><EncuestasHistoricas/></>} />
        <Route exact path='/comedor/:id/encuesta/:idEncuesta' element={<><Navigator/><EncuestaRealizada/></>} />
        <Route exact path='/comedor/:id/editar-encuesta/:idEncuesta' element={<><Navigator/><EditarEncuesta/></>} />
        <Route exact path='/comedor/:id/nueva-encuesta' element={<><Navigator/><PantallaEncuestas/></>} />
        
      </Routes>
    </Router>
  );
}

export default App;
