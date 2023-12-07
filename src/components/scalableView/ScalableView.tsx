import { cx } from "@/utils";
import React, { FC, useState } from "react";
import { Search } from "../search/Search";
import { Canvas2 } from "../canvas2/Canvas2";
import { YourLung } from "./YourLung";
import { useAppStore } from "@/stores";
import { airQualityColors } from "@/constans";
import { Globe2 } from "lucide-react";

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
      <div
        className="z-[1100] absolute right-8 top-8 p-1 bg-white rounded-full cursor-pointer"
        onClick={() => {
          selectStation(null);
          setShowLunge(false);
        }}>
        <Globe2 color="black" />
      </div>
      <div className="absolute left-1/2 z-[1000]">
        <Search />
      </div>
      <Canvas2 />
      <div className="absolute left-1/2 w-auto -translate-x-1/2 bottom-20 z-[1100] justify-center">
        <YourLung />
      </div>
    </div>
  );
};
