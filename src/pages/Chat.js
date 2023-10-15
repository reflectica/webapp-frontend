import React, { useState, useEffect } from "react";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import '../styles/Chat.css';
import '../styles/Mic.css';
import { useContext } from "react";
import { AuthContext } from "./Auth";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Tooltip from "../components/Tooltip";
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function Chat() {
  const { currentUser } = useContext(AuthContext);
  const [sessionId, setSessionId] = useState(uuidv4())
  const navigate = useNavigate();
  // const HTTP = process.env.BACKEND_URL;
  const {
    transcript,
    listening,
    resetTranscript,
  } = useSpeechRecognition();
  const [pulsating, setPulsating] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  console.log(backendUrl)

  const handleClick = () => {
    if (!pulsating) {
      SpeechRecognition.startListening({ continuous: true });
      setPulsating(true);
    } else {
      SpeechRecognition.stopListening();
      setPulsating(false);
    }
  };

  const handleEndSession = async (userId) => {
    console.log("button executed", userId)
    await axios.post(`${backendUrl}/endSession`, { userId: userId, sessionId: sessionId })
      .then((res) => {
        setSessionId(uuidv4())
        navigate('/profile/sessionSummary', { state: { apiData: res.data } });
      })
      .catch((error) => console.log(error))
  }
  const handleSubmit = (e) => {
    console.log(transcript)
    axios
      .post(`${backendUrl}/chat`, { prompt: transcript, userId: currentUser.uid, sessionId: sessionId }, { responseType: 'arraybuffer' })
      .then((res) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContext.decodeAudioData(res.data, (buffer) => {
          const source = audioContext.createBufferSource();
          source.buffer = buffer;
          source.connect(audioContext.destination);
          source.start(0);
        });
      })
      .catch((error) => {
        console.log(error);
      });

    resetTranscript();
  };
  useEffect(() => {
    if (!listening && transcript && !isSubmitted) {
      setIsSubmitted(true);
      handleSubmit();
      setPulsating(false);
      resetTranscript();
    }
    if (listening) {
      setIsSubmitted(false);
    }
  }, [listening, transcript]);


  return (
    <>
      <div className="container">
        <div className="mic-container">
          <button onClick={handleClick} className={`box ${pulsating ? 'pulsate' : ''}`}>
            <div className="object">
              <div className="outline"></div>
              <div className="outline" id={pulsating ? 'delayed' : ''}></div>
              <div className="button">
              </div>
              <div className="button" id="circlein">
                <svg className="mic-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" xmlSpace="preserve" style={{ fill: '#1E2D70' }}>
                  <g><path d="M500,683.8c84.6,0,153.1-68.6,153.1-153.1V163.1C653.1,78.6,584.6,10,500,10c-84.6,0-153.1,68.6-153.1,153.1v367.5C346.9,615.2,415.4,683.8,500,683.8z M714.4,438.8v91.9C714.4,649,618.4,745,500,745c-118.4,0-214.4-96-214.4-214.4v-91.9h-61.3v91.9c0,141.9,107.2,258.7,245,273.9v124.2H346.9V990h306.3v-61.3H530.6V804.5c137.8-15.2,245-132.1,245-273.9v-91.9H714.4z" /></g>
                </svg>
              </div>

            </div>


          </button>
        </div>
        <div className="textButtonContainer">
          <div>
            <div className="end-session-container">
              <button className="end-session-button" onClick={() => handleEndSession(currentUser?.uid)}>End Session</button>
            </div>
          </div>
          <div className={listening ? 'listening-relative-container' : 'relative-container'}>
            <Tooltip
              children={<FontAwesomeIcon icon={faCircleInfo} />}
              text="Press mic to begin speaking, then press once more to stop"
            />
            <p style={{ color: "white", display: "inline" }}> {listening ? "Recording" : null} </p>
          </div>
        </div>
      </div>

    </>
  );
}