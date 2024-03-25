import Image from "next/image";
import React, { FC } from "react";

interface ProjectCardProps {
  title: string;
  link: string;
  imgUrl: string;
  description: string;
}

export const ProjectCard: FC<ProjectCardProps> = ({
  title,
  link,
  imgUrl,
  description,
}) => {
  return (
    <div className="md:w-3/4 w-full text-purple-500 dark:text-white rounded-3xl">
      <div className="bg-purple-200 dark:bg-gray-800 w-full block shadow-2xl rounded-3xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="relative h-fit">
            <div className="absolute w-full h-20 top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt "></div>
            <a
              href={link}
              className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center text-xl md:text-4xl font-bold text-white transition-all duration-200"
            >
              Try it now
            </a>

            <Image
              src={imgUrl}
              alt=""
              className="rounded-t-lg"
              width={600}
              height={300}
            />
          </div>
          <div className="p-6 min-h-min">
            <h2 className="font-bold mb-2 text-2xl text-purple-800">{title}</h2>
            <p className="text-purple-700 dark:text-purple-900 mb-4 line-clamp-2">
              {description}
            </p>
            <button className=" dark:bg-gray-600 hover:text-purple-900 text-sm bg-purple-100 bg-opacity-50 p-2 rounded-md w-full">
              Try it now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
