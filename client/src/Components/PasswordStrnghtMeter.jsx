//import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import zxcvbn from "zxcvbn";
const PasswordStrnghtMeter = ({ password }) => {
  if (!password) {
    return null;
  }
  const testResult = zxcvbn(password);
  // console.log(testResult);
  // let sugestions = testResult.feedback.suggestions;
  // console.log(sugestions[0]);
  // for (let i = 0; i < sugestions.length; i++) {
  //   console.log(testResult.feedback.suggestions[i]);
  // }
  // console.log(sugestions);
  console.log(testResult.feedback.warning);
  const createPassLabel = () => {
    switch (testResult.score) {
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
  const num = (testResult.score * 100) / 4;
  //console.log(testResult.score);
  const funcProgressColor = () => {
    switch (testResult.score) {
      case 0:
        return `#828282`;
      case 1:
        return `#EA1111`;
      case 2:
        return `#FFAD00`;
      case 3:
        return `#9bc158`;
      case 4:
        return `#00b500`;
      default:
        return `none`;
    }
  };

  const changeColor = () => ({
    width: `${num}%`,
    background: funcProgressColor(),
    height: "7px",
  });

  return (
    <div>
      <div className="progress" style={{ height: "7px" }}>
        <div className="progress-bar" style={changeColor()}></div>
      </div>
      <p style={{ color: funcProgressColor() }}>{createPassLabel()}</p>
    </div>
  );
};

export default PasswordStrnghtMeter;
