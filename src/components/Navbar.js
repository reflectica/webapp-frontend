import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import Logo from "../images/Logo Transparent.png";
import '../styles/Navbar.css';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';

function Navbar() {
    const location = useLocation();
    const hideOnRoutes = ['/login', '/signup', '/profile', '/profile/chat', '/profile/dashboard', '/profile/sessionSummary', '/profile/support', '/profile/settings', '/profile/allsessions'];


    // Don't render the navbar if the current path is in the array
    if (hideOnRoutes.includes(location.pathname)) {
        return null;
    }
    return (
        <div className="navbar">
            <div className="leftSide">
                <img src={Logo} alt="logo" />
            </div>
            <div className="rightSide">
                <a href="#home">Home</a>
                <a href="#aboutUs">About Us</a>
                <a href="#product">Product</a>
                <a href="#pricing">Pricing</a>
                <a href="#testimonials">Testimonials</a>
                <Link to="/FAQ"> FAQ </Link>
                <LoginButton />
                <SignupButton />
            </div>
        </div>
    )
}

export default Navbar