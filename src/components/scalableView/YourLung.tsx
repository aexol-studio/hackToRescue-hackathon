import { useAppStore } from "@/stores";

export const YourLung = () => {
  const { airQuality } = useAppStore(({ airQuality }) => ({
    airQuality,
  }));
  return (
    <>
      <div className="absoulte bg-white left-0 bottom-0 w-full h-full z-[1000]">
        <span className="text-white">asdasd</span>
      </div>
    </>
  );
};
