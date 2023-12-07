import { Html } from "@react-three/drei";
import { LucideLoader2 } from "lucide-react";
import React from "react";

export const Loader = () => {
  return (
    <Html center>
      <div className="flex gap-2 text-white">
        <LucideLoader2 className="animate-spin" />
      </div>
    </Html>
  );
};
