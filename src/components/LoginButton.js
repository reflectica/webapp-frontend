import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function LoginButton() {
    const ButtonWrapper = styled.div`
  
    button {
      position: absolute;
      top: 23px;
      right: 126px;
      padding: 7px 18px;  // adjust as needed
      font-weight: 600;
      transition: background-color 0.3s ease;
      background-color: #F5F7FA;
      color: #5271FF;
    }
  `;
  
  return (
    <Link to="/login">
        <ButtonWrapper>
      <button
        type="button"
      >
        Login
      </button>
      </ButtonWrapper>
    </Link>
  );
}