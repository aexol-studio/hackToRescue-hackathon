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
          "absolute h-3/4 top-full w-full px-6 duration-700 transition-transform  z-50 ",
          educationOpen && "-translate-y-full "
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
