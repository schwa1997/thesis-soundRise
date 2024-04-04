import React, { FC } from "react";
type link = { name: string; link: string };
interface boxContainerProps {
  Links: link[];
  title: string;
}
export const Item: FC<boxContainerProps> = ({ Links, title }) => {
  return (
    <ul>
      <h1 className="mb-1 font-semibold">{title}</h1>
      {Links.map((link) => (
        <li key={link.name}>
          <a
            className="text-gray-400 hover:text-themedOrange duration-300
          text-sm cursor-pointer leading-6"
            href={link.link}
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Item;
