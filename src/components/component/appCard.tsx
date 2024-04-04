import { PlayCircleFilled } from "@mui/icons-material";
import { Divider } from "@mui/material";
import Image from "next/image";
import React, { FC } from "react";

interface ProjectCardProps {
  title: string;
  link: string;
  imgUrl: string;
  description: string;
  keywords: string[];
}

export const ProjectCard: FC<ProjectCardProps> = ({
  title,
  link,
  imgUrl,
  description,
  keywords,
}) => {
  return (
    <div className="md:w-3/4 w-full  dark:text-white rounded-3xl">
      <div className="bg-orange-200 dark:bg-themedDark2 w-full block shadow-2xl rounded-3xl">
        <div className="bg-white dark:bg-themedDark2 rounded-lg shadow-lg">
          <div className="relative h-fit">
            <div className="absolute top-1/2 left-0 gap-4 max-w-none bg-white/0 dark:bg-themedDark2/0 text-black dark:text-white p-6 -translate-x-0 -translate-y-1/2 transitiona-all duration-1000">
              <div className="flex flex-col">
                <div className="relative inline-flex place-self-center w-full group mt-4">
                  <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#ebc33f] to-[#da3c33] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                  <a
                    href={link}
                    title="get now button"
                    className="w-full relative inline-flex items-center justify-center sm:py-4 py-2 sm:text-2xl text-xl font-bold dark:text-white text-gray-900 transition-all duration-200 bg-white/60 dark:bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    role="button"
                  >
                    {title}
                  </a>
                </div>

                <div className="relative inline-flex w-fit group sm:mt-4 mt-2 max-h-full">
                  <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#ebc33f] to-[#da3c33] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                  <a
                    href={link}
                    title="get now button"
                    className="w-fit sm:py-4 py-2 relative sm:max-h-none max-h-48 inline-flex items-center justify-center px-8 text-sm font-bold dark:text-white text-gray-500 transition-all duration-200 bg-white/60 dark:bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    role="button"
                  >
                    {description}
                  </a>
                </div>
              </div>
            </div>
            <Image
              src={imgUrl}
              alt=""
              className="rounded-t-xl"
              width={800}
              height={300}
            />
            <div className="absolute bottom-4 right-6 text-themedOrange dark:text-white dark:hover:text-themedOrange">
              <a href={link}>
                <PlayCircleFilled className=" sm:text-5xl text-3xl" />
              </a>
            </div>
          </div>
          <div className="flex p-6 min-h-min gap-2 ">
            {keywords.map((keyword) => (
              <span className=" dark:bg-themedDark3 hover:text-themedOrange text-sm bg-orange-100 bg-opacity-50 py-2 px-3 rounded-md w-fit">
                {keyword}
              </span>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};
