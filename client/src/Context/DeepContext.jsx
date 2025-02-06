import React, { createContext, useContext } from 'react'
import axios from 'axios'

const DeepContext = createContext();

const DeepContextProvider = ({children}) => {
  axios.defaults.withCredentials = true;
  return (
    <DeepContext.Provider value={{}}>
      {children}
    </DeepContext.Provider>
  )
}

const useAuth = () => useContext(DeepContext);
export { useAuth, DeepContextProvider  };