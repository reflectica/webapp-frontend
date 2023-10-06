import React from 'react';
import "../../styles/TotalSessions.css";
import Tooltip from '../Tooltip';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function TotalSessions({ number }) {

  const NumberTextSize = number ? 
  { fontSize: "2.25em" } :
  { fontSize: "1em"}

    return (
      <div className="totalSessionsCard">
        <div className='cardHeader'>
          <h2>Total Sessions</h2>
        </div>
        <div className='messageDiv'>
          <p className="numberText" style={NumberTextSize}>{number ? number : "No Completed Sessions"}</p>
        </div>
        <div style={{position:"relative", right:"37%", bottom:"15%", whiteSpace:"nowrap"}}>
        <Tooltip
            children={<FontAwesomeIcon icon={faCircleInfo} style={{color: "#b8b7b7",}} />} text="Total sessions this month"/>
        </div>
      </div>
    );
  }
  