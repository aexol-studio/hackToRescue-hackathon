"use client";

import React, { useEffect, useRef, useState } from "react";

import { cx } from "@/utils";
import { NewAutoCompleteResult, useAppStore } from "@/stores";
import { useLazyQuery } from "@apollo/client";
import { GET_CITY_AIR_QUALITY } from "@/graphql/queries";
import { GeoLocalizationButton } from "./GeoLocationButton";
import { HoverInfo } from "./HoverInfo";
import { set } from "date-fns";

export const AutoCompleteSearch = () => {
  const { searchResults, searchValue, setSearchValue, setNewAutoCompleteResult, showLounge, goTo } =
    useAppStore(
      ({
        searchResults,
        searchValue,
        setSearchValue,
        setNewAutoCompleteResult,
        showLounge,
        goTo,
      }) => ({
        searchResults,
        searchValue,
        setSearchValue,
        setNewAutoCompleteResult,
        showLounge,
        goTo,
      })
    );
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeStation = (option: NewAutoCompleteResult) => {
    const { name } = option;
    setSearchValue(name);
    setNewAutoCompleteResult(option as NewAutoCompleteResult);
    setIsSearchOpen(p => !p);
    if (showLounge) {
      getCityAirQuality({
        variables: {
          city: name,
          startDate: set(new Date(), { hours: 0 }).toISOString(),
          endDate: set(new Date(), { hours: 24 }).toISOString(),
        },
      });
    } else {
      goTo("station");
    }
  };

  const [getCityAirQuality] = useLazyQuery(GET_CITY_AIR_QUALITY, {
    onCompleted: d => {
      // const reducedArr = d.getCityParameters.reduce(([acc,curr])=>)

      console.log(d);
    },
  });

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

  return (
    <div ref={listRef} className="w-full h-[50px] z-[1200] ">
      <div className="bg-white rounded-3xl">
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
            className={cx(
              "transition-[height] duration-700 ease-in-out scrollbar-thumb-rounded-full scrollbar-thin",
              isSearchOpen ? "h-[258px] overflow-y-auto" : "h-0"
            )}>
            {searchResults.map((option, idx) => {
              const { name } = option;
              return (
                <div key={name + idx}>
                  <div
                    className={cx(
                      "text-black flex flex-col px-[1.2rem] py-[0.4rem] transition-colors duration-300 ease-in-out hover:bg-gray-200 cursor-pointer"
                    )}
                    onClick={() => handleChangeStation(option)}>
                    <h1 className={cx("select-none")}>{name}</h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

{
  /* <div className="rounded-b-3xl overflow-hidden">
<div
  className={cx(
    "scrollbar-thumb-rounded-full w-full  scrollbar-thin transition-[height] duration-700 ease-in-out",
    isSearchOpen ? "h-[24rem] overflow-y-auto" : "h-[0] hidden overflow-hidden"
  )}>
  {searchResults.map(({ country, location, name }, idx) => {
    return (
      <div className={cx("flex flex-col")} key={name + idx}>
        <div
          className={cx(
            "text-dark-200 flex flex-col px-[1.2rem] py-[0.4rem] transition-colors duration-300 ease-in-out hover:bg-gray-200 cursor-pointer"
          )}
          onClick={async () => {
            await getCityAirQuality({
              variables: {
                city: name,
                startDate: set(new Date(), { hours: 0 }).toISOString(),
                endDate: set(new Date(), { hours: 24 }).toISOString(),
              },
            });
          }}>
          <h1
            className={cx(
              "select-none"
              // !haveAddress && isSelected && "text-white",
              // haveAddress && "cursor-default"
            )}>
            {name}
          </h1>
        </div>
        {haveAddress && (
    <div className="text-light-700_dark200 flex flex-col">
      {val.map((station, _index) =>
        !station?.addressStreet?.includes("bez ulicy") ? (
          <div
            key={station.id}
            className={cx(
              "hover-light-700_dark-400 flex cursor-pointer flex-col px-[2.4rem] py-[0.4rem] transition-colors duration-300 ease-in-out",
              selectedStation?.id === station.id && "background-light800_dark300"
            )}
            onClick={async () => await handleChangeStation(station.id, city)}>
            <p className="select-none">
              {val.length > 1
                ? `${_index + 1} ${station.addressStreet}`
                : station.addressStreet}
            </p>
          </div>
        ) : null
      )}
    </div>
  )}
      </div>
    );
  })}
</div>
</div> */
}
