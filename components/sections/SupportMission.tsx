"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { donation } from "@/lib/data";
import { Heart } from "lucide-react";

export function SupportMission() {
  return (
    <section className="py-24 bg-hbf-brown text-white text-center overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          
          {/* Icône Cœur Animée */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="mb-8 text-hbf-orange"
          >
            <Heart size={64} fill="currentColor" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-10 font-[family-name:var(--font-patrick-hand)] leading-tight">
              Join us in building Haiti's next generation of leaders
            </h2>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Button asChild className="h-16 px-10 bg-hbf-green text-white hover:bg-hbf-green-light text-xl font-bold rounded-full shadow-2xl transition-all hover:scale-105">
                <a href={donation.href} target="_blank" rel="noreferrer">
                  Donate Now
                </a>
              </Button>
              <Button asChild variant="outline" className="h-16 px-10 border-2 border-white bg-white text-hbf-dark hover:bg-transparent hover:text-white text-xl font-bold rounded-full transition-all hover:scale-105">
                <Link href="/contact">
                  Partner With Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
