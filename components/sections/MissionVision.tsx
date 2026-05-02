"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { donation } from "@/lib/data";
import { Target, Eye, ArrowRight } from "lucide-react";

export function MissionVision() {
  return (
    <section className="py-24 bg-hbf-cream overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Texte à gauche */}
          <div className="order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-hbf-orange font-bold tracking-[0.3em] uppercase text-sm mb-4">
                Haiti Bright Futures
              </h2>
              <h3 className="text-4xl md:text-6xl font-bold mb-8 text-hbf-dark leading-tight font-[family-name:var(--font-patrick-hand)]">
                Building Brighter Futures For Haitian Youth
              </h3>

              <div className="space-y-10 mb-10">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-hbf-green/10 text-hbf-green rounded-xl flex items-center justify-center">
                    <Target size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-hbf-dark mb-2">Mission</h4>
                    <p className="text-hbf-muted leading-relaxed">
                      Creating opportunities for students in Haiti through scholarships, sports, and youth programs to help them pursue their aspirations and transform the future of the country.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-hbf-orange/10 text-hbf-orange rounded-xl flex items-center justify-center">
                    <Eye size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-hbf-dark mb-2">Vision</h4>
                    <p className="text-hbf-muted leading-relaxed">
                      Help transform the future of the country by helping future leaders pursue their aspirations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Boutons Desktop uniquement */}
              <div className="hidden lg:flex flex-wrap gap-4">
                <Button asChild className="h-14 px-8 bg-hbf-orange hover:bg-hbf-orange-light text-white font-bold rounded-xl shadow-lg transition-all hover:scale-105">
                  <a href={donation.href} target="_blank" rel="noreferrer">
                    Donate Now
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-14 px-8 border-2 border-hbf-green text-hbf-green font-bold rounded-xl hover:bg-hbf-green hover:text-white transition-all hover:scale-105">
                  <Link href="/scholarship-application">
                    Apply Now
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="order-2">
            <div className="relative h-[550px] sm:h-[600px] lg:h-[450px] xl:h-[500px] w-full max-w-[400px] mx-auto lg:ml-auto mb-16 lg:mb-0">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, rotate: 5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
                viewport={{ once: true }}
                className="absolute top-0 right-0 w-[80%] aspect-[4/5] rounded-[30px] md:rounded-[40px] overflow-hidden shadow-2xl z-10 border-4 md:border-8 border-white"
              >
                <Image
                  src="/images/JOA06340.jpg"
                  alt="Haiti Bright Futures students"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-0 left-0 w-[75%] aspect-[4/5] rounded-[30px] md:rounded-[40px] overflow-hidden shadow-2xl z-0 border-4 md:border-8 border-white"
              >
                <Image
                  src="/images/JOA06389.jpg"
                  alt="Haiti Bright Futures activity"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </div>
            
            {/* Boutons Mobile uniquement, après les photos */}
            <div className="lg:hidden flex flex-row gap-3 justify-center px-2 mt-20">
              <Button asChild className="h-12 px-5 bg-hbf-orange hover:bg-hbf-orange-light text-white font-bold rounded-xl shadow-lg transition-all hover:scale-105 text-sm">
                <a href={donation.href} target="_blank" rel="noreferrer">
                  Donate Now
                </a>
              </Button>
              <Button asChild variant="outline" className="h-12 px-5 border-2 border-hbf-green text-hbf-green font-bold rounded-xl hover:bg-hbf-green hover:text-white transition-all hover:scale-105 text-sm">
                <Link href="/scholarship-application">
                  Apply Now
                  <ArrowRight className="ml-1" size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
