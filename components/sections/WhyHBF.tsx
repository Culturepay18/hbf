"use client";

import { motion } from "framer-motion";
import { Search, Lightbulb, GraduationCap } from "lucide-react";

const features = [
  {
    title: "Talent Identification",
    description: "We select high-potential students across Cap-Haitien through rigorous structured competitions.",
    icon: Search,
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    title: "Real-World Projects",
    description: "Students solve real community problems, focusing on sustainability, recycling, and economic opportunity.",
    icon: Lightbulb,
    color: "text-hbf-orange",
    bg: "bg-orange-50"
  },
  {
    title: "Long-Term Opportunity",
    description: "Successful finalists gain access to scholarships, mentorship, and international exposure.",
    icon: GraduationCap,
    color: "text-hbf-green",
    bg: "bg-green-50"
  }
];

export function WhyHBF() {
  return (
    <section className="py-24 bg-hbf-cream">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-hbf-orange font-bold tracking-[0.2em] uppercase text-sm mb-4">
            Our Approach
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-hbf-dark font-[family-name:var(--font-patrick-hand)]">
            What Makes HBF Different
          </h3>
          <p className="mt-4 text-hbf-muted text-lg">
            We don't just provide aid; we invest in the intellectual and creative potential of Haiti's youth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-soft border border-hbf-green/5 hover:shadow-lift transition-all group"
            >
              <div className={`w-16 h-16 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                <feature.icon size={32} />
              </div>
              <h4 className="text-2xl font-bold text-hbf-dark mb-4 font-[family-name:var(--font-patrick-hand)]">
                {feature.title}
              </h4>
              <p className="text-hbf-muted leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
