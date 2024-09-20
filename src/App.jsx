import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Cubes } from "./components/Cubes";
import { EffectComposer, Outline } from "@react-three/postprocessing";
import { Links } from "./components/Links";
import { useControls } from "leva";
import { TextureLoader } from "three";
import { useEffect } from "react";
import { FloatingBg } from "./components/FloatingBg";

function Background() {
  const texture = useLoader(TextureLoader, "bg.png");
  const { scene } = useThree();

  // Set the scene background to the loaded texture
  useEffect(() => {
    scene.background = texture;
  }, [texture, scene]);

  return null;
}

function App() {
  return (
    <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
      {/* <Background /> */}
      <color attach="background" args={["#16171D"]} />
      <axesHelper args={[2500]} />
      <Experience />
      <Cubes />
      <Links />
      <FloatingBg />
    </Canvas>
  );
}

export default App;
