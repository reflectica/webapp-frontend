import React from 'react';
import "../../styles/OverallMentalHealth.css"
import Tooltip from '../Tooltip';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function OverallHealth({ number, change }) {

  console.log(change)
  const style = change !== 0 && Math.floor(change) > 0
  ? <div style={{"display": 'flex'}}><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" style={{marginTop: "0.2em"}} viewBox="0 0 100 100">
  <polygon points="50,20 80,70 20,70" fill="green" />
</svg><span style={{color:"green"}}> {Math.floor(change)} </span> </div>
  : <div style={{display: "flex"}}><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" style={{marginTop: "0.2em"}} viewBox="0 0 100 100">
  <polygon points="50,80 80,30 20,30" fill="red" />
</svg><span style={{color: "red"}}> {Math.floor(change)}</span></div>;

  const NumberTextSize = number ? 
  { fontSize: "2.25em" } :
  { fontSize: "1em"}
    return (
      <div className='Health'>
        <div className='overallMentalHealthCardHeaderDiv'>
          <h2 className='HeaderText'>Overall Mental Health</h2>
          <p className='Difference' >{Math.floor(number) ? style : null} {Math.floor(number) === 0 ? <span>{`==`}</span> : null}</p>
        </div>
        <div className="overallHealthCardBody">
          <div className='overallHealthNumberHealth'>
            <p className='NumberText' style={NumberTextSize}>{number ? `${Math.floor(number)}/10`: "No Completed Sessions"}</p>
          </div>
        </div>
        <div style={{marginTop:"0.7em", marginLeft:"0.8em", whiteSpace:"nowrap"}}>
        <Tooltip
            children={<FontAwesomeIcon icon={faCircleInfo} style={{color: "#b8b7b7",}} />} text="Represents your overal mental health score and change over time"/>
        </div>
      </div>
    );
  }
  