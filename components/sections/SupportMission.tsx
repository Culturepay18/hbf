"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { donation } from "@/lib/data";
import { Heart } from "lucide-react";

export function SupportMission() {
  return (
    <section className="py-20 bg-hbf-brown text-white text-center">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="mb-6 flex justify-center text-hbf-orange-light"
        >
          <Heart size={40} fill="currentColor" />
        </motion.div>

        <h2 className="text-3xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-patrick-hand)]">
          Make a Difference in the Lives of Haiti's Youth
        </h2>
        
        <p className="text-lg text-white/80 mb-0 leading-relaxed">
          Your generous donation can help transform the future of Haiti by providing essential resources for education, sports, and youth development programs. Every contribution brings us one step closer to a brighter future.
        </p>
      </div>
    </section>
  );
}
