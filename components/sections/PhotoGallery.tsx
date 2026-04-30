"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function PhotoGallery() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/JOA03692.jpg"
              alt="Haiti Bright Futures activity"
              fill
              className="object-cover"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/JOA03764.jpg"
              alt="Haiti Bright Futures students"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
