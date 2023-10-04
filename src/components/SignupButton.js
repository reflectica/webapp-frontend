import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  
button {
   position: absolute;
  top: 23px;
  right:40px;
  padding: 7px 16px;  // adjust as needed
  font-weight: 600;
  transition: background-color 0.3s ease;
  background-color: #5271FF;
  color: white;
  &:hover {
    background-color: #9FADFC;
  }
}
`;
export default function SignupButton() {
  return (
    <Link to="/signup">
        <ButtonWrapper>
      <button
        type="button"
        className="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
      >
        Sign Up
      </button>
      </ButtonWrapper>
    </Link>
  );
}