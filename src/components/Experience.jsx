import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import { RoundedHexagon } from "./Hexagon";
const autoRotate = false;

export const Experience = () => {

   const lightRef = useRef();

   const config = useControls({
     spotLight: true,
     directionalLight: true,
   });

    if (config.directionalLight && lightRef.current) {
      lightRef.current.lookAt(0, 0, 0); // Make the light point towards (0, 0, 0)
    }

  return (
    <>
      <ambientLight intensity={0.5} />
      {config.directionalLight && (
        <directionalLight ref={lightRef} color={"white"} intensity={5} position={[10, 0, 20]} />
      )}
      {config.spotLight && <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.5} />}
      <pointLight position={[-10, -10, -10]} />
      <OrbitControls autoRotate={autoRotate} />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial attachArray="material" color="#45C66E" />
      </mesh>
      <RoundedHexagon />
    </>
  );
}
