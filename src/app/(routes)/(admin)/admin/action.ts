import xlsx from "node-xlsx";
import mongo from "@/utlis/mongo";
export async function uploadFile(formData: FormData) {
  "use server";
  const [DB_NAME, COLLECTION_NAME] = [
    process.env.DB_NAME,
    process.env.COLLECTION_NAME,
  ];
  if (!DB_NAME)
    throw new Error('Invalid/Missing environment variable: "DB_NAME"');
  if (!COLLECTION_NAME)
    throw new Error('Invalid/Missing environment variable: "COLLECTION_NAME"');

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

      data.shift();
      data.shift();
      data.shift();

      const results = data.map((row) => ({
        time: row[0],
        pm1: row[1],
        pm10: row[2],
        pm25: row[3],
      }));

      await db.collection(COLLECTION_NAME).insertOne({
        createdAt: new Date(),
        updatedAt: new Date(),
        city,
        results,
      });
    })
  );
}
