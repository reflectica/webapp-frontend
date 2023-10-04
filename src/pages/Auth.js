
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import firebaseApp from "./firebase.js";
import CircularProgress from '@mui/material/CircularProgress';

export const AuthContext = React.createContext();



export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const auth = getAuth(firebaseApp)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
    });
  }, []);



  if(pending){
    return <div style={{position:"absolute", top:"50%", left:"50%"}}><CircularProgress style={{color:"royalblue"}} /></div>
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};