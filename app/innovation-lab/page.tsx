"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { donation } from "@/lib/data";
import { supabase } from "@/lib/supabase";

export default function InnovationLabPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      const { data } = await supabase
        .from("innovation_projects")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: true });
      
      if (data) {
        setProjects(data);
      }
      setIsLoading(false);
    }
    loadProjects();
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24">
        {/* Intro Section */}
        <div className="container mx-auto px-4 mb-24">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-hbf-dark mb-6 md:mb-8 leading-tight">
              Real Solutions Built by Haiti&apos;s Next Generation
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-hbf-muted leading-relaxed font-medium">
              The Haiti Bright Futures Innovation Lab is a structured, team-based program where top student finalists design and present solutions to real-world challenges in Cap-Haïtien, with a focus on sustainability and economic impact.
            </p>
          </div>
        </div>

        {/* Problem Section */}
        <section className="py-24 bg-hbf-green/5">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-hbf-orange font-bold tracking-[0.2em] uppercase text-sm mb-6">
                  The Challenge
                </h2>
                <h3 className="text-3xl md:text-4xl font-bold text-hbf-dark mb-6">
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
                  <p className="text-sm text-hbf-muted">Where Ideas Become Real Solutions</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-hbf-dark mb-16 text-center">
              Our Innovation Projects
            </h2>
            <div className="grid lg:grid-cols-3 gap-10">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-white border border-black/5 rounded-[2.5rem] p-8 shadow-soft h-[500px] animate-pulse">
                    <div className="h-6 w-24 bg-black/10 rounded-full mb-6"></div>
                    <div className="h-8 w-48 bg-black/10 rounded mb-10"></div>
                    <div className="space-y-4">
                      <div className="h-4 w-full bg-black/5 rounded"></div>
                      <div className="h-4 w-5/6 bg-black/5 rounded"></div>
                      <div className="h-4 w-full bg-black/5 rounded"></div>
                    </div>
                  </div>
                ))
              ) : projects.length === 0 ? (
                <div className="col-span-3 text-center py-10 text-hbf-muted">No active projects to display at the moment.</div>
              ) : (
                projects.map((project, index) => {
                  return (
                    <motion.div
                      key={project.id || project.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border border-hbf-green/10 rounded-[2.5rem] p-8 shadow-soft flex flex-col h-full"
                    >
                      <div className="mb-6">
                        <Badge className={`${project.status === "Active Project" ? "bg-hbf-green/10 text-hbf-green" : "bg-hbf-orange/10 text-hbf-orange"} hover:bg-opacity-10 border-none px-4 py-1 rounded-full mb-4`}>
                          {project.status}
                        </Badge>
                        <h4 className="text-2xl md:text-3xl font-bold text-hbf-dark">
                          {project.title}
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
                          <p className="text-lg font-bold text-hbf-dark leading-tight">{project.budget}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-hbf-muted mb-1">{project.impact_label || "Impact"}</p>
                          <p className="text-lg font-bold text-hbf-green leading-tight">{project.impact}</p>
                        </div>
                      </div>
                      
                      {project.category && (
                        <div className="mt-4 pt-4 border-t border-hbf-green/5">
                          <p className="text-xs font-bold uppercase tracking-widest text-hbf-muted mb-1">Student Level</p>
                          <p className="text-lg font-bold text-hbf-dark">{project.category}</p>
                        </div>
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-hbf-green text-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Fund the Next Generation of Haitian Innovators
                </h2>
                <p className="text-xl text-white/90 mb-10 leading-relaxed">
                  Your support provides students with the resources, mentorship, and tools to turn ideas into real-world solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <Button asChild className="h-14 sm:h-16 px-8 sm:px-10 bg-white text-hbf-green hover:bg-hbf-cream text-lg sm:text-xl font-bold rounded-full shadow-2xl transition-all hover:scale-105 w-full sm:w-auto">
                    <a href={donation.href} target="_blank" rel="noreferrer">
                      FUND a Student Project
                    </a>
                  </Button>
                  <Button asChild className="h-14 sm:h-16 px-8 sm:px-10 bg-hbf-orange text-white hover:bg-hbf-orange-light text-lg sm:text-xl font-bold rounded-full transition-all hover:scale-105 shadow-xl w-full sm:w-auto">
                    <Link href="/contact">
                      Partner With Us
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-[400px] lg:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl ring-8 ring-white/10">
                <Image
                  src="/images/JOA06637.jpg"
                  alt="Students innovating"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
