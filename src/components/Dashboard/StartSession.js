import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/StartSession.css';

export default function StartSession({ number }) {
    return (
      <div className='StartSession'>
          <NavLink to={"/profile/chat"}>
            <button className='MoreDetailsButton'>Start a Session</button>
          </NavLink>
      </div>
    );
  }
  