import React from "react";
import "../../Styles/PromoCard.css";

function PromoCard(props) {
  return (
    <div className="card">
      <div className="card-content">
        <img src={props.image} alt="Card" className="card-image" />
        <div className="card-text">
          <h1 className="card-title">{props.title}</h1>
          <p className="card-description">{props.content}</p>
        </div>
      </div>
    </div>
  );
}

export default PromoCard;
