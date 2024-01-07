import React, { useState } from "react";
import zxcvbn from "zxcvbn";
import Header from "../Components/Header";
import "../Styles/password-generator.css";

function PasswordStrengthTest() {
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    timeToCrack: "",
  });
  const handleChange = (event) => {
    const inputPassword = event.target.value;
    setPassword(inputPassword);
    const evaluation = zxcvbn(inputPassword);
    // console.log(evaluation);
    setPasswordStrength(evaluation);
    const createPassLabel = () => {
      switch (evaluation.score) {
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
          return `none`;
      }
    };
    setPasswordStrength({
      score: createPassLabel(),
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
      </div>
      <div className="password-strength-info">
        <span className="password-strength-time">
          Your password strength: : ?score{score}:
        </span>
        <span className="password-strength-score">
          Feedback:{" "}
          {passwordStrength.feedback
            ? passwordStrength.feedback.suggestions[0]
            : ""}
        </span>
        <span className="password-strength-time">
          Time to crack:{" "}
          {passwordStrength.crack_times_display
            ? passwordStrength.crack_times_display
                .offline_slow_hashing_1e4_per_second
            : ""}
        </span>
      </div>
    </div>
  );
}

export default PasswordStrengthTest;
