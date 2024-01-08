import React, { useState } from "react";
import zxcvbn from "zxcvbn";
import Header from "../../Components/Header";
import "../../Styles/password-generator.css";

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

    setPasswordStrength({
      score: evaluation.score,
      feedback: evaluation.feedback.suggestions.join(" "),
      warnings: evaluation.feedback.warning,
      timeToCrack:
        evaluation.crack_times_display.offline_slow_hashing_1e4_per_second,
    });
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
          <span className="password-strength-score">
            Your password strength: {passwordStrength.score}
          </span>
          <span className="password-strength-feedback">
            Feedback: {passwordStrength.feedback}
          </span>
          {passwordStrength.warnings && (
            <span className="password-strength-warnings">
              Warnings: {passwordStrength.warnings}
            </span>
          )}
          <span className="password-strength-time">
            Time to crack: {passwordStrength.timeToCrack}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PasswordStrengthTest;
