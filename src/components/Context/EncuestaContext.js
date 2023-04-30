import { createContext, useEffect, useReducer } from "react";
import EncuestaReducer from "./EncuestaReducer";


const INITIAL_STATE = {
    currentEncuesta: JSON.parse(localStorage.getItem("encuesta")) || false,
  };
  
  export const EncuestaContext = createContext(INITIAL_STATE);
  
  export const EncuestaContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(EncuestaReducer, INITIAL_STATE);
  
    useEffect(() => {
      localStorage.setItem("user", state.currentEncuesta);
    }, [state.currentEncuesta]);
  
    return (
      <EncuestaContext.Provider value={{ currentEncuesta: state.currentEncuesta, dispatch }}>
        {children}
      </EncuestaContext.Provider>
    );
  };
  