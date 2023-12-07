import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloProvider } from "@/graphql/ApolloProvider";
import { AppStoreProvider, useAppStore } from "@/stores/AppStoreProvider";
import { Chain } from "@/graphql/zeus";
import { citySelector, weatherSelector } from "@/graphql/queries";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const data = await getInitialData();
  console.log(data);
  const searchREsults = Object.values(
    data.reduce((acc, curr) => {
      if (acc[curr.name.trim()])
        acc[curr.name.trim()] = {
          ...acc[curr.name.trim()],
          stations: [
            ...acc[curr.name.trim()].stations,
            { state: curr.state, location: { ...curr.location } },
          ],
        };
      else
        acc[curr.name.trim()] = {
          name: curr.name,
          state: curr.state,
          stations: [{ state: curr.state, location: { ...curr.location } }],
        };
      return acc;
    }, {} as any)
  );
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ApolloProvider>
          {/* @ts-ignore */}
          <AppStoreProvider
            {...{
              initialSearchResults: searchREsults,
              searchResults: searchREsults,
              stations: data,
              scaleLounge: false,
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
              showLounge: false,
              newAutoCompleteResult: null,
            }}>
            {children}
          </AppStoreProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}

const chain = (option: "query" | "mutation") => {
  const API_URL = process.env.NEXT_PUBLIC_API;
  if (!API_URL) throw new Error("No API URL");
  return Chain(API_URL!, {
    headers: {
      "Content-type": "application/json",
    },
    cache: "no-cache",
  })(option);
};

const getInitialData = async () => {
  try {
    const { getCollectedCities } = await chain("query")({
      getCollectedCities: citySelector,
    });
    // const citiesWithWeather = await Promise.all(
    //   getCollectedCities.map(async (city) => {
    //     const { getRealTimeWeather } = await chain("query")({
    //       getRealTimeWeather: [
    //         { lat: city.location.lat, long: city.location.long },
    //         weatherSelector,
    //       ],
    //     });
    //     return { ...city, weather: getRealTimeWeather };
    //   })
    // );

    if (!getCollectedCities) return [];

    return getCollectedCities;
  } catch (error) {
    return [];
  }
};

export const revalidate = 3600;
