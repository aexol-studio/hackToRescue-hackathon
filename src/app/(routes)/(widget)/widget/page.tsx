import { AirQualityInfo } from "@/components/airQualityInfo/AirQualityInfo";
import { Canvas } from "@/components/canvas/Canvas";
import { Search } from "@/components/search/Search";

export default function WidgetPage() {
  return (
    <div className="h-full w-full relative bg-black">
      <Search />
      <div className="absolute right-10 bottom-0 h-[70%] w-[60%]">
        <Canvas />
      </div>
      <AirQualityInfo />
    </div>
  );
}
