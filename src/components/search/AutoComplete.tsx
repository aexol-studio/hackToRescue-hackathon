import React, { useEffect, useRef, useState } from "react";

import { cx } from "@/utils";
import { NewAutoCompleteResult, useAppStore } from "@/stores";
import { X } from "lucide-react";
import { useLazyQuery } from "@apollo/client";
import { GET_CITY_AIR_QUALITY } from "@/graphql/queries";
import { set } from "date-fns";

export const AutoCompleteSearch = () => {
  const {
    searchResults,
    selectedStation,
    selectStation,
    searchValue,
    setSearchValue,
    newAutoCompleteResult,
    setNewAutoCompleteResult,
  } = useAppStore(
    ({
      searchResults,
      selectStation,
      selectedStation,
      searchValue,
      setSearchValue,
      newAutoCompleteResult,
      setNewAutoCompleteResult,
    }) => ({
      searchResults,
      selectStation,
      selectedStation,
      searchValue,
      setSearchValue,
      newAutoCompleteResult,
      setNewAutoCompleteResult,
    })
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [getCityAirQuality] = useLazyQuery(GET_CITY_AIR_QUALITY, {
    onCompleted: d => {
      // const reducedArr = d.getCityParameters.reduce(([acc,curr])=>)
    },
  });

  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(e.target as Node)) setIsSearchOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <X
        className="text-[#FF7000] absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer"
        onClick={() => {
          setSearchValue(null);
          selectStation(null);
          setNewAutoCompleteResult(null);
        }}
      />

      <input
        value={searchValue || ""}
        ref={inputRef}
        type="text"
        placeholder="Wybierz stację..."
        onChange={e => setSearchValue(e.target.value)}
        onFocus={() => {
          if (isSearchOpen) return;
          setIsSearchOpen(true);
        }}
        className={cx(
          "text-black-300 border-[#FF7000] bg-light-900  hover-light-700 w-full rounded-lg border-[1px] px-[1.2rem] py-[0.8rem] transition-all duration-700 ease-in-out",
          " focus:outline-none",
          isSearchOpen && "rounded-b-none"
        )}
      />

      <div
        className={cx(
          "absolute top-[100%] grid max-h-[24rem] w-full  transition-all duration-700 ease-in-out",
          isSearchOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}>
        <div
          ref={listRef}
          className={cx(
            "border-[#FF7000] border-t-none z-10 h-full w-full overflow-hidden rounded-b-lg  shadow-lg",
            isSearchOpen ? "border border-t-0" : ""
          )}>
          <div
            className={cx(
              "scrollbar-thumb-rounded-full bg-light-900 h-full w-full overflow-y-auto scrollbar-thin  scrollbar-thumb-[#FF7000]",
              !!Object.entries(searchResults).length && "py-[0.4rem]"
            )}>
            {searchResults?.map((option, idx) => {
              return (
                <div className={cx("flex flex-col")} key={option.name + idx}>
                  <div
                    className={cx(
                      "text-dark-200 flex  flex-col px-[1.2rem] py-[0.4rem] transition-colors duration-300 ease-in-out hover:bg-light-500",
                      "bg-light-800",
                      "cursor-pointer",
                      option.name === newAutoCompleteResult?.name && "bg-light-700"
                    )}
                    onClick={() => {
                      if (option.name === newAutoCompleteResult?.name) {
                        setNewAutoCompleteResult(null);
                        setSearchValue(null);
                        setIsSearchOpen(p => !p);
                        return;
                      }
                      setSearchValue(option.name);
                      setNewAutoCompleteResult(option as NewAutoCompleteResult);
                      getCityAirQuality({
                        variables: {
                          city: option.name,
                          startDate: set(new Date(), { hours: 0 }).toISOString(),
                          endDate: set(new Date(), { hours: 24 }).toISOString(),
                        },
                      });
                      setIsSearchOpen(p => !p);
                    }}>
                    <h1 className={cx("select-none")}>{option.name}</h1>
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
