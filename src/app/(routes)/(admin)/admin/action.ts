import xlsx from "node-xlsx";
import mongo from "@/utils/mongo";
export async function uploadFile(formData: FormData) {
  "use server";
  const [
    DB_NAME,
    STATIONS_COLLECTION_NAME,
    CITIES_COLLECTION_NAME,
    OPENWEATHER_API_KEY,
  ] = [
    process.env.DB_NAME,
    process.env.STATIONS_COLLECTION_NAME,
    process.env.CITIES_COLLECTION_NAME,
    process.env.OPENWEATHER_API_KEY,
  ];
  if (!DB_NAME)
    throw new Error('Invalid/Missing environment variable: "DB_NAME"');
  if (!STATIONS_COLLECTION_NAME)
    throw new Error(
      'Invalid/Missing environment variable: "STATIONS_COLLECTION_NAME"'
    );
  if (!CITIES_COLLECTION_NAME)
    throw new Error(
      'Invalid/Missing environment variable: "CITIES_COLLECTION_NAME"'
    );
  if (!OPENWEATHER_API_KEY)
    throw new Error(
      'Invalid/Missing environment variable: "OPENWEATHER_API_KEY"'
    );
  const db = (await mongo).db(DB_NAME);
  const files = formData.get("files");
  const _files = Array.isArray(files) ? files : [files];

  await Promise.all(
    _files.map(async (file) => {
      const fileContent = await file.arrayBuffer();
      const data = xlsx.parse(fileContent)[0].data;

      const city =
        data[0]
          .find((item) => item.includes("location:"))
          .split(":")[1]
          .trim() ??
        file.name.split(" - ")[0].encode("latin-1").decode("utf-8");

      const askForLatLong = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${OPENWEATHER_API_KEY}`,
        { headers: { "Content-Type": "application/json" } }
      );
      const response = (await askForLatLong.json()) as {
        name: string | null;
        local_names: {
          lv: string | null;
          pl: string | null;
        };
        lat: number | null;
        lon: number | null;
        country: string | null;
        state: string | null;
      }[];

      if (
        response &&
        response.length > 0 &&
        response[0].lat &&
        response[0].lon
      ) {
        await db.collection(CITIES_COLLECTION_NAME).insertOne({
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          name: response[0].name ?? city,
          location: { lat: response[0].lat, long: response[0].lon },
          country: response[0].country,
          state: response[0].state,
        });
      }

      data.shift();
      data.shift();
      data.shift();

      const parameters = data.map((row) => ({
        time: row[0],
        pm1: row[1],
        pm10: row[2],
        pm25: row[3],
      }));

      await db.collection(STATIONS_COLLECTION_NAME).insertOne({
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        kind: "MANUAL",
        city,
        parameters,
      });
    })
  );
}
