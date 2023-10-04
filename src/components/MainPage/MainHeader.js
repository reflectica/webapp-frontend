import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import firebaseApp from '../../pages/firebase.js';
import { getAuth} from "firebase/auth";

const Nav = styled.nav`
display: flex;
align-items: center; // This vertically centers items
justify-content: flex-end;
  position: sticky;
  top: 0;
  height: 67px;
  width: 100%;
  background-color: white;
  padding: 10px;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;



const NotificationAndLogout = styled.div`
display: flex;
align-items: center; // This vertically centers items
justify-content: flex-end; // This will align items to the end of the container
gap: 10px; // This adds space between items

  svg {
    padding-top: 1vh;
    padding-right: 1vh;
    height: 21px;
    width: 16x;
    margin-right: 10px;

  }
`;


const LogoutButton = styled.button`
margin-top: 1vh;
background: red;
color: white;
border: none;
width: 75px;
height: 30px;
font-size: 2vh;
border-radius: 5px;
cursor: pointer;


  &:hover {
    background: darkred;
  }

}
`;

const auth = getAuth(firebaseApp)

function MainHeader() {
  return (
    <Nav>
      {/*      <SearchBar>
     <input type="text" placeholder="Search" />
     <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#969696",}} />
     </SearchBar>*/}

      <NotificationAndLogout>
        {/* <FontAwesomeIcon icon={faBell} style={{color: "#969696"}} /> */}
        <NavLink to="/">
          <LogoutButton onClick={() => auth.signOut()}>Logout</LogoutButton>
        </NavLink>
      </NotificationAndLogout>
    </Nav>
  );
}

export default MainHeader;
