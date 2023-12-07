import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./_components/Map"), {
  ssr: false,
  loading: () => <div>Loading map...</div>,
});

export default async function Home() {
  return (
    <section>
      <DynamicMap />
    </section>
  );
}
