import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./_components/Map"), {
  ssr: true,
  loading: () => <div>Loading map...</div>,
});

export default function Home() {
  return (
    <section>
      <DynamicMap />
    </section>
  );
}
