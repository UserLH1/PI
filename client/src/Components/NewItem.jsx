import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../Pages/Heading";
import Header from "./Header";
// window.addEventListener("beforeunload", (event) => {
//   event.preventDefault();
//   event.returnValue = "";
// });

function NewItem() {
  const navigate = useNavigate();
  // const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    name: "",
    URL: "",
    username: "",
    password: "",
  });
  const handleInput = (event) => {
    //console.log(event.target.value)
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleSubmit = (event) => {
    console.log("Credentials:", values);
    event.preventDefault();
    // setErrors(validation(values));
    // const err = validation(values);
    // setErrors(err);

    // if (typeof err.password === "undefined") {
    //     console.log("utilizator trimis");
    axios
      .post("http://localhost:8080/addItem", values)
      .then((res) => {
        alert("Succes");
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
    //}
  };
  return (
    <div>
      <div>
        <Header />
        <Heading title="Add a password" />
      </div>
      <div className="App">
        <div className="addItem">
          <form onSubmit={handleSubmit} action="">
            <input
              name="name"
              onChange={handleInput}
              type="text"
              placeholder="website name"
            />
            <input
              name="URL"
              onChange={handleInput}
              type="text"
              placeholder="example.com"
            />
            <input
              name="username"
              onChange={handleInput}
              type="text"
              placeholder="username"
            />
            <input
              name="password"
              onChange={handleInput}
              type="password"
              placeholder="examplePass1234"
            />
            {/* {errors.password?<span className="error-message">{errors.password}<br></br></span>:<span></span>} */}
            <button>Add Password</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewItem;
