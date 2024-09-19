import { Box } from "@react-three/drei";
import { Color } from "three";
const color = new Color(0x363841);


export const Cubes = () => {
  return (
    <>
      {/* <mesh position={[5, 5, 5]}>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
      <mesh position={[5, -5, 5]}>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
      <mesh position={[5, 5, -5]}>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
      <mesh position={[5, 5, -5]}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh> */}
      <mesh position={[5, -5, -5]}>
        <Box material-color={color} args={[1, 1, 1]} castShadow>
          {/* Cube Material */}
          <meshStandardMaterial />
          {/* Colored Edges */}
        </Box>
      </mesh>
    </>
  );
};
