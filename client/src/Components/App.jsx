import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Contact from "./Contact";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Login from "./Login";
import Migrate from "./Migrate";
import NewItem from "./NewItem";
import PasswordGenerator from "./PasswordGenerator";
import Register from "./Register";
function App() {
  const isLoggedIn = true; // Replace this with your actual authentication logic

  return (
    <div className="container">
      <BrowserRouter>
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
