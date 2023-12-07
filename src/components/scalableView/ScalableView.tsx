import { cx } from "@/utils";
import React, { FC } from "react";
import { Search } from "../search/Search";
import { Canvas2 } from "../canvas2/Canvas2";
import { YourLung } from "./YourLung";
export const ScalableView: FC<{ show: boolean }> = ({ show }) => {
  return (
    <div
      className={cx(
        "w-full h-screen bg-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all scale-0 duration-1000 z-[100] ",
        show && "scale-100"
      )}
    >
      <button className="absolute top- left-0 z-[100] bg-white">SCALE</button>
      <Search />
      <Canvas2 />
      <YourLung />
    </div>
  );
};
