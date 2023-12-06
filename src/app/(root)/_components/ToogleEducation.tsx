"use client";

import { useAppStore } from "@/stores/useAppStore";
import { cx } from "@/utlis";
import { Info } from "lucide-react";
import React from "react";

export const ToogleEducation = () => {
  const { setEducationOpen, educationOpen } = useAppStore();
  return (
    <div className="absolute top-3 left-3 z-50 ">
      <Info
        onClick={() => setEducationOpen(true)}
        className={cx(" cursor-pointer", educationOpen && "hidden")}
      />
    </div>
  );
};
