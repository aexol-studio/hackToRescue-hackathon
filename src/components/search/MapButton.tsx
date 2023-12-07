"use client";

import React from "react";
import { MapIcon } from "lucide-react";
import { useAppStore } from "@/stores";
import { cx } from "@/utils";
import { HoverInfo } from "./HoverInfo";

export const MapButton = () => {
  const { isOpen, toggle } = useAppStore(({ toggle, isOpen }) => ({
    isOpen,
    toggle,
  }));
  return (
    <button
      id="container"
      onClick={toggle}
      className="flex items-center justify-center absolute top-8 right-8 z-50"
    >
      <HoverInfo infoText="Mapa">
        <MapIcon
          className={cx(isOpen ? "text-blue-500" : "text-light-700", "h-6 w-6")}
        />
      </HoverInfo>
    </button>
  );
};
