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
import { voyages } from "@/constans/voyages";

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
        <div
          className="px-7 py-4 flex flex-col md:flex-row items-center justify-between select-none cursor-pointer"
          onClick={() => {
            setScaleLounge(!scaleLounge);
          }}>
          <div className="flex items-center gap-4 w-max">
            <MapPin /> <span className="w-max">Stacja: {newAutoCompleteResult?.name ?? "-"}</span>
          </div>
          {/* <h1 className="w-full text-center">Wykres z ostatnich 14 dni (interwał pomiaru co 8h)</h1> */}
          <div className="flex">
            <ChevronDown className={cx("cursor-pointer", !scaleLounge && "rotate-180")} />
          </div>
        </div>
        <div
          className={cx(
            "bg-[#f7f7f7] p-6  flex flex-col md:flex-row gap-6 max-h-[200px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-full  scrollbar-thumb-[#FF7000] md:max-h-[1000px] transition-all  duration-[500ms] ",
            !scaleLounge && "max-h-0 p-0 md:max-h-0"
          )}>
          <div className="bg-white flex flex-col  rounded-2xl w-full md:w-min">
            <div className=" py-2 flex md:flex-row flex-col items-center md:px-6 justify-between border-b">
              <span>Województwo</span>
              <span>
                {newAutoCompleteResult?.state
                  ? voyages.find(v =>
                      newAutoCompleteResult?.state.toLowerCase().includes(v.voyageEN?.toLowerCase())
                    )?.voyage
                  : "-"}
              </span>
            </div>
            <div className="white p-4 md:px-6 pb-6 border-b overflow-y-auto max-h-[150px] md:min-w-[300px]  scrollbar-thin scrollbar-thumb-rounded-full  scrollbar-thumb-[#FF7000]">
              {
                voyages.find(v =>
                  newAutoCompleteResult?.state.toLowerCase().includes(v.voyageEN?.toLowerCase())
                )?.data
              }
            </div>
            <div className="px-6 py-6 flex flex-col items-center md:items-start gap-3">
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
          <div className="bg-white grow hidden md:block">{scaleLounge ? <Chart /> : null}</div>
        </div>
      </div>
    </div>
  );
};
