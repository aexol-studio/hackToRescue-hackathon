"use client";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Map as MapType } from "leaflet";

const positions = {
  wadowice: { lat: 49.53, lon: 19.29 },
};

export const Map: FC = () => {
  const [map, setMap] = useState<MapType | null>(null);
  const [position, setPosition] = useState(() => map?.getCenter());
  const onMove = useCallback(() => {
    setPosition(map?.getCenter());
  }, [map]);
  useEffect(() => {
    map?.on("move", onMove);
    return () => {
      map?.off("move", onMove);
    };
  }, [map, onMove]);
  console.log(position);
  return (
    <>
      <div className="h-screen w-screen fixed top-0 left-0 ">
        <MapContainer
          markerZoomAnimation
          preferCanvas
          fadeAnimation
          className="h-full w-full"
          center={[51.91, 19.14]}
          zoom={5.5}
          zoomControl={false}
          ref={setMap}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
      <div className="text-sm w-[160px]   flex flex-col gap-2 p-4 absolute bottom-5 left-5 text-black bg-white rounded z-50">
        <p className="flex justify-between">
          <span>latitude:</span>
          <span> {position ? position.lat.toFixed(2) : 51.91}</span>
        </p>
        <p className="flex justify-between">
          <span>longitude:</span>
          <span>{position ? position.lng.toFixed(2) : 19.14}</span>
        </p>
      </div>
    </>
  );
};
