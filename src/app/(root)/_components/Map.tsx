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

  return !isMapLoading && Client ? <Client /> : null;
};

export default Map;
