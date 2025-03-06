"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  GitHub,
  Home,
  HomeOutlined,
  ModeNight,
  WbSunny,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import NavigationMenuDemo from "./navimenu";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      className="sticky z-40 top-0 place-content-center md:px-6 px-2 sm:h-20 h-14 bg-white dark:bg-themedDark2
     dark:bg-opacity-100 bg-opacity-50 backdrop-filter backdrop-blur-lg transition-all 
     duration-300 dark:text-slate-300 leading-none text-2xl text-black w-full "
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-4">
            <Link
              href="/"
              className="hover:drop-shadow-lg text-lg font-semibold"
            >
              <img
                src="/soundRise-logo.svg"
                alt="Your image"
                className="w-12 sm:w-16"
              />
            </Link>
          </div>
        </div>
        <section className="flex flex-row justify-between items-center">
          <div className="hidden sm:flex sm:w-96 w-80">
            <NavigationMenuDemo />
          </div>

          {menuOpen && (
            <div className="sm:hidden rounded-lg text-sm z-50 absolute right-0 sm:top-20 top-14 bg-opacity-35 bg-white dark:bg-slate-800 backdrop-filter backdrop-blur-lg transition-all p-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Sound Rise</AccordionTrigger>
                  <AccordionContent className="grid gap-4 ml-2">
                    <div>
                      <Link
                        href="/soundRise/play"
                        className="hover:text-themedOrange"
                      >
                        Play SoundRise
                      </Link>
                    </div>
                    <div>
                      <Link
                        href="/soundRise/about"
                        className="hover:text-themedOrange"
                      >
                        About
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>SoundSpark</AccordionTrigger>
                  <AccordionContent className="grid gap-4 ml-2">
                    <div>
                      <Link
                        href="/soundSpark/play"
                        className="hover:text-themedOrange"
                      >
                        Play SoundSpark
                      </Link>
                    </div>
                    <div>
                      <Link
                        href="/soundSpark/about"
                        className="hover:text-themedOrange"
                      >
                        About
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div></div>
            </div>
          )}
          <div className="flex flex-row justify-between items-center">
            <GitHub />
            {theme === "dark" ? (
              <Button
                className=" dark:text-gray-300"
                onClick={() => setTheme("bright")}
              >
                <WbSunny />
              </Button>
            ) : (
              <Button
                size="small"
                className="text-gray-600"
                onClick={() => setTheme("dark")}
              >
                <ModeNight />
              </Button>
            )}
          </div>
          <div className="sm:hidden z-50">
            <button
              onClick={toggleMenu}
              className="text-themedOrange focus:outline-none"
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
        </section>
      </div>
    </nav>
  );
};

export default Header;
