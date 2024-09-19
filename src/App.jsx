import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Cubes } from "./components/Cubes";

function App() {
  return (
    <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
      <color attach="background" args={["#16171D"]} />
      <Experience />
      <Cubes />
    </Canvas>
  );
}

export default App;
