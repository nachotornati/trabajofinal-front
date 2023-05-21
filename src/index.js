import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './components/Context/AuthContext';
import { ComedorContextProvider } from './components/Context/ComedorContext';


ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ComedorContextProvider>
        
      <App />
     
      </ComedorContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);