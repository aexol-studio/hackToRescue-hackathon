import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polski Alert Smogowy | ADmin",
  description: "Polski Alert Smogowy",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <main className="relative w-full min-h-screen overflow-hidden">{children}</main>;
}
