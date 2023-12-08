"use client";
import React, { useEffect } from "react";
import { AutoCompleteSearch } from "./search/AutoCompleteSearch";
import { ToggleEducation } from "./education/ToggleEducation";
import { useAppStore } from "@/stores";

export const WelcomeBox = () => {
  const { isMapMoving, isMapLoading, showLounge } = useAppStore(
    ({ isMapMoving, isMapLoading, showLounge }) => ({
      isMapMoving,
      isMapLoading,
      showLounge,
    })
  );
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
      <div
        className={`${
          !showLounge ? "opacity-1" : "translate-y-[-50vh] opacity-0"
        } relative grid gap-[22px] transition-all duration-500 ease-in-out`}>
        {isMapLoading && (
          <div className="absolute top-[-160px] left-[50%] translate-x-[-50%] w-[118px] h-[118px] mx-auto rounded-full border-[#F7F7F7] border-[2px]">
            <div className="animate-pulse w-full h-full flex justify-center items-center">
              <svg
                width="70"
                height="64"
                viewBox="0 0 70 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.155 12.6271H30.3645V20.2784V42.1392V53.6161L23.2597 64L6.86413 56.8952L0.852417 47.0579L6.86413 32.8484L16.155 12.6271Z"
                  fill="#F7F7F7"
                />
                <path
                  d="M16.155 12.6271H30.3645V20.2784V42.1392V53.6161L23.2597 64L6.86413 56.8952L0.852417 47.0579L6.86413 32.8484L16.155 12.6271Z"
                  fill="#141618"
                  fill-opacity="0.9"
                />
                <path
                  d="M53.7372 12.6271H39.5277V20.2784V42.1392V53.6161L46.6325 64L63.0281 56.8952L69.0398 47.0579L63.0281 32.8484L53.7372 12.6271Z"
                  fill="#F7F7F7"
                />
                <path
                  d="M53.7372 12.6271H39.5277V20.2784V42.1392V53.6161L46.6325 64L63.0281 56.8952L69.0398 47.0579L63.0281 32.8484L53.7372 12.6271Z"
                  fill="#141618"
                  fill-opacity="0.9"
                />
                <path
                  d="M28.3422 28.9217L28.3422 19.9021L33.0026 17.0616V0.286316H36.9972V17.0616L41.6576 19.9021V28.9217L34.9999 23.9271L28.3422 28.9217Z"
                  fill="white"
                />
                <path
                  d="M28.3422 28.9217L28.3422 19.9021L33.0026 17.0616V0.286316H36.9972V17.0616L41.6576 19.9021V28.9217L34.9999 23.9271L28.3422 28.9217Z"
                  fill="#303133"
                  fill-opacity="0.9"
                />
              </svg>
            </div>
          </div>
        )}
        <h1
          className={`select-none text-lg sm:text-3xl font-jost font-black text-black text-center whitespace-nowrap`}>
          Zobacz czym oddychasz. Zmień to!
        </h1>
        <AutoCompleteSearch disabled={isMapLoading} />
      </div>
      <div
        className={`${
          !showLounge ? "opacity-1" : "translate-y-[50vh] opacity-0"
        } transition-all duration-500 ease-in-out`}>
        <ToggleEducation />
      </div>
    </div>
  );
};
