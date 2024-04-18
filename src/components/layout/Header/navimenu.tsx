"use client";

import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ArrowDropDown, HouseOutlined } from "@mui/icons-material";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";

const NavigationMenuDemo = () => {
  return (
    <NavigationMenu.Root className="dark:text-white dark:bg-opacity-100 bg-opacity-0 text-black dark:bg-themedDark2 bg-white relative z-[1] flex w-full justify-center">
      <NavigationMenu.List className="w-full center shadow-blackA4 m-0 flex list-none rounded-[6px]  p-1 shadow-[0_2px_10px]">
        <NavigationMenu.Item>
          <NavigationMenu.Link
            className="text-center hover:bg-themedOrange/30 focus:shadow-violet7 block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none"
            href="/"
          >
            <HouseOutlined />
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="hover:bg-themedOrange/30 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none ">
            SoundRise App
            <ArrowDropDown
              className="text-violet10  relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
              aria-hidden
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="dark:bg-themedDark2 bg-white data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto">
            <ul className="one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr]">
              <li className="row-span-3 grid">
                <NavigationMenu.Link asChild>
                  <a
                    className="focus:shadow-violet7 from-purple9 to-indigo9 flex
                    h-full w-full select-none flex-col justify-end rounded-[6px] bg-gradient-to-b p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px]"
                    href="/soundRise"
                  >
                    <Image
                      src={"/soundrise-logo.png"}
                      alt=""
                      className=""
                      width={800}
                      height={300}
                    />
                    <div className="mt-4 mb-[7px] text-[18px] font-medium leading-[1.2] ">
                      Sound Rise App
                    </div>
                    <p className="text-mauve4 text-[14px] leading-[1.3]">
                      Sound Rise App brief introdcution
                    </p>
                  </a>
                </NavigationMenu.Link>
              </li>

              <ListItem href="/soundRise/play" title="Play">
                Click here to play.
              </ListItem>
              <ListItem href="/soundRise/about" title="About Page">
                content.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="hover:bg-themedOrange/30 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none">
            App 2
            <ArrowDropDown
              className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
              aria-hidden
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="dark:bg-themedDark2 bg-white data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto">
            <ul className="one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr]">
              <li className="row-span-3 grid">
                <NavigationMenu.Link asChild>
                  <a
                    className="focus:shadow-violet7 from-purple9 to-indigo9 flex
                    h-full w-full select-none flex-col justify-end rounded-[6px] bg-gradient-to-b p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px]"
                    href="/soundRise2/play"
                  >
                    <Image
                      src={"/app2.png"}
                      alt=""
                      className=""
                      width={800}
                      height={300}
                    />
                    <div className="mt-4 mb-[7px] text-[18px] font-medium leading-[1.2] ">
                      App 2
                    </div>
                    <p className="text-mauve4 text-[14px] leading-[1.3]">
                      App 2 introdcution
                    </p>
                  </a>
                </NavigationMenu.Link>
              </li>

              <ListItem href="/soundRise2/about" title="Documentation" />
              <ListItem href="/soundRise2/about" title="About Page">
                content.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
          <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white dark:bg-themedDark2" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
        <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenu.Root>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-themedOrange/30 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default NavigationMenuDemo;
