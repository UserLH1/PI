import React from "react";
import { Link } from "react-router-dom";

function Login() {
    return <div>
        <div ><h1>Login:</h1>
        <form action="">
            <div >
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="email" placeholder="Enter Email"/>
            </div>
            <div >
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" placeholder="Enter Password"/>                
            </div>
                <button><strong>Log in</strong></button><br></br><br></br>
                <Link className="btn btn-default bg-light  border w-100" to="/register">Sign Up</Link>
            {/* <button>Create Account</button> */}
            </form>
            </div>
    </div>

}
export default Login;