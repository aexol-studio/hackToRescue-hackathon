"use client";
import { cx } from "@/utils";
import { X } from "lucide-react";
import React from "react";
import { useAppStore } from "@/stores";

export const Education = () => {
  const { setEducationOpen, educationOpen } = useAppStore(state => ({
    educationOpen: state.educationOpen,
    setEducationOpen: state.setEducationOpen,
  }));
  return (
    <>
      <div
        className={cx(
          "absolute h-3/4 top-full w-full px-6 duration-700 transition-transform  z-50 ",
          educationOpen && "-translate-y-full "
        )}>
        <div className="w-full h-full overflow-hidden border-[#FF7000] border-[1px] rounded-t-xl ">
          <div className="relative w-full h-full bg-light-800  scrollbar-thin scrollbar-thumb-rounded-full  scrollbar-thumb-[#FF7000] border-b-none   text-dark-500 p-10 overflow-y-auto">
            <X
              onClick={() => setEducationOpen(false)}
              className="absolute right-5 top-5 cursor-pointer text-dark-500"
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
            Education Education Education Education Education Education Education Education
            Education Education Education Education Education Education Education Education
            Education Education Education Education Education Education Education Education
            Education Education Education Education Education Education Education Education
            Education Education Education Education Education Education Education Education
            Education Education
          </div>
        </div>
      </div>
    </>
  );
};
