import React from 'react';
import { Card, Space } from 'antd';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CardContainer = styled.div`
  display: grid;
  height: 8.5em;
  grid-template-columns: 15% 40% 45% ;
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
background-color: #5271FF; /* Example color */
padding: 10em;
transform: scale(1.5);
border: 1px solid blue;
`;

const CompletedSessions = ({ data }) => {
  const navigate = useNavigate();
  const handleSessionClick = async (itemObject) => {
    console.log(itemObject)
    navigate('/profile/sessionSummary', { state: { apiData: itemObject } })

  }

  const handleViewAll = async (e) => {
    e.preventDefault()
    navigate(`/profile/allsessions`, { state: { apiData: data }})
  }

  const timeToUsersBrowser = (isoString) => {
    const dateTimeInISO = new Date(isoString);
    const dateTimeInLocalTimezone = new Date(dateTimeInISO.getTime() + dateTimeInISO.getTimezoneOffset() * 60000);

    return dateTimeInLocalTimezone.toLocaleDateString()
  }
  return (
    <Space direction="vertical" size={16}>
      <Card title="Completed Sessions" extra={<a href="/profile/chat" style={{ color: '#5271FF' }}>New Session</a>} style={{ width: '50vw', height: 'fit-content' }}>
        {data ? null: "You have no completed sessions"}
        {data?.slice(0,3).map((item, index) => {
          const dataLength = data.length;
          let sessionNumber = dataLength - index;
          return (
            <CardContainer className='hover:text-custom-blue hover:bg-gray-50' key={index} onClick={() => handleSessionClick(item)}>
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
        })}
        <div style={{ color: '#5271FF', position: 'absolute', bottom: '.1em', right: '1.0em'}}>
          { data ? 
          <button onClick={(e) => handleViewAll(e)} style={{ fontSize: '0.9em' }}>View All <span style={{ fontWeight: "bold"}}>&gt;</span></button> :
          null
          }
        </div>
      </Card>
    </Space>
  )
};

export default CompletedSessions;
