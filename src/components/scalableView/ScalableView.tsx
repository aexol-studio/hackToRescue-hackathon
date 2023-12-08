import { cx } from "@/utils";
import React, { FC, useState } from "react";
import { Canvas2 } from "../canvas2/Canvas2";
import { YourLung } from "./YourLung";
import { useAppStore } from "@/stores";
import { airQualityColors } from "@/constans";
import { ChevronDown, Globe2 } from "lucide-react";
import { Search } from "../search/Search";
import { AutoCompleteSearch } from "../search/AutoComplete";
import { useLazyQuery } from "@apollo/client";
import { GET_LUNGE_POLLUTION } from "@/graphql/queries";

export const ScalableView: FC<{ show: boolean }> = ({ show }) => {
  const [openSelect, setOpenSelect] = useState<{ open: boolean; value: null | number }>({
    open: false,
    value: null,
  });
  const {
    airQuality,
    selectStation,
    showLounge,
    setShowLunge,
    newAutoCompleteResult,
    setLungPollution,
  } = useAppStore(
    ({
      airQuality,
      selectStation,
      showLounge,
      setShowLunge,
      newAutoCompleteResult,
      setLungPollution,
    }) => ({
      airQuality,
      selectStation,
      showLounge,
      setShowLunge,
      newAutoCompleteResult,
      setLungPollution,
    })
  );
  const [getLungPollution] = useLazyQuery(GET_LUNGE_POLLUTION, {
    onCompleted: d => setLungPollution(d.getIndexForCity),
  });
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

      <div className="absolute left-1/2 w-full md:w-max flex justify-center items-center gap-4 -translate-x-1/2 top-6 z-[1000]">
        <AutoCompleteSearch clearDay={() => setOpenSelect({ open: false, value: null })} />
        <div className="p-1 bg-white rounded-full cursor-pointer">
          <Globe2 onClick={() => setShowLunge(false)} />
        </div>
      </div>
      <Canvas2 />
      <div className="absolute left-1/2 w-full -translate-x-1/2 bottom-4 md:bottom-10  justify-center px-2">
        <YourLung />
      </div>
      <div className="absolute top-6 right-7 bg-white border-[#FF7000] border-[1px] p-3 rounded-3xl  cursor-pointer select-none">
        <div
          className={cx("flex gap-2 items-center text-2xl", !newAutoCompleteResult && "opacity-50")}
          onClick={() => {
            if (!newAutoCompleteResult) return;
            setOpenSelect(p => ({ ...p, open: !p.open }));
          }}>
          <span>Dzień</span>
          <span className="text-3xl font-bold">{openSelect.value ?? "-"}</span>
          <ChevronDown className={cx(openSelect.open && "rotate-180")} />
        </div>
        <div className={cx("flex-col hidden", openSelect.open && "flex")}>
          {Array(14)
            .fill(null)
            .map((_, i) => (
              <span
                className="text-xl text-center hover:bg-light-800"
                key={i}
                onClick={() => {
                  setOpenSelect({ open: false, value: i + 1 });
                  if (newAutoCompleteResult?.name)
                    getLungPollution({
                      variables: { city: newAutoCompleteResult?.name, day: i + 1 },
                    });
                }}>
                {i + 1}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};
