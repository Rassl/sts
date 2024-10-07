import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Cubes } from "./components/Cubes";
import { EffectComposer, Outline, Selection } from "@react-three/postprocessing";
import { Links } from "./components/Links";
import { useControls } from "leva";
import { TextureLoader } from "three";
import { useEffect } from "react";
import { FloatingBg } from "./components/FloatingBg";
import { ParticleSystem } from "./components/ParticlesSystem";
import { RotatingCube } from "./components/RotatitgCube";

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
  const config = useControls({
    blur: false,
    axesHelper: false,
    edgeStrength: { value: 1, min: 0, max: 10 },
    visibleEdgeColor: "lime",
    hiddenEdgeColor: "lime",
  });

  return (
    <Canvas shadows camera={{ position: [0, 0, 15], fov: 30 }}>
      {/* <Background /> */}
      <color attach="background" args={["#16171D"]} />
      {config.axesHelper && <axesHelper args={[2500]} />}
      <Experience />
      {/* <Selection>
        <EffectComposer autoClear={false}>

          <Outline
            blur={config.blur}
            visibleEdgeColor={config.visibleEdgeColor}
            hiddenEdgeColor={config.hiddenEdgeColor}
            edgeStrength={config.edgeStrength}
          />
        </EffectComposer>
        <Cubes />
        <Links />
      </Selection> */}
      <RotatingCube />
      <ParticleSystem />
      <FloatingBg />
    </Canvas>
  );
}

export default App;
