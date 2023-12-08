import type { Metadata } from "next";
import { Education } from "@/components/education/Education";
import "leaflet/dist/leaflet.css";
import { WelcomeBox } from "@/components/WelcomeBox";

export const metadata: Metadata = {
  title: "Polski Alert Smogowy | App",
  description: "Polski Alert Smogowy",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      {children}
      <WelcomeBox />
      <Education />
    </main>
  );
}
