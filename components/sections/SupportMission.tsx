"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { donation } from "@/lib/data";
import { Heart } from "lucide-react";

export function SupportMission() {
  return (
    <section className="relative py-24 text-white text-center overflow-hidden min-h-[500px] flex items-center justify-center">
      <Image
        src="/images/JOA06637.jpg"
        alt="Support Haiti Bright Futures"
        fill
        className="object-cover"
        quality={100}
        unoptimized={true}
      />
      <div className="absolute inset-0 bg-hbf-dark/70"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          
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
            <h2 className="text-4xl md:text-6xl font-bold mb-10 font-[family-name:var(--font-patrick-hand)] leading-tight drop-shadow-lg">
              Join us in building Haiti's next generation of leaders
            </h2>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Button asChild className="h-16 px-10 bg-hbf-green text-white hover:bg-hbf-green-light text-xl font-bold rounded-full shadow-2xl transition-all hover:scale-105">
                <a href={donation.href} target="_blank" rel="noreferrer">
                  Donate Now
                </a>
              </Button>
              <Button asChild variant="outline" className="h-16 px-10 border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-hbf-dark text-xl font-bold rounded-full transition-all hover:scale-105">
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
