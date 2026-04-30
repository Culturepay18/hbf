"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { donation } from "@/lib/data";

const projects = [
  {
    team: "Green Haiti",
    problem: "Excess plastic waste in Cap-Haitien streets leading to clogged drainage and pollution.",
    solution: "A network of community recycling hubs that convert plastic waste into affordable construction materials.",
    budget: "$2,500",
    impact: "10 tons of plastic removed annually and 5 local jobs created."
  },
  {
    team: "Eco-Light",
    problem: "Students in underserved areas lack consistent access to lighting for studying after sunset.",
    solution: "Low-cost, solar-powered study lamps manufactured from recycled electronic components and wood.",
    budget: "$1,800",
    impact: "200 students provided with sustainable lighting for education."
  },
  {
    team: "AquaPur",
    problem: "Limited access to clean drinking water in peripheral neighborhoods of Cap-Haitien.",
    solution: "A natural filtration system using locally sourced sand, charcoal, and gravel.",
    budget: "$3,200",
    impact: "Clean water access for 50 families in the pilot phase."
  }
];

export default function InnovationLabPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24">
        {/* Intro Section */}
        <div className="container mx-auto px-4 mb-24">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold text-hbf-dark font-[family-name:var(--font-patrick-hand)] mb-8">
              Real Solutions Built by Haiti's Next Generation
            </h1>
            <p className="text-2xl text-hbf-muted leading-relaxed">
              20 finalists working in teams to solve real-world challenges in Cap-Haitien, with a focus on sustainability and economic impact.
            </p>
          </div>
        </div>

        {/* Problem Section */}
        <section className="py-20 bg-hbf-cream">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-hbf-orange font-bold tracking-[0.2em] uppercase text-sm mb-6">
                  The Challenge
                </h2>
                <h3 className="text-4xl font-bold text-hbf-dark font-[family-name:var(--font-patrick-hand)] mb-6">
                  Cap-Haitien Faces Critical Challenges
                </h3>
                <p className="text-lg text-hbf-muted leading-relaxed mb-8">
                  From waste management and environmental sustainability to youth economic opportunity, 
                  our students are identifying the barriers that prevent our community from thriving 
                  and building the tools to overcome them.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-hbf-green/5">
                  <p className="text-3xl font-bold text-hbf-green mb-2">80%</p>
                  <p className="text-sm text-hbf-muted">Waste uncollected</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-hbf-green/5">
                  <p className="text-3xl font-bold text-hbf-orange mb-2">40%</p>
                  <p className="text-sm text-hbf-muted">Youth unemployment</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-hbf-green/5 col-span-2">
                  <p className="text-xl font-bold text-hbf-brown mb-2">Sustainable Innovation</p>
                  <p className="text-sm text-hbf-muted">Our core focus for 2024</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-hbf-dark font-[family-name:var(--font-patrick-hand)] mb-16 text-center">
              Current Student Projects
            </h2>
            <div className="grid lg:grid-cols-3 gap-10">
              {projects.map((project, index) => (
                <motion.div
                  key={project.team}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-hbf-green/10 rounded-[2.5rem] p-8 shadow-soft flex flex-col h-full"
                >
                  <div className="mb-6">
                    <Badge className="bg-hbf-orange/10 text-hbf-orange hover:bg-hbf-orange/10 border-none px-4 py-1 rounded-full mb-4">
                      Active Project
                    </Badge>
                    <h4 className="text-3xl font-bold text-hbf-dark font-[family-name:var(--font-patrick-hand)]">
                      {project.team}
                    </h4>
                  </div>

                  <div className="space-y-6 flex-grow">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-hbf-muted mb-1">Problem</p>
                      <p className="text-hbf-dark">{project.problem}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-hbf-muted mb-1">Solution</p>
                      <p className="text-hbf-dark font-medium">{project.solution}</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-hbf-green/5 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-hbf-muted mb-1">Budget</p>
                      <p className="text-lg font-bold text-hbf-dark">{project.budget}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-hbf-muted mb-1">Impact</p>
                      <p className="text-lg font-bold text-hbf-green">{project.impact}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-hbf-brown text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-10 font-[family-name:var(--font-patrick-hand)]">
              Support a student-led project today
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              <Button asChild className="h-16 px-10 bg-hbf-gold text-hbf-dark hover:bg-hbf-gold-light text-xl font-bold rounded-full shadow-2xl transition-all hover:scale-105">
                <a href={donation.href} target="_blank" rel="noreferrer">
                  Support a Student Project
                </a>
              </Button>
              <Button asChild variant="outline" className="h-16 px-10 border-2 border-white text-white hover:bg-white hover:text-hbf-dark text-xl font-bold rounded-full transition-all hover:scale-105">
                <Link href="/contact">
                  Partner With Us
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
