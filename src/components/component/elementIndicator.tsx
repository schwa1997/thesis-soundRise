import React from "react";

interface ElementIndicatorProps {
  title: string;
  elementStrings: string[]; // Array of note names
  indicatedElement: string; // Currently indicated note
}

const ElementIndicator: React.FC<ElementIndicatorProps> = ({
  title,
  elementStrings,
  indicatedElement,
}) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow-md">
      <thead className="bg-gray-50 dark:bg-slate-700">
        <tr>
          <th className="sm:px-6 sm:py-3 px-1 py-1 text-left text-xs font-medium uppercase tracking-wider">
            {title}
          </th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-slate-700 divide-gray-200 grid grid-cols-5 text-center ">
        {elementStrings.map((element, index) => (
          <tr
            key={element}
            className={
              element === indicatedElement
                ? "bg-orange-500"
                : " text-center"
            }
          >
            <td className="sm:text-sm text-sm p-2 flex place-content-center whitespace-nowrap">{element}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ElementIndicator;
