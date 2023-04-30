import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './components/Context/AuthContext';
import { ComedorContextProvider } from './components/Context/ComedorContext';
import { EncuestaContextProvider } from './components/Context/EncuestaContext';


ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ComedorContextProvider>
        <EncuestaContextProvider>
      <App />
      </EncuestaContextProvider>
      </ComedorContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);