import React from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Space } from 'antd';
import "../styles/AllSessions.css"

const AllSessions = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { apiData } = location.state || {};
    console.log(apiData)

    const handleSessionClick = async (itemObject) => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/getSessionTranscripts`, { userId: itemObject.uid, sessionId: itemObject.sessionId})
        .then((res) => { 
          itemObject['transcripts'] = res.data
          console.log(itemObject)
          navigate('/profile/sessionSummary', { state: { apiData: itemObject } })
        });
      }

    const timeToUsersBrowser = (isoString) => {
        const dateTimeInISO = new Date(isoString);
        const dateTimeInLocalTimezone = new Date(dateTimeInISO.getTime() + dateTimeInISO.getTimezoneOffset() * 60000);
    
        return dateTimeInLocalTimezone.toLocaleDateString()
      }
  return (
    <div style={{textAlign:"center", maxHeight: "90vh", overflow: "scroll"}}>
    <Space direction="vertical" size={16} style={{ overflow: "scroll" }} >
      <Card title="Completed Sessions" style={{ width: '80vw', textAlign:"left" }}>
        <div style={{ overflow: "scroll"}}>
            {Array.isArray(apiData) ? apiData?.map((item, index) => {
                const dataLength = apiData.length;
                let sessionNumber = dataLength - index;
                return (
                    <div className='CardContainer' key={index} onClick={() => handleSessionClick(item)}>
                    <div className='CheckBox' type="checkbox" id="myCheckbox" checked readOnly={true} />
                    <div className='SecondColumnContainer'>
                        <div className='IndexContainer'>
                        <p>Session #{sessionNumber}</p>
                        </div>
                        <div className='MessageContainer'>
                        <p>{item?.shortSummary}</p>
                        </div>
                    </div>
                    <div>
                        <p>{timeToUsersBrowser(item?.time)}</p>
                    </div>
                    </div>
                )
                }) : null }
            </div>
            </Card>
      </Space>  
      </div>  
  )
}

export default AllSessions