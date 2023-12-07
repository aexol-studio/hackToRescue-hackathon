"use client";

import { useAppStore } from "@/stores";
import { cx } from "@/utils";
import { Info } from "lucide-react";
import React from "react";

export const ToggleEducation = () => {
  const { setEducationOpen, educationOpen } = useAppStore((state) => ({
    setEducationOpen: state.setEducationOpen,
    educationOpen: state.educationOpen,
  }));
  return (
    <div className="absolute top-2 left-2 lg:top-8 lg:left-8 z-40 ">
      <Info
        onClick={() => setEducationOpen(true)}
        className={cx(
          "animate-pulse cursor-pointer text-light-700",
          educationOpen && "hidden"
        )}
      />
    </div>
  );
};
