import React, { useState, useEffect } from "react";
import styled from "styled-components";

export const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set a timeout to make the footer visible after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    // Cleanup the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <Wrapper isVisible={isVisible}>
      <div className="copyright">Stakwork © Copyright 2024 </div>
      <div className="links">
        <a className="link" href="https://community.sphinx.chat/bounties" target="_blank" rel="noopener noreferrer">
          Bounties
        </a>
        <a className="link" href="https://x.com/stakwork" target="_blank" rel="noopener noreferrer">
          X
        </a>
        <a className="link" href="https://github.com/stakwork" target="_blank" rel="noopener noreferrer">
          Github
        </a>
        <a className="link" href="mailto:support@stakwork.com" target="_blank" rel="noopener noreferrer">
          Email
        </a>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  backdrop-filter: blur(34px);
  position: absolute;
  bottom: ${({ isVisible }) => (isVisible ? "36px" : "-100px")}; /* Start hidden below the viewport */
  left: 40px;
  right: 40px;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-family: Barlow;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)}; /* Fade effect */
  transition: bottom 0.5s ease, opacity 0.5s ease; /* Animate the position and opacity */

  .copyright {
    font-size: 16px;
  }

  .link {
    font-size: 16px;
    color: #fff;
    text-transform: uppercase;

    &:visited,
    &:active {
      color: #fff;
    }
  }

  .link + .link {
    margin-left: 20px;
  }

  @media (max-width: 768px) {
    justify-content: center;

    .copyright {
      display: none;
    }
  }
`;
