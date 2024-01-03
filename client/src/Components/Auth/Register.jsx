import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
          // Redirect to login page if registration was successful
          if (res.status === 200) {
            navigate("/login");
          }
        })
        .catch((err) => {
          // Handle errors if the request failed to send
          if (err.response) {
            // The server responded with a status code outside the 2xx range
            // Display the error message from the server
            setErrorMessage(err.response.data.message);
          } else if (err.request) {
            // The request was made but no response was received
            setErrorMessage("No response from server. Please try again later.");
          } else {
            // Something happened in setting up the request that triggered an Error
            setErrorMessage("Error: " + err.message);
          }
          console.log(err.config);
        });
    }
  };
  
  useEffect(() => {
    axios.get("http://localhost:8080/register").then((response) => {
      console.log(response);
      if(response.data.loggedIn === true)
             navigate('/dashboard   ');
      
    
    });
  });
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
