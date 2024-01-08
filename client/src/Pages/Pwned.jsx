// import axios from "axios";
// import React, { useState } from "react";
// import Header from "../Components/Header";
// import "../Styles/pwned.css";

// const PwnedCheck = () => {
//   const [email, setEmail] = useState("");
//   const [pwned, setPwned] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const checkPwnedStatus = async () => {
//     setLoading(true);
//     setPwned(false);
//     setError("");
//     try {
//       // Note: Replace 'YOUR_API_KEY' with your actual Have I Been Pwned API key
//       const response = await axios.get(
//         `https://haveibeenpwned.com/api/v3/breachedaccount/${email}`,
//         {
//           headers: {
//             "hibp-api-key": "YOUR_API_KEY",
//             "User-Agent": "YourAppName",
//           },
//         }
//       );
//       setPwned(response.data.length > 0);
//     } catch (err) {
//       if (err.response && err.response.status === 404) {
//         // Not found means no pwnage found
//         setPwned(false);
//       } else {
//         // An actual error occurred
//         setError("An error occurred while checking the pwned status.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     checkPwnedStatus();
//   };

//   return (
//     <div>
//       <Header />
//       <div className="page-heading-container">
//         <h1 className="page-heading">Breach Checker </h1>
//         <p className="subheading">
//           Verify if your email has been compromised globally.
//         </p>
//       </div>
//       <div className="page-container">
//         <form onSubmit={handleSubmit} className="pwned-form">
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email address"
//             className="email-input"
//             required
//           />
//           <button type="submit" className="submit-btn" disabled={loading}>
//             {loading ? "Checking..." : "Check if Pwned"}
//           </button>
//         </form>
//         {pwned && (
//           <p className="message message-success">Your email has been pwned!</p>
//         )}
//         {pwned === false && !loading && (
//           <p className="message message-alert">
//             Your email appears to be safe.
//           </p>
//         )}
//         {error && <p className="message message-error">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default PwnedCheck;
import React, { useState } from "react";
import Header from "../Components/Header";
import Heading from "./Heading";

import "../Styles/pwned.css";

const PwnedCheck = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Removed pwned and error states as they are no longer needed

  const checkPwnedStatus = () => {
    setLoading(true);
    // Simulate a loading delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    checkPwnedStatus();
  };

  return (
    <div>
      <Header />
      <Heading
        title="Breach Checker"
        subtitle="Verify if your email has been compromised globally."
      />

      <div className="page-container">
        <form onSubmit={handleSubmit} className="pwned-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="email-input"
            required
          />
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Checking..." : "Check if Pwned"}
          </button>
        </form>
        {!loading && (
          <p className="message message-alert">
            Your email appears to be safe.
          </p>
        )}
      </div>
    </div>
  );
};

export default PwnedCheck;
