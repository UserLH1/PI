import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from "../RegisterValidation";
import Header from "./Header";
import PasswordInput from "./PasswordInput";

function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
    const err = validation(values);
    setErrors(err);

    if (
      typeof err.username === "undefined" &&
      typeof err.email === "undefined" &&
      typeof err.password === "undefined"
    ) {
      axios
        .post("http://localhost:8080/register", values)
        .then((res) => {
          if (res.data === "Success") {
            navigate("/login");
          } else {
            setErrorMessage(`Email "${values.email}" is already taken`);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <div>
        <Header />
      </div>
      {errorMessage && (
        <div className="custom-alert">
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage("")}>Close</button>
        </div>
      )}
      <div className="App">
        <div className="addItem">
          <h1>Registration:</h1>
          <form onSubmit={handleSubmit} action="">
            <div>
              <label htmlFor="username">
                <strong>Username:</strong>
              </label>
              <input
                onChange={handleInput}
                name="username"
                type="text"
                placeholder="Enter Username"
              />
              {errors.username && (
                <span className="error-message">{errors.username}</span>
              )}
            </div>
            <div>
              <label htmlFor="email">
                <strong>Email:</strong>
              </label>
              <input
                onChange={handleInput}
                name="email"
                type="email"
                placeholder="Enter Email"
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>
            {/* <div>
                <label htmlFor="password"><strong>Password:</strong></label>
                <input onChange={handleInput} name="password" type="password" placeholder="Enter Password"/>     
                {errors.password && <span className="error-message">{errors.password}</span>}           
            </div> */}
            <div>
              <PasswordInput name="password" onChange={handleInput} />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>
            <button className="form-button">
              <strong>Sign up</strong>
            </button>
            <button className="form-button">
              <Link to="/">
                <strong>Login</strong>
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
