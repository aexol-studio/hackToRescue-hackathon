"use client";
import React, { useEffect } from "react";
import { AutoCompleteSearch } from "./search/AutoCompleteSearch";
import { ToggleEducation } from "./education/ToggleEducation";
import { useAppStore } from "@/stores";

export const WelcomeBox = () => {
  const { isMapMoving } = useAppStore(({ isMapMoving }) => ({ isMapMoving }));
  const ref = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isMapMoving && ref.current) {
      ref.current.style.opacity = "1";
      ref.current.style.backdropFilter = "blur(0px)";
    } else if (ref.current) {
      ref.current.style.opacity = "0.6";
      ref.current.style.backdropFilter = "blur(8px)";
    }
  }, [isMapMoving]);
  return (
    <div
      ref={ref}
      className="sm:px-4 py-4 rounded-2xl transition-all duration-300 ease-in-out absolute w-fit sm:w-3/4 sm:w-auto left-1/2 bottom-1/2 -translate-x-1/2 translate-y-1/2 grid gap-10 ">
      <div className="grid gap-[22px]">
        <h1 className="select-none text-lg sm:text-3xl font-jost font-black text-black text-center whitespace-nowrap">
          Zobacz czym oddychasz. Zmień to!
        </h1>
        <AutoCompleteSearch />
      </div>
      <ToggleEducation />
    </div>
  );
};
