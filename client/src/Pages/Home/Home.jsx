import React from "react";
import Header from "../../Components/Header";
import promo from "../../promo";
import PromoCard from "../Home/PromoCard";
import HeroSection from "./HeroSection";

function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      {promo.map((promo) => (
        <PromoCard
          key={promo.key}
          title={promo.title}
          content={promo.content}
        />
      ))}
    </div>
  );
}

export default Home;
