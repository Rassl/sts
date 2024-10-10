import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useState } from "react";

export const links = [
  { source: 10, target: 0 },
  { source: 0, target: 1 },
  { source: 10, target: 2 },
  { source: 10, target: 3 },
  { source: 10, target: 4 },
  { source: 10, target: 5 },
  { source: 10, target: 7 },
  { source: 6, target: 7 },
  { source: 6, target: 5 },
  { source: 7, target: 4 },
  { source: 3, target: 4 },
  { source: 3, target: 2 },
];

export const LinksNew = ({ nodeRefs }) => {
  const config = useControls({
    hoveredLink: true,
  });
  const { hoveredLink } = config;

  const [dashOffset, setDashOffset] = useState(0); // State to control dash offset

  useFrame((_, delta) => {
    setDashOffset((prev) => prev - delta * 5); // Continuously update dash offset
  });

  return (
    <group>
      {links.map((link, index) => {
        // Get the source and target positions using refs
        const sourceNode = nodeRefs.current.find((n) => n.id === link.source);
        const targetNode = nodeRefs.current.find((n) => n.id === link.target);

        if (!sourceNode?.ref.current || !targetNode?.ref.current) {
          console.log("isNull");
          return null;
        }

        const start = sourceNode.ref.current.position;
        const end = targetNode.ref.current.position;

        return (
          <group key={index}>
            {/* Primary dashed line */}
            <Line
              points={[start.clone(), end.clone()]} // Use dynamic points from refs
              color={hoveredLink ? "lime" : "white"}
              dashed
              dashScale={5}
              dashSize={0.5}
              gapSize={0.2}
              dashOffset={dashOffset} // Apply animated dash offset
              transparent
              opacity={0.6}
              lineWidth={hoveredLink ? 4 : 1}
            />
            {/* Secondary solid line for hover effect */}
            <Line
              points={[start.clone(), end.clone()]} // Use dynamic points from refs
              color={hoveredLink ? "lime" : "white"}
              transparent
              opacity={hoveredLink ? 0.1 : 0.4}
              lineWidth={hoveredLink ? 4 : 0.5}
            />
          </group>
        );
      })}
    </group>
  );
};
