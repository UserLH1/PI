import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "../Components/Header";
import "../Styles/dashboard.css";

function Dashboard() {
  const [isEmailVerified, setIsEmailVerified] = useState(null);
  const [passwords, setPasswords] = useState([]); // State to hold passwords
  const [showAlert, setShowAlert] = useState(true);
  const [editingPasswordId, setEditingPasswordId] = useState(null);
  const [fileName, setFileName] = useState("");

  const [formData, setFormData] = useState({
    // Structura inițială a datelor formularului, de ex.:
    name: "",
    URL: "",
    username: "",
    password: "",
    // ... alte câmpuri necesare
  });
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    axios.get("http://localhost:8080/login").then((response) => {
      if (response.data.loggedIn === false) {
        navigate("/login");
      }
    });
  }, [navigate]);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
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
    const isConfirmed = window.confirm(
      `Are you sure you want to delete password for ${passwordURL}?`
    );

    if (isConfirmed) {
      // Procedează cu ștergerea dacă utilizatorul confirmă
      axios
        .delete(`http://localhost:8080/deletePassword/${passwordId}`)
        .then(() => {
          // Actualizează starea pentru a elimina parola din UI
          setPasswords(
            passwords.filter((password) => password.id !== passwordId)
          );
          toast.success("Password deleted successfully");
        })
        .catch((error) => {
          console.error("Failed  to delete password:", error);
          toast.error("Error deleting password");
        });
    }
  };
  const renderEditForm = () => {
    if (editingPasswordId !== null) {
      return (
        <form
          className="edit-form"
          onSubmit={() => handleUpdate(editingPasswordId)}
        >
          {/* Input pentru Nume */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

          {/* Input pentru URL */}
          <input
            type="text"
            name="URL"
            placeholder="URL"
            value={formData.URL}
            onChange={handleChange}
          />

          {/* Input pentru Nume de Utilizator */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />

          {/* Input pentru Parolă */}
          <input
            type="password" // Folosește 'password' ca tip pentru securitate
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          {/* Butonul de Trimitere */}
          <button type="submit">Update Password</button>
        </form>
      );
    }
    return null;
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/updatePassword/${id}`,
        formData
      );

      setPasswords(
        passwords.map((item) => (item.id === id ? { ...response.data } : item))
      );
      toast.success("Password updated successfully");
      setEditingPasswordId(null); // Adaugă această linie
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Error updating password");
    }
  };

  const handleEdit = (passwordId) => {
    const passwordToEdit = passwords.find((p) => p.id === passwordId);
    if (passwordToEdit) {
      setFormData({
        ...passwordToEdit,
      });
      setEditingPasswordId(passwordId); // Adaugă această linie
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const exportToCSV = () => {
    // Crează un șir CSV
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Name,URL,Username,Password\r\n"; // Header-ul CSV

    // Adaugă fiecare parolă în CSV
    passwords.forEach((row) => {
      const rowContent = `${row.name},${row.URL},${row.username},${row.password}\r\n`;
      csvContent += rowContent;
    });

    // Crează un link pentru descărcare și declanșează-l
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "passwords.csv");
    document.body.appendChild(link); // Required for FF
    link.click(); // Simulează clic pentru descărcare
    document.body.removeChild(link); // Curăță DOM-ul după
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const importPasswords = () => {
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = async (event) => {
        const text = event.target.result;
        const rows = text.split("\n");

        let importCount = 0; // Numără câte înregistrări au fost importate cu succes

        for (let i = 1; i < rows.length; i++) {
          const cols = rows[i].split(",");
          if (cols.length === 4) {
            // Verifică dacă rândul are numărul corect de coloane
            const passwordData = {
              name: cols[0],
              URL: cols[1],
              username: cols[2],
              password: cols[3],
            };

            try {
              // Trimite datele la server
              const response = await axios.post(
                "http://localhost:8080/addItem",
                passwordData
              );
              console.log(response.data);
              importCount++;
            } catch (error) {
              console.error(
                "Eroare la trimiterea datelor către server:",
                error
              );
              toast.error(
                `Eroare la importarea rândului ${i}: ${error.message}`
              );
            }
          }
        }

        if (importCount > 0) {
          toast.success(
            `${importCount} passwords have been successfully imported`
          );
        }
      };

      reader.readAsText(selectedFile);
    } else {
      toast.error("No file was selected");
    }
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
                  <button
                    className="button edit-button"
                    onClick={() => handleEdit(password.id)}
                  >
                    Edit
                  </button>
                  {/* Delete Button */}

                  <button
                    className="button delete-button"
                    onClick={() => handleDelete(password.id, password.URL)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {renderEditForm()}{" "}
        {/* Afișează formularul de editare dacă este necesar */}
        <div className="password-actions">
          <button
            className="button import-export-buttons"
            onClick={() => navigate("/addItem")}
          >
            Add a password
          </button>

          <div className="file-upload-container">
            {fileName === "" ? (
              <label htmlFor="file-upload" className="file-input-label">
                Choose a file
              </label>
            ) : (
              <div className="file-upload-description">
                File selected: {fileName}
              </div>
            )}
            <input
              id="file-upload"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="file-input"
            />
          </div>

          <button
            onClick={exportToCSV}
            className="button import-export-buttons"
          >
            Export Passwords to CSV
          </button>
          <button
            onClick={importPasswords}
            className="button import-export-buttons"
          >
            Import Passwords
          </button>
        </div>
        <ToastContainer position="bottom-right" />
      </div>
    </div>
  );
}

export default Dashboard;
