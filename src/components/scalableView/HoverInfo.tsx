import React, { FC, PropsWithChildren } from "react";

interface HoverInfoP extends PropsWithChildren {
  text: string;
}

export const HoverInfo: FC<HoverInfoP> = ({ children, text }) => {
  return (
    <div className="group relative">
      {children}

      <div className="absolute text-sm bottom-full left-full p-1 border bg-white rounded-lg hidden group-hover:block">
        {text}
      </div>
    </div>
  );
};
