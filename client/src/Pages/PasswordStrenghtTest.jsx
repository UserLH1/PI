import React, { useState } from 'react'
import Header from '../Components/Header'
import "../Styles/password-generator.css";
import zxcvbn from 'zxcvbn';

function PasswordStrengthTest() {
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({});

  const handleChange = (event) => {
    const inputPassword = event.target.value;
    setPassword(inputPassword);
    const evaluation = zxcvbn(inputPassword);
    console.log(evaluation);
    setPasswordStrength(evaluation);
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
          <span className="password-strength-score">Strength: {passwordStrength.feedback ? passwordStrength.feedback.suggestions[0] : ''}</span>
          <span className="password-strength-time">Time to crack: {passwordStrength.crack_times_display ? passwordStrength.crack_times_display.offline_slow_hashing_1e4_per_second : ''}</span>
        </div>
      </div>

  );
}

export default PasswordStrengthTest;