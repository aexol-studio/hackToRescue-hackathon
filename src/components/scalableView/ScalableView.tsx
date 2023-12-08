import { cx } from "@/utils";
import React, { FC, useState } from "react";
import { Canvas2 } from "../canvas2/Canvas2";
import { YourLung } from "./YourLung";
import { useAppStore } from "@/stores";
import { airQualityColors } from "@/constans";
import { Globe2 } from "lucide-react";
import { Search } from "../search/Search";
import { AutoCompleteSearch } from "../search/AutoComplete";

export const ScalableView: FC<{ show: boolean }> = ({ show }) => {
  const { airQuality, selectStation, showLounge, setShowLunge } = useAppStore(
    ({ airQuality, selectStation, showLounge, setShowLunge }) => ({
      airQuality,
      selectStation,
      showLounge,
      setShowLunge,
    })
  );

  return (
    <div
      className={cx(
        "w-full h-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  -z-[60] ",
        showLounge && "z-[100]"
      )}>
      <div
        className={cx(
          "w-full h-full absolute top-0 rounded-full scale-0 left-0 bg-black opacity-0 duration-1000 delay-300 ",
          showLounge && "opacity-[75%] scale-[300%]"
        )}></div>

      <div className="absolute left-1/2 top-6 -translate-x-1/2 flex items-center gap-2 z-[1000]">
        <AutoCompleteSearch />
        <div className="bg-white p-1 w-min rounded-full cursor-pointer">
          <Globe2 onClick={() => setShowLunge(false)} />
        </div>
      </div>
      <Canvas2 />
      <div className="absolute left-1/2 w-full -translate-x-1/2 bottom-10  justify-center px-7">
        <YourLung />
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-6 bg-white p-10">
        <div className="flex gap-2 items-center">
          <span>Dzień</span>
          <span className="text-2xl font-bold">1</span>
        </div>
      </div>
    </div>
  );
};
