import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import NewItem from "./NewItem";

function App() {
  // Implement your authentication logic here
  const isLoggedIn = true; // Replace this with your actual authentication logic

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
          <Route path='/addItem' element={isLoggedIn ? <NewItem /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

