
import React, { useState, useEffect, useRef } from 'react';
import firebaseApp from './firebase.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, createUserWithEmailAndPassword, sendEmailVerification  } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import styled from 'styled-components';
import { useContext } from "react";
import { Navigate } from "react-router";
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AuthContext } from "./Auth.js";
import Logo from '../images/Logo Transparent.png'

const ButtonWrapper = styled.div`

  button {
    margin-bottom: 1.2em;
  
    width: 390px;
    height: 40px;
    font-weight: 600;
    display: flex;
    align-items: center;
    padding: 20px 20px;
    transition: background-color 0.3s ease;
    background-color: #FFF;
    color: #3C4043;
    border-radius: 20px;
border: 1px solid #DADCE0;
background: #FFF;
font-size: 14px;
font-style: normal;
font-weight: 500;
letter-spacing: 0.25px;
    &:hover {
      background-color: rgb(219, 219, 219);
    }
    & > svg {
        margin-right: 80px; /* Adjust this value for the desired spacing */
      }
  }
`;

const LoginWrapper = styled.div`

  button {
    margin-bottom: 5px; 
    width: 390px;
    height: 40px;
    font-weight: 600;
    line-height: 0;
    padding: 20px 20px;
    transition: background-color 0.3s ease;
    background-color: #5271FF;
    color: white;
    border-radius: 20px;
border: 1px solid #DADCE0;

font-size: 15px;
font-style: normal;
font-weight: 500;
letter-spacing: 0.25px;
    &:hover {
      background-color: #9FADFC;
    }

  }
`;

const Image = styled.img`
  max-width: 200px;  // adjust as needed
  max-height: 200px;  // adjust as needed
  height: auto;
  width: auto;
`;


