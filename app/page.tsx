import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Navbar } from "@/components/sections/Navbar";
import { Scholarships } from "@/components/sections/Scholarships";
import { Stats } from "@/components/sections/Stats";
import { Team } from "@/components/sections/Team";

import { SupportMission } from "@/components/sections/SupportMission";

import { MissionVision } from "@/components/sections/MissionVision";
import { WhyHBF } from "@/components/sections/WhyHBF";
import { ProjectPreview } from "@/components/sections/ProjectPreview";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MissionVision />
        <Stats />
        <WhyHBF />
        <ProjectPreview />
        <Scholarships />
        <Team />
        <SupportMission />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
