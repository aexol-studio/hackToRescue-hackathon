import { cx } from "@/utils";
import React, { FC, useEffect, useState } from "react";
import { Canvas2 } from "../canvas2/Canvas2";
import { YourLung } from "./YourLung";
import { useAppStore } from "@/stores";
import { airQualityColors } from "@/constans";
import { ChevronDown, Globe2 } from "lucide-react";
import { Search } from "../search/Search";
import { AutoCompleteSearch } from "../search/AutoComplete";
import { useLazyQuery } from "@apollo/client";
import { GET_LUNGE_POLLUTION } from "@/graphql/queries";
import { HoverInfo } from "../search/HoverInfo";
import { ToggleEducation } from "../education/ToggleEducation";

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
    setMapZoomOutTrigger,
  } = useAppStore(
    ({
      airQuality,
      selectStation,
      showLounge,
      setShowLunge,
      newAutoCompleteResult,
      setLungPollution,
      setMapZoomOutTrigger,
    }) => ({
      airQuality,
      selectStation,
      showLounge,
      setShowLunge,
      newAutoCompleteResult,
      setLungPollution,
      setMapZoomOutTrigger,
    })
  );
  const [getLungPollution] = useLazyQuery(GET_LUNGE_POLLUTION, {
    onCompleted: d => setLungPollution(d.getIndexForCity),
  });
  const [canShowLounge, setCanShowLounge] = useState(false);

  useEffect(() => {
    if (show) {
      setTimeout(() => setCanShowLounge(true), 1000);
    } else {
      setCanShowLounge(false);
    }
    return () => {
      setCanShowLounge(false);
    };
  }, [show]);

  return (
    <div
      className={cx(
        "w-full h-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-[60]",
        showLounge && "z-[100]"
      )}>
      <div
        className={cx(
          "w-full h-full absolute top-0 scale-0 left-0 bg-[#DA0000] opacity-0 duration-500 delay-300",
          showLounge && "opacity-[80%] scale-[100%]"
        )}
      />
      <div className="z-[2137] fixed left-[48px] top-[48px] p-1 bg-white rounded-full cursor-pointer">
        <HoverInfo infoText="Mapa">
          <Globe2
            onClick={() => {
              setShowLunge(false);
              setMapZoomOutTrigger(true);
              selectStation(null);
            }}
          />
        </HoverInfo>
      </div>
      <div className="absolute left-1/2 w-full md:w-max flex justify-center items-center gap-4 -translate-x-1/2 top-[48px] z-[1000]">
        <div className="w-[320px]">
          <AutoCompleteSearch clearDay={() => setOpenSelect({ open: false, value: null })} />
        </div>
      </div>
      {canShowLounge && <Canvas2 />}
      <div className="absolute left-1/2 w-full -translate-x-1/2 bottom-4 md:bottom-10  justify-center px-2">
        <YourLung />
        <div className="mt-[40px]">
          <ToggleEducation />
        </div>
      </div>
      <div className="absolute top-28 lg:top-6 lg:right-7 right-1/2 translate-x-1/2 lg:translate-x-0 cursor-pointer select-none ">
        <div
          className={cx("flex gap-2 items-center text-2xl", !newAutoCompleteResult && "opacity-50")}
          onClick={() => {
            if (!newAutoCompleteResult) return;
            setOpenSelect(p => ({ ...p, open: !p.open }));
          }}>
          {/* <ChevronDown className={cx(openSelect.open && "rotate-180")} /> */}
        </div>
        <div className={cx(" grid-cols-7 gap-[4px] grid bg-[#ebebeb] p-[4px] rounded-[8px]")}>
          {Array(14)
            .fill(null)
            .map((_, i) => (
              <span
                className={cx(
                  "text-base text-center hover:bg-light-800 p-[10px] bg-white rounded-[8px] font-bold",
                  openSelect.value === i + 1 && "bg-[#a8a8a8]"
                )}
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
