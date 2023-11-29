import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
function App()
    {
    return (
        <div className="container">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />}></Route>
                    <Route path='/register' element={<Register />}></Route>
                </Routes>
            </BrowserRouter>

        </div>
    )}
export default App;