"use client";

import { useAppStore } from "@/stores/useAppStore";
import { cx } from "@/utlis";
import { X } from "lucide-react";
import React from "react";

export const Education = () => {
  const { setEducationOpen, educationOpen } = useAppStore();
  return (
    <div
      className={cx(
        "bg-white rounded absolute h-[90dvh] left-0 w-[95dvw] top-1/2 -translate-y-1/2 transition-transform duration-700",
        !educationOpen && "-translate-x-full"
      )}>
      <X
        onClick={() => setEducationOpen(false)}
        className="text-black absolute right-5 top-5 cursor-pointer"
      />
      Education
    </div>
  );
};
