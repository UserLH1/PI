import React from "react";
import "../../Styles/Showcasing.css";

function Showcasing() {
  return (
    <div className="showcasing-section">
      {/* If you have an icon or image, include it here */}
      <div className="image-section">
        <img className="lock-icon" src="/Icons/logo_fara_back.png"></img>
      </div>
      <div className="text-content">
        <h2>Why use a password manager?</h2>
        <p>
          <b>🔒 Password Manager: Your Digital Safekeeper</b>
          <br></br> A password manager is a secure digital vault designed to
          store, generate, and manage your passwords. It acts as a central hub,
          safeguarding all your login credentials for various accounts, from
          social media to banking platforms.
        </p>
        <p>
          <b> 🛡️ Fortified Protection</b>
          <br></br>
          With robust encryption techniques, it shields your passwords from
          unauthorized access and cyber threats. It generates complex, unique
          passwords for each account, enhancing security and mitigating the
          risks associated with using the same password across multiple sites.
        </p>
        <p>
          <b>🚀 Effortless Accessibility and Convenience</b>
          <br />
          Accessing your passwords becomes seamless. Instead of memorizing or
          using insecure methods to store passwords, a password manager allows
          quick and secure access across devices. It simplifies the login
          process, streamlining your digital life.
        </p>
        <p>
          <b>💡 Why It Matters</b> <br></br>In an era of increasing cyber
          threats and data breaches, a password manager serves as your digital
          guardian, fortifying your online presence and offering peace of mind.
          It's an essential tool for maintaining a secure and organized digital
          lifestyle.
        </p>
      </div>
    </div>
  );
}

export default Showcasing;
