"use client";

import { BoxContainer } from "@/components/layout/boxContainer";
import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimationBox from "../../../components/component/animationBox";

export default function page() {
  const [brightness, setBrightnesss] = useState<number>(100);
  return (
    <div className="absolute top-0 w-full">
      <BoxContainer brightnessValue={brightness} backgroundCss={"ddd"}>
        {/* <AnimationBox /> */}<div>hi</div>
      </BoxContainer>
    </div>
  );
}
