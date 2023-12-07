"use client";
import React, { useEffect, useState, FunctionComponent } from "react";

const Map: FunctionComponent = () => {
  const [Client, setClient] = useState<FunctionComponent>();

  useEffect(() => {
    (async () => {
      if (typeof global.window !== "undefined") {
        const newClient = (await import("./MapClient")).default;
        setClient(() => newClient);
      }
    })();
  }, []);

  if (typeof global.window === "undefined" || !Client) {
    return null;
  }

  return Client ? <Client /> : null;
};

export default Map;
