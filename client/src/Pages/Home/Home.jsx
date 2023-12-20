import React from "react";
import Header from "../../Components/Header";
import promo from "../../promo";
import PromoCard from "../Home/PromoCard";
function Home() {
  return (
    <div>
      <Header />
      <h1>Your Key to Secure Online Access</h1>
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
