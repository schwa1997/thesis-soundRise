import React, { FC } from "react";
interface boxContainerProps {
  title: string;
}
export const BoxContainer: FC<boxContainerProps> = ({ title }) => {
  return <div>{title}</div>;
};
