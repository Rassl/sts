import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import { RoundedHexagon } from "./Hexagon";
import { useRefsStore } from "../stores/useRefsStore";

export const Experience = () => {
  const orbitControlsRef = useRef();
  const { setOrbitControlsRef } = useRefsStore((s) => s);

  useEffect(() => {
    // Set the ref in the Zustand store
    setOrbitControlsRef(orbitControlsRef);
  }, [setOrbitControlsRef]);

  const lightRefTopLeft = useRef();
  const lightRefTopRight = useRef();
  const lightRefBottomLeft = useRef();
  const lightRefBottomRight = useRef();

  const config = useControls({
    spotLight: true,
    directionalLightTopLeft: true,
    directionalLightTopRight: true,
    directionalLightBottomLeft: true,
    directionalLightBottomRight: true,
  });

  if (config.directionalLightTopLeft && lightRefTopLeft.current) {
    lightRefTopLeft.current.lookAt(0, 0, 0); // Make the light point towards (0, 0, 0)
  }

  if (config.directionalLightTopLeft && lightRefTopRight.current) {
    lightRefTopRight.current.lookAt(0, 0, 0); // Make the light point towards (0, 0, 0)
  }

  if (config.directionalLightBottomLeft && lightRefBottomLeft.current) {
    lightRefBottomLeft.current.lookAt(0, 0, 0); // Make the light point towards (0, 0, 0)
  }

  if (config.directionalLightBottomRight && lightRefBottomRight.current) {
    lightRefBottomRight.current.lookAt(0, 0, 0); // Make the light point towards (0, 0, 0)
  }

  return (
    <>
      <color attach="background" args={["#16171D"]} />
      <ambientLight intensity={0.5} />
      {config.directionalLightTopLeft && (
        <directionalLight ref={lightRefTopLeft} color={"white"} intensity={5} position={[10, -10, 20]} />
      )}
      {config.directionalLightTopRight && (
        <directionalLight ref={lightRefTopRight} color={"white"} intensity={5} position={[-10, 10, 20]} />
      )}
      {config.directionalLightBottomLeft && (
        <directionalLight ref={lightRefBottomLeft} color={"white"} intensity={5} position={[-10, 10, 20]} />
      )}
      {config.directionalLightBottomRight && (
        <directionalLight ref={lightRefBottomRight} color={"white"} intensity={5} position={[-10, 10, 20]} />
      )}
      {config.spotLight && <spotLight position={[10, 5, 0]} angle={0.15} color={'lime'} penumbra={1} intensity={5} />}
      <pointLight intensity={10} color={'lime'} position={[0, 5, 0]} />
      <OrbitControls ref={orbitControlsRef} minDistance={10} maxDistance={150} rotateSpeed={0.05} />
      {/* <mesh>
        <boxGeometry />
        <meshStandardMaterial attachArray="material" color="#45C66E" />
      </mesh> */}
      {/* <RoundedHexagon /> */}
    </>
  );
};
