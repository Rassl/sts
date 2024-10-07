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

  const lightRefLeft = useRef();
  const lightRefRight = useRef();

  const config = useControls({
    spotLight: true,
    directionalLightLeft: true,
    directionalLightRight: true,
    autoRotate: false,
  });

  if (config.directionalLightLeft && lightRefLeft.current) {
    lightRefLeft.current.lookAt(0, 0, 0); // Make the light point towards (0, 0, 0)
  }

  if (config.directionalLightLeft && lightRefRight.current) {
    lightRefRight.current.lookAt(0, 0, 0); // Make the light point towards (0, 0, 0)
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      {config.directionalLightLeft && (
        <directionalLight ref={lightRefLeft} color={"white"} intensity={5} position={[10, -10, 20]} />
      )}
      {config.directionalLightRight && (
        <directionalLight ref={lightRefRight} color={"white"} intensity={5} position={[-10, 10, 20]} />
      )}
      {config.spotLight && <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.5} />}
      <pointLight position={[-10, -10, -10]} />
      <OrbitControls ref={orbitControlsRef} autoRotate={config.autoRotate} />
      {/* <mesh>
        <boxGeometry />
        <meshStandardMaterial attachArray="material" color="#45C66E" />
      </mesh> */}
      {/* <RoundedHexagon /> */}
    </>
  );
};
