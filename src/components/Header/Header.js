import React from "react";
import Logo from './../Logo/Logo';
import { Link } from "react-router-dom";
import Auth from "../Auth/Auth";
import Navigation from "../Navigation/Navigation";
import { useLocation } from "react-router-dom";

const Header = ({isColorBackGround, loggedIn}) => {
  const location = useLocation();


  return (
    <header className={`header ${isColorBackGround ? 'header_white' : ''}`}>
      <Logo />
      {loggedIn ?
        <Navigation />
        :
        <Auth />
      }
    </header>
  );
}

export default Header;