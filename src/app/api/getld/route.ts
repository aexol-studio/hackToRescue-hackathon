import fs from "fs";

const precision = 1;
const files = {
  "pm25-2020": {
    file: "pm25-2020.jsonld",
    url: `https://api.gios.gov.pl/pjp-api/v1/rest/concentration/getDistributionsOfConcentrationsMap?year=2020&indicatorType=OZ&indicator=PM25_sr_roczna`,
    values: {
      min: 6.5,
      max: 150,
    },
  },
  "pm10-2020": {
    file: "pm10-2020.jsonld",
    url: `https://api.gios.gov.pl/pjp-api/v1/rest/concentration/getDistributionsOfConcentrationsMap?year=2020&indicatorType=OZ&indicator=PM10_sr_roczna`,
    values: {
      min: 6.5,
      max: 150,
    },
  },
};

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const param = searchParams.get("param");
    const fileToGet = files[param as keyof typeof files];

    if (!param) {
      return Response.json({ error: "No param" }, { status: 404 });
    }
    if (!fileToGet) {
      return Response.json({ error: "No such file" }, { status: 404 });
    }

    let data: {
      features: {
        id: number;
        type: string;
        geometry: { type: string; coordinates: number[][][] };
        properties: {
          nazwa: string;
          wartosc: number;
          rok: number;
          nazwa_wska: string;
        };
      }[];
    } = { features: [] };

    if (fileToGet.url && fileToGet.url !== "") {
      const response = await fetch(fileToGet.url);
      data = await response.json();
    } else if (fileToGet.file && fileToGet.file !== "") {
      const file = fs.readFileSync(`${process.cwd()}/public/jsons/${fileToGet.file}`, "utf-8");
      data = JSON.parse(file);
    } else {
      return Response.json({ error: "No file" }, { status: 404 });
    }

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
        feature.properties.wartosc > fileToGet.values.max ||
        feature.properties.wartosc === null ||
        feature.properties.wartosc < 0
      ) {
        return;
      }

      const roundedCoordinates = feature.geometry.coordinates.map(
        coord =>
          coord
            .map(single => {
              const [x, y] = single;
              const roundedX = Math.round(Number(x) * 10 ** precision) / 10 ** precision;
              const roundedY = Math.round(Number(y) * 10 ** precision) / 10 ** precision;
              if (isNaN(roundedX) || isNaN(roundedY)) return undefined;
              return [roundedX, roundedY];
            })
            .filter(coord => !!coord) as number[][]
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
      } else groupedFeatures[coordinatesKey].properties.density += feature.properties.wartosc;
    });

    const transformedData = {
      features: Object.values(groupedFeatures)
        .filter(feature => !!feature)
        .map(feature => {
          return {
            id: feature.id,
            type: feature.type,
            geometry: {
              type: feature.geometry.type,
              coordinates: feature.geometry.coordinates,
            },
            properties: {
              nazwa_wska: feature.properties.nazwa_wska,
              density: feature.properties.density,
            },
          };
        }),
    };

    const prioritizeFeatures = (features: any[], maxSize: number) => {
      const sortedFeatures = features
        .slice()
        .sort((a, b) => b.properties.density - a.properties.density);
      let currentSize = 0;
      let selectedFeatures = [];
      for (const feature of sortedFeatures) {
        const featureSize = Buffer.from(JSON.stringify(feature)).length / (1024 * 1024);
        if (currentSize + featureSize <= maxSize) {
          selectedFeatures.push(feature);
          currentSize += featureSize;
        } else {
          break;
        }
      }
      return selectedFeatures;
    };

    transformedData.features = prioritizeFeatures(transformedData.features, 8);
    return Response.json({ ...transformedData });
  } catch (e) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
