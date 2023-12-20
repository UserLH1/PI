import React from "react";
import { BubblyLink } from "react-bubbly-transitions";
import "../../Styles/Bubbles.css";
import "../../Styles/HeroSection.css";
const MyBubblyLink = ({ to = "", text = "", imageSrc = "" }) => (
  <BubblyLink to={to} colorStart="#175DDC" colorEnd="#2B2B2B" duration={1300}>
    {imageSrc && <img src={imageSrc} alt="Icon" id="logo" />}
    {text}
  </BubblyLink>
);

function HeroSection() {
  return (
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-heading">Simplify Your Password Management</h1>
        <p class="hero-subheading">
          Effortlessly secure your digital life with our intuitive password
          manager.
        </p>

        <a class="hero-button">
          <MyBubblyLink to="/register" text="Get Started"></MyBubblyLink>
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
