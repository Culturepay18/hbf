"use client";

import { motion, useReducedMotion, animate } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { donation } from "@/lib/data";

function StatCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: duration,
      onUpdate(value) {
        setCount(Math.floor(value));
      },
    });
    return () => controls.stop();
  }, [value, duration]);

  return <span>{count}</span>;
}

const items = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <div className="relative h-full w-full overflow-hidden">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/images/hbfhome.jpg"
            alt="Haiti Bright Futures students"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Overlay sombre pour la lisibilité */}
          <div className="absolute inset-0 bg-black/40 z-10" />
        </motion.div>

        <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col items-center justify-start pt-72 sm:pt-[50vh] px-4 text-center sm:px-6 lg:px-8">
          {/* Main Title & Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-4 max-w-2xl"
          >
            <p className="text-base text-white/90 sm:text-xl px-2 font-medium">
              Creating opportunities through scholarships, sports, and youth programs that help Haitian students pursue their aspirations.
            </p>
            <div className="mt-8 flex flex-row justify-center items-center gap-2 sm:gap-4 px-2 sm:px-0">
              <Button asChild className="h-10 sm:h-14 flex-1 sm:flex-none bg-hbf-orange px-3 sm:px-8 text-[13px] sm:text-lg font-bold text-white shadow-lg hover:bg-hbf-orange-light">
                <Link href="/scholarship-application">
                  Apply Now
                </Link>
              </Button>
              <Button asChild className="h-10 sm:h-14 flex-1 sm:flex-none bg-white px-3 sm:px-8 text-[13px] sm:text-lg font-bold text-hbf-green shadow-lg hover:bg-white/90">
                <a href={donation.href} target="_blank" rel="noreferrer">
                  Donate Now
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Premium Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 w-full max-w-4xl"
          >
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 sm:flex sm:flex-nowrap sm:justify-between sm:gap-4 py-4">
              <div className="flex flex-col items-center px-2">
                <span className="text-2xl font-bold text-white sm:text-4xl">
                  <StatCounter value={10} />
                </span>
                <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-white/70 mt-1">Partner Schools</span>
              </div>
              
              <div className="flex flex-col items-center px-2 border-l border-white/10 sm:border-l-0">
                <span className="text-2xl font-bold text-white sm:text-4xl">
                  <StatCounter value={5} />
                </span>
                <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-white/70 mt-1">Winners Selected</span>
              </div>

              <div className="flex flex-col items-center px-2 pt-4 sm:pt-0 border-t border-white/10 sm:border-t-0 sm:border-l">
                <span className="text-2xl font-bold text-white sm:text-4xl">
                  <StatCounter value={20} />
                </span>
                <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-white/70 mt-1 leading-tight">Finalists<br/>Scholarship 2026</span>
              </div>

              <div className="flex flex-col items-center px-2 pt-4 sm:pt-0 border-t border-white/10 border-l sm:border-t-0 sm:border-l sm:pt-0">
                <span className="text-2xl font-bold text-white sm:text-4xl">
                  $<StatCounter value={1000} />
                </span>
                <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-white/70 mt-1">School Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
