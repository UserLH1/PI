import React from "react";
import { Link } from "react-router-dom";

function Register() {
    return <div>
        <div ><h1>Registration:</h1>
            <form action="">
            <div >
                <label htmlFor="name"><strong>Username</strong></label>
                <input type="text" placeholder="Enter Username"/>
            </div>                
            <div >
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="email" placeholder="Enter Email"/>
            </div>
            <div >
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" placeholder="Enter Password"/>                
            </div>
            <button><strong>Sign up</strong></button><br></br><br></br>
            <Link className="btn btn-default bg-light  border w-100" to="/">Login</Link>
            </form>
            </div>
    </div>

}
export default Register; 