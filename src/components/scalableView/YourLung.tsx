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
  const {
    scaleLounge,
    setScaleLounge,
    setNewAutoCompleteResult,
    newAutoCompleteResult,
    setChartData,
    setSearchValue,
    selectStation,
    weather,
  } = useAppStore(
    ({
      airQuality,
      scaleLounge,
      setScaleLounge,
      selectedStation,
      newAutoCompleteResult,
      setChartData,
      setSearchValue,
      selectStation,
      setNewAutoCompleteResult,
      weather,
    }) => ({
      airQuality,
      setScaleLounge,
      scaleLounge,
      selectedStation,
      newAutoCompleteResult,
      setChartData,
      setSearchValue,
      selectStation,
      setNewAutoCompleteResult,
      weather,
    })
  );
  const [selectedNumber, setSelectedNumber] = useState(1);

  return (
    <div className="w-full ">
      <div
        className={cx(
          `transition-all duration-500 flex flex-col ease-in-out bg-white rounded-3xl text-black overflow-hidden opacity-100 w-full `
        )}>
        <div className="px-7 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 w-max">
            <MapPin /> <span className="w-max">Stacja: {newAutoCompleteResult?.name ?? "-"}</span>
          </div>
          <h1 className="w-full text-center">Wykres z ostatnich 14 dni (interwał pomiaru co 8h)</h1>
          <div className="flex">
            <ChevronDown
              onClick={() => {
                if (scaleLounge) {
                  setChartData(null);
                  setSearchValue(null);
                  selectStation(null);
                  setNewAutoCompleteResult(null);
                }
                setScaleLounge(!scaleLounge);
              }}
              className={cx("cursor-pointer", !scaleLounge && "rotate-180")}
            />
          </div>
        </div>
        <div
          className={cx(
            "bg-[#f7f7f7] p-6  flex gap-6 max-h-[1000px] transition-all transition-max-height duration-[1000ms] ",
            !scaleLounge && "max-h-0 p-0"
          )}>
          <div className="bg-white flex flex-col  rounded-2xl w-min">
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
                <Thermometer />{" "}
                <span className="font-bold ">
                  {weather?.temp ? `${Math.round((weather?.temp - 273.15) * 100) / 100} C` : "-"}
                </span>{" "}
                <span className="text-sm">temperatura</span> <Info className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2">
                <Cloudy />{" "}
                <span className="font-bold">{weather?.clouds ? `${weather.clouds}%` : "-"}</span>{" "}
                <span className="text-sm">zachmurzenie</span> <Info className="w-4 h-4" />
              </div>
              {/* <div className="flex items-center gap-2">
                <CloudDrizzle /> <span className="font-bold">-2</span> <span>opady</span>{" "}
                <Info className="w-4 h-4" />
              </div> */}
              <div className="flex items-center gap-2">
                <Wind />{" "}
                <span className="font-bold">
                  {weather?.windSpeed ? `${weather?.windSpeed}km/h` : "-"}
                </span>{" "}
                <span className="text-sm">wiatr</span> <Info className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2">
                <Thermometer />{" "}
                <span className="font-bold">
                  {weather?.pressure ? `${weather?.pressure}hPa` : "-"}
                </span>{" "}
                <span className="text-sm">ciśnienie</span> <Info className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2">
                <Droplets />{" "}
                <span className="font-bold">
                  {weather?.humidity ? `${weather?.humidity}%` : "-"}
                </span>{" "}
                <span className="text-sm">wilgotność</span> <Info className="w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="bg-white grow">{scaleLounge ? <Chart /> : null}</div>
        </div>
      </div>
    </div>
  );
};
