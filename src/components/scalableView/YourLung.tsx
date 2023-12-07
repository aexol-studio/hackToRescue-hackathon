import { useAppStore } from "@/stores";
import { FC, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cx } from "@/utils";

const DAYS = Array.from({ length: 14 }, (_, i) => i + 1);

export const YourLung = () => {
  const { airQuality, scaleLounge, setScaleLounge, selectedStation } = useAppStore(
    ({ airQuality, scaleLounge, setScaleLounge, selectedStation }) => ({
      airQuality,
      setScaleLounge,
      scaleLounge,
      selectedStation,
    })
  );
  const [selectedNumber, setSelectedNumber] = useState(1);
  console.log(selectedStation);

  return (
    <div className="transition-max-height duration-500 ease-in-out">
      <button className="bg-white flex justify-center px-10 py-4 gap-1 md:gap-3 lg:gap-4 items-center cursor-pointer text-xs sm:text-lg md:text-lg lg:text-2xl font-semibold">
        <span className="text-black whitespace-nowrap">See what you breathe</span>
        {DAYS.map(day => (
          <span
            className={cx(
              "text-gray-500",
              selectedNumber === day && "md:text-4xl lg:text-7xl text-black"
            )}
            key={day}
            onClick={() => setSelectedNumber(day)}>
            {day}
          </span>
        ))}
        <span className="text-black whitespace-nowrap">DAYS IN</span>
        <ChevronDown
          className={cx(!scaleLounge && "rotate-180")}
          onClick={() => {
            setScaleLounge(!scaleLounge);
          }}
        />
      </button>
      <div
        className={cx(
          `transition-all duration-500 ease-in-out bg-black text-white pl-5 px-14 py-5 opacity-100`,
          scaleLounge ? "h-60" : "h-0 py-0"
        )}>
        <div
          className={cx(
            "flex h-0 opacity-0 transition-all duration-500 ease-in-out",
            scaleLounge && "opacity-100"
          )}>
          <div className="grid w-1/3"></div>
          <div className="grid w-1/3 gap-2">
            <span>{`Ozon: ${airQuality?.o3 ? airQuality.o3 : "Brak danych"}`}</span>
            <span>{`Dwutlenek azout: ${airQuality?.no2 ? airQuality.no2 : "Brak danych"}`}</span>
            <span>{`pm 10: ${airQuality?.pm10 ? airQuality.pm10 : "Brak danych"}`}</span>
            <span>{`pm 25: ${airQuality?.pm25 ? airQuality.pm25 : "Brak danych"}`}</span>
          </div>
          <div className="grid w-1/3"></div>
        </div>
      </div>
    </div>
  );
};
