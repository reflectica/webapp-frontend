import React from 'react'
import { useLocation } from 'react-router-dom';
import styled from "styled-components"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Space } from 'antd';
import "../styles/AllSessions.css"

const backendUrl = process.env.REACT_APP_BACKEND_URL

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 15% 40% 45% ;
  margin-bottom: 2em;
  padding: 1.875em 2.500em;
  align-items:center;
  text-align:center;
  background-color: #f5f5f5a8;
  border-radius: 4px;
  cursor: pointer;
  font-size:0.8em
`;

const MessageContainer = styled.div`
  background-color: #f5f5f5a8;
`;

const IndexContainer = styled.div`
  align-items:center;
  font-size: 1.2em;
  background-color: #f5f5f5a8;

`;
const SecondColumnContainer = styled.div`
  text-align: left;
`;

const CheckBox = styled.input`
background-color: lightblue; /* Example color */
padding: 4em;
transform: scale(1.5);
border: 1px solid blue;
`;

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
                    <CardContainer className='hover:text-indigo-600 hover:bg-gray-50' key={index} onClick={() => handleSessionClick(item)}>
                    <CheckBox type="checkbox" id="myCheckbox" checked readOnly={true} />
                    <SecondColumnContainer>
                        <IndexContainer>
                        <p>Session #{sessionNumber}</p>
                        </IndexContainer>
                        <MessageContainer>
                        <p>{item?.shortSummary}</p>
                        </MessageContainer>
                    </SecondColumnContainer>
                    <div>
                        <p>{timeToUsersBrowser(item?.time)}</p>
                    </div>
                    </CardContainer>
                )
                }) : null }
            </div>
            </Card>
      </Space>  
      </div>  
  )
}

export default AllSessions