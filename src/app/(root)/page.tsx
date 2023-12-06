import { Education } from "./_components/Education";
import { Map } from "./_components/Map";
import { ToogleEducation } from "./_components/ToogleEducation";

export default function Home() {
  return (
    <section>
      <Map />
      <ToogleEducation />
      <Education />
    </section>
  );
}
