"use client";

import { useAppStore } from "@/stores";
import { cx } from "@/utils";
import { Info } from "lucide-react";
import React from "react";

export const ToggleEducation = () => {
  const { setEducationOpen, educationOpen } = useAppStore(
    ({ setEducationOpen, educationOpen }) => ({
      setEducationOpen,
      educationOpen,
    })
  );

  return (
    <div className="flex justify-center">
      <div
        className={cx(
          "z-40 animate-pulse cursor-pointer w-fit justify-center",
          educationOpen && "hidden"
        )}
        onClick={() => setEducationOpen(true)}>
        <div className="p-2 md:px-10 md:py-3 bg-black  rounded-full text-white justify-center items-center">
          <span className="font-normal text-sm hidden md:flex whitespace-nowrap">Change it</span>
          <Info
            onClick={() => setEducationOpen(true)}
            className={cx("text-light-700 sm:flex md:hidden", educationOpen && "hidden")}
          />
        </div>
      </div>
    </div>
  );
};
