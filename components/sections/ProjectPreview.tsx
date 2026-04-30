"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const projects = [
  {
    team: "Green Haiti",
    problem: "Excess plastic waste in Cap-Haitien streets.",
    solution: "Community-led recycling centers with incentive programs.",
    budget: "$2,500",
    impact: "10 tons of plastic removed annually."
  },
  {
    team: "Eco-Light",
    problem: "Lack of affordable lighting for students at night.",
    solution: "Solar-powered lamps built from recycled materials.",
    budget: "$1,800",
    impact: "200 students benefited."
  }
];

export function ProjectPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-hbf-orange font-bold tracking-[0.2em] uppercase text-sm mb-4">
              Innovation Lab
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-hbf-dark font-[family-name:var(--font-patrick-hand)] mb-6">
              Student Projects Preview
            </h3>
            <p className="text-lg text-hbf-muted italic">
              "Our finalists develop practical solutions focused on sustainability, recycling, and economic opportunity."
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-full border-2 border-hbf-green text-hbf-green hover:bg-hbf-green hover:text-white font-bold px-8">
            <Link href="/innovation-lab">View All Projects</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.team}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-hbf-cream/30 border border-hbf-green/10 rounded-[2.5rem] p-10 relative overflow-hidden"
            >
              <Badge className="absolute top-8 right-8 bg-hbf-green/10 text-hbf-green hover:bg-hbf-green/10 border-none px-4 py-1 rounded-full">
                Finalist Team
              </Badge>
              
              <h4 className="text-3xl font-bold text-hbf-dark mb-8 font-[family-name:var(--font-patrick-hand)]">
                Team: {project.team}
              </h4>

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-hbf-orange mb-1">Problem</p>
                  <p className="text-hbf-dark font-medium">{project.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-hbf-orange mb-1">Solution</p>
                  <p className="text-hbf-dark font-medium">{project.solution}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-hbf-green/5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-hbf-muted mb-1">Budget</p>
                    <p className="text-xl font-bold text-hbf-dark">{project.budget}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-hbf-muted mb-1">Impact</p>
                    <p className="text-xl font-bold text-hbf-green">{project.impact}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
