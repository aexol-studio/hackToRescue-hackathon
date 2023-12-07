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
    <div
      className={cx(
        "absolute top-2 left-2 lg:top-8 lg:left-8 z-40 animate-pulse cursor-pointer",
        educationOpen && "hidden"
      )}
      onClick={() => setEducationOpen(true)}
    >
      <div className="p-2 md:px-10 md:py-3 bg-black  rounded-full text-white justify-center items-center">
        <span className="font-normal text-sm hidden md:flex">
          Dowiedz się więcej
        </span>
        <Info
          onClick={() => setEducationOpen(true)}
          className={cx(
            "text-light-700 sm:flex md:hidden",
            educationOpen && "hidden"
          )}
        />
      </div>
    </div>
  );
};
