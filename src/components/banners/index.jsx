import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGraphStore } from "../../stores/useGraphStore";
import { KnowledgeGraph } from "./knowledge-graph";

export const Banners = () => {
  const { hoveredNode } = useGraphStore((s) => s);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (hoveredNode) {
      // Assuming hoveredNode has the cursor position or coordinates like { x, y }
      setPosition({ top: hoveredNode.y + 20, left: hoveredNode.x }); // Offset by 20px to appear below the cursor
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [hoveredNode]);

  return hoveredNode ? (
    <Wrapper style={{ top: `${position.top}px`, left: `${position.left}px` }} isVisible={isVisible}>
      <KnowledgeGraph />
    </Wrapper>
  ) : null;
};

const Wrapper = styled.div`
  position: absolute;
  transform: translateY(${(props) => (props.isVisible ? "0" : "100%")});
  background: #23252f;
  box-shadow: 0px 0px 80px 0px rgba(0, 0, 0, 0.5);
  color: #fff;
  border-radius: 5px;
  transition: transform 0.5s ease-in-out;
  white-space: nowrap; // Prevent text from wrapping
`;
