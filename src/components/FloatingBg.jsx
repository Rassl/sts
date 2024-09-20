import { Instance, Instances } from "@react-three/drei";
import { useMemo } from "react";

// D9D9D9;
// B3B6BC;

export const FloatingBg = () => {
  const spheres = useMemo(() => {
    // Create 1000 spheres with random positions and sizes
    return Array.from({ length: 10000 }, () => ({
      position: [
        (Math.random() - 0.5) * 1500, // X position between -50 and 50
        (Math.random() - 0.5) * 1500, // Y position between -50 and 50
        (Math.random() - 0.5) * 1500, // Z position between -50 and 50
      ],
      scale: Math.random() * 2 + 0.5, // Scale between 0.5 and 2.5
      color: `#4F525E`, // Random color
    }));
  }, []);

  return (
    <Instances limit={1000} range={1000}>
      <boxGeometry />
      <meshBasicMaterial />
      {spheres.map((sphere, index) => (
        <Instance
          key={index}
          position={sphere.position}
          scale={sphere.scale}
          color={sphere.color}
          onClick={() => console.log(`Sphere ${index} clicked`)}
        />
      ))}
    </Instances>
  );
};
