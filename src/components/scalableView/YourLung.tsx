import { useAppStore } from "@/stores";
import { FC, useState } from "react";
import {
  ChevronDown,
  CloudDrizzle,
  Cloudy,
  Droplets,
  Info,
  MapPin,
  Thermometer,
  Wind,
} from "lucide-react";
import { cx } from "@/utils";
import { Chart } from "./Chart";

const DAYS = Array.from({ length: 14 }, (_, i) => i + 1);

export const YourLung = () => {
  const { airQuality, scaleLounge, setScaleLounge, selectedStation, newAutoCompleteResult } =
    useAppStore(
      ({ airQuality, scaleLounge, setScaleLounge, selectedStation, newAutoCompleteResult }) => ({
        airQuality,
        setScaleLounge,
        scaleLounge,
        selectedStation,
        newAutoCompleteResult,
      })
    );
  const [selectedNumber, setSelectedNumber] = useState(1);

  return (
    <div className="w-full">
      <div
        className={cx(
          `transition-all duration-500 flex flex-col ease-in-out bg-white rounded-3xl text-black overflow-hidden opacity-100 w-full `
        )}>
        <div className="px-7 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MapPin /> Stacja: {newAutoCompleteResult?.name ?? "-"}
          </div>
          <div className="flex">
            <div>Dzień 7</div>
            <ChevronDown
              onClick={() => setScaleLounge(!scaleLounge)}
              className={cx("cursor-pointer", !scaleLounge && "rotate-180")}
            />
          </div>
        </div>
        <div
          className={cx(
            "bg-[#f7f7f7] p-6 grid grid-cols-2 gap-6 max-h-[1000px] transition-all transition-max-height duration-[1000ms] ",
            !scaleLounge && "max-h-0 p-0"
          )}>
          <div className="bg-white flex flex-col  rounded-2xl">
            <div className=" py-2 flex items-center px-6 justify-between border-b">
              <span>Województwo</span>
              <span>{newAutoCompleteResult?.state ?? "-"}</span>
            </div>
            <div className="white p-4 px-6 pb-6 border-b">
              W tym wojewodztwie jest cos fajnego ale tez i nie fajnego i lasdlasdlasdmsdgojk
              nasdfojknfojkraskomnpasdf
            </div>
            <div className="px-6 py-6 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Thermometer /> <span className="font-bold">-2</span> <span>temperatura</span>{" "}
                <Info className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2">
                <Cloudy /> <span className="font-bold">całkowite</span> <span>zachmurzenie</span>{" "}
                <Info className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2">
                <CloudDrizzle /> <span className="font-bold">-2</span> <span>opady</span>{" "}
                <Info className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2">
                <Wind /> <span className="font-bold">5km/h</span> <span>wiatr</span>{" "}
                <Info className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2">
                <Thermometer /> <span className="font-bold">-2</span> <span>ciśnienie wyż/niż</span>{" "}
                <Info className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2">
                <Droplets /> <span className="font-bold">-2</span> <span>wilgotność</span>{" "}
                <Info className="w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="bg-white">
            <Chart />
          </div>
        </div>
      </div>
    </div>
  );
};
