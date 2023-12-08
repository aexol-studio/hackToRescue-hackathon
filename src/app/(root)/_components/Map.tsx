"use client";
import { useAppStore } from "@/stores";
import React, { useEffect, useState, FunctionComponent, Suspense } from "react";

const Map: FunctionComponent = () => {
  const { isMapLoading, initGeoLocation, setIsMapLoading } = useAppStore(
    ({ isMapLoading, initGeoLocation, setIsMapLoading }) => ({
      isMapLoading,
      initGeoLocation,
      setIsMapLoading,
    })
  );
  const [Client, setClient] = useState<FunctionComponent>();

  useEffect(() => {
    (async () => {
      if (typeof global.window !== "undefined") {
        const newClient = (await import("./MapClient")).default;
        setClient(() => newClient);
        await initGeoLocation();
        setIsMapLoading(false);
      }
    })();
  }, []);

  if (typeof global.window === "undefined" || !Client) {
    return null;
  }

  return isMapLoading ? (
    <div className="bg-red-900 absolute top-0 w-[400px] h-[400px]">XXXX</div>
  ) : Client ? (
    <Client />
  ) : (
    <div>FAJNY LOADER</div>
  );
};

export default Map;
