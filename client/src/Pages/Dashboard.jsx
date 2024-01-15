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

  const handleDelete = (passwordId, passwordURL) => {
    // Cerere de confirmare
    const isConfirmed = window.confirm(`Are you sure you want to delete password for ${passwordURL}?`);
  
    if (isConfirmed) {
      // Procedează cu ștergerea dacă utilizatorul confirmă
      axios
        .delete(`http://localhost:8080/deletePassword/${passwordId}`)
        .then(() => {
          // Actualizează starea pentru a elimina parola din UI
          setPasswords(passwords.filter((password) => password.id !== passwordId));
          toast.success("Password deleted successfully");
        })
        .catch((error) => {
          console.error("Failed  to delete password:", error);
  toast.error("Error deleting password");
  });
  }
  };
  const handleEdit = (passwordId) => {
    // Logic for editing a password
    // This might involve setting a state with the passwordId
    // and opening an edit form/modal with the password data
    console.log("Edit password with ID:", passwordId);
    setFormData(passwordId);
    // Example: navigate(`/editPassword/${passwordId}`);
  };
  // Function to hide the alert
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleUpdate = async (id) => {
    try {
    const response = await axios.put(http://localhost:8080/updatePassword/${id}, formData);
    // Actualizează starea parolelor după succes
    setPasswords(passwords.map((item) => (item.id === id ? { ...response.data } : item)));
    toast.success("Password updated successfully");
    } catch (error) {
    console.error("Error updating password:", error);
    toast.error("Error updating password");
    }
    };
    
    // Formular de editare în JSX
    
    <form className="edit-form" onSubmit={() => handleUpdate(formData.id)}>
      {/* Adăugați aici restul câmpurilor de formular pentru editare */}
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      {/* Adăugați butonul de salvare sau actualizare */}
      <button type="submit">Update Password</button>
    </form>
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
            <th>Actions</th> {/* Added Actions column */}
          </tr>
        </thead>
        <tbody>
          {passwords.map((password) => (
            <tr key={password.id}>
              <td>{password.name}</td>
              <td>{password.URL}</td>
              <td>{password.username}</td>
              <td>{password.password}</td>
              <td>
                {/* Edit Button */}
                <button onClick={() => handleEdit(password.id)}>Edit</button>
                {/* Delete Button */}
                <button onClick={() => handleDelete(password.id, password.URL)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

        <div className="password-actions">
          <MyBubblyLink to="/addItem" text="Add a password" />

          
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
