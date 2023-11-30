import React, {useState}from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from "../RegisterValidation";
import axios from 'axios';

function Register() {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
      });
      const navigate = useNavigate();
      const [errors, setErrors] = useState({});
    
      const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
      }
    
      const handleSubmit = (event) => {
        console.log("Form data:", values);
        event.preventDefault();
        setErrors(validation(values));
        const err = validation(values);
        setErrors(err);
      
        if (typeof err.username === "undefined" && typeof err.email === "undefined" && typeof err.password === "undefined") {
            console.log("utilizator trimis");
            axios.post('http://localhost:8080/register', values)
                .then(res => {
                    navigate('/');
                })
                .catch(err => console.log(err));
        }
        
        
      }
    return <div>
        <div ><h1>Registration:</h1>
            <form onSubmit={handleSubmit} action="">
            <div >
                <label htmlFor="name"><strong>Username</strong></label>
                <input onChange={handleInput} name="username" type="text" placeholder="Enter Username"/>
                {errors.username?<span className="text-danger">{errors.username}<br></br></span>:<span></span>}
            </div>                
            <div >
                <label htmlFor="email"><strong>Email</strong></label>
                <input onChange={handleInput} name="email" type="email" placeholder="Enter Email"/>
                {errors.email?<span className="text-danger">{errors.email}<br></br></span>:<span></span>}
            </div>
            <div >
                <label htmlFor="password"><strong>Password</strong></label>
                <input onChange={handleInput} name="password" type="password" placeholder="Enter Password"/>     
                {errors.password?<span style={{}}>{errors.password}<br></br></span>:<span></span>}           
            </div>
            <button><strong>Sign up</strong></button><br></br><br></br>
            <Link className="btn btn-default bg-light  border w-100" to="/">Login</Link>
            </form>
            </div>
    </div>

}
export default Register; 