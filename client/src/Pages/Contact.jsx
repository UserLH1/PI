import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Components/Header";
import "../Styles/contact.css";
import Heading from "./Heading";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/send-email",
        formData
      );
      console.log(response.data);
      toast.success("Thank you for your submission, we will contact you soon!");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("An error occurred while sending your message.");
    }
  };

  return (
    <div>
      <Header />
      <Heading
        title="Contact Us"
        subtitle="We're here to help and answer any question you might have."
      />
      <div className="contact-form-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="label-form">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="inputs"
              value={formData.name}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
      <ToastContainer position="bottom-right" autoClose={4000} />
    </div>
  );
}

export default Contact;
