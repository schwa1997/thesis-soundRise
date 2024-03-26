import React, { FC, ReactNode, useState, useEffect } from "react";

interface BoxContainerProps {
  children: ReactNode;
  brightnessValue: number;
  backgroundCss: string;
}

export const BoxContainer: FC<BoxContainerProps> = ({
  children,
  brightnessValue,
  backgroundCss,
}) => {
  const [style, setStyle] = useState("");

  useEffect(() => {
    setStyle(`bg-orange-500 bg-opacity-${brightnessValue}`);
  }, [brightnessValue, backgroundCss]);

  return (
    <div className={style}>
      <div className="">{children}</div>
    </div>
  );
};
