import fs from "fs";

const precision = 1;
const files = {
  "pm25-2019": {
    name: "pm25-2019.jsonld",
    values: {
      min: 9,
      max: 50,
    },
  },
  "pm25-2020": {
    name: "pm25-2020.jsonld",
    values: {
      min: 9,
      max: 50,
    },
  },
  "pm25-2021": {
    name: "pm25-2021.jsonld",
    values: {
      min: 9,
      max: 50,
    },
  },
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const param = searchParams.get("param");
  const fileToGet = files[param as keyof typeof files];
  if (!fileToGet) {
    return Response.json({ error: "No such file" }, { status: 404 });
  }
  const file = fs.readFileSync(
    `${process.cwd()}/public/jsons/${fileToGet.name}`,
    "utf8"
  );
  const data = JSON.parse(file) as {
    type: string;
    features: {
      type: string;
      geometry: { type: string; coordinates: number[][][] };
      properties: {
        nazwa: string;
        wartosc: number;
        rok: number;
        nazwa_wska: string;
      };
    }[];
  };

  const groupedFeatures = {} as {
    [key: string]: {
      id: number;
      type: string;
      geometry: { type: string; coordinates: number[][][] };
      properties: {
        nazwa: string;
        wartosc: number;
        rok: number;
        nazwa_wska: string;
        density: number;
      };
    };
  };

  data.features.forEach((feature, index) => {
    if (
      feature.properties.wartosc < fileToGet.values.min ||
      feature.properties.wartosc > fileToGet.values.max
    ) {
      return;
    }

    const roundedCoordinates = feature.geometry.coordinates.map(
      (coord) =>
        coord
          .map((single) => {
            const [x, y] = single;
            const roundedX =
              Math.round(Number(x) * 10 ** precision) / 10 ** precision;
            const roundedY =
              Math.round(Number(y) * 10 ** precision) / 10 ** precision;
            if (isNaN(roundedX) || isNaN(roundedY)) return undefined;
            return [roundedX, roundedY];
          })
          .filter((coord) => !!coord) as number[][]
    );

    const coordinatesKey = JSON.stringify(roundedCoordinates);

    if (!groupedFeatures[coordinatesKey as keyof typeof groupedFeatures]) {
      groupedFeatures[coordinatesKey as keyof typeof groupedFeatures] = {
        ...feature,
        id: index,
        properties: {
          ...feature.properties,
          density: feature.properties.wartosc,
        },
        geometry: {
          ...feature.geometry,
          coordinates: roundedCoordinates,
        },
      };
    } else {
      groupedFeatures[coordinatesKey].properties.density +=
        feature.properties.wartosc;
    }
  });

  const transformedData = {
    ...data,
    features: Object.values(groupedFeatures).filter((feature) => !!feature),
  };

  // fs.writeFileSync(
  //   `${process.cwd()}/public/jsons/mapaa.jsonld`,
  //   JSON.stringify(transformedData)
  // );

  return Response.json({ ...transformedData });
}
