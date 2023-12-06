async function uploadFile(formData: FormData) {
  "use server";
  const files = formData.get("files");
  const _files = Array.isArray(files) ? files : [files];

  const file = _files[0] as File;
  const blob = await file.arrayBuffer();

  console.log(blob);
  const response = await fetch("http://10.1.26.171:8080/graphql", {
    method: "POST",
    body: `{"query":"mutation {\\n\\taddParameters(base64: \\"${blob}\\", city: \\"${
      file.name.split(" - ")[0]
    }\\")\\n}\\n"}`,
  });
  const data = await response.json();
  console.log("RES", data);
}

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
