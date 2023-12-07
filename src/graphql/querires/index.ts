import { typedQuery } from "../typed";
import { GraphQLTypes, InputType, Selector } from "../zeus";

export const citySelector = Selector("City")({
  name: true,
  location: {
    lat: true,
    long: true,
  },
  country: true,
  state: true,
  stationsInCity: {
    stationId: true,
    city: true,
    parameters: {
      time: true,
      no2: true,
      no2Time: true,
      o3: true,
      o3Time: true,
      pm1: true,
      pm2p5: true,
      pm25: true,
      pm25Time: true,
      so2: true,
      so2Time: true,
      pm10: true,
      pm10Time: true,
    },
  },
});

export type CityType = InputType<GraphQLTypes["City"], typeof citySelector>;

export const GET_CITIES = typedQuery({
  getCollectedCities: citySelector,
});
