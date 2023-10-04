import React, { useState, useEffect, createContext } from 'react'
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, addDoc, doc, onSnapshot } from 'firebase/firestore';
import firebaseApp from './firebase.js';
import { loadStripe } from '@stripe/stripe-js';
import { AuthContext } from "./Auth.js";
import { useContext } from "react";
import PricingTable from '../components/PricingTable.js';


const Payment = () => {
    const [products, setProducts] = useState([])
    const [subscription, setSubscription] = useState(null);
    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;
    const db = getFirestore(firebaseApp);
    
    useEffect(() => {
        const w = query(collection(doc(db, "users", user.uid), "subscriptions"));
        getDocs(w).then((snapshot) => {
            snapshot.forEach( subscription => {
                setSubscription({
                  role: subscription.data().role,
                  current_period_start: subscription.data().current_period_start,
                  status: subscription.data().status,
                });
            });
          });
      }, []);
    useEffect(() => {
        const q = query(collection(db, 'products'), where('active', '==', true));
        getDocs(q).then((snapshot) => {
            const products = {}
            snapshot.forEach(async productDoc => {
                products[productDoc.id] = productDoc.data()
                const pricesRef = collection(productDoc.ref, 'prices')
                getDocs(pricesRef).then((priceSnapshot) => {
                    priceSnapshot.forEach((priceDoc) => {
                        products[productDoc.id].prices = {
                            priceId: priceDoc.id,
                            priceData: priceDoc.data()
                        }
                    })
                })
            })
            console.log(products)
            console.log(Object.entries(products))
            console.log(user)
            setProducts(products)
        });
    }, []);
    const checkOut = async (priceId) => {
        const docRef = await addDoc(collection(doc(db, 'users', user.uid), 'checkout_sessions'), {
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin
        })
        onSnapshot(docRef, async (snap) => {
            if (snap.exists()) {
                const data = snap.data();
                console.log('Snapshot data:', data);
                const { error, sessionId } = data;
                if (error) {
                    alert(`Error: ${error.message}`);
                }
                if (sessionId) {
                    const stripe = await loadStripe('pk_live_51NsEzHCh1Mt6BH7VeZzK2j81iEgFglXuJODYhImc2CR0r6iilFNH8kS1Ic4qaGmp0F16eYq0qedTtPHjA1CkGu0j00K9OGp47N');
                    stripe.redirectToCheckout({ sessionId });
                } else {
                    console.log("sessionId is undefined");
                }
            } else {
                console.log('Document does not exist');
            }
        });
    };

    return (
        <div>
            {Object.entries(products).map(([productId, productData]) => {
                return (
                    <div key={productId}>
                    <div>
                    {productData.name} - {productData.description}
                    </div>
                    <button onClick={() => checkOut(productData.prices.priceId)}> Subscribe
                    </button>
                    </div>
                )
            })}
            </div>
    )
}

export default Payment;