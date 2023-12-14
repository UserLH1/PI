import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from "./Login";
import NewItem from "./NewItem";
import Register from "./Register";

function App() {
  // Implement your authentication logic here
  const isLoggedIn = true; // Replace this with your actual authentication logic

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {/* <Route path='/dashboard' element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} /> */}
          <Route path='/addItem' element={isLoggedIn ? <NewItem /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

