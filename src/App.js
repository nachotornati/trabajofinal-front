import LandingPage from "./components/Screens/LandingPage";
import Home from "./components/Screens/Home";
import Navigator from "./components/Helpers/Navigator";
import PantallaEncuestas from "./components/Screens/PantallaEncuestas";
import Login from "./components/Screens/Login";
import Comedor from "./components/Screens/Comedor";
import Gestion from "./components/Screens/Gestion";
import EncuestaRealizada from "./components/Screens/EncuestaRealizada";
import EncuestasHistoricas from "./components/Screens/EncuestasHistoricas";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EditarEncuesta from "./components/Screens/EditarEncuesta";
import { useContext } from 'react';
import { AuthContext } from './components/Context/AuthContext';
import { ComedorContext, ComedorContextProvider } from "./components/Context/ComedorContext";
import './App.css';

function App() {
  const { currentUser } = useContext(AuthContext);
  const { currentDinner } = useContext(ComedorContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? (children) : window.location.href = "/login"
  }

  return (
    <Router>
      <Routes>
        <Route exact path= '/' element={<><Login/></>}/>
        <Route exact path='/home' element={<><RequireAuth/> <ComedorContextProvider><LandingPage /> <Home/></ComedorContextProvider></>}  />
        <Route exact path='/login' element={<><Login/>     </>}  />
        <Route exact path='/comedor' element={<><RequireAuth/> <ComedorContextProvider><Navigator/></ComedorContextProvider><Comedor/></>}    />
        <Route exact path='/admin' element={<><RequireAuth/><Navigator/><Gestion/></>}    />
        <Route exact path='/comedor/encuestas' element={<><RequireAuth/><Navigator/><EncuestasHistoricas/></>} />
        <Route exact path='/comedor/encuesta/:idEncuesta' element={<><RequireAuth/><Navigator/><EncuestaRealizada/></>} />
        <Route exact path='/comedor/editar-encuesta/:idEncuesta' element={<><RequireAuth/><Navigator/><EditarEncuesta/></>} />
        <Route exact path='/comedor/nueva-encuesta/:idEncuesta' element={<><RequireAuth/><Navigator/><PantallaEncuestas/></>} />
      </Routes>
    </Router>
  );
}

export default App;
