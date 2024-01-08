import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Heading from "../../Pages/Heading";
import validation from "../../RegisterValidation";
import Header from "../Header";
import PasswordInput from "./Password/PasswordInput";
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
    console.log(event.target.name + " " + event.target.value);
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("s-a trimis" + values);
    const validationErrors = validation(values);
    setErrors(validationErrors);

    if (
      typeof validationErrors.username === "undefined" &&
      typeof validationErrors.email === "undefined" &&
      typeof validationErrors.password === "undefined"
    ) {
      axios
        .post("http://localhost:8080/register", values)
        .then((res) => {
          // Check if the registration was successful
          if (res.status === 200) {
            // Display the verification message
            setErrorMessage(
              "Please verify your email address for mail confirmation"
            );

            // Wait a few seconds, then navigate to the login page
            setTimeout(() => {
              navigate("/login");
            }, 5000); // 5000 milliseconds = 5 seconds
          }
        })
        .catch((err) => {
          // Handle errors
          if (err.response) {
            setErrorMessage(err.response.data.message);
          } else if (err.request) {
            setErrorMessage("No response from server. Please try again later.");
          } else {
            setErrorMessage("Error: " + err.message);
          }
          console.log(err.config);
        });
    }
  };
  useEffect(() => {
    axios.get("http://localhost:8080/register").then((response) => {
      console.log(response);
      if (response.data.loggedIn === true) navigate("/dashboard   ");
    });
  });
  return (
    <div>
      <div>
        <Header />
        <Heading title="Sign up" />
      </div>
      {errorMessage && (
        <div className="custom-alert">
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage("")}>Close</button>
        </div>
      )}
      <div className="App">
        <div className="addItem">
          <form onSubmit={handleSubmit} action="">
            <div>
              <label htmlFor="username">
                <strong>Username:</strong>
              </label>
              <input
                onChange={(e) => handleInput(e)}
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
              <PasswordInput
                name="password"
                handleInput={handleInput}
                password={values.password}
              />
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
