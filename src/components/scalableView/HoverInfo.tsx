import React, { FC, PropsWithChildren } from "react";

interface HoverInfoP extends PropsWithChildren {
  text: string;
  text2?: string;
}

export const HoverInfo: FC<HoverInfoP> = ({ children, text, text2 }) => {
  return (
    <div className="group relative">
      {children}
      <div className="absolute text-sm bottom-full -left-[5rem]   border p-2 bg-white z-50 whitespace-nowrap rounded-lg  hidden lg:group-hover:block">
        <p>{text}</p>
        <p>{text2}</p>
      </div>
    </div>
  );
};
