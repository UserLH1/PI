import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import "../Styles/dashboard.css";

function Dashboard() {
  const [isEmailVerified, setIsEmailVerified] = useState(null);
  const [showAlert, setShowAlert] = useState(true); // State to control the visibility of the alert

  const navigate = useNavigate(); // Use useNavigate for navigation
  useEffect(() => {
    axios.get("http://localhost:8080/login").then((response) => {
      if (response.data.loggedIn === false) {
                navigate("/login");
      }
    });
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/dashboard")
      .then((response) => {
        setIsEmailVerified(response.data.is_verified === 1);
      })
      .catch((error) => {
        console.error("Error retrieving email verification status:", error);
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
              <th>Website</th>
              <th>Username</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{/* Password data will be rendered here */}</tbody>
        </table>

        {/* Buttons for password actions */}
        <div className="password-actions">
          <Link
            className="btn btn-default bg-light border w-100 my-2"
            to="../addItem"
          >
            Add Password
          </Link>
          {/* Duplicate the above line for Edit and Delete buttons with appropriate classNames and paths */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
