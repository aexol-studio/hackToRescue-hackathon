"use client";
import { useAppStore } from "@/stores";
import React, { useState } from "react";

export const Timeline = () => {
  const [day, setDay] = useState(1);
  const { selectedStation } = useAppStore((state) => ({
    selectedStation: state.selectedStation,
  }));
  console.log(selectedStation);
  return (
    <div className="fixed top-0 left-32 p-8 bg-white">
      <div className="flex flex-col gap-4">
        <div className="flex w-full justify-between">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  i + 1 === day ? "bg-black" : "bg-gray-200"
                }`}
              />
            </div>
          ))}
        </div>
        <input
          type="range"
          min="1"
          max="14"
          value={day}
          onChange={(e) => setDay(Number(e.target.value))}
        />
      </div>
    </div>
  );
};
