import React from 'react'
import styled from "styled-components"
import "../../styles/EmojiComponent.css"
import Tooltip from '../Tooltip'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const emojiObject = {
  1: "🤧",
  2: "😣",
  3: "🙁",
  4: "😕",
  5: "😐",
  6: "🙂",
  7: "😌",
  8: "😊",
  9: "😃",
  10: "😇",
}

const Card = styled.div`
    height: 10.4375em;
    width: 9.625em;
    border-radius: 15px;
    background: #FFF;  
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
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
  align-items:center;
  flex-shrink: 0;
`;

const HeaderText = styled.h2`
  
`;

const NumberText = styled.p`
  
  margin: 0;
  font-weight: bold;
  text-align: center
`;

const Image = styled.img`
  max-width: 200px;  // adjust as needed
  max-height: 200px;  // adjust as needed
  height: auto;
  width: auto;
`;

const EmojiComponent = ({ data }) => {
  const NumberTextSize = data ?
    { fontSize: "2.25em" } :
    { fontSize: "1em" }
  console.log()
  return (
    <>
      <Card className="emojiSessionDiv">
        <CardHeader className='cardHeader'>
          <HeaderText>Last Feeling...</HeaderText>
        </CardHeader>
        <MessageDiv className='messageDiv'>
          <NumberText style={NumberTextSize}>{data ? emojiObject[data[0].moodPercentage] : "No Completed Sessions"}</NumberText>
        </MessageDiv>
        <div style={{ position: "relative", right: "37%", bottom: "15%", whiteSpace: "nowrap" }}>
          <Tooltip
            children={<FontAwesomeIcon icon={faCircleInfo} style={{color: "#b8b7b7",}} />}
            text="Emoji representing your mood in last session"
          />
        </div>
      </Card>
    </>
  );
}

export default EmojiComponent