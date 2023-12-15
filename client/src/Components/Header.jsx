import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header id="main-header">
      <div id="header-container">
        {/* Logo */}
        <a href="/">
          <img src="/Icons/lock3.png" alt="Logo" id="logo" href="google.com" />{" "}
        </a>
        {/* Navigation */}
        <nav id="main-nav">
          <Link to="/password-generator" id="nav-password-gen">
            Password Generator
          </Link>
          <Link to="/password-strength-test" id="nav-password-test">
            Password Strength Test
          </Link>
          <Link to="/migrate" id="nav-migrate">
            Migrate
          </Link>
          <Link to="/contact" id="nav-contact">
            Contact
          </Link>
        </nav>

        {/* Action Buttons */}
        <div id="action-buttons">
          <Link to="/login" id="login-btn">
            Log In
          </Link>
          <Link to="/register" id="register-btn">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
