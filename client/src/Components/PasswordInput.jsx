import React, { useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

const PasswordInput = ({ name, onChange }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="password-input-container">
        <label  htmlFor="password"><strong>Password</strong></label>
      <input
        type={visible ? 'text' : 'password'}
        name={name} 
        onChange={onChange} 
        placeholder="Enter password"
      />
      <span onClick={() => setVisible(!visible)} className="toggle-password-visibility">
        {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
      </span>
    </div>
  );
};

export default PasswordInput;
