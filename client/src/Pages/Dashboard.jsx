import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MyBubblyLink from "../Components/Effects/MyBubblyLink";
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
    axios
      .get("http://localhost:8080/dashboard")
      .then((response) => {
        setIsEmailVerified(response.data.is_verified === 1);
      })
      .catch((error) => {
        console.error("Error retrieving email verification status:", error);
      });
  }, []);

  // Fetch passwords data
  useEffect(() => {
    axios
      .get("http://localhost:8080/getPasswords") // Update with the correct endpoint
      .then((response) => {
        setPasswords(response.data); // Set the passwords data to state
      })
      .catch((error) => {
        console.error("Error retrieving passwords data:", error);
      });
  }, []);

  const handleDelete = (passwordId) => {
    axios
      .delete(`http://localhost:8080/deletePassword/${passwordId}`)
      .then(() => {
        // Remove the password from the state
        setPasswords(
          passwords.filter((password) => password.id !== passwordId)
        );
        toast.success("Password deleted successfully");
      })
      .catch((error) => {
        console.error("Failed to delete password:", error);
        toast.error("Error deleting password");
      });
  };
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
              Your email address has not been verified. Please check your email
              to verify it.
            </p>
            <button onClick={handleCloseAlert} className="close-alert-btn">
              &times;
            </button>
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
          <MyBubblyLink to="/addItem" text="Add a password" />

          {/* <button onClick={() => handleDelete()}>Delete</button> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
