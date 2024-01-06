import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import "../Styles/dashboard.css";

function Dashboard() {
  const [isEmailVerified, setIsEmailVerified] = useState(null);
  const [passwords, setPasswords] = useState([]); // State to hold passwords
  const [showAlert, setShowAlert] = useState(true);

  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    axios.get("http://localhost:8080/login").then((response) => {
      if (response.data.loggedIn === false) {
        navigate("/login");
      }
    });
  }, [navigate]);

  // Fetch email verification status
  useEffect(() => {
    axios.get("http://localhost:8080/dashboard").then((response) => {
      setIsEmailVerified(response.data.is_verified === 1);
    }).catch((error) => {
      console.error("Error retrieving email verification status:", error);
    });
  }, []);

  // Fetch passwords data
  useEffect(() => {
    axios.get("http://localhost:8080/getPasswords") // Update with the correct endpoint
      .then((response) => {
        setPasswords(response.data); // Set the passwords data to state
      })
      .catch((error) => {
        console.error("Error retrieving passwords data:", error);
      });
  }, []);

  // Function to hide the alert
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        {!isEmailVerified && showAlert && (
          <div className="email-verification-alert">
            <p>
              Your email address has not been verified. Please check your email to verify it.
            </p>
            <button onClick={handleCloseAlert} className="close-alert-btn">&times;</button>
          </div>
        )}
        
        {/* Table for passwords */}
        <table className="password-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>URL</th>
              <th>Username</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {passwords.map((password, index) => (
              <tr key={index}>
                <td>{password.name}</td>
                <td>{password.URL}</td>
                <td>{password.username}</td>
                <td>{password.password}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="password-actions">
          <Link className="btn btn-default bg-light border w-100 my-2" to="../addItem">
            Add Password
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
