import { cx } from "@/utils";
import React, { FC, useState } from "react";
import { Search } from "../search/Search2";
import { Canvas2 } from "../canvas2/Canvas2";
import { YourLung } from "./YourLung";
import { useAppStore } from "@/stores";
import { airQualityColors } from "@/constans";
import { Globe2 } from "lucide-react";

export const ScalableView: FC<{ show: boolean }> = ({ show }) => {
  const { airQuality, selectStation, showLounge } = useAppStore(
    ({ airQuality, selectStation, showLounge }) => ({
      airQuality,
      selectStation,
      showLounge,
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

      <div className="absolute left-1/2 z-[1000]">
        <Search />
      </div>
      <Canvas2 />
      <div className="absolute left-1/2 w-full   -translate-x-1/2 bottom-10  justify-center px-7">
        <YourLung />
      </div>
    </div>
  );
};
