import { useState } from "react";
import styled from "styled-components";

export const UserInfo = () => {
  const [isHovered, setIsHovered] = useState(false);
  let timeOutId = null;

  const handlePointerOver = () => {
    clearTimeout(timeOutId);
    setIsHovered(true);
  };

  const handlePointerOut = () => {
    timeOutId = setTimeout(() => {
      setIsHovered(false);
    }, 2000);
  };

  return (
    <User onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
      <img src="User.svg" alt="" />
      {isHovered && (
        <LinksWrapper>
          <a className="link" href="https://jobs.stakwork.com/admin" target="_blank">
            Customers
          </a>
          <a className="link" href="https://jobs.stakwork.com/workers" target="_blank">
            Workers
          </a>
        </LinksWrapper>
      )}
    </User>
  );
};

const User = styled.a`
  position: absolute;
  top: 36px;
  right: 40px;
  z-index: 1;
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  right: 0;
  font-family: Barlow;

  .link {
    font-size: 16px;
    color: #fff;
    text-decoration: none;

    &:visited,
    &:active {
      color: #fff;
    }
  }

  .link + .link {
    margin-top: 8px;
  }
`;
