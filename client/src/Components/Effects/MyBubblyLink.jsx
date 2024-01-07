import React from "react";
import { BubblyLink } from "react-bubbly-transitions";

const MyBubblyLink = ({ to = "", text = "", imageSrc = "", onClick }) => (
  <BubblyLink
    to={to}
    colorStart="#175DDC"
    colorEnd="#2B2B2B"
    duration={1300}
    onClick={onClick}
  >
    {imageSrc && <img src={imageSrc} alt="Icon" id="logo" />}
    {text}
  </BubblyLink>
);
export default MyBubblyLink;
