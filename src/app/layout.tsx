import { Inter } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { ApolloProvider } from "@/graphql/ApolloProvider";
import { AppStoreProvider } from "@/stores/AppStoreProvider";
import { Education } from "@/components/education/Education";
import { ToggleEducation } from "@/components/education/ToggleEducation";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getInitialData();

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ApolloProvider>
          <AppStoreProvider
            {...{
              searchResults: data,
              stations: data,

              airQualities: {},
              airQuality: null,
              allowRotation: false,
              educationOpen: false,
              geoLocation: null,
              hoveredQualityIndex: 0,
              loading: false,
              location: null,
              qualityLoading: false,
              searchValue: "",
              selectedStation: null,
              visibility: true,
              isOpen: false,
              moveMap: undefined,
            }}
          >
            {children}
          </AppStoreProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}

const getInitialData = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API;
  if (!API_URL) throw new Error("No API URL");
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    body: JSON.stringify({
      query: `query { getCollectedCities { name country location { lat long } } }`,
    }),
  });
  if (!("data" in response)) {
    return [];
  }
  const { data } = await response.json();
  return data.getCollectedCities;
};
