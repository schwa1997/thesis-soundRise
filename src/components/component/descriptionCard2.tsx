import React, { FC } from "react";
import { Face } from "@mui/icons-material";
import SunAwake from "../icons/SunAwake";
import SunSleep from "../icons/SunSleep";

interface DescriptionCardProps {
  title: string;
  textBefore: string;
  highlightedText: string;
  textAfter: string;
  icon: string;
  icoColor: string;
}

export const DescriptionCard2: FC<DescriptionCardProps> = ({
  title,
  textBefore,
  highlightedText,
  textAfter,
  icon,
  icoColor,
}) => {
  return (
    <div className="bg-gray-200 bg-opacity-40 dark:bg-gray-800 p-4 rounded-xl shadow-md">
      <div className="card-body">
        <h2 className="card-title">
          <b className="text-yellow-500">{title}</b>
        </h2>
        <p>
          {textBefore} <b className="text-yellow-500">{highlightedText}</b>{" "}
          {textAfter}
        </p>
      </div>
      <div className="flex justify-center items-center h-max p-4">
        {icon === "SunSleep" ? (
          <SunSleep
            svgColor={icoColor}
            rad={25}
            yCoordinate={5}
            heightSpaceSun={"12vh"}
          />
        ) : icon === "SunAwake" ? (
          <SunAwake
            svgColor={icoColor}
            rad={20}
            yCoordinate={0}
            heightSpaceSun={"12vh"}
          />
        ) : (
          <Face className="text-yellow-500" />
        )}
      </div>
    </div>
  );
};
