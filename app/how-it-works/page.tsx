"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { 
  ClipboardCheck, 
  Search, 
  Users2, 
  Handshake, 
  Wrench, 
  Mic2, 
  Trophy 
} from "lucide-react";

const steps = [
  {
    title: "Application",
    description: "Students submit their applications detailing their academic background and motivation.",
    icon: ClipboardCheck,
  },
  {
    title: "Selection",
    description: "We identify high-potential candidates through a rigorous screening process.",
    icon: Search,
  },
  {
    title: "Teams",
    description: "Finalists are grouped into teams to foster collaboration and leadership.",
    icon: Users2,
  },
  {
    title: "Mentorship",
    description: "Each team is paired with experienced mentors to guide their progress.",
    icon: Handshake,
  },
  {
    title: "Project Development",
    description: "Teams work on solving real-world challenges in Cap-Haitien.",
    icon: Wrench,
  },
  {
    title: "Final Pitch",
    description: "Students present their innovative solutions to a panel of judges.",
    icon: Mic2,
  },
  {
    title: "Awards",
    description: "The award ceremony celebrates excellence and provides scholarships.",
    icon: Trophy,
  }
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 bg-hbf-cream">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-5xl md:text-7xl font-bold text-hbf-dark font-[family-name:var(--font-patrick-hand)] mb-6">
              How It Works
            </h1>
            <p className="text-xl text-hbf-muted">
              A structured journey designed to identify talent and build the next generation of Haitian leaders.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Vertical line for desktop */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-hbf-green/10 -translate-x-1/2 hidden md:block" />

              <div className="space-y-16">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    <div className="flex-1 text-center md:text-right">
                      {index % 2 === 0 ? (
                        <>
                          <h3 className="text-3xl font-bold text-hbf-dark font-[family-name:var(--font-patrick-hand)] mb-2">{step.title}</h3>
                          <p className="text-hbf-muted">{step.description}</p>
                        </>
                      ) : null}
                    </div>

                    <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-hbf-green text-white flex items-center justify-center shadow-lg border-4 border-white">
                      <step.icon size={28} />
                      <div className="absolute -bottom-8 text-sm font-bold text-hbf-green md:hidden">Step {index + 1}</div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      {index % 2 !== 0 ? (
                        <>
                          <h3 className="text-3xl font-bold text-hbf-dark font-[family-name:var(--font-patrick-hand)] mb-2">{step.title}</h3>
                          <p className="text-hbf-muted">{step.description}</p>
                        </>
                      ) : null}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
