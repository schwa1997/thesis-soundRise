import React, { FC } from "react";
interface boxContainerProps {
  className: string;
}
export const SunIcon: FC<boxContainerProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="5" fill="#FCD34D" />
      <path
        d="M12 2V0M12 24V22M4.93 4.93L3.51 3.51M20.49 20.49L19.07 19.07M2 12H0M24 12H22M4.93 19.07L3.51 20.49M19.07 4.93L20.49 3.51M12 22V24M12 0V2M19.07 19.07L20.49 20.49M4.93 4.93L3.51 3.51M19.07 4.93L20.49 3.51M4.93 19.07L3.51 20.49M19.07 19.07L20.49 20.49"
        stroke="#FCD34D"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SunIcon;
