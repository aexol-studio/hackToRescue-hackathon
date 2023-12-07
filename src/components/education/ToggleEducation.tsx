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
    <div className="flex justify-center ">
      <div
        className={cx(
          "z-40 cursor-pointer w-fit justify-center items-center",
          educationOpen && "hidden"
        )}
        onClick={() => setEducationOpen(true)}>
        <div className="px-10 py-2 bg-black  rounded-full text-white justify-center items-center">
          <span className="font-medium text-xs whitespace-nowrap font-jost">Chcę to zmienić</span>
        </div>
      </div>
    </div>
  );
};
