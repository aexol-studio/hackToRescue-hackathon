import React, { FC, useEffect, useRef, useState } from "react";

import { cx } from "@/utils";
import { WeatherType, useAppStore } from "@/stores";
import { X } from "lucide-react";
import { useLazyQuery } from "@apollo/client";
import { GET_CITY_AIR_QUALITY, GET_LUNGE_POLLUTION, GET_WEATHER } from "@/graphql/queries";
import { set, sub } from "date-fns";
import { NewAutoCompleteResult } from "@/types";
import { GeoLocalizationButton } from "./GeoLocationButton";
import { HoverInfo } from "./HoverInfo";

export const AutoCompleteSearch: FC<{ clearDay: () => void }> = ({ clearDay }) => {
  const {
    searchResults,
    selectStation,
    searchValue,
    setSearchValue,
    newAutoCompleteResult,
    setNewAutoCompleteResult,
    setChartData,
    setScaleLounge,
    setWeather,
    setLungPollution,
    selectedStation,
  } = useAppStore(
    ({
      setWeather,
      searchResults,
      selectStation,
      selectedStation,
      searchValue,
      setSearchValue,
      newAutoCompleteResult,
      setNewAutoCompleteResult,
      setChartData,
      setScaleLounge,
      setLungPollution,
    }) => ({
      setWeather,
      searchResults,
      selectStation,
      selectedStation,
      searchValue,
      setSearchValue,
      newAutoCompleteResult,
      setNewAutoCompleteResult,
      setChartData,
      setScaleLounge,
      setLungPollution,
    })
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [getLounge] = useLazyQuery(GET_LUNGE_POLLUTION, {
    onCompleted: d => setLungPollution(d.getIndexForCity),
  });
  const [getWeather] = useLazyQuery(GET_WEATHER, {
    onCompleted: d => setWeather(d.getRealTimeWeather as WeatherType),
  });
  const [getCityAirQuality] = useLazyQuery(GET_CITY_AIR_QUALITY, {
    onCompleted: d => {
      // const reducedArr = d.getCityParameters.reduce(([acc,curr])=>)
      const reducedArr = d.getCityParameters.reduce(
        (acc, curr) => {
          if (curr.kind === "AUTOMATIC") {
            curr.parameters.forEach(d => {
              const p = {
                time: d.time,
                no2: d.no2 ? -d.no2 : 0,
                o3: d.o3 ? -d.o3 : 0,
                pm1: d.pm1 ? -d.pm1 : 0,
                pm2p5: d.pm2p5 ? -d.pm2p5 : 0,
                pm10: d.pm10 ? -d.pm10 : 0,
                pm25: d.pm25 ? -d.pm25 : 0,
                so2: d.so2 ? -d.so2 : 0,
              };
              acc.AUTOMATIC.push(p);
            });
          }

          if (curr.kind === "OPEN_WEATHER") {
            curr.parameters.forEach(d => {
              const p = {
                time: d.time,
                no2: d.no2 ? -d.no2 : 0,
                o3: d.o3 ? -d.o3 : 0,
                pm1: d.pm1 ? -d.pm1 : 0,
                pm2p5: d.pm2p5 ? -d.pm2p5 : 0,
                pm10: d.pm10 ? -d.pm10 : 0,
                pm25: d.pm25 ? -d.pm25 : 0,
                so2: d.so2 ? -d.so2 : 0,
              };
              acc.OPEN_WEATHER.push(p);
            });
          }
          if (curr.kind === "MANUAL") {
            curr.parameters.forEach(d => {
              const p = {
                time: d.time,
                no2: d.no2 ? -d.no2 : 0,
                o3: d.o3 ? -d.o3 : 0,
                pm1: d.pm1 ? -d.pm1 : 0,
                pm2p5: d.pm2p5 ? -d.pm2p5 : 0,
                pm10: d.pm10 ? -d.pm10 : 0,
                pm25: d.pm25 ? -d.pm25 : 0,
                so2: d.so2 ? -d.so2 : 0,
              };
              acc.MANUAL.push(p);
            });
          }
          return acc;
        },
        {
          AUTOMATIC: [],
          OPEN_WEATHER: [],
          MANUAL: [],
        } as {
          AUTOMATIC: any;
          OPEN_WEATHER: any;
          MANUAL: any;
        }
      );

      setChartData(reducedArr);
    },
  });

  const handleChangeStation = (option: NewAutoCompleteResult) => {
    getLounge({ variables: { city: option.name, day: 1 } });

    getWeather({
      variables: {
        city: option.name,
        // @ts-ignore
        lat: option.stations[0].location.lat,
        // @ts-ignore
        long: option.stations[0].location.long,
      },
    });
    setSearchValue(option.name);
    setNewAutoCompleteResult(option as NewAutoCompleteResult);
    getCityAirQuality({
      variables: {
        city: option.name,
        startDate: set(sub(new Date(), { days: 14 }), { hours: 0 }).toISOString(),
        endDate: set(new Date(), { hours: 24 }).toISOString(),
        interval: 8,
      },
    });
    //som corsy ?
    setIsSearchOpen(p => !p);
  };

  useEffect(() => {
    if (selectedStation) {
      handleChangeStation({
        location: {
          lat: selectedStation.location.lat,
          long: selectedStation.location.long,
        },
        name: selectedStation.name,
        state: selectedStation.state,
        stations: [{ location: selectedStation.location, state: selectedStation.state }],
      });
    }
  }, [selectedStation]);

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!listRef.current || listRef.current.contains(e.target as Node)) {
        return;
      }
      setIsSearchOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside, { capture: false });
    return () => document.removeEventListener("mousedown", handleClickOutside, { capture: false });
  }, []);

  useEffect(() => {}, []);
  return (
    <div ref={listRef} className="w-full h-[50px] z-[1200] ">
      <div className="bg-white rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
        <div className="relative">
          <div className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex gap-2 items-center">
            <HoverInfo infoText="Geolokalizacja">
              <GeoLocalizationButton />
            </HoverInfo>
          </div>
          <input
            value={searchValue || ""}
            ref={inputRef}
            type="text"
            placeholder="Wpisz lub wybierz miasto"
            onChange={e => setSearchValue(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
            className={cx(
              "text-base font-jost text-black w-full px-[1.2rem] py-[0.8rem] focus:outline-none bg-transparent rounded-3xl"
            )}
          />
        </div>
        <div className="rounded-b-3xl overflow-hidden ">
          <div
            style={{ height: `${isSearchOpen ? `${searchResults.length * 37}px` : "0"}` }}
            className={cx(
              "transition-all duration-700 ease-in-out scrollbar-thumb-rounded-full scrollbar-thin max-h-[120px] lg:max-h-[256px] overflow-y-auto"
            )}>
            {searchResults.map((option, idx) => {
              console.log(option);
              const { name } = option;
              return (
                <div
                  key={name + idx}
                  className={cx(
                    "text-black flex flex-col px-[1.2rem] py-[0.4rem] hover:bg-gray-200 cursor-pointer"
                  )}
                  onClick={() => handleChangeStation(option)}>
                  <span className={cx("select-none")}>{name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
