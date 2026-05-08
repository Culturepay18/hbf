"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Download,
  FileText,
  GraduationCap,
  Landmark,
  MessageCircle,
  School,
  Trophy,
  Users,
  MapPin,
  Calendar,
  Loader2,
  AlertCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { contact } from "@/lib/data";

interface Scholarship {
  id: string;
  title: string;
  description: string;
  status: string;
  location: string;
  deadline: string;
  prize: string;
  details_link: string;
}

const journey = [
  "School nominations: 5-10 NS3 students",
  "Essay submission by January 31, 2026",
  "Top 20 finalists selected",
  "Team community project phase",
  "5 winners awarded",
];

const staticPrizes = [
  {
    label: "5 MacBooks",
    detail: "For the final student winners.",
    icon: Trophy,
  },
  {
    label: "$1,000 school prize",
    detail: "Educational support for the school with the most finalists.",
    icon: Landmark,
  },
  {
    label: "Certificates",
    detail: "For finalists and teacher liaisons.",
    icon: Award,
  },
];

const forms = [
  {
    title: "Form A",
    label: "School Registration",
    dates: "Nov 1-15",
    href: "/contact",
    button: "Register School",
    items: ["School name and address", "Principal name and WhatsApp", "Teacher liaison contact", "5-10 nominees"],
    icon: School,
  },
  {
    title: "Form B",
    label: "Essay Submission",
    dates: "Until Jan 31",
    href: "/scholarship-application",
    button: "Submit Essay",
    items: ["Student name, age, and NS3 grade", "School and teacher liaison", "Essay PDF or Word upload", "Parent consent"],
    icon: FileText,
  },
];

