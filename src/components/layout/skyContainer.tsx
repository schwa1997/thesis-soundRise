import React, { FC, ReactNode, useState, useEffect } from "react";
import Wave from "react-wavify";

interface PlayBoxProps {
  children: ReactNode;
  brightnessValue: number;
}

export const PlayBox: FC<PlayBoxProps> = ({ children, brightnessValue }) => {
  const [animationStyle] = useState({});
  return (
    <div className="w-full h-screen overflow-hidden">
      <div
        className="bg-blue-300"
        style={{
          filter: `brightness(${brightnessValue}%)`,
          ...animationStyle,
        }}
      >
        {children}
        <Wave
          fill="#61E8F9"
          paused={false}
          style={{
            display: "",
            // filter: `brightness(${brightnessValue}%)`,
            ...animationStyle,
          }}
          className="absolute bottom-0 h-20"
          options={{
            amplitude: 20,
            speed: 0.8,
            points: 4,
          }}
        />
      </div>
    </div>
  );
};
