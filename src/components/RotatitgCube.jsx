import { Canvas } from "@react-three/fiber";
import { Box, Edges, Line } from "@react-three/drei"; // Import Line from drei
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Color } from "three";

export const RotatingCube = () => {
  const outerCubeRef = useRef();
  const [cubePositions, setCubePositions] = useState(
    Array.from({ length: 9 }).map(() => [
      (Math.random() - 0.5) * 3, // Random initial position within bounds (±1.5)
      (Math.random() - 0.5) * 3,
      (Math.random() - 0.5) * 3,
    ])
  );

  // Rotate the outer cube slowly
  useFrame(() => {
    if (outerCubeRef.current) {
      outerCubeRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={outerCubeRef}>
      {/* Transparent outer cube with edges */}
      <Box args={[2, 2, 2]}>
        <meshBasicMaterial transparent opacity={0} />
        {/* <Edges color="white" /> */}
      </Box>

      {/* Generate and position cubes */}
      {cubePositions.map((position, index) => (
        <MovingCube
          key={index}
          position={position}
          color={`hsl(${Math.random() * 360}, 100%, 50%)`} // Random color
          size={0.1}
          updatePosition={(newPosition) => {
            setCubePositions((prev) => {
              const updatedPositions = [...prev];
              updatedPositions[index] = newPosition;
              return updatedPositions;
            });
          }}
        />
      ))}

      {/* Draw dynamic lines between cubes */}
      {cubePositions.map((startPos, index) => {
        const nextIndex = (index + 1) % cubePositions.length; // Link to the next cube
        const endPos = cubePositions[nextIndex];

        return (
          <Line
            key={`line-${index}`}
            transparent
            opacity={0.5}
            points={[startPos, endPos]} // Connects to the next cube
            color="white" // Line color
            lineWidth={1} // Thickness of the line
          />
        );
      })}
    </group>
  );
};

const MovingCube = ({ position, color, size, updatePosition }) => {
  const cubeRef = useRef();
  const speed = 0.005;
  const [direction, setDirection] = useState([
    speed * (Math.random() > 0.5 ? 1 : -1),
    speed * (Math.random() > 0.5 ? 1 : -1),
    speed * (Math.random() > 0.5 ? 1 : -1),
  ]);

  const cubeColor = new Color(0x16171d);

  useFrame(() => {
    if (cubeRef.current) {
      const [x, y, z] = cubeRef.current.position.toArray();
      const [dx, dy, dz] = direction;
      const bound = 2 - size / 2; // Bound considering the size of the outer cube (±2) minus half of the inner cube size

      // Update position based on direction
      const newPosition = [x + dx, y + dy, z + dz];
      cubeRef.current.position.set(...newPosition);
      updatePosition(newPosition); // Update the position in the parent state

      // Check for collision with the edges of the outer cube
      if (cubeRef.current.position.x > bound || cubeRef.current.position.x < -bound) {
        setDirection([-dx, dy, dz]); // Reverse X direction
        cubeRef.current.position.x = Math.min(Math.max(cubeRef.current.position.x, -bound), bound); // Clamp position
      }
      if (cubeRef.current.position.y > bound || cubeRef.current.position.y < -bound) {
        setDirection([dx, -dy, dz]); // Reverse Y direction
        cubeRef.current.position.y = Math.min(Math.max(cubeRef.current.position.y, -bound), bound); // Clamp position
      }
      if (cubeRef.current.position.z > bound || cubeRef.current.position.z < -bound) {
        setDirection([dx, dy, -dz]); // Reverse Z direction
        cubeRef.current.position.z = Math.min(Math.max(cubeRef.current.position.z, -bound), bound); // Clamp position
      }
    }
  });

  return (
    <Box ref={cubeRef} args={[size * 2, size * 2, size * 2]} position={position}>
      <meshStandardMaterial color={cubeColor} />
    </Box>
  );
};
