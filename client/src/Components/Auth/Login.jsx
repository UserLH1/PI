import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from "../../LoginValidation";
import Header from "../Header";
import PasswordInput from "./Password/PasswordInput";

axios.defaults.withCredentials = true;

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();
  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form data:", values);
    const err = validation(values);
    setErrors(err);
    if (
      typeof err.email === "undefined" &&
      typeof err.password === "undefined"
    ) {
      console.log("utilizator trimis");
      axios
        .post("http://localhost:8080/login", values)
        .then((res) => {  
          console.log(res.data);
          if (res.data === "Success") {
            navigate("/dashboard");
          } else {
            alert("Wrong credentials");
          }
        })
        .catch((err) => console.log(err));
    }

    setErrors(validation(values));
  };
  useEffect(() => {
    axios.get("http://localhost:8080/login").then((response) => {
      console.log(response);
      if(response.data.loggedIn == true)
      setLoginStatus(response.data.username[0].username);
    });
  }, []);
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="App">
        <div className="addItem">
          <h1>Login:</h1>
          <form action="" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                name="email"
                onChange={handleInput}
                type="email"
                placeholder="Enter Email"
              />
            </div>
            {errors.email ? (
              <span className="error-message">
                {errors.email}
                <br></br>
              </span>
            ) : (
              <span></span>
            )}
            {/* <div >
                <label htmlFor="password"><strong>Password</strong></label>
                <input name="password"  onChange={handleInput} type="password" placeholder="Enter Password"/>                
            </div> */}
            <div>
              <PasswordInput
                name="password"
                handleInput={handleInput}
                password={values.password}
              />
            </div>
            {errors.password ? (
              <span className="error-message">
                {errors.password}
                <br></br>
              </span>
            ) : (
              <span></span>
            )}
            <button className="form-button" type="submit">
              <strong>Log in</strong>
            </button>
            <br></br>
            <button className="form-button">
              <Link to="/register">Sign Up</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
