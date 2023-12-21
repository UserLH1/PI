import React from "react";
import { BubblyContainer } from "react-bubbly-transitions";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import NewItem from "./Components/NewItem";
import Contact from "./Pages/Contact";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home/Home";
import Migrate from "./Pages/Migrate";
import PasswordGenerator from "./Pages/PasswordGenerator";

function App() {
  const isLoggedIn = true; // Replace this with your actual authentication logic

  return (
    <div className="container">
      <BrowserRouter>
        <BubblyContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/password-generator" element={<PasswordGenerator />} />
          <Route
            path="/password-strength-test"
            element={<PasswordGenerator />}
          />
          <Route path="/migrate" element={<Migrate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/addItem"
            element={isLoggedIn ? <NewItem /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;