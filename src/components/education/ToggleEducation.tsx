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
    <div className="select-none flex justify-center ">
      <div
        className={cx(
          "z-40 cursor-pointer w-fit justify-center items-center",
          educationOpen && "hidden"
        )}
        onClick={() => setEducationOpen(true)}>
        <div className="px-6 pt-[8px] pb-[12px] bg-black  rounded-full text-white justify-center items-center">
          <span className="font-medium text-sm tracking-widest whitespace-nowrap font-jost">
            Chcę to zmienić
          </span>
        </div>
      </div>
    </div>
  );
};
