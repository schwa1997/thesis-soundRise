import React, { FC } from "react";
import SunSleep from "../icons/sunSleep";
import SunAwake from "../icons/sunAwake";
import { Face } from "@mui/icons-material";

interface DescriptionCardProps {
  textBefore: string;
  highlightedText: string;
  textAfter: string;
  icon: string;
  icoColor: string;
}

export const DescriptionCard: FC<DescriptionCardProps> = ({
  textBefore,
  highlightedText,
  textAfter,
  icon,
  icoColor,
}) => {
  return (
    <div className="bg-gray-200 bg-opacity-40 dark:bg-gray-800 p-4 rounded-xl shadow-md">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">
          {textBefore}{" "}
          <span className="text-yellow-500">{highlightedText}</span>
        </h2>
        <p className="text-gray-700 dark:text-gray-300">{textAfter}</p>
      </div>
      <div className="flex justify-center items-center p-4">
        {icon === "SunSleep" ? (
          <SunSleep
            svgColor={icoColor}
            rad={20}
            yCoordinate={-0}
            heightSpaceSun={"12vh"}
          />
        ) : icon === "SunAwake" ? (
          <SunAwake
            svgColor={icoColor}
            rad={20}
            yCoordinate={-0}
            heightSpaceSun={"12vh"}
          />
        ) : (
          <Face className="text-yellow-500" />
        )}
      </div>
    </div>
  );
};
