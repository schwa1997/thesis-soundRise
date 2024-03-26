import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "./input";
import SunIcon from "../icons/SunIcon";

export default function AnimationBox() {
  const [x, setX] = useState(100);
  const [y, setY] = useState(10);
  const [rotate, setRotate] = useState(0);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  return (
    <div className="absolute top-0 border-red-500 w-screen h-screen flex flex-rows">
      <div className="flex flex-col pt-32">
        <Input value={x} set={setX} min={0} max={1000}>
          x
        </Input>
        <Input value={y} set={setY} min={0} max={100}>
          y
        </Input>
        <Input value={rotate} set={setRotate} min={-180} max={180}>
          rotate
        </Input>
      </div>
      <div className="relative">
        <motion.div
          animate={{
            x,
            y: `calc(${((100 - y) * screenHeight) / 100}px - 140px)`, // Adjust 8px based on icon size
            rotate,
          }}
        >
          <SunIcon className="w-24 h-24 text-yellow-500" />
        </motion.div>
      </div>
    </div>
  );
}
