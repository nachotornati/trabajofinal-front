import { createContext, useEffect, useReducer } from "react";
import ComedorReducer from "./ComedorReducer";


const INITIAL_STATE = {
    currentDinner: JSON.parse(localStorage.getItem("dinner")) || null,
  };
  
  export const ComedorContext = createContext(INITIAL_STATE);
  
  export const ComedorContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ComedorReducer, INITIAL_STATE);
  
    useEffect(() => {
      localStorage.setItem("dinner", JSON.stringify(state.currentDinner));
    }, [state.currentDinner]);
  
    return (
      <ComedorContext.Provider value={{ currentDinner: state.currentDinner, dispatch }}>
        {children}
      </ComedorContext.Provider>
    );
  };
  