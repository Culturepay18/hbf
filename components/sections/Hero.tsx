"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import heroImage from "@/public/images/hbfhome.jpg";

export function Hero() {
  return (
    <section id="home" className="relative h-[100dvh] w-full overflow-hidden">
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          <Image
            src={heroImage}
            alt="Haiti Bright Futures students"
            fill
            preload
            placeholder="blur"
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Gradient overlay for better image visibility and text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent z-10" />
        </div>

        <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col items-center justify-start pt-[50vh] px-8 text-center sm:px-6 lg:px-8">
          {/* Main Title & Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-4 max-w-4xl"
          >
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Building Haiti&apos;s Future Leaders Through Innovation and Opportunity
            </h1>
            <p className="mt-6 text-base text-white/90 sm:text-2xl px-2 font-medium max-w-2xl mx-auto">
              Haiti Bright Futures identifies, develops, and supports high-potential students through competition, mentorship, and real-world projects.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
