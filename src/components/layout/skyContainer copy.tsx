import React, { FC, ReactNode, useState, useEffect } from "react";

interface PlayBoxProps {
  children: ReactNode;
  brightnessValue: number;
}

export const PlayBox: FC<PlayBoxProps> = ({ children, brightnessValue }) => {
  const [animationStyle, setAnimationStyle] = useState({});

  return (
    <div className="w-full h-screen overflow-hidden">
      <div
        className={``}
        style={{
          backgroundImage: `url('https://images5.alphacoders.com/336/thumb-1920-336729.jpg')`,
          filter: `brightness(${brightnessValue}%)`,
          ...animationStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
};
