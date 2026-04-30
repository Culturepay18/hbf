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
            className="mb-4 max-w-4xl"
          >
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl font-[family-name:var(--font-patrick-hand)]">
              Building Haiti's Future Leaders Through Innovation and Opportunity
            </h1>
            <p className="mt-6 text-lg text-white/90 sm:text-2xl px-2 font-medium max-w-3xl mx-auto">
              Haiti Bright Futures identifies, develops, and supports high-potential students through competition, mentorship, and real-world projects.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
