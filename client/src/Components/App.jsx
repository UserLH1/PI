import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import NewItem from "./NewItem";
function App()
    {
    return (
        <div className="container">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />}></Route>
                    <Route path='/register' element={<Register />}></Route>
                    <Route path='/dashboard' element={<Dashboard />}></Route>
                    <Route path='/addItem' element={<NewItem />}></Route>
                </Routes>
            </BrowserRouter>

        </div>
    )}
export default App;