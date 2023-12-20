import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import PasswordStrnghtMeter from "./PasswordStrnghtMeter";
const PasswordInput = ({ name, handleInput, password     }) => {
  
  const [visible, setVisible] = useState(false);
  //const [password, setPassword] = useState();

  return (
    <div className="password-input-container">
      <label htmlFor="password">
        <strong>Password</strong>
      </label>
      <input
        type={visible ? "text" : "password"}
        name={name}
        onChange={(e) => handleInput(e)}
        placeholder="Enter password"
      />
      <span
        onClick={() => setVisible(!visible)}
        className="toggle-password-visibility"
      >
        {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
      </span>
      <PasswordStrnghtMeter password={password} />
    </div>
  );
};

export default PasswordInput;
