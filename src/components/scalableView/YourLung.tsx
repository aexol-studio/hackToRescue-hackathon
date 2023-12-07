import { useAppStore } from "@/stores";
import { FC } from "react";
import { ChevronDown } from "lucide-react";

export const YourLung:FC<{open:boolean}> = ({open}) => {
  const { airQuality } = useAppStore(({ airQuality }) => ({
    airQuality,
  }));
  return (
    <>
      <div className="bg-white justify-center items-center px-10 py-4 gap-4">
        <span className="text-black ">See what you breathe</span>

        <span className="text-black ">DAYS IN</span>
        <ChevronDown/>
      </div>
    </>
  );
};
