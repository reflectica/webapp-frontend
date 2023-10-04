import React from 'react';
import MainSideBar from "../components/MainPage/MainSideBar";
import MainHeader from "../components/MainPage/MainHeader";
import MainFooter from "../components/MainFooter.js"
import { useOutlet, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './layout.css'; // Import your CSS file with transition styles

export default function Layout() {
  const outlet = useOutlet();
  const location = useLocation();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f5e2' }}>
      <div style={{ flex: 1, display: 'flex', overflowY: 'auto' }}> 
        <div style={{ flexShrink: 0, width: '250px', minWidth: '200px', paddingRight: '1px' }}>
          <MainSideBar />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flexGrow: 0 }}>
            <MainHeader />
          </div>
          <div style={{ flex: 1, width: '100%', overflowY: 'auto' }}>
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                classNames="fade"
                timeout={300}
              >
                {outlet}
              </CSSTransition>
            </TransitionGroup>
          </div>
        </div>
      </div>
      <MainFooter /> {/* Place your footer here */}
    </div>
  );
}
