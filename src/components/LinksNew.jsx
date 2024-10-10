import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useState } from "react";
import { CustomLine } from "./CustomLine";

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

  return (
    <group>
      {links.map((link, index) => {
        const sourceNode = nodeRefs.current.find((n) => n.id === link.source);
        const targetNode = nodeRefs.current.find((n) => n.id === link.target);

        if (!sourceNode?.ref.current || !targetNode?.ref.current) return null;

        const start = sourceNode.ref.current.position.toArray();
        const end = targetNode.ref.current.position.toArray();

        return <CustomLine nodeRefs={nodeRefs} link={link} key={index} start={start} end={end} hoveredLink={hoveredLink} />;
      })}
    </group>
  );
};
