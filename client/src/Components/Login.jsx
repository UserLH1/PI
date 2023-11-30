import React, { useState } from "react";
import { Link } from "react-router-dom";
import validation from "../LoginValidation";

function Login() {
    const [values, setValues] = useState({
      email: '',
      password: ''
    });
  
    const [errors, setErrors] = useState({});
  
    const handleInput = (event) => {
      setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Form data:", values);

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