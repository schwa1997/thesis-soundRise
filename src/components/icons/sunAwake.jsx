import React from "react";

const sunAwake = ({ svgColor, rad, yCoordinate, heightSpaceSun }) => {
  const shadowRadius = rad + (rad * 50) / 100;

  const eyesRadius = rad - Math.round(rad / 1.3);
  const longSideEyes = eyesRadius + Math.round((eyesRadius / 100) * 20);

  const irideRadius = eyesRadius - Math.round(eyesRadius / 2);
  const longSideIride = irideRadius + Math.round((irideRadius / 100) * 60);

  const pupilRadius = irideRadius - Math.round((irideRadius / 100) * 40);
  const longSidePupil = longSideIride - Math.round((longSideIride / 100) * 30);

  const ycoordinateEyes = yCoordinate - Math.round((rad / 100) * 33);
  const xcoordinateEyesRight = Math.round((rad / 100) * 33);
  const xcoordinateEyesLeft = -xcoordinateEyesRight;

  const ycoordinateIride = ycoordinateEyes + Math.round((rad / 100) * 10);
  const ycoordinatePupi = ycoordinateIride + Math.round((rad / 100) * 5);
  const xRect = xcoordinateEyesLeft * 2;
  const widthRect = (xcoordinateEyesRight - xcoordinateEyesLeft) * 2;

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
        <radialGradient id="sunshine" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={svgColor} stopOpacity="0.7" />
          <stop offset="50%" stopColor={svgColor} stopOpacity="0.8" />
          <stop offset="100%" stopColor={svgColor} stopOpacity="0" />
        </radialGradient>
        <circle
          cx={0}
          cy={yCoordinate}
          r={shadowRadius}
          fill="url(#sunshine)"
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
          fill={"white"}
          stroke="black"
          style={{ transform: "translate(50%, 50%)" }}
        />
        <ellipse
          cx={xcoordinateEyesRight}
          cy={ycoordinateIride}
          rx={irideRadius}
          ry={longSideIride}
          stroke="black"
          fill={"lightblue"}
          style={{ transform: "translate(50%, 50%)" }}
        />
        {/* 5b3a29 */}

        <ellipse
          cx={xcoordinateEyesRight}
          cy={ycoordinatePupi}
          rx={pupilRadius}
          ry={longSidePupil}
          fill={"black"}
          style={{ transform: "translate(50%, 50%)" }}
        />

        {/* Left Eye */}
        <ellipse
          cx={xcoordinateEyesLeft}
          cy={ycoordinateEyes}
          rx={eyesRadius}
          ry={longSideEyes}
          fill={"white"}
          stroke="black"
          style={{ transform: "translate(50%, 50%)" }}
        />
        <ellipse
          cx={xcoordinateEyesLeft}
          cy={ycoordinateIride}
          rx={irideRadius}
          ry={longSideIride}
          stroke="black"
          fill={"lightblue"}
          style={{ transform: "translate(50%, 50%)" }}
        />

        <ellipse
          cx={xcoordinateEyesLeft}
          cy={ycoordinatePupi}
          rx={pupilRadius}
          ry={longSidePupil}
          fill={"black"}
          style={{ transform: "translate(50%, 50%)" }}
        />
      </svg>
    </div>
  );
};

export default sunAwake;
