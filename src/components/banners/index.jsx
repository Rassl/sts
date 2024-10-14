import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGraphStore } from "../../stores/useGraphStore";
import { KnowledgeGraph } from "./knowledge-graph";

export const Banners = () => {
  const { hoveredNodeId } = useGraphStore((s) => s);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const padding = 40; // Offset by 10px for better visibility
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const wrapperWidth = 439; // Adjust this to your actual wrapper width
      const wrapperHeight = 209; // Adjust this to your actual wrapper height

      // Calculate available space on each side of the mouse
      const spaceBottom = windowHeight - mouseY;
      const spaceTop = mouseY;

      let newTop = mouseY;
      let newLeft = mouseX - wrapperWidth / 2; // Center horizontally around the mouse

      // Determine vertical positioning: above or below the mouse
      if (spaceBottom >= wrapperHeight + padding) {
        newTop = mouseY + padding; // Show below the mouse
      } else if (spaceTop >= wrapperHeight + padding) {
        newTop = mouseY - wrapperHeight - padding; // Show above the mouse
      }

      // Prevent wrapper from overflowing off the left or right side of the screen
      if (newLeft < padding) {
        newLeft = padding; // Prevent from going off the left side
      } else if (newLeft + wrapperWidth > windowWidth - padding) {
        newLeft = windowWidth - wrapperWidth - padding; // Prevent from going off the right side
      }

      setPosition({ top: newTop, left: newLeft });
    };

    if (hoveredNodeId) {
      setIsVisible(true);
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      setIsVisible(false);
      window.removeEventListener("mousemove", handleMouseMove);
    }

    // Cleanup the event listener when the component unmounts or hoveredNodeId changes
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hoveredNodeId]);

  return hoveredNodeId ? (
    <Wrapper style={{ top: `${position.top}px`, left: `${position.left}px` }} isVisible={isVisible}>
      <KnowledgeGraph />
    </Wrapper>
  ) : null;
};

const Wrapper = styled.div`
  position: absolute;
  /* transform: translateY(${(props) => (props.isVisible ? "0" : "100%")}); */
  background: #23252f;
  box-shadow: 0px 0px 80px 0px rgba(0, 0, 0, 0.5);
  color: #fff;
  border-radius: 5px;
  transition: transform 0.5s ease-in-out;
  white-space: nowrap; // Prevent text from wrapping
  z-index: 1000; // Ensure it's above other elements
`;
