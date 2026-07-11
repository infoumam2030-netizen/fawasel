import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { QuickStats } from "@/components/sections/QuickStats";
import { About } from "@/components/sections/About";
import { Skeleton } from "@/components/ui/Skeleton";

const DeveloperMarketer = dynamic(() =>
  import("@/components/sections/DeveloperMarketer").then((m) => m.DeveloperMarketer)
);
const Gallery = dynamic(() => import("@/components/sections/Gallery").then((m) => m.Gallery), {
  loading: () => <Skeleton className="mx-auto h-[420px] w-full max-w-7xl" />,
});
const AvailabilityDashboard = dynamic(() =>
  import("@/components/sections/AvailabilityDashboard").then((m) => m.AvailabilityDashboard)
);
const Units = dynamic(() => import("@/components/sections/Units").then((m) => m.Units));
const FloorPlans = dynamic(() => import("@/components/sections/FloorPlans").then((m) => m.FloorPlans));
const Warranty = dynamic(() => import("@/components/sections/Warranty").then((m) => m.Warranty));
const Location = dynamic(() => import("@/components/sections/Location").then((m) => m.Location), {
  loading: () => <Skeleton className="mx-auto h-[480px] w-full max-w-7xl" />,
});
const FinalCta = dynamic(() => import("@/components/sections/FinalCta").then((m) => m.FinalCta));
const Footer = dynamic(() => import("@/components/sections/Footer").then((m) => m.Footer));

export default function Home() {
  return (
    <main>
      <Hero />
      <QuickStats />
      <About />
      <DeveloperMarketer />
      <Gallery />
      <AvailabilityDashboard />
      <Units />
      <FloorPlans />
      <Warranty />
      <Location />
      <FinalCta />
      <Footer />
    </main>
  );
}
