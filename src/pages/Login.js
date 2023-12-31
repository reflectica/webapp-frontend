
import React, { useState } from 'react';
import firebaseApp from './firebase.js';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "./Auth.js";
import Logo from '../images/Logo Transparent.png'
import '../styles/Login.css';


export default function Login() {
    const [authState, setAuthState] = useState('not-checked');
    const [errorMessage, setErrorMessage] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error] = useState('')
    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();
    const db = getFirestore(firebaseApp);

    const handleSignIn = () => {
        signInWithRedirect(auth, provider);
    };
    const handleForgotPassword = (email) => {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Email sent.
                alert("Password reset email sent!");
            })
            .catch((error) => {
                // An error occurred.
                alert(error.message);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const uid = user.uid;
            const userRef = doc(db, 'users', uid);
            const subscriptionCollection = collection(doc(db, "users", user.uid), "subscriptions");

            const userDocSnap = await getDoc(userRef);
            if (!userDocSnap.exists()) {
                setErrorMessage('User does not exist.');
                throw new Error('User not registered in Firestore.');
            }

            const subscriptionSnap = await getDocs(subscriptionCollection);

            
            let status = '';
            subscriptionSnap.forEach(subscription => {
                console.log("subscription", subscription.data());
                status = subscription.data().status;
            });

            if (user.emailVerified /*&& status === 'active' */) {
                console.log('Logged in successfully');
                setAuthState('authenticated');
            } else if (user.emailVerified) {
                console.log("User subscription is not active. Redirecting to payment.");
                setAuthState('unpaid')
            } else {
                console.warn('Email not verified. Please verify your email before logging in.');
                setErrorMessage('Email not verified. Please verify your email before logging in.');
                setAuthState('email-not-verified');
            }

        } catch (error) {
            console.error('Error signing in:', error);

            if (error.code === 'auth/wrong-password') {
                setErrorMessage('Wrong password.');
            } else {
                setErrorMessage('User does not exist.');
            }
        }
    };





    const { currentUser } = useContext(AuthContext);

    if (currentUser && authState === 'authenticated') {
        console.log(currentUser);
        return <Navigate to="/profile" />;
    } else if (currentUser && authState === 'unpaid') {
        console.log("User subscription is not active. Redirecting to payment.");
        return <Navigate to="/profile" />;
    } else {
        // Navigate somewhere else, maybe a login or unauthorized page
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src={Logo} alt="Your Company" />

                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Welcome back!
                    </h2>
                </div>

                <div style={{ textAlign: "center", marginTop: "1em" }} className='leading-9 tracking-tight text-gray-900'>
                    <p>{error ? error : null}</p>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6" >
                        <div>

                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    style={{ paddingLeft: "0.5em" }}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" onClick={() => handleForgotPassword(email)} className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    style={{ paddingLeft: "0.5em" }}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className='ErrorMessage'>
                                {errorMessage}
                            </div>
                        </div>
                        <div>
                            <div className='LoginWrapper'>
                                <button
                                    type='submit'
                                    className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                                >
                                    Sign in
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className='ButtonWrapper'>
                        <button type="button"
                            class="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                            onClick={(event) => {
                                event.preventDefault();
                                handleSignIn();
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.6 10.2273C19.6 9.51819 19.5364 8.83637 19.4182 8.18182H10V12.05H15.3818C15.15 13.3 14.4455 14.3591 13.3864 15.0682V17.5773H16.6182C18.5091 15.8364 19.6 13.2727 19.6 10.2273Z" fill="#4285F4" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20C12.7 20 14.9636 19.1045 16.6182 17.5772L13.3864 15.0681C12.4909 15.6681 11.3455 16.0227 10 16.0227C7.39546 16.0227 5.19091 14.2636 4.40455 11.9H1.06364V14.4909C2.70909 17.7591 6.09091 20 10 20Z" fill="#34A853" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.40455 11.8999C4.20455 11.2999 4.09091 10.659 4.09091 9.99994C4.09091 9.34085 4.20455 8.69994 4.40455 8.09994V5.50903H1.06364C0.386364 6.85903 0 8.38631 0 9.99994C0 11.6136 0.386364 13.1409 1.06364 14.4909L4.40455 11.8999Z" fill="#FBBC05" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 3.97727C11.4682 3.97727 12.7864 4.48182 13.8227 5.47273L16.6909 2.60455C14.9591 0.990909 12.6955 0 10 0C6.09091 0 2.70909 2.24091 1.06364 5.50909L4.40455 8.1C5.19091 5.73636 7.39546 3.97727 10 3.97727Z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
