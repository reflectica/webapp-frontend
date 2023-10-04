import React, { useEffect, useState, useContext } from "react";
import CompletedSessions from "../components/Dashboard/CompletedSessions"
import TotalSessions from '../components/Dashboard/TotalSessions'
import OverallHealth from '../components/Dashboard/OverallHealth'
import StartSession from '../components/Dashboard/StartSession'
import { AuthContext } from "./Auth";
import axios from "axios"
import EmojiComponent from "../components/Dashboard/EmojiComponent";

const backendUrl = process.env.REACT_APP_BACKEND_URL
export default function Dashboard() {
  const [ data, setData ] = useState()
  const { currentUser } = useContext(AuthContext)
  console.log(currentUser)
  console.log(backendUrl)
  useEffect(() => {
    axios.post(`${backendUrl}/dashboardData`, { userId: currentUser.uid })
    .then(res => setData(res.data))
      console.log(data)
  },[])
  
    return (
      <div style={{ height: '35.375em;', display: 'flex', backgroundColor: '#f7f5f5' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginRight: '2vw' }}>
              <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '2vw', marginTop: '6vh', paddingBottom: '1vh' }}>
                <div style={{ flex: 1, borderRadius:"15px"}}> 
                  <TotalSessions number={data?.totalSessions}/>
                </div>
                <div style={{ flex: 1, borderRadius:"15px"}}> 
                  <EmojiComponent data={data?.summaryData}/>
                </div>
                <div style={{ flex: 1 }}> 
                  <OverallHealth number={data?.overallMentalHealth} change={data?.prevOverall}/>
                </div>
              </div>
              <div style={{ flex: 1, marginTop: '2vh', paddingLeft:'1.9vw' }}>
                <CompletedSessions  data={data?.summaryData}/>
              </div>
            </div>
            <div style={{ flex: 1, marginTop: '6vh'}}>
              <StartSession/>
            </div>
          </div>
        </div>
      </div>
    )
  }