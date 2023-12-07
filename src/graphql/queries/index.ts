import { typedQuery } from "../typed";
import { $, GraphQLTypes, InputType, Selector } from "../zeus";

export const weatherSelector = Selector("Weather")({
  clouds: true,
  description: true,
  temp: true,
  feelTemp: true,
  humidity: true,
  main: true,
});

export const airQualitiesIndexSelector = Selector("Parameters")({
  no2: true,
  o3: true,
  no2Time: true,
  o3Time: true,
  pm1: true,
  pm10: true,
  pm10Time: true,
  pm25: true,
  pm25Time: true,
  pm2p5: true,
  so2: true,
  so2Time: true,
  time: true,
});

export type WeatherType = InputType<GraphQLTypes["Weather"], typeof weatherSelector>;

export const citySelector = Selector("City")({
  name: true,
  location: {
    lat: true,
    long: true,
  },
  country: true,
  state: true,
});

export type CityType = InputType<GraphQLTypes["City"], typeof citySelector> & {
  weather: WeatherType;
};

export const GET_CITY_AIR_QUALITY = typedQuery({
  getCityParameters: [
    {
      city: $("city", "String!"),
      startDate: $("startDate", "String!"),
      endDate: $("endDate", "String!"),
    },

    { city: true, stationId: true, parameters: airQualitiesIndexSelector },
  ],
});

export const GET_CITIES = typedQuery({
  getCollectedCities: citySelector,
});
