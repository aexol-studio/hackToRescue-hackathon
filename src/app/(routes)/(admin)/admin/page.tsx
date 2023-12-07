import { LogoutButton } from "../_component";
import { uploadFile } from "./action";

export default async function Admin() {
  return (
    <section className="p-8 flex flex-col gap-8">
      <div className="flex justify-between w-full bg-slate-300 p-8">
        <form action={uploadFile} className="flex flex-col gap-4">
          <input name="files" type="file" multiple required />
          <button type="submit" className="w-fit bg-white py-4 px-2 rounded-md">
            Upload Data
          </button>
        </form>
        <LogoutButton />
      </div>
    </section>
  );
}

export const dynamic = "force-dynamic";
