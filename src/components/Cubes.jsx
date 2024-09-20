import { Box, Edges, RoundedBox, Text } from "@react-three/drei";
import { EffectComposer, Outline } from "@react-three/postprocessing";
import { useControls } from "leva";
import { useRef, createRef } from "react";
import { Color } from "three";
import { nodes } from "../data";

const color = new Color(0x16171d);

export const positions = [
  [5, 5, 5],
  [10, 10, 5],
  [5, -5, 5],
  [5, 5, -5],
  [5, -5, -5],
  [-5, 5, -5],
  [-5, -5, -5],
];

export const Cubes = () => {
  // Create an array of refs for each cube
  const refs = useRef(nodes.map(() => createRef()));

  const config = useControls({
    autoRotate: true,
    blur: false,
    edgeStrength: { value: 1, min: 0, max: 10 },
    visibleEdgeColor: "lime",
    hiddenEdgeColor: "lime",
  });

  // Collect only valid refs (non-null) for easy reuse
  const validRefs = refs.current.filter((ref) => ref && ref.current);

  return (
    <>
      {nodes
        .filter((i) => i.id !== 10)
        .map((node, index) => (
          <mesh ref={refs.current[index]} key={index} position={node.position}>
            <boxGeometry args={[1, 1, 1, 32, 32, 32]} />
            <meshStandardMaterial color={color} />
            <Edges scale={1.01} color="#9A9CA5" lineWidth={2} />
          </mesh>
        ))}

      <EffectComposer autoClear={false}>
        {/* Apply outline to all cubes except the first one */}
        {validRefs.length > 1 && (
          <Outline
            selection={validRefs.slice(1)} // Apply to all refs except the first one
            blur={config.blur}
            visibleEdgeColor={config.visibleEdgeColor}
            hiddenEdgeColor={config.hiddenEdgeColor}
            edgeStrength={config.edgeStrength}
          />
        )}
      </EffectComposer>
    </>
  );
};
