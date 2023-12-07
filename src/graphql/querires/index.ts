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
});

export type CityType = InputType<GraphQLTypes["City"], typeof citySelector>;

export const GET_CITIES = typedQuery({
  getCollectedCities: citySelector,
});
