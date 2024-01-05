import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation after logout
import { BubblyLink } from "react-bubbly-transitions";
import "../Styles/Bubbles.css";

const MyBubblyLink = ({ to = "", text = "", imageSrc = "", onClick }) => (
  <BubblyLink
    to={to}
    colorStart="#175DDC"
    colorEnd="#2B2B2B"
    duration={1300}
    onClick={onClick}
  >
    {imageSrc && <img src={imageSrc} alt="Icon" id="logo" />}
    {text}
  </BubblyLink>
);

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    axios.get("http://localhost:8080/login").then((response) => {
      if (response.data.loggedIn === true) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const handleLogout = () => {
    axios
      .post("http://localhost:8080/logout")
      .then(() => {
        setIsLoggedIn(false); // Update state to reflect logout
        navigate("/"); // Redirect to login page using navigate
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        // Optionally handle errors, such as displaying a message
      });
  };

  return (
    <header id="main-header">
      <div
        className="animate-in"
        style={{ animationDelay: "500ms" }}
        id="header-container"
      >
        {/* Logo */}
        <span id="logo">
          <MyBubblyLink to="/" imageSrc="/Icons/logo_fara_back.png" />
          <MyBubblyLink to="/" text="LockBox" />
        </span>

        {/* Navigation */}
        <nav id="main-nav">
          <MyBubblyLink to="/password-generator" text="Password Generator" />
          <MyBubblyLink
            to="/password-strength-test"
            text="Password Strength Test"
          />
          <MyBubblyLink to="/migrate" text="Migrate" />
          <MyBubblyLink to="/contact" text="Contact" />
        </nav>

        {/* Action Buttons */}
        <div id="action-buttons">
          {!isLoggedIn ? (
            <>
              <MyBubblyLink to="/login" text="Log In" />
              <MyBubblyLink to="/register" text="Register" />
            </>
          ) : (
            <div>
              <MyBubblyLink text="Dasboard" to="/dashboard" />
              <MyBubblyLink text="Logout" onClick={handleLogout} />
              <button onClick={handleLogout}>Logout</button>
            </div>
            // For a consistent look, you might want to wrap this button in a `MyBubblyLink` component or style it similarly
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
