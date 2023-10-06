import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Button.css';
  

export default function SignupButton() {
  return (
    <Link to="/signup">
        <div className='signupButton'>
      <button
        type="button"
        className="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
      >
        Sign Up
      </button>
      </div>
    </Link>
  );
}