export default function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchScholarships() {
      const { data } = await supabase
        .from("scholarships")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setScholarships(data);
      setIsLoading(false);
    }
    fetchScholarships();
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f6f0]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <h1 className="max-w-3xl text-3xl font-bold leading-[1.08] text-hbf-dark md:text-4xl">
                Essay Competition for Haiti&apos;s next generation of leaders
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-hbf-muted">
                Haiti Bright Futures 2026: schools nominate top students, finalists build a community project, and
                winners receive meaningful educational support.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-12 rounded-full bg-hbf-green px-6 font-bold text-white shadow-[0_12px_24px_rgba(46,125,50,0.22)] hover:bg-hbf-green-light"
                >
                  <Link href="/scholarship-application">
                    Submit Essay
                    <ArrowRight size={18} />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-full border-hbf-dark/20 bg-white px-6 font-bold text-hbf-dark hover:bg-hbf-dark hover:text-white"
                >
                  <Link href="/contact">Register School</Link>
                </Button>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-3 border-y border-black/10 py-5">
                <div>
                  <p className="text-2xl font-bold text-hbf-dark">20</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-hbf-muted">Finalists</p>
                </div>
                <div className="border-x border-black/10 px-5">
                  <p className="text-2xl font-bold text-hbf-dark">5</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-hbf-muted">Winners</p>
                </div>
                <div className="pl-5">
                  <p className="text-2xl font-bold text-hbf-dark">Jan 31</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-hbf-muted">Deadline</p>
                </div>
              </div>
            </div>

            <div className="relative min-h-[480px] overflow-hidden rounded-lg bg-hbf-dark shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
              <Image
                src="/images/JOA06605.jpg"
                alt="Haiti Bright Futures students"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-hbf-dark/72 via-hbf-dark/12 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="max-w-md text-sm font-semibold uppercase tracking-[0.16em] text-hbf-orange">
                  Unlock your potential
                </p>
                <p className="mt-2 max-w-lg text-2xl font-bold leading-tight">
                  The Haiti Bright Futures scholarship awaits ambitious NS3 students.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Dynamic Scholarships Grid Section */}
      <section className="py-24 bg-[#f8f6f0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center lg:text-left">
            <h2 className="text-4xl font-bold text-hbf-dark">Active Programs</h2>
            <p className="mt-4 text-lg text-hbf-muted font-medium">Explore our current scholarship and competition opportunities.</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-hbf-green" size={48} />
            </div>
          ) : scholarships.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-black/10 rounded-[3rem]">
              <p className="text-hbf-muted font-bold">No other programs at this time.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {scholarships.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col bg-white rounded-[2.5rem] border border-black/5 shadow-soft hover:shadow-2xl transition-all duration-500 p-10"
                >
                  <div className="flex items-center justify-between mb-6">
                    <Badge
                      variant={
                        item.status === "Open" ? "success" : item.status === "Coming soon" ? "warning" : "neutral"
                      }
                      className="text-[10px] px-3 py-1 uppercase tracking-widest font-bold border-none"
                    >
                      {item.status}
                    </Badge>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-hbf-muted flex items-center gap-1.5">
                      <MapPin size={14} /> {item.location}
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-hbf-dark mb-3 group-hover:text-hbf-green transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-hbf-muted text-base leading-relaxed mb-8 line-clamp-3 font-medium flex-grow">
                    {item.description}
                  </p>

                  <div className="space-y-4 mb-8 pt-6 border-t border-black/5">
                    <div className="flex items-center gap-3 text-hbf-dark">
                      <Trophy size={18} className="text-hbf-orange" />
                      <p className="text-sm font-bold">{item.prize}</p>
                    </div>
                    <div className="flex items-center gap-3 text-hbf-dark">
                      <Calendar size={18} className="text-hbf-green" />
                      <p className="text-sm font-bold">Deadline: {new Date(item.deadline).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <a
                    href={item.details_link || "#"}
                    className="inline-flex items-center gap-2 text-hbf-green font-bold text-sm hover:translate-x-1 transition-transform"
                  >
                    View details <ArrowRight size={18} />
                  </a>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Rest of the original page content */}
      <section className="bg-white py-12 border-t border-black/5">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="rounded-lg border border-black/8 bg-white p-6 shadow-soft">
            <CalendarDays className="text-hbf-green" size={28} />
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-hbf-orange">School registration</p>
            <h2 className="mt-2 text-2xl font-bold text-hbf-dark">Nov 1-15</h2>
          </div>
          <div className="rounded-lg border border-black/8 bg-white p-6 shadow-soft">
            <BookOpenCheck className="text-hbf-green" size={28} />
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-hbf-orange">Essay deadline</p>
            <h2 className="mt-2 text-2xl font-bold text-hbf-dark">January 31, 2026</h2>
          </div>
          <div className="rounded-lg border border-black/8 bg-white p-6 shadow-soft">
            <GraduationCap className="text-hbf-green" size={28} />
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-hbf-orange">Eligible students</p>
            <h2 className="mt-2 text-2xl font-bold text-hbf-dark">NS3 students</h2>
          </div>
        </div>
      </section>

      {/* ... keeping the rest of the sections ... */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Badge variant="success">Phase 1</Badge>
              <h2 className="mt-4 text-4xl font-bold text-hbf-dark">Essay</h2>
              <p className="mt-4 text-lg leading-8 text-hbf-muted">
                Each participating school nominates 5 to 10 NS3 students. Students submit one original essay, up to
                2,000 words, as a PDF or Word document.
              </p>
            </div>
            <div className="rounded-lg border border-black/8 bg-[#f8f6f0] p-7 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-hbf-green/30" />
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-hbf-orange">Essay topic 2025-26</p>
                <div className="h-px flex-1 bg-hbf-green/30" />
              </div>
              <blockquote className="mx-auto mt-6 max-w-3xl text-center text-2xl font-bold leading-10 text-hbf-dark">
                What if Haiti&apos;s qualification for the 2026 World Cup was not just a sporting achievement, but the
                beginning of a renaissance?
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-hbf-orange">Prizes</p>
          <h2 className="mt-3 text-4xl font-bold text-hbf-dark">Recognition that moves students forward</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3 text-left">
            {staticPrizes.map((prize) => (
              <div key={prize.label} className="rounded-lg border border-black/8 bg-white p-7 shadow-soft">
                <prize.icon className="text-hbf-green" size={32} />
                <h3 className="mt-5 text-2xl font-bold text-hbf-dark">{prize.label}</h3>
                <p className="mt-3 leading-7 text-hbf-muted">{prize.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="rounded-[3rem] border border-black/8 bg-white p-12 shadow-soft">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-hbf-green/10 text-hbf-green">
              <Users size={32} />
            </div>
            <h2 className="mt-8 text-3xl font-bold text-hbf-dark">Teacher Liaison</h2>
            <p className="mt-4 text-lg leading-relaxed text-hbf-muted font-medium">
              Each school appoints one teacher liaison as the main contact with HBF. This person coordinates essay
              collection, nominee communication, and WhatsApp updates.
            </p>
          </div>
          <div className="rounded-[3rem] bg-hbf-green p-12 text-white shadow-lift overflow-hidden relative">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-black/20 blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                <MessageCircle size={32} />
              </div>
              <h2 className="mt-8 text-3xl font-bold">Support & Resources</h2>
              <p className="mt-4 text-white/90 text-lg font-medium">
                Need help? Contact us via WhatsApp or download our guides.
              </p>
              
              <div className="mt-10 space-y-4">
                <Link 
                  href={contact.whatsappUrl} 
                  target="_blank"
                  className="flex items-center gap-4 rounded-[1.5rem] bg-white p-5 text-hbf-dark transition-all hover:scale-[1.02] hover:shadow-xl group/link"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-hbf-green/10 text-hbf-green transition-colors group-hover/link:bg-hbf-green group-hover/link:text-white">
                    <MessageCircle size={24} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-base">WhatsApp Support</p>
                    <p className="text-xs text-hbf-muted">{contact.whatsapp}</p>
                  </div>
                  <ArrowRight size={18} className="text-hbf-muted group-hover/link:text-hbf-green transition-colors" />
                </Link>

                <Link 
                  href="/contact" 
                  className="flex items-center gap-4 rounded-[1.5rem] bg-white/10 border border-white/20 p-5 text-white transition-all hover:bg-white/20 group/link"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white">
                    <FileText size={24} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-base">Teacher Liaison Guide</p>
                    <p className="text-xs text-white/70 uppercase tracking-widest font-bold">PDF Document</p>
                  </div>
                  <Download size={18} className="text-white/40 group-hover/link:text-white transition-colors" />
                </Link>

                <Link 
                  href="/contact" 
                  className="flex items-center gap-4 rounded-[1.5rem] bg-white/10 border border-white/20 p-5 text-white transition-all hover:bg-white/20 group/link"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white">
                    <Download size={24} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-base">Parent Consent Letter</p>
                    <p className="text-xs text-white/70 uppercase tracking-widest font-bold">PDF Document</p>
                  </div>
                  <Download size={18} className="text-white/40 group-hover/link:text-white transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-black/5 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 text-sm leading-7 text-hbf-muted sm:px-6 lg:px-8">
          <strong className="text-hbf-dark">Privacy Note:</strong> Essays and videos are used solely for judging.
          Selected finalists may be featured publicly with consent.
        </div>
      </section>

      <Footer />
    </main>
  );
}
