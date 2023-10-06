import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Button.css';

export default function LoginButton() {


  return (
    <Link to="/login">
      <div className='loginButton'>
        <button
          type="button"
        >
          Login
        </button>
      </div>
    </Link>
  );
}