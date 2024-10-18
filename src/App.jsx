import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Edges, QuadraticBezierLine, RoundedBox } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { Experience } from "./components/Experience";
import { Links } from "./components/Links";
import { RotatingCube } from "./components/RotatitgCube";
import { EffectComposer, Outline, Selection } from "@react-three/postprocessing";
import styled from "styled-components";
import { Banners } from "./components/banners";
import { Footer } from "./components/footer";
import { UserInfo } from "./components/user-info";
import { useGraphStore } from "./stores/useGraphStore";
import { Graph } from './components/graph/index';

// Function to set the vh variable for CSS
function setVh() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

// Call the function on load to set the initial vh value
setVh();

// Add event listeners to update vh on resize and load
window.addEventListener("resize", setVh);
window.addEventListener("load", setVh);

export const App = () => {
  const { hoveredNodeId } = useGraphStore((s) => s);

  return (
    <Wrapper>
      <Logo>
        <img src="Logo.svg" alt="" />
      </Logo>
      <UserInfo />
      <Graph />
      {hoveredNodeId && <Banners />}
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  height: calc(var(--vh, 1vh) * 100); // Use dynamic vh value
  position: relative;
`;

const Logo = styled.div`
  position: absolute;
  top: 36px;
  left: 40px;
  z-index: 1;
`;

const User = styled.a`
  position: absolute;
  top: 36px;
  right: 40px;
  z-index: 1;
`;
