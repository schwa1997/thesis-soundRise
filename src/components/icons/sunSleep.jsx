import React from "react";

const sunSleep = ({ svgColor, rad, yCoordinate, heightSpaceSun }) => {
  const shadowRadius = rad + (rad * 50) / 100;

  const eyesRadius = rad - Math.round(rad / 1.3);
  const longSideEyes = eyesRadius + Math.round((eyesRadius / 100) * 20);

  const ycoordinateEyes = yCoordinate - Math.round((rad / 100) * 33);
  const xcoordinateEyesRight = Math.round((rad / 100) * 33);
  const xcoordinateEyesLeft = -xcoordinateEyesRight;

  const xRect = xcoordinateEyesLeft * 2;
  const widthRect = (xcoordinateEyesRight - xcoordinateEyesLeft) * 2;
  const yRect = ycoordinateEyes - longSideEyes - longSideEyes / 2.5;
  const heightRect = longSideEyes + longSideEyes / 1.5;

  const cyMouth = ycoordinateEyes + longSideEyes * 2;
  {
    /* larghezza bocca */
  }
  const rxMouth = rad / 1.75;
  {
    /* altezza bocca */
  }
  const ryMouth = rad / 2.2;

  const yRectMouth = ycoordinateEyes - longSideEyes / 2.5;
  const heightRectMouth = ryMouth * 1.5;

  return (
    <div className="flex-grow sun-container w-full flex items-center justify-center ">
      <svg
        width="100%" // Set the desired width of the circle
        height={heightSpaceSun} // Set the desired height of the circle
        xmlns="http://www.w3.org/2000/svg"
      >
        <radialGradient id="shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={svgColor} stopOpacity="0.7" />
          <stop offset="50%" stopColor={svgColor} stopOpacity="0.8" />
          <stop offset="100%" stopColor={svgColor} stopOpacity="0" />
        </radialGradient>

        <circle
          cx={0}
          cy={yCoordinate}
          r={shadowRadius}
          fill="url(#shadow)"
          style={{ transform: "translate(50%, 50%)" }}
        />

        <circle
          cx={0}
          cy={yCoordinate}
          r={rad}
          fill={svgColor}
          stroke="black"
          style={{ transform: "translate(50%, 50%)" }}
        />

        {/* Bocca */}
        <ellipse
          cx={0}
          cy={cyMouth}
          rx={rxMouth}
          ry={ryMouth}
          fill={svgColor}
          stroke="black"
          style={{ transform: "translate(50%, 50%)" }}
        />

        {/* rettangolo copri bocca */}
        <rect
          x={xRect}
          y={yRectMouth}
          width={widthRect}
          height={heightRectMouth}
          fill={svgColor}
          style={{ transform: "translate(50%, 50%)" }}
        />

        {/* Right Eye */}
        <ellipse
          cx={xcoordinateEyesRight}
          cy={ycoordinateEyes}
          rx={eyesRadius}
          ry={longSideEyes}
          fill={svgColor}
          stroke="black"
          style={{ transform: "translate(50%, 50%)" }}
        />

        {/* Left Eye */}
        <ellipse
          cx={xcoordinateEyesLeft}
          cy={ycoordinateEyes}
          rx={eyesRadius}
          ry={longSideEyes}
          fill={svgColor}
          stroke="black"
          style={{ transform: "translate(50%, 50%)" }}
        />

        <rect
          x={xRect}
          y={yRect}
          width={widthRect}
          height={heightRect}
          fill={svgColor}
          style={{ transform: "translate(50%, 50%)" }}
        />
      </svg>
    </div>
  );
};

export default sunSleep;
