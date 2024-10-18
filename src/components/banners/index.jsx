import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGraphStore } from "../../stores/useGraphStore";
import { KnowledgeGraph } from "./knowledge-graph";

export const Banners = () => {
  const { hoveredNodeId, setHoveredNodeId } = useGraphStore((s) => s);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [translateY, setTranslateY] = useState(0);
  const [startY, setStartY] = useState(null); // Track the initial touch point

  console.log(123)

  const threshold = 200; // Distance in pixels after which the component disappears

  // Handle window resize to detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Mouse move functionality for non-mobile
  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const padding = 40; // Offset for better visibility
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const wrapperWidth = 439; // Actual wrapper width
      const wrapperHeight = 209; // Actual wrapper height

      const spaceBottom = windowHeight - mouseY;
      const spaceTop = mouseY;

      let newTop = mouseY;
      let newLeft = mouseX - wrapperWidth / 2; // Center horizontally

      if (spaceBottom >= wrapperHeight + padding) {
        newTop = mouseY + padding; // Show below the mouse
      } else if (spaceTop >= wrapperHeight + padding) {
        newTop = mouseY - wrapperHeight - padding; // Show above the mouse
      }

      // Prevent overflow off the screen sides
      if (newLeft < padding) {
        newLeft = padding; // Prevent off the left side
      } else if (newLeft + wrapperWidth > windowWidth - padding) {
        newLeft = windowWidth - wrapperWidth - padding; // Prevent off the right side
      }

      setPosition({ top: newTop, left: newLeft });
    };

    if (hoveredNodeId && !isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      // setHoveredNodeId(null);
      window.removeEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hoveredNodeId, isMobile]);

  // Swipe functionality for mobile
  useEffect(() => {
    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      setStartY(touch.clientY);
    };

    const handleTouchMove = (e) => {
      if (startY === null) return;

      const touch = e.touches[0];
      const deltaY = touch.clientY - startY;

      if (deltaY > 0) {
        setTranslateY(deltaY); // Move the component down
      }
    };

    const handleTouchEnd = () => {
      if (translateY > threshold) {
        setHoveredNodeId(null); // Hide the component if swiped more than the threshold
      } else {
        setTranslateY(0); // Reset position if swipe is not enough
      }
      setStartY(null); // Reset the touch start position
    };

    if (isMobile && hoveredNodeId) {
      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [hoveredNodeId, isMobile, startY, translateY]);

  return hoveredNodeId ? (
    <Wrapper
      style={{
        top: isMobile ? `calc(20vh + ${translateY}px)` : `${position.top}px`,
        left: isMobile ? "0" : `${position.left}px`,
        opacity: translateY > threshold ? 0 : 1, // Fade out when moving past the threshold
      }}
    >
      <div className="dragger"></div>
      <KnowledgeGraph />
    </Wrapper>
  ) : null;
};

const Wrapper = styled.div`
  position: absolute;
  background: #23252f;
  box-shadow: 0px 0px 80px 0px rgba(0, 0, 0, 0.5);
  color: #fff;
  border-radius: 5px;
  transition: transform 0.3s ease, opacity 0.3s ease;
  white-space: nowrap;
  z-index: 1000;
  display: flex;
  flex-direction: column;

  .dragger {
    width: 100px;
    height: 8px;
    border-radius: 5px;
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 1);
    opacity: 0.2;
    display: none;
  }

  @media (max-width: 768px) {
    .dragger {
      display: block;
    }

    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }
`;

