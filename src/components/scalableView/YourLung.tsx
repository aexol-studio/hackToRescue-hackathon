import { useAppStore } from "@/stores";
import { FC } from "react";

export const YourLung:FC<{open:boolean}> = ({open}) => {
  const { airQuality } = useAppStore(({ airQuality }) => ({
    airQuality,
  }));
  return (
    <>
      <div className="bg-white">
        <span className="text-white ">asdasd</span>
      </div>
    </>
  );
};
