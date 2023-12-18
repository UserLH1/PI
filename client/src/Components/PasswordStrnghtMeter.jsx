// import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import zxcvbn from "zxcvbn";
const PasswordStrnghtMeter = ({ password }) => {
  if (!password) {
    return null;
  }
  const testResult = zxcvbn(password);

  const num = (testResult.score * 100) / 4;
  console.log(testResult.score);
  const funcProgressColor = () => {
    switch (testResult.score) {
      case 0:
        return `#828282`;
      case 1:
        return `#EA1111`;
      case 2:
        return `#FFAD00`;
      case 3:
        return `9bc158`;
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
    </div>
  );
};

export default PasswordStrnghtMeter;
