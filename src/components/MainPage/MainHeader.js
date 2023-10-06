import React from 'react';
import { NavLink } from 'react-router-dom';
import firebaseApp from '../../pages/firebase.js';
import { getAuth} from "firebase/auth";
import '../../styles/MainHeader.css';


const auth = getAuth(firebaseApp)

function MainHeader() {
  return (
    <nav className='Nav'>
      {/*      <SearchBar>
     <input type="text" placeholder="Search" />
     <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#969696",}} />
     </SearchBar>*/}

      <div className='NotificationAndLogout'>
        {/* <FontAwesomeIcon icon={faBell} style={{color: "#969696"}} /> */}
        <NavLink to="/">
          <button className='LogoutButton' onClick={() => auth.signOut()}>Logout</button>
        </NavLink>
      </div>
    </nav>
  );
}

export default MainHeader;
