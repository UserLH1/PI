import React from "react";
import "../../Styles/PromoCard.css";
function PromoCard(props) {
  return (
    <div className="card">
      <img src={props.image}></img>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
    </div>
  );
}

export default PromoCard;
