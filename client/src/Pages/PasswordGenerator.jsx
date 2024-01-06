import React, { useEffect, useState } from "react";
import "../Styles/password-generator.css";
import copyIcon from "../Assets/copy-icon.svg";
import { ToastContainer, toast } from "react-toastify";
import Header from "../Components/Header";
import zxcvbn from 'zxcvbn';

const lowercaseList = "abcdefghijklmnopqrstuvwxyz";
const uppercaseList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbersList = "0123456789";
const symbolsList = "!@#$%^&*()?";

function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [passwordLength, setPasswordLength] = useState(8);
  const [selectedChoices, setSelectedChoices] = useState([
    "lowercase",
    "uppercase",
    "numbers",
    "symbols",
  ]);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    timeToCrack: '',
  });

  useEffect(() => {
    generatePassword();
  }, [passwordLength]);

  const handleCheckbox = (type) => {
    let tempChoices = selectedChoices;
    if (tempChoices.includes(type)) {
      const index = tempChoices.indexOf(type);
      tempChoices.splice(index, 1);
    } else {
      tempChoices.push(type);
    }
    console.log(tempChoices);
    setSelectedChoices(tempChoices);
  };

  const generatePassword = () => {
    let characterList = "";

    if (lowerCase) {
      characterList += lowercaseList;
    }
    if (upperCase) {
      characterList += uppercaseList;
    }
    if (numbers) {
      characterList += numbersList;
    }
    if (symbols) {
      characterList += symbolsList;
    }

    let tempPassword = "";
    const characterListLength = characterList.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      tempPassword += characterList.charAt(characterIndex);
    }

    setPassword(tempPassword);
    const strength = zxcvbn(password);
    setPasswordStrength({
      score: strength.score,
      timeToCrack: strength.crack_times_display.offline_slow_hashing_1e4_per_second,
    });
  };

  const copyPassword = async () => {
    const copiedText = await navigator.clipboard.readText();
    if (password.length && copiedText !== password) {
      navigator.clipboard.writeText(password);
      toast.info("Password copied to clipboard", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
       
      });
    }
  };
useEffect(() => {
  generatePassword();
}, [lowerCase, upperCase, numbers, symbols, passwordLength]);

  return (
    <>
      <Header />
      
      <div className="container-custom">
      <div className="password-strength-container">
        <h2 className="title">Strong Password Generator</h2>
        <span className="password-score">Your password's score: {passwordStrength.score}</span>
        <span className="time-to-crack">Estimated time to crack: {passwordStrength.timeToCrack}</span>
 
      </div>
        <div className="password-wrapper">
          <div className="password-area">
            <div className="password">
              <input
                type="text"
                value={password}
                disabled
                placeholder="Click on the Generate Password"
              />
              <img
                src={copyIcon}
                alt="copyicon"
                className="copyIcon"
                onClick={copyPassword}
              />
            </div>
          </div>
        </div>
        <div className="setting">
          <h3>Customize your password</h3>
          <div className="customize">
            <div className="checkboxes">
              <div className="left">
                <div className="checkbox-field">
                  <input
                    
                    type="checkbox"
                    name="lower"
                    id="lower"
                    checked={lowerCase}
                    disabled={
                      selectedChoices.length === 1 &&
                      selectedChoices.includes("lowercase")
                    }
                    onChange={() => {
                      setLowerCase(!lowerCase);
                      handleCheckbox("lowercase");
                      generatePassword();
                    }}
                  />
                  <label htmlFor="lower">Include LowerCase(a-z)</label>
                </div>
                <div className="checkbox-field">
                  <input
                  
                    type="checkbox"
                    name="upper"
                    id="upper"
                    checked={upperCase}
                    disabled={
                      selectedChoices.length === 1 &&
                      selectedChoices.includes("uppercase")
                    }
                    onChange={() => {
                      setUpperCase(!upperCase);
                      handleCheckbox("uppercase");
                      generatePassword();
                    }}
                  />
                  <label htmlFor="upper">Include UpperCase(A-Z)</label>
                </div>
              </div>
              <div className="right">
                <div className="checkbox-field">
                  <input
                   
                    
                    type="checkbox"
                    name="numbers"
                    id="numbers"
                    checked={numbers}
                    disabled={
                      selectedChoices.length === 1 &&
                      selectedChoices.includes("numbers")
                    }
                    onChange={() => {
                      setNumbers(!numbers);
                      handleCheckbox("numbers");
                      generatePassword();
                    }}
                  />
                  <label htmlFor="numbers">Include Numbers(0-9)</label>
                </div>
                <div className="checkbox-field">
                  <input
                   
                    type="checkbox"
                    name="symbols"
                    id="symbols"
                    checked={symbols}
                    disabled={
                      selectedChoices.length === 1 &&
                      selectedChoices.includes("symbols")
                    }
                    onChange={() => {
                      setSymbols(!symbols);
                      handleCheckbox("symbols");
                      generatePassword();
                    }}
                  />
                  <label htmlFor="symbols">Include Symbols(&-#)</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="password-length">
          <h3>Password Length</h3>
          <div className="slider">
            <p className="rangeValue">{passwordLength}</p>
            <div className="range">
              <input
                type="range"
                min={8}
                max={40}
                defaultValue={passwordLength}
                onChange={(event) =>
                  setPasswordLength(event.currentTarget.value)
                }
              />
            </div>
          </div>
        </div>
        <div className="buttons">
          <button type="button" onClick={copyPassword}>
            Copy Password
          </button>
          <button type="button" onClick={generatePassword}>
            Generate Password
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default PasswordGenerator;
