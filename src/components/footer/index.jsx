import styled from "styled-components";

export const Footer = () => {
  return <Wrapper>Here is footer</Wrapper>;
};

const Wrapper = styled.div`
  backdrop-filter: blur(34px);
  position: absolute;
  display: none;
  bottom: 36px;
  left: 40px;
  right: 40px;
  z-index: 1;
  background: #eee;
  border-radius: 16px;
  height: 160px;
`;
