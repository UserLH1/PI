import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from "../LoginValidation";
import axios from "axios";


function Login() {
    const [values, setValues] = useState({
      email: '',
      password: ''
    });
  
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const handleInput = (event) => {
      setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Form data:", values);
      const err = validation(values);
        setErrors(err);
      if (typeof err.email === "undefined" && typeof err.password === "undefined") {
        console.log("utilizator trimis");
        axios.post('http://localhost:8080/login', values)
            .then(res => {
                console.log(res.data)
                if(res.data==="Succes")
                navigate('/dashboard');
                else{
                    alert("Wrong credentials")
                }
            })
            .catch(err => console.log(err));
    }

      setErrors(validation(values));
      
    }
  
  

    return <div>
        <div ><h1>Login:</h1>
        <form action="" onSubmit={handleSubmit}>
            <div >
                <label  htmlFor="email"><strong>Email</strong></label>
                <input name='email' onChange= {handleInput} type="email" placeholder="Enter Email"/>
            </div>
            {errors.email?<span className="text-danger">{errors.email}<br></br></span>:<span></span>}
            <div >
                <label htmlFor="password"><strong>Password</strong></label>
                <input name="password"  onChange={handleInput} type="password" placeholder="Enter Password"/>                
            </div>
            {errors.password?<span style={{}}>{errors.password}<br></br></span>:<span></span>}
                <button type="submit"><strong>Log in</strong></button><br></br><br></br>
                <Link className="btn btn-default bg-light  border w-100" to="/register">Sign Up</Link>
            {/* <button>Create Account</button> */}
            </form>
            </div>
    </div>

}
export default Login;