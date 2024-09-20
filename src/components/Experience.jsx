import { OrbitControls } from "@react-three/drei";
const autoRotate = false;

export const Experience = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.5} /> */}
      <pointLight position={[-10, -10, -10]} />
      <OrbitControls autoRotate={autoRotate} />
      <mesh>
        <boxGeometry />
        <meshBasicMaterial attachArray="material" color="#45C66E" />
      </mesh>
    </>
  );
};
