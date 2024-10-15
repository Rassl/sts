import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Edges, QuadraticBezierLine, RoundedBox } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { Experience } from "./components/Experience";
import { Links } from "./components/Links";
import { RotatingCube } from "./components/RotatitgCube";
import { EffectComposer, Outline, Selection } from "@react-three/postprocessing";
import { Graph } from "./components/graph";
import styled from "styled-components";
import { Banners } from "./components/banners";
import { Footer } from "./components/footer";

export const App = () => {
  return (
    <Wrapper>
      <Logo>
        <img src="Logo.png" alt="" />
      </Logo>
      <Graph />
      <Banners />
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  position: relative;
`;

const Logo = styled.div`
  position: absolute;
  top: 36px;
  left: 40px;
  z-index: 1;
`;
