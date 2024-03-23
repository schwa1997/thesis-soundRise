"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { GitHub, ModeNight, WbSunny } from "@mui/icons-material";
import { Button } from "@mui/material";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="sticky top-0 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg z-50 transition-all duration-300 dark:text-slate-300 leading-none text-2xl text-black p-4  w-full ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-4">
            <Link
              href="./"
              className="hover:drop-shadow-lg text-lg font-semibold"
            >
              <Image
                src="/soundRise-logo.svg"
                alt="Your image"
                width={80}
                height={100}
              />
            </Link>
          </div>
        </div>
        <div className="hidden sm:flex items-center">
          <Link
            href="./"
            className="hover:drop-shadow-lg text-lg font-semibold"
          >
            HOME
          </Link>
          <Link href="./about" className="ml-4 text-lg font-semibold">
            ABOUT
          </Link>
          <Link href="./play" className="ml-4 text-lg font-semibold">
            RUN APP
          </Link>
          <Link
            href="https://github.com/zGiada/soundrise-application"
            target="_blank"
            className="ml-4 text-lg font-semibold"
          >
            <GitHub />
          </Link>
          <div>
            {theme === "dark" ? (
              <Button
                className=" dark:text-gray-300"
                onClick={() => setTheme("bright")}
              >
                <WbSunny />
              </Button>
            ) : (
              <Button
                className="text-gray-600 "
                onClick={() => setTheme("dark")}
              >
                <ModeNight />
              </Button>
            )}
          </div>
        </div>
        <div className="sm:hidden ">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="sm:hidden bg-gray-800 py-2 px-4 mt-2">
          <Link
            href="./"
            className="block text-white text-lg font-semibold py-2"
            onClick={toggleMenu}
          >
            HOME
          </Link>
          <Link
            href="./about"
            className="block text-white text-lg font-semibold py-2"
            onClick={toggleMenu}
          >
            ABOUT
          </Link>
          <Link
            href="./play"
            className="block text-white text-lg font-semibold py-2"
            onClick={toggleMenu}
          >
            RUN APP
          </Link>
          <Link
            href="ithttps://github.com/zGiada/soundrise-application"
            target="_blank"
            className="block text-white text-lg font-semibold py-2"
            onClick={toggleMenu}
          >
            <GitHub />
          </Link>
          <div>
            {theme === "dark" ? (
              <Button
                className=" dark:text-gray-300"
                onClick={() => setTheme("bright")}
              >
                <WbSunny />
              </Button>
            ) : (
              <Button
                className="text-gray-600 "
                onClick={() => setTheme("dark")}
              >
                <ModeNight />
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
