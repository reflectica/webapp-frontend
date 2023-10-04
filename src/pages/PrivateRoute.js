import React, { useContext, useState, useEffect } from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./Auth";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, addDoc, doc, onSnapshot } from 'firebase/firestore';
import firebaseApp from './firebase.js';

export function PrivateRoute({ children }) {
  const [subscription, setSubscription] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;
  const location = useLocation();
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    const w = query(collection(doc(db, "users", user.uid), "subscriptions"));

    getDocs(w).then((snapshot) => {
      let status = '';
      snapshot.forEach(subscription => {
        console.log("subscription", subscription.data());
        status = subscription.data().status;
      });
      setSubscription(status);
      console.log("status", status);
    });
  }, []);

  /* 
    if (currentUser && subscription) {
      if (subscription === "active") {
        return children;
      } else {
        return <Navigate to="/payment" state={{ from: location }} />;
      }
    } else if (!currentUser) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
    */
   
  if (currentUser) {
    return children;
  }
  else {
    return <Navigate to="/login" state={{ from: location }} />;
  }
}

