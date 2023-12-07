import { cx } from "@/utils";
import React, { FC, useState } from "react";
import { Search } from "../search/Search";
import { Canvas2 } from "../canvas2/Canvas2";
import { YourLung } from "./YourLung";
import { useAppStore } from "@/stores";
import { airQualityColors } from "@/constans";
import { Globe2 } from "lucide-react";

export const ScalableView: FC<{ show: boolean }> = ({ show }) => {
  const [test, setTest] = useState(false);
  const {airQuality,selectStation}=useAppStore(({airQuality, selectStation})=>({airQuality,selectStation}))

  return (
    <div
      className={cx(
        "w-full h-screen bg-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all scale-0 duration-1000 z-[100] ",
        show && "scale-100", airQuality?.st.indexLevel ? airQualityColors[airQuality.st.indexLevel.id] : "bg-black"
      )}
    >
      <div className="z-[1100] absolute left-8 top-8 p-1 bg-white rounded-full cursor-pointer" onClick={()=>selectStation(null)}>
      <Globe2 color="black"/>
      </div>
      <div className="absolute left-1/2 z-[1000]">
      <Search />
      </div>
      <Canvas2 test={test} />
      <div className="absolute right-1/2 bottom-[15%]"  onClick={() => setTest((p) => !p)}>
      <YourLung open={test}/>
      </div>
    </div>
  );
};
