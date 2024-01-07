import React from "react";
import Header from "../Components/Header";
import "../Styles/contact.css";

function Contact() {
  return (
    <div>
      <Header />
      <div className="contact-form-container">
        <h2>Contact Us</h2>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name" className="label-form">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="inputs"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="label-form">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="inputs"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="label-form">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              className="inputs"
              rows="5"
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
