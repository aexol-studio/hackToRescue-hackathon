import { useAppStore } from "@/stores";
import { FC, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cx } from "@/utils";

const DAYS =Array.from({length: 14}, (_, i) => i + 1)



export const YourLung:FC<{open:boolean}> = ({open}) => {
  const { airQuality } = useAppStore(({ airQuality }) => ({
    airQuality,
  }));
const [selectedNumber, setSelectedNumber] = useState(1)
const [expand, setExpand] = useState(false)

  return (
    <div className="relative">
      <div className=" bg-white flex justify-center px-10 py-4 gap-1 md:gap-3 lg:gap-4 items-center cursor-pointer text-sm sm:text-lg md:text-lg lg:text-2xl font-semibold">
        <span className="text-black whitespace-nowrap">See what you breathe</span>
{DAYS.map(day=><span className={cx("text-gray-500", selectedNumber===day && "md:text-4xl lg:text-7xl text-black")} key={day} onClick={()=>setSelectedNumber(day)}>{day}</span>)}
        <span className="text-black whitespace-nowrap" >DAYS IN</span>
        <ChevronDown/>
      </div>
      <div className="a">
<div></div>
      </div>
    </div>
  );
};
