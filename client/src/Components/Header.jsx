import React from "react";
// import { Link } from "react-router-dom";
import { BubblyLink } from "react-bubbly-transitions";
import "../Styles/Bubbles.css";
const MyBubblyLink = ({ to = "", text = "", imageSrc = "" }) => (
  <BubblyLink to={to} colorStart="#175DDC" colorEnd="#2B2B2B" duration={1300}>
    {imageSrc && <img src={imageSrc} alt="Icon" id="logo" />}
    {text}
  </BubblyLink>
);
const Header = () => {
  return (
    <header id="main-header">
      <div
        className="animate-in"
        style={{ animationDelay: "500ms" }}
        id="header-container"
      >
        {/* Logo */}
        <span id="logo">
          {" "}
          <MyBubblyLink to="/" imageSrc="/Icons/lock3.png"></MyBubblyLink>
          <MyBubblyLink to="/" text="LockBox"></MyBubblyLink>
        </span>

        {/* Navigation */}
        <nav id="main-nav">
          <MyBubblyLink to="/password-generator" text="Password Generator" />
          <MyBubblyLink
            to="/password-strength-test"
            text=" Password Strength Test"
          />
          <MyBubblyLink to="/migrate" text="Migrate" />

          <MyBubblyLink to="/contact" text="Contact" />
        </nav>

        {/* Action Buttons */}
        <div id="action-buttons">
          <MyBubblyLink to="/login" text="Log In" />
          <MyBubblyLink to="/register" text="Register" />
        </div>
      </div>
    </header>
  );
};

export default Header;
