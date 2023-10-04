import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  display: flex; // New Line
  flex-direction: column; // New Line
  width: 25vw;
  height: 83vh;
  border-radius: 10px;
  background-color: #5271FF;
  padding: 20px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;



const MoreDetailsButton = styled.button`
  margin-top: 25em; 
  margin-left: 4em;
  font-weight: bold;
  border: none;
  background: white;
  color: #5271FF;
  padding: 10px 40px;
  border-radius: 15px;
  cursor: pointer;
  width: fit-content;
  align-self: center;

  @media (max-width: 600px) {
    margin-top: 25em;
    margin-left: 1%;
    padding: 10px 20px;  // Reduced padding for smaller screens
  }
`;


const Image = styled.img`
  max-width: 12vw;  // adjust as needed 
  height: auto;
  width: auto;
`;

const NumberText = styled.p`
  font-size: 36px;
  margin: 0;
  font-weight: bold;
`;


export default function StartSession({ number }) {
    return (
      <Card>
        <CardHeader>
          <NavLink to={"/profile/chat"}>
            <MoreDetailsButton>Start a Session</MoreDetailsButton>
          </NavLink>
        </CardHeader>
        <NumberText>{number}</NumberText>

      </Card>
    );
  }
  