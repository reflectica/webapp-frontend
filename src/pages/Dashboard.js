import React, { useEffect, useState, useContext } from "react";
import CompletedSessions from "../components/Dashboard/CompletedSessions"
import TotalSessions from '../components/Dashboard/TotalSessions'
import OverallHealth from '../components/Dashboard/OverallHealth'
import StartSession from '../components/Dashboard/StartSession'
import { AuthContext } from "./Auth";
import '../styles/Dashboard.css';
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
      <div className="outer-container">
        <div className="flex-container-1">
          <div className="flex-container-2">
            <div className="flex-container-3">
              <div className="flex-row">
                <div className="flex-item"> 
                  <TotalSessions number={data?.totalSessions}/>
                </div>
                <div className="flex-item"> 
                  <EmojiComponent data={data?.summaryData}/>
                </div>
                <div> 
                  <OverallHealth number={data?.overallMentalHealth} change={data?.prevOverall}/>
                </div>
              </div>
              <div className="second-row">
                <CompletedSessions  data={data?.summaryData}/>
              </div>
            </div>
            <div className="start-session">
              <StartSession/>
            </div>
          </div>
        </div>
      </div>
    )
  }