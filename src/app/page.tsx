import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { Skeleton } from "@/components/ui/Skeleton";

const Challenges = dynamic(() => import("@/components/sections/Challenges").then((m) => m.Challenges));
const Ecosystem = dynamic(() => import("@/components/sections/Ecosystem").then((m) => m.Ecosystem), {
  loading: () => <Skeleton className="mx-auto h-[600px] w-full max-w-7xl" />,
});
const Solutions = dynamic(() => import("@/components/sections/Solutions").then((m) => m.Solutions));
const Technology = dynamic(() => import("@/components/sections/Technology").then((m) => m.Technology));
const Industries = dynamic(() => import("@/components/sections/Industries").then((m) => m.Industries));
const MobileApp = dynamic(() => import("@/components/sections/MobileApp").then((m) => m.MobileApp));
const Dashboard = dynamic(() => import("@/components/sections/Dashboard").then((m) => m.Dashboard));
const PartnerJourney = dynamic(() => import("@/components/sections/PartnerJourney").then((m) => m.PartnerJourney));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then((m) => m.Testimonials));
const Faq = dynamic(() => import("@/components/sections/Faq").then((m) => m.Faq));
const FinalCta = dynamic(() => import("@/components/sections/FinalCta").then((m) => m.FinalCta));
const Footer = dynamic(() => import("@/components/sections/Footer").then((m) => m.Footer));

export default function Home() {
  return (
    <main>
      <Hero />
      <Story />
      <Challenges />
      <Ecosystem />
      <Solutions />
      <Technology />
      <Industries />
      <MobileApp />
      <Dashboard />
      <PartnerJourney />
      <Testimonials />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}
