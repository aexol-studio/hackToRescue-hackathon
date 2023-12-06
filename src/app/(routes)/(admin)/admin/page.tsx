import { uploadFile } from "./action";

export default function Admin() {
  return (
    <section>
      <form action={uploadFile}>
        <input name="files" type="file" multiple />
        <button type="submit">Upload Data</button>
      </form>
    </section>
  );
}

export const dynamic = "force-dynamic";
