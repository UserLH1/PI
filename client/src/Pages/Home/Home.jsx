import React from "react";
import Header from "../../Components/Header";
import "../../Styles/PromoCard.css";
import promo from "../../promo";
import PromoCard from "../Home/PromoCard";
import HeroSection from "./HeroSection";
import Showcasing from "./Showcasing";

function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <header className="heading-section">
        <h1 className="hero-heading">With powerful features</h1>
      </header>
      <div className="card-container">
        {promo.map((promo) => (
          <PromoCard
            key={promo.key}
            title={promo.title}
            content={promo.content}
            image={promo.img}
          />
        ))}
      </div>
      <div className="showcasing">
        <Showcasing />
      </div>
    </div>
  );
}

export default Home;
