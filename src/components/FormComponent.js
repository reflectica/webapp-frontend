import React, { useState, useContext } from "react";
import { getAuth, deleteUser, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import { AuthContext } from '../pages/Auth';
import axios from "axios";
import '../styles/FormComponent.css';

export default function FormComponent({ id }) {
  const { currentUser } = useContext(AuthContext);

  const [ name, setName ] = useState('')
  const [passwordError, setPasswordError] = useState();
  const [ email, setEmail ] = useState('')
  const [ emailPlaceHolder, setEmailPlaceHolder ] = useState("Enter new email")
  const [ phoneNumberPlaceHolder, setPhoneNumberPlaceHolder ] = useState("Enter new phone number")
  const [ phoneNumber, setPhoneNumber ] = useState('')
    // Logic to handle different form types based on the provided ID

  if (id === 'profileForm') {

    const validateEmail = (email) => {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return regex.test(email);
    }

        const handleConfirm = async (field, value) => {
            if (field === "email" && !validateEmail(email)) {
              setEmailPlaceHolder("Please enter valid email")
              setEmail("")
              return
            }

            if(field === "phoneNumber" && value.length !== 10) {
              setPhoneNumberPlaceHolder("Please enter valid phone number")
              setPhoneNumber("")
              return
            }

            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/updateUserField`, {userId: currentUser?.uid, fieldName: field, value: value})
            .then(() => { 
              console.log("execution finished")
              switch (field) {
                case "email":
                  setEmail("")
                  setEmailPlaceHolder("Enter new email")
                  break
                case "phoneNumber":
                  setPhoneNumber("")
                  setPhoneNumberPlaceHolder("Enter new phone number")
                  break
                case "name":
                  setName("")
                  break
                default:
                  console.log("switch case")
              }
            })
            .catch((e) => console.log(e))


    };

        return (
            <form>
              <div className="form-group">
                <label className="labelStyle" htmlFor="displayName" >Change Display Name:</label>
                <div className="input-group">
                  <input className= "inputStyle" type="text" id="displayName" onChange={(e) => setName(e.target.value)} value={name} name="displayName" placeholder="Enter new display name" />
                  <button className="buttonStyle" type="button" onClick={() => handleConfirm('name', name)}>Confirm</button>
                </div>
              </div>
        
              <div className="form-group">
                <label htmlFor="email" className="labelStyle">Change Email:</label>
                <div className="input-group">
                  <input  className= "inputStyle" type="email" id="email" onChange={(e) => setEmail(e.target.value)}  value={email} name="email" placeholder={emailPlaceHolder} autoComplete="email" />
                  <button className="buttonStyle" type="button" onClick={() => handleConfirm('email', email)} >Confirm</button>
                </div>
              </div>
        
              <div className="form-group">
                <label className="labelStyle" htmlFor="phoneNumber" >Change Phone Number:</label>
                <div className="input-group">
                  <input className= "inputStyle" type="tel" id="phoneNumber" name="phoneNumber" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} placeholder={phoneNumberPlaceHolder}/>
                  <button className="buttonStyle" type="button" onClick={() => handleConfirm('phoneNumber', phoneNumber)} >Confirm</button>
                </div>
              </div>
            </form>
          );
    }

  if (id === 'passwordForm') {

    const handlePasswordChange = async () => {
      const auth = getAuth();
      const user = auth.currentUser;


      if (user) {
        const oldPassword = document.getElementById('old-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== confirmPassword) {
          document.getElementById('old-password').value = '';
          document.getElementById('new-password').value = '';
          document.getElementById('confirm-password').value = '';
          setPasswordError("New password and confirmed password do not match.");
          return;
        }
        if (newPassword === oldPassword) {
          document.getElementById('old-password').value = '';
          document.getElementById('new-password').value = '';
          document.getElementById('confirm-password').value = '';
          setPasswordError("New password and old password cannot match.");
          return;
        }

        const credential = EmailAuthProvider.credential(
          user.email,
          oldPassword
        );

        try {
          await reauthenticateWithCredential(user, credential);

          await updatePassword(user, newPassword);
          document.getElementById('old-password').value = '';
          document.getElementById('new-password').value = '';
          document.getElementById('confirm-password').value = '';
          console.log("Password updated successfully!");

        } catch (error) {
          document.getElementById('old-password').value = '';
          document.getElementById('new-password').value = '';
          document.getElementById('confirm-password').value = '';
         setPasswordError("Old password is not correct.")
          
        }
      }
    };


    return (
      <form>
        <div>
          {passwordError ? passwordError : null }
        </div>
        <div className="form-group">
          <label className="labelStyle" htmlFor="old-password" >Old Password:</label>
          <div className="input-group">
            <input className="inputStyle" type="text" id="old-password" name="oldPassword" placeholder="Enter old password" />

          </div>
        </div>

        <div className="form-group">
          <label className="labelStyle" htmlFor="new-password" >New password:</label>
          <div className="input-group">
            <input className="inputStyle" type="text" id="new-password" name="newPassword" placeholder="Enter new password" />

          </div>
        </div>

        <div className="form-group">
          <label className="labelStyle" htmlFor="confirm-password" >Confirm password:</label>
          <div className="input-group">
            <input className="inputStyle" type="password" id="confirm-password" name="confirmPassword" placeholder="Confirm password"  />
            <button className="buttonStyle" type="button" onClick={handlePasswordChange} >Confirm</button>
          </div>
        </div>
      </form>
    );
  }
  if (id === 'deleteForm') {

    const deleteUserData = async (userId) => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/deleteEverythingForUser`, {
          userId
        });

        if (response.status !== 200) {
          throw new Error('Failed to delete user data from the server.');
        }

        return response.data;
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    };

    const handleSubmit = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        try {

          await deleteUser(user);

          await deleteUserData(user.uid);


          console.log("User data and account deleted successfully");


        } catch (error) {
          console.error("Error during the deletion process:", error);
        }
      }
    };



    return (
      <button className="deleteButton" type="button" onClick={handleSubmit}>Delete Account</button>
    );
  }
  if (id === 'paymentForm') {

    const handleSubmit = () => {
      window.location.href = "https://billing.stripe.com/p/login/cN22aieAg2QJ21q3cc";
    };



    return (
      <button className="portalButton" type="button"  onClick={handleSubmit}>Customer Portal</button>
    );
  }
  return null;
}