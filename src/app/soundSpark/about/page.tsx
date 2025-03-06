"use client";

import { DescriptionCard } from "@/components/component/descriptionCard";
import { DescriptionCard2 } from "@/components/component/descriptionCard2";

export default function About() {
  return (
    <div className="text-black dark:text-white flex min-h-screen flex-col items-center text-neutral-content">
      <div className="flex p-6 ">
        <a
          href="https://www.gnu.org/licenses/gpl-3.0.txt"
          className="text-sm font-mono underline hover:text-gray-500"
        >
          GNU General Public License v3.0
        </a>
      </div>
    </div>
  );
}
