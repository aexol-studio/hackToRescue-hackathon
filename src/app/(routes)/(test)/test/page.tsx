import { AirQualityInfo } from "@/components/airQualityInfo/AirQualityInfo";
import { Canvas } from "@/components/canvas/Canvas";
import { Search } from "@/components/search/Search";

export default async function TestPage() {
  return (
    <div className="h-full w-full relative">
      <Search />
      <div className="absolute right-10 bottom-0 h-[70%] w-[60%]">
        <Canvas />
      </div>
      <AirQualityInfo />
      <div className="w-[40rem] h-[20rem] fixed bottom-0 right-0">
        <iframe className="w-full h-full" src="/widget"></iframe>
      </div>
    </div>
  );
}
