import React, { FC, PropsWithChildren } from "react";

interface HoverInfoI extends PropsWithChildren {
  infoText: string;
}

export const HoverInfo: FC<HoverInfoI> = ({ infoText, children }) => {
  return (
    <div className="group relative flex">
      {children}
      <div className="text-light-700 bg-dark-500 border-light-700 absolute left-1/2 top-[calc(100%+1rem)] hidden w-max -translate-x-1/2 rounded border p-2 text-sm font-extralight group-hover:block">
        <div className=" bg-dark-500 border-light700 absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t " />
        {infoText}
      </div>
    </div>
  );
};
