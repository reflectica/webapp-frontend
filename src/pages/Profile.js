import React from "react";
import MainSideBar from "../components/MainPage/MainSideBar";
import MainHeader from "../components/MainPage/MainHeader";
import Dashboard from "./Dashboard";
import '../styles/Profile.css';

export default function Profile() {
  return (
    <div style={{ height: '100vh', display: 'flex', backgroundColor: '#f7f5f5' }}>
      <div style={{ flexShrink: 0, width: '250px', minWidth: '200px', paddingRight: '1px' }}>
        <MainSideBar />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flexGrow: 0 }}>
          <MainHeader />
        </div>
        <div style={{ flex: 1, width: '100%' }}>
          <Dashboard />
        </div>
      </div>
    </div>
  )
}
 