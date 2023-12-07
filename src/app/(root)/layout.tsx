import type { Metadata } from "next";
import { Education } from "@/components/education/Education";
import { Canvas } from "@/components/canvas/Canvas";
import { AirQualityInfo } from "@/components/airQualityInfo/AirQualityInfo";
import { Timeline } from "@/components/Timeline";
import "leaflet/dist/leaflet.css";

export const metadata: Metadata = {
  title: "Polski Alert Smogowy | App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      {children}
      <Education />
      {/* <ToggleEducation /> */}
      <Timeline />
      <AirQualityInfo />
      <div className="absolute  bottom-0 right-0 w-[450px] h-[450px]">
        <Canvas />
      </div>

    </main>
  );
}
