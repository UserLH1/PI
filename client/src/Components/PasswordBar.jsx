import React, { useState } from "react";
import PasswordStrnghtMeter from "./PasswordStrnghtMeter";
function PasswordBar() {
  const [password, setPassword] = useState();

  return (
    <div className="container">
      <div className="col-md06 mx-auto text-right">
        <div className="form-group">
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control shadow-none "
            placeholder="Password"
          />
        </div>
      </div>
      <PasswordStrnghtMeter password={password} />
    </div>
  );
}

export default PasswordBar;
