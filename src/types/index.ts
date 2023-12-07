export type LineChartData = { name: string; uv: number; pv: number }[];

export type DangerousSubstance = "pm10" | "pm25" | "no2" | "so2" | "o3" | "st";

export type AirQuality = Record<
  DangerousSubstance,
  {
    lastCacheUpdate: string;
    calcDate: string | null;
    indexLevel: { id: number; indexLevelName: string } | null;
    sourceDataDate: string | null;
  }
>;

type Address = {
  road: string;
  suburb: string;
  city: string;
  state: string;
  "ISO3166-2-lvl4": string;
  postcode: string;
  country: string;
  country_code: string;
};

type BoundingBox = [string, string, string, string];

export type LocationData = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  category: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: Address;
  boundingbox: BoundingBox;
};

export type GeoLocation = {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
  timestamp: number;
};

// export type AirQuality = {
//   id: number;
//   no2CalcDate: string | null;
//   no2IndexLevel: { id: number; indexLevelName: string } | null;
//   no2SourceDataDate: string | null;

//   o3CalcDate: string | null;
//   o3IndexLevel: { id: number; indexLevelName: string } | null;
//   o3SourceDataDate: string | null;

//   pm10CalcDate: string | null;
//   pm10IndexLevel: { id: number; indexLevelName: string } | null;
//   pm10SourceDataDate: string | null;

//   pm25CalcDate: string | null;
//   pm25IndexLevel: { id: number; indexLevelName: string } | null;
//   pm25SourceDataDate: string | null;

//   so2CalcDate: string | null;
//   so2IndexLevel: { id: number; indexLevelName: string } | null;
//   so2SourceDataDate: string | null;

//   stCalcDate: string | null;
//   stIndexLevel: { id: number; indexLevelName: string } | null;
//   stSourceDataDate: string | null;

//   lastCacheUpdate: number;
// };

export type Sensor = {
  id: number;
  stationId: number;
  airQuality: AirQuality | null;
  param: {
    paramName: string;
    paramFormula: string;
    paramCode: string;
    idParam: number;
  };
};
