import React from 'react'
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


const EmojiComponent = ({ data }) => {
  const NumberTextSize = data ?
    { fontSize: "2.25em" } :
    { fontSize: "1em" }
  console.log()
  return (
    <>
      <div className="Emoji">
        <div className='CardHeader'>
          <h2>Last Feeling...</h2>
        </div>
        <div className='MessageDiv'>
          <p className='NumberText' style={NumberTextSize}>{data ? emojiObject[data[0].moodPercentage] : "No Completed Sessions"}</p>
        </div>
        <div className='custom-div'>
          <Tooltip
            children={<FontAwesomeIcon icon={faCircleInfo} style={{color: "#b8b7b7",}} />}
            text="Emoji representing your mood in last session"
          />
        </div>
      </div>
    </>
  );
}

export default EmojiComponent