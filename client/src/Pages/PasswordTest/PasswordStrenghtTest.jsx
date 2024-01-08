import React, { useState } from "react";
import zxcvbn from "zxcvbn";
import Header from "../../Components/Header";
import "../../Styles/password-generator.css";
import PasswordFAQ from "./PasswordFAQ";

function PasswordStrengthTest() {
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    score: "N/A",
    feedback: "",
    warnings: "",
    timeToCrack: "N/A",
  });
  const handleChange = (event) => {
    const inputPassword = event.target.value;
    setPassword(inputPassword);
    const evaluation = zxcvbn(inputPassword);

    // Use the createPassLabel function to get the score label
    const scoreLabel = createPassLabel(evaluation.score);

    setPasswordStrength({
      score: scoreLabel, // Set the score label here
      feedback: evaluation.feedback.suggestions.join(" "),
      warnings: evaluation.feedback.warning,
      timeToCrack:
        evaluation.crack_times_display.offline_slow_hashing_1e4_per_second,
    });
  };

  // Define the createPassLabel function
  const createPassLabel = (score) => {
    switch (score) {
      case 0:
        return `Very weak`;
      case 1:
        return `Weak`;
      case 2:
        return `Medium`;
      case 3:
        return `Strong`;
      case 4:
        return `Very Strong`;
      default:
        return `N/A`; // Changed from 'none' to 'N/A' to match initial state
    }
  };

  return (
    <div>
      <Header />
      <div className="password-strength-test-container">
        <div className="page-heading-container">
          <h1 className="page-heading">Password Strength Test</h1>
          <p className="subheading">
            Think you have a strong password? Find out below.
          </p>
        </div>
        <input
          type="text"
          className="password-input"
          value={password}
          onChange={handleChange}
          placeholder="Type your password"
        />
        <div className="password-strength-info">
          <div className="stats">
            <strong>Your password strength:</strong> {passwordStrength.score}
          </div>
          <div className="stats">
            <strong>Time to crack:</strong> {passwordStrength.timeToCrack}
          </div>
          <div className="stats">
            <strong>Feedback:</strong> {passwordStrength.feedback}
          </div>
          {passwordStrength.warnings && (
            <div className="stats">
              <strong>Warnings:</strong> {passwordStrength.warnings}
            </div>
          )}
        </div>
      </div>
      <PasswordFAQ />
    </div>
  );
}

export default PasswordStrengthTest;
