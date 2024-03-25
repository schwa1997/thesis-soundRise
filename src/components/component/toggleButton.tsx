import React, { useState } from "react";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

interface ToggleButtonProps {
  isOpen: boolean;
  title: string;
  toggleCard: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  title,
  isOpen,
  toggleCard,
}) => {
  return (
    <button onClick={toggleCard}>
      {isOpen ? (
        <ArrowDropDown className="size-8" />
      ) : (
        <div>
          <ArrowDropUp className="size-8" />
          <span className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
            {" "}
            {title}
          </span>
        </div>
      )}
    </button>
  );
};

export default ToggleButton;
