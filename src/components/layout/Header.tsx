"use client";
import React, { useState } from "react";
import Image from "next/image";
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
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      className="sticky z-40 top-0 md:p-2 p-3 bg-white dark:bg-black
     dark:bg-opacity-50 bg-opacity-20 backdrop-filter backdrop-blur-lg transition-all 
     duration-300 dark:text-slate-300 leading-none text-2xl text-black w-full "
    >
      <div className="container flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-4">
            <Link
              href="./"
              className="hover:drop-shadow-lg text-lg font-semibold"
            >
              <img
                src="/soundRise-logo.svg"
                alt="Your image"
                className="md:w-16 w-10"
              />
            </Link>
          </div>
        </div>
        <section className="flex flex-row gap-4 justify-between items-center">
          <div className="hidden sm:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/"
                    className={navigationMenuTriggerStyle()}
                  >
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-opacity-90">
                    Sound Rise App
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="grid gap-3 p-4 text-sm w-[500px] md:w-[500px] lg:w-[200px]">
                    <NavigationMenuLink
                      href="/soundRise/play"
                      className="hover:text-orange-500"
                    >
                      Play SoundRise
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      href="/soundRise/about"
                      className="hover:text-orange-500"
                    >
                      About
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>App 2</NavigationMenuTrigger>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {menuOpen && (
            <div className="sm:hidden rounded-lg text-sm z-50 absolute right-0 top-10 bg-opacity-35 bg-orange-300 dark:bg-slate-800 backdrop-filter backdrop-blur-lg transition-all p-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <Link href="/">
                      <Home />
                    </Link>
                  </AccordionTrigger>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>APP1</AccordionTrigger>
                  <AccordionContent className="grid gap-4 ml-2">
                    <div>
                      <Link
                        href="/soundRise/play"
                        className="hover:text-orange-500"
                      >
                        Play SoundRise
                      </Link>
                    </div>
                    <div>
                      <Link
                        href="/soundRise/about"
                        className="hover:text-orange-500"
                      >
                        About
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>APP2</AccordionTrigger>
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
          <div className="sm:hidden  z-50">
            <button
              onClick={toggleMenu}
              className="text-orange-500 focus:outline-none"
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
