import React, { useState } from "react";
import "./EclipseButton.css"; // Import CSS file for styling
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

const EclipseButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <button
      className={`eclipse-button ${hovered ? "hovered" : ""}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hovered ? <ArrowDropDown /> : <ArrowDropUp />}
    </button>
  );
};

export default EclipseButton;
