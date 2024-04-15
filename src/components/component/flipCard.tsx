import { PlayCircleFilled } from "@mui/icons-material";
import Image from "next/image";
import React, { FC } from "react";

interface ProjectCardProps {
  title: string;
  link: string;
  imgUrl: string;
  description: string;
  keywords: string[];
}

export const FlipCard: FC<ProjectCardProps> = ({
  title,
  link,
  imgUrl,
  description,
  keywords,
}) => {
  return (
    <div className="flex flex-col justify-center bg-slate-100 dark:bg-slate-900">
      <div className="group h-96 w-96 [perspective:1000px]">
        <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          <div className="absolute inset-0">
            <img
              className="h-full w-full rounded-xl object-cover shadow-xl  shadow-black/40"
              src={imgUrl}
            />
          </div>
          <div className="absolute inset-0 h-ful1 w-full rounded-xl bg-black/80 pX-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <div className=" flex min-h-full flex-col items-center justify-center">
              <h1 className="text-lg font-bold ">{title}</h1>
              <p> {description}</p>
              <div className="flex p-6 min-h-min gap-2 ">
                {keywords.map((keyword) => (
                  <span className=" dark:bg-themedDark3 hover:text-themedOrange text-sm bg-orange-100 bg-opacity-50 py-2 px-3 rounded-md w-fit">
                    {keyword}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-4 right-6 text-themedOrange dark:text-white dark:hover:text-themedOrange">
                <a href={link}>
                  <PlayCircleFilled className=" sm:text-5xl text-3xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


