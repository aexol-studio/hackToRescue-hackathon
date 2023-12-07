import { typedQuery } from "../typed";
import { GraphQLTypes, InputType, Selector } from "../zeus";

export const weatherSelector = Selector("Weather")({
  clouds: true,
  description: true,
  temp: true,
  feelTemp: true,
  humidity: true,
  main: true,
});

export type WeatherType = InputType<
  GraphQLTypes["Weather"],
  typeof weatherSelector
>;

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

export const GET_CITIES = typedQuery({
  getCollectedCities: citySelector,
});
