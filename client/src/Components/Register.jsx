import React, {useState}from "react";
import { Link } from "react-router-dom";
import validation from "../LoginValidation";
function Register() {
    const [values, setValues] = useState({
        username: '',
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