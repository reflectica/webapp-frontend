import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import "../styles/SessionSummary.css";
import tooltipIcon from "../images/tooltipImage.png";
import Tooltip from '../components/Tooltip';

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


const SessionSummary = () => {
    const location = useLocation();
    const { apiData } = location.state || {};
    const bulletedLongSummary = apiData?.longSummary?.split(".")
    console.log(apiData)

    return (
        <>
            <div className='contentContainer'>
                <div className='goodJobTextContainer'>
                    <h2 className='goodJobText'>Good Job on Completing Your Session! 🎉</h2>
                </div>
                <div className='sessionInformationContainer'>
                    <div className='sessionScoreAndFeelingContainer'>
                        <div className='sessionFeelingScoreContainer'>
                            <div className='sessionFeelingTextContainer'>
                                <h4>Session Score</h4>
                            </div>
                            <div className='sessionFeelingScore'>
                                <p>{`${Math.floor(apiData?.moodPercentage ?? apiData?.mood)}/10`}</p>
                            </div>
                            <div>
                                <Tooltip children={<img style={{marginTop:"1em", marginLeft:"0.2em"}} src={tooltipIcon} alt="tooltip icon"/>} text="Score representing your mood"/>
                            </div>
                        </div>
                        <div className='sessionEmojiContainer'>
                            <div className='sessionEmojiText'>
                                <h4>Session Feeling</h4>
                            </div>
                            <div className='sessionEmoji'>
                                {emojiObject[apiData?.moodPercentage] ?? emojiObject[apiData?.mood]}
                            </div>
                            <div>
                                <Tooltip children={<img style={{marginTop:"1em", marginLeft:"0.2em"}} src={tooltipIcon} alt="tooltip icon"/>} text="Emoji representing your mood"/>
                            </div>
                        </div>
                    </div>
                    <div className='sessionTranscriptContainer'>
                        <div className='sessionTranscriptHeader'>
                            <h4>Session Transcript</h4>
                        </div>
                        <div className='transcriptContainer'>
                            {apiData?.chatlog?.map((item) => {
                                if(item.role === "user") {
                                    return (
                                        <div className='userTranscriptContainer'>
                                            <div className='userTextTranscript'>
                                                <p className='userText'>{item?.content}</p>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className='assistantTextTranscript'>
                                            {item?.content}
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                    <div className='sessionBulletPointsContainer'>
                        <div className='sessionBulletPointsHeader'>
                            <p>Session Summary</p>
                        </div>
                        <div className='sessionBulletPointsContent'>
                            {bulletedLongSummary?.map((item, index) => {
                                return (
                                    <p className="bulletPoints" key={index}>{item}</p>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <Link to="/profile">
                    <div className='buttonContainer'>
                        <button className='buttonText'>Go To Dashboard</button>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default SessionSummary