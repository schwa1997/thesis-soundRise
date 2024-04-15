"use client";

import React from "react";
import Image from "next/image";
import { PlayCircleFilledOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function page() {
  return (
    <div>
      <div className="hero min-h-screen min-w-screen">
        <div className="hero-content text-center text-black dark:text-white">
          <div className="max-w-full">
            <h1 className="font-extrabold mb-10 leading-none tracking-tight text-3xl sm:text-md md:text-3xl lg:text-4xl xl:text-5xl">
              A New Sunrise for Speech Therapy: <br />
              Development of SoundRise 2.0 Application
            </h1>
            <Image
              src="/soundRise-scritta.svg"
              alt="Your image"
              width={350}
              height={100}
              style={{ margin: "0 auto" }}
            />
          </div>
        </div>
      </div>

      <div className="hero min-h-screen min-w-screen">
        <div className="hero-content text-justify text-black dark:text-white">
          <div className="flex justify-center max-w-full">
            <p className="mb-20 max-w-[70%] leading-none tracking-tight text-xl">
              SoundRise 2.0 is an application developed in <b>React</b>,
              designed to help individuals with{" "}
              <b>communication difficulties</b>, in particular children. <br />
              The application features an intuitive and inclusive interface that
              allows the user to practise speech therapy voice exercises
              independently: a sun symbolising the voice of the user, which is
              animated according to the tonal and timbral features of the voice
              itself.
            </p>
            <Button>
              <a href="/soundRise/play">
               Click here to play
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
