import fs from "fs";

export async function GET() {
  const file = fs.readFileSync(`${process.cwd()}/public/mapa.jsonld`, "utf8");
  const data = JSON.parse(file);
  return Response.json({
    ...data,
    features: data.features
      .map(
        (
          feature: {
            type: string;
            geometry: { type: string; coordinates: number[][] };
            properties: {
              nazwa: string;
              wartosc: number;
              rok: number;
              nazwa_wska: string;
            };
          },
          index: number
        ) => {
          if (feature.properties.wartosc <= 20) return;
          return {
            ...feature,
            id: index,
            properties: {
              ...feature.properties,
              density: feature.properties.wartosc,
            },
          };
        }
      )
      .filter((feature: any) => !!feature),
  });
}