export default function Signup() {
    const [authState, setAuthState] = useState('not-checked');
    const [verificationMessage, setVerificationMessage] = useState();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const [termsCheckValue, setTermsCheckValue] = useState(false)
    const [dialogToggle, setDialogToggle] = useState(false);
    const [scroll, setScroll] = useState("paper")
    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();
    const db = getFirestore(firebaseApp);

    const descriptionElementRef = useRef(null);

    const handleSignIn = () => {
        signInWithRedirect(auth, provider);
    };

    useEffect(() => {
        if (dialogToggle) {
          const { current: descriptionElement } = descriptionElementRef;
          if (descriptionElement !== null) {
            descriptionElement.focus();
          }
        }
      }, [dialogToggle]);

    const handleRejectClose = () => {
        setDialogToggle(false)
    }

    const handleAcceptClose = () => {
        setTermsCheckValue(true);
        setDialogToggle(false)
    }

    const handleSignUp = async (e) => {
        console.log(email, password);
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            // Send email verification to the user
            await sendEmailVerification(user).then((res)=> {
                console.log(res)
            }) 

            
    
            // Storing user details in Firestore
            const userRef = doc(db, 'users', user.uid); 
            await setDoc(userRef, {
                email: user.email,
                uid: user.uid,
                displayName: name,
            });
    
            console.log('Signed up, email verification sent, and stored in Firestore successfully');
            setAuthState('verification-sent');
            setVerificationMessage('Check Email to verify account.')
            setError("")
            
        } catch (error) {
            setError("Error happened while signing up, Email might be already in use")
            setVerificationMessage("")
            setEmail("")
            setPassword("")
        }
    };
    
    useEffect(() => {
        getRedirectResult(auth)
            .then(async (result) => {
                if (result && result.user) {
                    const user = result.user;
                    const uid = user.uid;
                    const userRef = doc(db, 'users', uid);
                    const docSnap = await getDoc(userRef);

                    if (!docSnap.exists()) {
                        // If the user doesn't exist in Firestore, add them
                        await setDoc(userRef, {
                            email: user.email,
                            displayName: user.displayName
                        });
                        console.log("New user added to Firestore.");
                        setAuthState('authenticated');
                    } else {
                        setAuthState('authenticated');
                    }
                }
            })
            .catch((error) => {
                console.log(error.code, error.message);
                setAuthState('not-authenticated');
            });
    }, []);

    const { currentUser } = useContext(AuthContext);

    if (currentUser && authState === 'authenticated') {
        console.log(currentUser);
        return <Navigate to="/payment" />;
    }



    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image className="mx-auto h-10 w-auto" src={Logo} alt="Your Company" />

                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create an account!
                    </h2>
                </div>
                
                <div style={{textAlign:"center", marginTop:"1em"}} className='leading-9 tracking-tight text-gray-900'>
                    <p>{error ? error : null}</p>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSignUp} className="space-y-6">
                    <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Full name
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    id="name"
                                    name="name"
                                    type="name"
                                    required
                                    style={{ paddingLeft: "0.5em"}}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
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
                                    style={{ paddingLeft: "0.5em"}}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
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
                                    style={{ paddingLeft: "0.5em"}}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div style={{paddingTop: '1em'}}>
                            {verificationMessage}
                            </div>
                        </div>



                        <div>
                            <LoginWrapper>
                                <button
                                    type="submit"
                                    disabled= {termsCheckValue ? null : true }
                                    className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                                >
                                    Sign up
                                </button>
                            </LoginWrapper>
                        </div>
                    </form>

                    <ButtonWrapper>
                        <button type="button"
                            disabled= {termsCheckValue ? null : true }
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
                    </ButtonWrapper>

                    <div style={{display:'flex', whiteSpace:"nowrap"}}>
                        <Checkbox
                            checked={termsCheckValue}
                            onClick={() => setTermsCheckValue(!termsCheckValue)}
                            inputProps={{ 'aria-label': 'controlled' }}
                            />
                        <p style={{paddingTop:"0.5em"}}> I have read and accept all <span style={{textDecoration:"underline", color:"royalblue"}} onClick={() => setDialogToggle(true)}>Terms and Conditions</span></p>
                    </div>
                    <Dialog
                        open={dialogToggle}
                        scroll={scroll}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                    >
                        <DialogTitle id="scroll-dialog-title">Terms and Conditions</DialogTitle>
                        <DialogContent dividers={scroll === 'paper'}>
                        <DialogContentText
                            id="scroll-dialog-description"
                            ref={descriptionElementRef}
                            tabIndex={-1}
                        >
                            1. Use of Services

                            1.1. Eligibility
                            You must be at least 18 years old to use Reflectica's audio therapy Services. By accessing or using the Services, you affirm that you are of legal age.

                            1.2. AI Therapy
                            Reflectica's AI therapy sessions are designed for self-reflection purposes. They do not replace professional medical or psychological advice, diagnosis, or treatment. While the AI therapist can provide support, it should not be considered a substitute for real-world therapy when needed.

                            2. User Data and Privacy

                            2.1. Data Collection
                            To enhance and improve our AI therapist, Reflectica may collect and analyze data from your therapy sessions. This data is anonymized and used solely for development purposes, such as enhancing the AI therapist's capabilities to provide better support.

                            2.2. Confidentiality
                            Reflectica is committed to maintaining the confidentiality and privacy of your data. We will not share your personal information or the content of your therapy sessions with third parties unless required by law or explicitly permitted by you.

                            2.3. Security Measures
                            Reflectica is committed to safeguarding your data and maintaining the security of your personal information. We have implemented industry-standard security measures designed to protect your data against unauthorized access, disclosure, alteration, or destruction.

                            3. Informed Consent

                            3.1. Recording and Transcription
                            By using Reflectica's Services, you provide informed consent for the recording and transcription of your therapy sessions. The purpose of transcription is to allow users to access and review their conversations and keep track of their therapeutic journey. These records are securely stored to maintain your privacy and will be deleted if you close your Reflectica account.

                            4. User Responsibilities

                            4.1. Account Security
                            You are responsible for maintaining the confidentiality of your Reflectica account credentials and for all activities that occur under your account. Please ensure that you choose a strong and unique password and keep it confidential.

                            4.2. Reporting Concerns
                            If you suspect unauthorized use of your Reflectica account or any other security-related concerns, please notify us immediately through the provided contact channels.


                            5. Data Security

                            5.1. Security Measures
                            Reflectica employs industry-standard security measures to protect your data and maintain the security of our platform. However, it is essential to be cautious and not share sensitive or personal information during therapy sessions.

                            6. Termination

                            6.1. Termination or Suspension
                            Reflectica reserves the right to terminate or suspend your access to the Services at any time for any reason, including but not limited to a violation of these Terms & Conditions or if Reflectica believes that your use of the Services poses a risk to Reflectica or other users.

                            7. Payments and Subscriptions

                            7.1. Payment Processing
                            Payment for Reflectica's premium subscription services is processed through secure third-party payment processors. By subscribing to Reflectica's services, you agree to pay the fees associated with the selected subscription plan. Payments are non-refundable unless otherwise specified.

                            7.2. Subscription Plans
                            Reflectica offers different subscription plans, each with its own features and pricing. The details of each subscription plan, including pricing, are available on the Reflectica platform. Reflectica reserves the right to change the pricing or features of subscription plans with notice to users.

                            7.3. Billing and Auto-Renewal
                            Subscriptions are billed on a recurring basis, depending on the selected subscription plan. Subscriptions are set to auto-renew by default to ensure uninterrupted access to premium services. You may cancel the auto-renewal of your subscription at any time through your Reflectica account settings or by contacting Reflectica's support.

                            7.4. Refunds
                            Reflectica may, at its sole discretion, consider refund requests for subscription fees. Such requests will be reviewed on a case-by-case basis. Refund requests must be submitted within a reasonable time frame from the initial subscription purchase.

                            8. Cancellations

                            8.1. Subscription Cancellation
                            You may cancel your Reflectica premium subscription at any time. Upon cancellation, you will continue to have access to premium services until the end of the billing period, after which your account will revert to free services.

                            8.2. Account Termination
                            You may also choose to terminate your Reflectica account entirely. Upon account termination, your data and therapy session records will be securely deleted from the Reflectica platform.

                            9. Amendments

                            9.1. Updates to Terms & Conditions
                            Reflectica may update these Terms & Conditions as needed. Any changes will be posted on the Reflectica platform, and your continued use of the Services after such changes will indicate your acceptance of the revised Agreement.



                            10. Governing Law and Dispute Resolution

                            10.1. Governing Law
                            This Agreement is governed by and construed in accordance with the laws of the jurisdiction where Reflectica is registered.

                            10.2. Dispute Resolution
                            In the event of a dispute arising from or relating to these Terms & Conditions or your use of the Services, both parties agree to make a good-faith effort to resolve the dispute through negotiation and mutual agreement. If negotiation is unsuccessful, either party may pursue legal action in accordance with the laws of the jurisdiction specified in Section 10.1.

                            By using Reflectica's audio therapy Services, you acknowledge that you have read, understood, and agreed to be bound by these Terms & Conditions.

                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleRejectClose}>Close</Button>
                        <Button onClick={handleAcceptClose}>Accept</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </>
    )
}
