"use client";

import React from "react";
import Image from "next/image";
import { PlayCircleFilledOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function page() {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          A New Sunrise for Speech Therapy: <br />
          Development of SoundRise 2.0 Application
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <Image
              src="/soundRise-scritta.svg"
              alt="Your image"
              width={350}
              height={100}
              className="mx-auto"
            />
          </div>
          <div>
            <p className="text-lg text-gray-700 dark:text-white mb-4">
              SoundRise 2.0 is an application developed in <b>React</b>,
              designed to help individuals with{" "}
              <b>communication difficulties</b>, especially children. <br />
              The application features an intuitive and inclusive interface that
              allows users to practice speech therapy voice exercises
              independently: a sun symbolizing the user's voice, which is
              animated according to the tonal and timbral features of the voice
              itself.
            </p>
            <div className="flex place-content-between md:flex-row flex-col gap-2">
              <Button
                variant="contained"
                className="bg-gray-200 text-black hover:bg-themedOrange hover:text-white"
              >
                <a href="/soundRise/play" className=" no-underline">
                  Click here to play
                </a>
              </Button>
              <Button
                variant="contained"
                className="bg-gray-200 text-black hover:bg-themedOrange hover:text-white"
              >
                <a href="/soundRise/about" className=" no-underline">
                  Read the documentation
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
