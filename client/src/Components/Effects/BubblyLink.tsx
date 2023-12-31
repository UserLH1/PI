import React, { FC, MouseEvent, ReactNode } from 'react';
import { createRoot } from "react-dom/client";
import { useNavigate } from "react-router-dom";
import { BubblyBubbles } from "./BubblyBubbles";

export type BubblyLinkProps = {
  to: string;
  children: ReactNode;
  imageSrc: string; 
  colorStart?: string;
  colorEnd?: string;
  duration?: number;
};

export const BubblyLink: FC<BubblyLinkProps> = ({
  to,
  children,
  imageSrc,
  colorStart="#175DDC",
  colorEnd="#2B2B2B",
  duration = 10000,
}) => {
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent<HTMLButtonElement> | undefined) => {
    e?.preventDefault();

    if (
      !document.getElementById("react-bubbly-transitions__bubbles") &&
      window.location.pathname !== to
    ) {
      // change the url in address bar
      window.history.pushState("", "", to);

      // get access to wave container
      const container = createRoot(
        document.getElementById("react-bubbly-transitions__container")!
      );

      // show the waves
      container.render(
        <BubblyBubbles
          colorStart={colorStart}
          colorEnd={colorEnd}
          duration={3000}
        />
      );

      // do the route change
      setTimeout(() => navigate(to), duration / 2); // half total animation

      // hide the waves
      setTimeout(() => container.unmount(), duration); // total animation
    }
  };

  return (
    <button
      type="button"
      className={`react-bubbly-transitions__bubbly-link ${
        window.location.pathname === to ? "active" : ""
      }`}
      onClick={handleClick}
    >
      <img src={imageSrc} alt="Logo" id="logo" /> {/* Image tag */}
      {children}
    </button>
  );
};
