import React, { FC, useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  title: string;
  value: number;
  minValue: number;
  maxValue: number;
}

export const ProgressBar: FC<ProgressBarProps> = ({
  title,
  value,
  minValue,
  maxValue,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Ensure the value is within the range of 0 to 500
    const normalizedValue = Math.max(minValue, Math.min(value, maxValue));
    setProgress(normalizedValue);
  }, [maxValue, minValue, value]); // Run this effect whenever the value prop changes

  return (
    <div className="">
      <p className="px-2 py-1 text-left text-xs font-medium uppercase tracking-wider">{title}</p>
      <div className="flex items-center justify-between rounded-lg h-10 px-2">
        <div className="relative h-6 w-full rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-orange-500 transition-all duration-500"
            style={{ width: `${(progress / (maxValue - minValue)) * 100}%` }}
          ></div>
          <span className="text-sm absolute top-1/2 dark:text-white left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black">
            {progress}
          </span>
        </div>
      </div>
    </div>
  );
};
