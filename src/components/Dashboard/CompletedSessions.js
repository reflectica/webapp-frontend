import React from 'react';
import { Card, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../../styles/CompletedSessions.css';


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
            <div className='hover:text-custom-blue hover:bg-gray-50' key={index} onClick={() => handleSessionClick(item)}>
              <input className='CheckBox' type="checkbox" id="myCheckbox" checked readOnly={true} />
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
