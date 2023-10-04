import React from 'react';
import styled from 'styled-components';
import "../../styles/TotalSessions.css";
import Tooltip from '../Tooltip';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Card = styled.div`
`;

const CardHeader = styled.div`
  display: flex;
  width: 8.4375em;
  height: 2.063875em;
  margin-top:1.6em;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
`;

const MessageDiv = styled.div`
  display: flex;
  width: 8.4375em;
  height: 5.592375em;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
`;

const HeaderText = styled.h2`
  color: #000;
    text-align: center;
    font-family: Mukta;
    font-size: 1.1743125em;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.028px;
    text-align: center;
`;

const Image = styled.img`
  max-width: 12vw;  // adjust as needed 
  height: auto;
  width: auto;
`;
const NumberText = styled.p`
`;

export default function TotalSessions({ number }) {

  const NumberTextSize = number ? 
  { fontSize: "2.25em" } :
  { fontSize: "1em"}

    return (
      <Card className="totalSessionsCard">
        <CardHeader className='cardHeader'>
          <h2>Total Sessions</h2>
        </CardHeader>
        <MessageDiv className='messageDiv'>
          <NumberText className="numberText" style={NumberTextSize}>{number ? number : "No Completed Sessions"}</NumberText>
        </MessageDiv>
        <div style={{position:"relative", right:"37%", bottom:"15%", whiteSpace:"nowrap"}}>
        <Tooltip
            children={<FontAwesomeIcon icon={faCircleInfo} style={{color: "#b8b7b7",}} />} text="Total sessions this month"/>
        </div>
      </Card>
    );
  }
  