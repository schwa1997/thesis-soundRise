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

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="absolute bottom-0"
          style={{
            filter: `brightness(${brightnessValue}%)`,
            ...animationStyle,
          }}
        >
          <path
            fill="#0077be"
            fill-opacity="1"
            d="M0,192L34.3,208C68.6,224,137,256,206,234.7C274.3,213,343,139,411,128C480,117,549,171,617,208C685.7,245,754,267,823,261.3C891.4,256,960,224,1029,181.3C1097.1,139,1166,85,1234,85.3C1302.9,85,1371,139,1406,165.3L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};