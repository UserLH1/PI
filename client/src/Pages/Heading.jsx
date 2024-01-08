import React from "react";
import "../Styles/heading.css";
function PageHeading(props) {
  return (
    <div className="page-heading-container">
      <h1 className="page-heading">{props.title}</h1>
      <p className="subheading">{props.subtitle}</p>
    </div>
  );
}

export default PageHeading;
