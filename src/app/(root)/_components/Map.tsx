"use client";
import { useAppStore } from "@/stores";
import React, { useEffect, useState, FunctionComponent } from "react";

const Map: FunctionComponent = () => {
  const { initGeoLocation } = useAppStore(({ initGeoLocation }) => ({ initGeoLocation }));
  const [Client, setClient] = useState<FunctionComponent>();

  useEffect(() => {
    (async () => {
      if (typeof global.window !== "undefined") {
        const newClient = (await import("./MapClient")).default;
        setClient(() => newClient);
        await initGeoLocation();
      }
    })();
  }, []);

  if (typeof global.window === "undefined" || !Client) {
    return null;
  }

  return Client ? <Client /> : <div>FAJNY LOADER</div>;
};

export default Map;
