import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header id="main-header">
      <div id="header-container">
        {/* Logo */}
        <img src="/Icons/DALL_E_2023-12-14_12.35.04_-_A_refined_yet_minimalist_logo_for_a_password_manager_app_called__LockBox_._The_design_incorporates_a_sleek_and_abstract_representation_of_a_lock__merg-removebg-preview.png" alt="Logo" id="logo" />
        {/* Navigation */}
        <nav id="main-nav">
          <Link to="/about" id="nav-about">About</Link>
          <Link to="/password-generator" id="nav-password-gen">Password Generator</Link>
          <Link to="/password-strength-test" id="nav-password-test">Password Strength Test</Link>
          <Link to="/migrate" id="nav-migrate">Migrate</Link>
          <Link to="/contact" id="nav-contact">Contact</Link>
        </nav>
      
      {/* Action Buttons */}
      <div id="action-buttons">
        <Link to="/login" id="login-btn">Log In</Link>
                  <Link to="/register" id="register-btn">Register</Link>
                  </div>
      </div>
    </header>
  );
};

export default Header;
