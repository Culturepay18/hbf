"use client";

import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { MessageSquare, Lightbulb, HeartHandshake } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero Section Page About */}
        <section className="relative bg-hbf-green py-20 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-hbf-orange rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
          </div>
          
          <div className="container relative z-10 mx-auto px-4 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-patrick-hand)]"
            >
              About Haiti Bright Futures
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-medium"
            >
              Dedicated to Transforming Haiti's Future
            </motion.p>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-square rounded-[40px] overflow-hidden shadow-2xl order-2 md:order-1">
                <Image
                  src="/images/JOA03784.jpg"
                  alt="Our mission in action"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <p className="text-lg md:text-xl text-hbf-muted leading-relaxed">
                  Haiti Bright Futures is a nonprofit organization founded on the belief that every child in Haiti deserves the opportunity to succeed. Our mission is to break down the barriers that prevent young people from accessing quality education, engaging in sports, and participating in youth development programs. Our holistic approach ensures that young people receive the support they need to achieve their goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Method Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 font-[family-name:var(--font-patrick-hand)] text-hbf-dark">
              Our Method
            </h2>
            
            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {/* Method 1 */}
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center"
              >
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageSquare size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-hbf-dark">Listen to their needs</h3>
                <p className="text-hbf-muted">
                  We are guided by the insights of our students. Here, their voices are heard.
                </p>
              </motion.div>

              {/* Method 2 */}
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center"
              >
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Lightbulb size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-hbf-dark">Proven viable options</h3>
                <p className="text-hbf-muted">
                  We work with Haitian youth and educators to create opportunities that lead our student to success
                </p>
              </motion.div>

              {/* Method 3 */}
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <HeartHandshake size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-hbf-dark">Provide Support</h3>
                <p className="text-hbf-muted">
                  We provide scholarships to academically talented students who lack the financial means to continue their education, organize sports activities, and offer personal development workshops.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
