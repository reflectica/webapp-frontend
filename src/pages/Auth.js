
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import firebaseApp from "./firebase.js";
import CircularProgress from '@mui/material/CircularProgress';
import styled from "styled-components"
import Logo from '../images/Logo Transparent.png'
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';

export const AuthContext = React.createContext();

const Image = styled.img`
  max-width: 200px;  // adjust as needed
  max-height: 200px;  // adjust as needed
  height: auto;
  width: auto;
`;

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