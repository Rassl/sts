import { Instance, Instances } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export const FloatingBg = () => {
  // Generate 1000 spheres with random initial positions, sizes, and velocities
  const spheres = useMemo(() => {
    return Array.from({ length: 1000 }, () => ({
      position: [(Math.random() - 0.5) * 1500, (Math.random() - 0.5) * 1500, (Math.random() - 0.5) * 1500],
      scale: Math.random() * 2 + 0.5, // Scale between 0.5 and 2.5
      velocity: [
        (Math.random() - 0.5) * 0.5, // Random velocity for X
        (Math.random() - 0.5) * 0.5, // Random velocity for Y
        (Math.random() - 0.5) * 0.5, // Random velocity for Z
      ],
      color: `#4F525E`, // Static color for all instances
    }));
  }, []);

  const ref = useRef();

  useFrame(() => {
    ref.current.children.forEach((instance, index) => {
      const sphere = spheres[index];
      instance.position.x += sphere.velocity[0];
      instance.position.y += sphere.velocity[1];
      instance.position.z += sphere.velocity[2];

      // Optional: Reset position if it moves too far
      if (Math.abs(instance.position.x) > 750) sphere.velocity[0] *= -1;
      if (Math.abs(instance.position.y) > 750) sphere.velocity[1] *= -1;
      if (Math.abs(instance.position.z) > 750) sphere.velocity[2] *= -1;
    });
  });

  return (
    <Instances limit={1000} range={1000} ref={ref}>
      <boxGeometry />
      <meshBasicMaterial />
      {spheres.map((sphere, index) => (
        <Instance key={index} position={sphere.position} scale={sphere.scale} color={sphere.color} />
      ))}
    </Instances>
  );
};
