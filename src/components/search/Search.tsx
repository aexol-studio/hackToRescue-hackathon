"use client";

import React from "react";
import { AutoCompleteSearch } from "./AutoCompleteSearch";

import { GeoLocalizationButton } from "./GeoLocationButton";
import { RotateButton } from "./RotateButton";
import { UserIcon } from "./UserIcon";
import { MapButton } from "./MapButton";
import { HoverInfo } from "./HoverInfo";
import { useAppStore } from "@/stores";
import { Globe2 } from "lucide-react";

export const Search = () => {
  const { selectStation, setShowLunge } = useAppStore(({ selectStation, setShowLunge }) => ({
    selectStation,
    setShowLunge,
  }));
  return (
    <div className="absolute left-1/2 top-6 flex w-screen -translate-x-1/2 justify-center">
      <div className="relative flex w-full max-w-[1024px] flex-col items-center justify-center gap-8 px-2 lg:px-8">
        <div className="flex w-full flex-col-reverse items-center justify-center gap-4  sm:flex-row sm:gap-8">
          <div className="flex  gap-6 sm:gap-4">
            <div className="flex sm:hidden">
              <HoverInfo infoText="Geolokalizacja">
                <GeoLocalizationButton />
              </HoverInfo>
            </div>
            {/* <div className="flex">
              <HoverInfo infoText="Dołącz do użytkowników">
                <UserIcon />
              </HoverInfo>
            </div> */}
            <div className="flex">
              <HoverInfo infoText="Kontrola nad modelem">
                <RotateButton />
              </HoverInfo>
            </div>
            {/* <div className="flex sm:hidden ">
              <MapButton />
            </div> */}
          </div>
          <div className="w-full max-w-[300px] ">
            <AutoCompleteSearch />
          </div>
          <div className="hidden sm:block">
            <HoverInfo infoText="Geolokalizacja">
              <div
                className="flex p-1 bg-white rounded-full cursor-pointer"
                onClick={() => {
                  selectStation(null);
                  setShowLunge(false);
                }}>
                <Globe2 color="black" />
              </div>
            </HoverInfo>
          </div>
        </div>
      </div>
    </div>
  );
};
