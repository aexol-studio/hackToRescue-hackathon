"use client";
import { cx } from "@/utils";
import { X } from "lucide-react";
import React from "react";
import { ToggleEducation } from "./ToggleEducation";
import { useAppStore } from "@/stores";

export const Education = () => {
  const { setEducationOpen, educationOpen } = useAppStore((state) => ({
    educationOpen: state.educationOpen,
    setEducationOpen: state.setEducationOpen,
  }));
  return (
    <>
      <ToggleEducation />
      <div
        className={cx(
          "absolute h-screen -left-full w-full top-1/2 py-6 pr-6 -translate-y-1/2 duration-700 transition-transform  z-50 ",
          educationOpen && "translate-x-full "
        )}
      >
        <div className="relative w-full h-full bg-dark-500 border-[1px] scrollbar-thin scrollbar-thumb-rounded-full  scrollbar-thumb-[#FF7000] border-l-none border-light-700 rounded text-light-700 overflow-y-auto">
          <X
            onClick={() => setEducationOpen(false)}
            className="absolute right-5 top-5 cursor-pointer text-light-700"
          />
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          <div>Education</div>
          Education Education Education Education Education Education Education
          Education Education Education Education Education Education Education
          Education Education Education Education Education Education Education
          Education Education Education Education Education Education Education
          Education Education Education Education Education Education Education
          Education Education Education Education Education Education Education
        </div>
      </div>
    </>
  );
};
