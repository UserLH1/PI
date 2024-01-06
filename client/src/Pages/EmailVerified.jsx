// EmailVerified.jsx
import React from 'react';
import '../Styles/email.css'
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
function EmailVerified() {

  // Handler for when the button is clicked
    return (
    <div className="email-verified-container">
      <div className="email-verified-content">
        <h1 className="email-verified-header">Email Verification Successful</h1>
        <p className="email-verified-text">
          Congratulations! Your email address has been successfully verified. 
          You now have full access to all of our features. We're excited to have you on board!
        </p>
        <div style={{display:'flex', justifyContent: 'center'}} id="action-buttons">
        {/* Button to go back to home */}
        <MyBubblyLink to="/" text="Back to home" />
        </div>
      </div>
    </div>
  );
}

export default EmailVerified;
