import React, { useState, useContext } from "react";
import { getAuth, deleteUser, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import { AuthContext } from '../pages/Auth';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function FormComponent({ id }) {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
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

    const labelStyle = {
      fontSize: '12px',
      fontWeight: '600',
      marginRight: '8px'
    };

    const inputStyle = {
      fontSize: '12px',
      padding: '4px 8px',
      margin: '4px 0',
      width: '200px' // or any desired width
    };

    const buttonStyle = {
      marginLeft: '8px',
      padding: '4px 8px',
      fontSize: '12px',
      fontWeight: '600',
      transition: 'background-color 0.3s ease',
      backgroundColor: '#5271FF',
      color: 'white',
      borderRadius: '5px',

    };


        return (
            <form>
              <div className="form-group">
                <label htmlFor="displayName" style={labelStyle}>Change Display Name:</label>
                <div className="input-group">
                  <input type="text" id="displayName" onChange={(e) => setName(e.target.value)} value={name} name="displayName" placeholder="Enter new display name" style={inputStyle} />
                  <button type="button" onClick={() => handleConfirm('name', name)} style={buttonStyle}>Confirm</button>
                </div>
              </div>
        
              <div className="form-group">
                <label htmlFor="email" style={labelStyle}>Change Email:</label>
                <div className="input-group">
                  <input type="email" id="email" onChange={(e) => setEmail(e.target.value)}  value={email} name="email" placeholder={emailPlaceHolder} autoComplete="email" style={inputStyle} />
                  <button type="button" onClick={() => handleConfirm('email', email)} style={buttonStyle}>Confirm</button>
                </div>
              </div>
        
              <div className="form-group">
                <label htmlFor="phoneNumber" style={labelStyle}>Change Phone Number:</label>
                <div className="input-group">
                  <input type="tel" id="phoneNumber" name="phoneNumber" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} placeholder={phoneNumberPlaceHolder} style={inputStyle} />
                  <button type="button" onClick={() => handleConfirm('phoneNumber', phoneNumber)} style={buttonStyle}>Confirm</button>
                </div>
              </div>
            </form>
          );
    }

  if (id === 'passwordForm') {


    const labelStyle = {
      fontSize: '12px',
      fontWeight: '600',
      marginRight: '8px'
    };

    const inputStyle = {
      fontSize: '12px',
      padding: '4px 8px',
      margin: '4px 0',
      width: '200px'
    };

    const buttonStyle = {
      marginLeft: '8px',
      padding: '4px 8px',
      fontSize: '12px',
      fontWeight: '600',
      transition: 'background-color 0.3s ease',
      backgroundColor: '#5271FF',
      color: 'white',
      borderRadius: '5px',

    };
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
          <label htmlFor="old-password" style={labelStyle}>Old Password:</label>
          <div className="input-group">
            <input type="text" id="old-password" name="oldPassword" placeholder="Enter old password" style={inputStyle} />

          </div>
        </div>

        <div className="form-group">
          <label htmlFor="new-password" style={labelStyle}>New password:</label>
          <div className="input-group">
            <input type="text" id="new-password" name="newPassword" placeholder="Enter new password" style={inputStyle} />

          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password" style={labelStyle}>Confirm password:</label>
          <div className="input-group">
            <input type="password" id="confirm-password" name="confirmPassword" placeholder="Confirm password" style={inputStyle} />
            <button type="button" onClick={handlePasswordChange} style={buttonStyle}>Confirm</button>
          </div>
        </div>
      </form>
    );
  }
  if (id === 'deleteForm') {

    const buttonStyle = {
      padding: '4px 8px',
      fontSize: '12px',
      fontWeight: '600',
      transition: 'background-color 0.3s ease',
      backgroundColor: '#f71818',
      color: 'white',
      borderRadius: '5px',
    };

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
      <button type="button" style={buttonStyle} onClick={handleSubmit}>Delete Account</button>
    );
  }
  if (id === 'paymentForm') {

    const buttonStyle = {
      padding: '4px 8px',
      fontSize: '12px',
      fontWeight: '600',
      transition: 'background-color 0.3s ease',
      backgroundColor: '#5271FF',
      color: 'white',
      borderRadius: '5px',
    };


    const handleSubmit = () => {
      window.location.href = "https://billing.stripe.com/p/login/cN22aieAg2QJ21q3cc";
    };



    return (
      <button type="button" style={buttonStyle} onClick={handleSubmit}>Customer Portal</button>
    );
  }
  return null;
}