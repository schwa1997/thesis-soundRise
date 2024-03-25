"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { GitHub, HomeOutlined, ModeNight, WbSunny } from "@mui/icons-material";
import { Button } from "@mui/material";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      className="sticky z-40 top-0 bg-white dark:bg-black
     dark:bg-opacity-50 bg-opacity-20 backdrop-filter backdrop-blur-lg transition-all 
     duration-300 dark:text-slate-300 leading-none text-2xl text-black p-4 w-full "
    >
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
        <section className="flex flex-row gap-4 justify-between items-center">
          <div className="hidden sm:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-opacity-90">
                    Sound Rise App
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="grid gap-3 p-4 text-sm w-[500px] md:w-[500px] lg:w-[200px]">
                    <Link href="/soundRise" className="hover:text-purple-500">
                      Play SoundRise
                    </Link>
                    <Link href="/soundRise" className="hover:text-purple-500">
                      About
                    </Link>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>App 2</NavigationMenuTrigger>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {menuOpen && (
            <div className="sm:hidden rounded-lg z-50 absolute right-2 top-20 bg-opacity-35 bg-purple-300 dark:bg-black backdrop-filter backdrop-blur-lg transition-all p-4">
              <NavigationMenu>
                <NavigationMenuList className="flex flex-col place-items-end bg-opacity-35 gap-4">
                  <NavigationMenuItem className="place-self-end">
                    <Link href="/" legacyBehavior passHref className="">
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        <HomeOutlined />
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="place-self-end">
                    <NavigationMenuTrigger className="">
                      App1
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="grid gap-3 p-4 text-sm w-[500px] md:w-[500px] lg:w-[200px]">
                      <Link href="/soundRise" className="hover:text-purple-500">
                        Play SoundRise
                      </Link>
                      <Link href="/soundRise" className="hover:text-purple-500">
                        About
                      </Link>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="place-self-end">
                    <NavigationMenuTrigger>App 2</NavigationMenuTrigger>
                    <NavigationMenuContent className="grid gap-3 p-4 text-sm w-[500px] md:w-[500px] lg:w-[200px]">
                      <Link href="/soundRise" className="hover:text-purple-500">
                        Play SoundRise
                      </Link>
                      <Link href="/soundRise" className="hover:text-purple-500">
                        About
                      </Link>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
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
              className="text-purple-500 focus:outline-none"
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
