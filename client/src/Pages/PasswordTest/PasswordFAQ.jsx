import React, { useState } from "react";
import "../../Styles/password-generator.css";

function PasswordFAQ() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Password FAQ</h2>
      <div className="faq-columns">
        <div
          className={`faq-item ${openFAQ === 0 ? "open" : ""}`}
          onClick={() => toggleFAQ(0)}
        >
          <h3>Is it safe to type my real password here?</h3>
          <p>
            Yes. Your password is never transmitted to our servers and is
            processed locally in your device's web browser.
          </p>
        </div>
        <div
          className={`faq-item ${openFAQ === 1 ? "open" : ""}`}
          onClick={() => toggleFAQ(1)}
        >
          <h3>How do you calculate password strength?</h3>
          <p>
            We use a tool called zxcvbn.{" "}
            <a href="https://github.com/dropbox/zxcvbn">Learn more</a>.
          </p>
        </div>
        <div
          className={`faq-item ${openFAQ === 2 ? "open" : ""}`}
          onClick={() => toggleFAQ(2)}
        >
          <h3>How do I create a strong password?</h3>
          <p>Try the Lock Box Password Generator.</p>
        </div>
        <div
          className={`faq-item ${openFAQ === 3 ? "open" : ""}`}
          onClick={() => toggleFAQ(3)}
        >
          <h3>What's the best way to manage my passwords?</h3>
          <p>
            The safest way to manage your passwords is through a secure password
            manager, like LockBox.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PasswordFAQ;
