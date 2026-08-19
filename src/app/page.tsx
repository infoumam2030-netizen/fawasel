import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { EditorialIntro } from "@/components/sections/EditorialIntro";
import { Skeleton } from "@/components/ui/Skeleton";

const ProjectNumbers = dynamic(() => import("@/components/sections/ProjectNumbers").then((m) => m.ProjectNumbers));
const UnitDiscovery = dynamic(() => import("@/components/sections/UnitDiscovery").then((m) => m.UnitDiscovery));
const FloorPlanExperience = dynamic(() =>
  import("@/components/sections/FloorPlanExperience").then((m) => m.FloorPlanExperience)
);
const Privacy = dynamic(() => import("@/components/sections/Privacy").then((m) => m.Privacy));
const Location = dynamic(() => import("@/components/sections/Location").then((m) => m.Location), {
  loading: () => <Skeleton className="mx-auto h-[480px] w-full max-w-[1400px]" />,
});
const MasterplanServices = dynamic(() =>
  import("@/components/sections/MasterplanServices").then((m) => m.MasterplanServices)
);
const StreetWidths = dynamic(() => import("@/components/sections/StreetWidths").then((m) => m.StreetWidths));
const ConstructionStatus = dynamic(() =>
  import("@/components/sections/ConstructionStatus").then((m) => m.ConstructionStatus)
);
const Warranties = dynamic(() => import("@/components/sections/Warranties").then((m) => m.Warranties));
const FinalCta = dynamic(() => import("@/components/sections/FinalCta").then((m) => m.FinalCta));
const Footer = dynamic(() => import("@/components/sections/Footer").then((m) => m.Footer));

export default function Home() {
  return (
    <main>
      <Hero />
      <EditorialIntro />
      <ProjectNumbers />
      <UnitDiscovery />
      <FloorPlanExperience />
      <Privacy />
      <Location />
      <MasterplanServices />
      <StreetWidths />
      <ConstructionStatus />
      <Warranties />
      <FinalCta />
      <Footer />
    </main>
  );
}
