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
  UserCheck,
  Globe
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

interface Stat {
  id: string;
  label: string;
  value: number;
  icon_name: string;
}

interface Project {
  id: string;
  title: string;
  problem: string;
  solution: string;
  budget: string;
  impact: string;
  status: string;
}

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let totalDuration = 2000;
    let incrementTime = Math.abs(Math.floor(totalDuration / end));

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <>{count}</>;
}

export default function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [finalistProjects, setFinalistProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // Fetch Scholarships
      const { data: sData } = await supabase.from("scholarships").select("*").order("created_at", { ascending: false });
      if (sData) setScholarships(sData);

      // Fetch Stats
      const { data: stData } = await supabase.from("scholarship_stats").select("*");
      if (stData) setStats(stData);

      // Fetch Finalist Projects
      const { data: pData } = await supabase
        .from("competition_finalists")
        .select("*")
        .eq("is_active", true);
      if (pData) setFinalistProjects(pData);

      setIsLoading(false);
    }
    fetchData();
  }, []);

  const getIcon = (name: string) => {
    switch (name) {
      case "Users": return <Users size={32} className="text-hbf-green" />;
      case "UserCheck": return <UserCheck size={32} className="text-hbf-orange" />;
      case "Trophy": return <Trophy size={32} className="text-hbf-brown" />;
      case "Globe": return <Globe size={32} className="text-hbf-green" />;
      default: return <Users size={32} />;
    }
  };

  const getStatColor = (id: string) => {
    if (id === 'applicants') return 'text-hbf-green';
    if (id === 'finalists') return 'text-hbf-orange';
    if (id === 'teams') return 'text-hbf-brown';
    return 'text-hbf-green';
  };

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
                <Button asChild className="h-12 rounded-full bg-hbf-green px-6 font-bold text-white shadow-lg hover:bg-hbf-green-light">
                  <Link href="/scholarship-application">Submit Essay <ArrowRight size={18} /></Link>
                </Button>
                <Button asChild variant="outline" className="h-12 rounded-full border-hbf-dark/20 bg-white px-6 font-bold text-hbf-dark hover:bg-hbf-dark hover:text-white">
                  <Link href="/contact">Register School</Link>
                </Button>
              </div>

              {/* Stats Bar */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-black/10">
                {stats.map((stat) => (
                  <div key={stat.id} className="flex items-center gap-4">
                    <div className="shrink-0">
                      {getIcon(stat.icon_name)}
                    </div>
                    <div>
                      <p className={`text-4xl font-bold leading-none ${getStatColor(stat.id)}`}>
                        <Counter value={stat.value} />
                      </p>
                      <p className="text-sm font-bold text-hbf-dark mt-1">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[480px] overflow-hidden rounded-lg bg-hbf-dark shadow-2xl">
              <Image src="/images/JOA06605.jpg" alt="Students" fill priority className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-hbf-dark/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-sm font-bold uppercase tracking-widest text-hbf-orange">Unlock your potential</p>
                <p className="mt-2 text-2xl font-bold">The HBF scholarship awaits ambitious students.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Programs Section */}
      <section className="py-24 bg-[#f8f6f0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-hbf-dark mb-12">Active Programs</h2>
          {isLoading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-hbf-green" /></div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {scholarships.map((item) => (
                <div key={item.id} className="bg-white rounded-[2.5rem] border border-black/5 shadow-soft p-8 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <Badge variant={item.status === "Open" ? "success" : "warning"}>{item.status}</Badge>
                    <p className="text-[10px] font-bold uppercase text-hbf-muted flex items-center gap-1"><MapPin size={12}/> {item.location}</p>
                  </div>
                  <h3 className="text-xl font-bold text-hbf-dark mb-3">{item.title}</h3>
                  <p className="text-hbf-muted text-sm flex-grow">{item.description}</p>
                  <div className="mt-6 pt-6 border-t border-black/5 space-y-3">
                    <p className="text-xs font-bold flex items-center gap-2"><Trophy size={14} className="text-hbf-orange" /> {item.prize}</p>
                    <p className="text-xs font-bold flex items-center gap-2"><Calendar size={14} className="text-hbf-green" /> Deadline: {new Date(item.deadline).toLocaleDateString()}</p>
                  </div>
                  <a href={item.details_link || "#"} className="mt-6 inline-flex items-center gap-2 text-hbf-green font-bold text-sm">View details <ArrowRight size={16} /></a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* NEW: Finalist Teams Section */}
      {finalistProjects.length > 0 && (
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-hbf-dark mb-12">Finalist Innovation Projects</h2>
            <div className="grid md:grid-cols-2 gap-10">
              {finalistProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-white border border-black/5 rounded-[3rem] p-10 shadow-soft hover:shadow-2xl transition-all duration-500"
                >
                  <div className="flex justify-between items-start mb-8">
                    <h3 className="text-3xl font-bold text-hbf-dark">Team: {project.title}</h3>
                    <Badge className="bg-hbf-green/10 text-hbf-green border-none px-4 py-1.5 uppercase font-bold text-[10px] tracking-widest">Finalist Team</Badge>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-hbf-orange mb-2">Problem</p>
                      <p className="text-hbf-dark font-medium leading-relaxed">{project.problem}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-hbf-orange mb-2">Solution</p>
                      <p className="text-hbf-dark font-medium leading-relaxed">{project.solution}</p>
                    </div>
                    <div className="pt-6 border-t border-black/5 grid grid-cols-2 gap-8">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-hbf-muted mb-1">Budget</p>
                        <p className="text-2xl font-bold text-hbf-dark">{project.budget}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-hbf-muted mb-1">Impact</p>
                        <p className="text-2xl font-bold text-hbf-green leading-tight">{project.impact}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Rest of Info Cards */}
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

      <Footer />
    </main>
  );
}
