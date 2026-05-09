"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ApplicationForm } from "@/components/sections/ApplicationForm";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Timer } from "lucide-react";

export default function ScholarshipApplicationPage() {
  const [isActive, setIsActive] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkStatus() {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "scholarship_status")
        .single();
      
      if (data) {
        setIsActive(data.value.is_active);
      } else {
        setIsActive(true); // Default to active if setting not found
      }
      setIsLoading(false);
    }
    checkStatus();
  }, []);

  return (
    <main className="min-h-screen bg-[#fcfbf7]">
      <Navbar />
      
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-hbf-green border-t-transparent" />
        </div>
      ) : isActive === false ? (
        <div className="px-6 py-12 min-h-[calc(100svh-5rem)] flex items-center md:block md:min-h-0 md:pt-48 md:pb-32">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-12"
            >
              <div className="w-24 h-24 bg-hbf-orange/10 rounded-full flex items-center justify-center mx-auto mb-10 text-hbf-orange">
                <Timer size={48} />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-hbf-dark mb-6">
                Competition <span className="text-hbf-orange">Finished</span>
              </h1>
              <p className="text-xl text-hbf-muted leading-relaxed mb-10">
                The current scholarship application window has closed. Thank you to everyone who applied! Our team is currently reviewing submissions.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/news" className="bg-hbf-dark text-white px-8 py-4 rounded-full font-bold hover:bg-black transition-all">
                  Read latest news
                </Link>
                <Link href="/contact" className="border border-black/10 px-8 py-4 rounded-full font-bold hover:bg-black/5 transition-all">
                  Contact us
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        <>
          {/* Header Section */}
          <section className="pt-40 pb-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-hbf-orange mb-4">Scholarship Application</p>
              <h1 className="text-5xl md:text-6xl font-bold text-hbf-dark leading-tight">
                Apply in <span className="text-hbf-green">Four Simple Steps</span>
              </h1>
              <p className="mt-8 max-w-2xl mx-auto text-xl text-hbf-muted font-medium">
                Share your contact details, school information, and a short motivation message. Our team will review your application and follow up.
              </p>
            </div>
          </section>

          {/* Form Section */}
          <section className="pb-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ApplicationForm />
            </div>
          </section>
        </>
      )}

      <Footer />
    </main>
  );
}
