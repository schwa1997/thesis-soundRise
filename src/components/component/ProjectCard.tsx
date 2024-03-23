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
    <div className="w-3/4 text-purple-500 dark:text-white rounded-3xl">
      <a
        href={link}
        target="_self"
        className="bg-purple-200 dark:bg-gray-800 w-full block shadow-2xl rounded-3xl"
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="h-fit">
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
            <p className="text-purple-700 dark:text-purple-900 mb-4 line-clamp-2">{description}</p>
            <button className=" dark:bg-gray-600 hover:text-purple-900 text-sm bg-purple-100 bg-opacity-50 p-2 rounded-md w-full">
              Try it now!
            </button>
          </div>
        </div>
      </a>
    </div>
  );
};
