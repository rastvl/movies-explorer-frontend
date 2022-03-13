import React from "react";
import Logo from './../Logo/Logo';
import { Link } from "react-router-dom";
import Auth from "../Auth/Auth";
import Navigation from "../Navigation/Navigation";

const Header = ({isColorBackGround, loggedIn}) => {

  return (
    <div className={`header ${isColorBackGround ? 'header_white' : ''}`}>
      <Logo />
      {loggedIn ?
        <Navigation />
        :
        <Auth />
      }
    </div>
  );
}

export default Header;