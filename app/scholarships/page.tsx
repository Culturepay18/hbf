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
  Globe,
  Plus,
  Minus
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

function FAQAccordion({ items }: { items: { q: string, a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="border border-black/5 rounded-2xl overflow-hidden bg-white shadow-sm transition-all hover:shadow-md">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-[#f8f6f0]/30 transition-colors"
          >
            <span className="font-bold text-hbf-dark text-lg">{item.q}</span>
            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === i ? 'bg-hbf-green text-white rotate-180' : 'bg-[#f8f6f0] text-hbf-muted'}`}>
              {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
            </div>
          </button>
          <motion.div
            initial={false}
            animate={{ height: openIndex === i ? "auto" : 0, opacity: openIndex === i ? 1 : 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-hbf-muted font-medium leading-relaxed border-t border-black/5 bg-[#f8f6f0]/10">
              {item.a}
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export default function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [partnerSchools, setPartnerSchools] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // Fetch Scholarships
      const { data: sData } = await supabase.from("scholarships").select("*").order("created_at", { ascending: false });
      if (sData) setScholarships(sData);

      // Fetch Stats
      const { data: stData } = await supabase.from("scholarship_stats").select("*");
      if (stData && stData.length > 0) {
        setStats(stData);
      } else {
        // Default Stats if DB is empty
        setStats([
          { id: 'applicants', label: 'Students Reached', value: 1200, icon_name: 'Users' },
          { id: 'schools', label: 'Partner Schools', value: 15, icon_name: 'Globe' },
          { id: 'finalists', label: 'Finalists', value: 50, icon_name: 'UserCheck' },
          { id: 'teams', label: 'Innovation Teams', value: 10, icon_name: 'Trophy' },
        ]);
      }

      // Fetch Partner Schools
      const { data: pSchools, error: pError } = await supabase
        .from("partner_schools")
        .select("*")
        .eq("is_active", true)
        .order("name");
      
      if (pError) console.error("Error fetching schools:", pError);
      if (pSchools) setPartnerSchools(pSchools);

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

      {/* Program Phases (Timeless Info Cards) */}
      <section className="bg-white py-20 border-t border-black/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-[2rem] border border-black/5 bg-[#f8f6f0]/50 p-10 shadow-soft transition-transform hover:-translate-y-1">
              <School className="text-hbf-green" size={32} />
              <p className="mt-6 text-sm font-bold uppercase tracking-widest text-hbf-orange">Phase 1</p>
              <h2 className="mt-2 text-2xl font-bold text-hbf-dark leading-tight">School Nominations</h2>
              <p className="mt-4 text-hbf-muted font-medium">Partner schools nominate their most promising NS3 students based on academic excellence.</p>
            </div>
            <div className="rounded-[2rem] border border-black/5 bg-[#f8f6f0]/50 p-10 shadow-soft transition-transform hover:-translate-y-1">
              <FileText className="text-hbf-green" size={32} />
              <p className="mt-6 text-sm font-bold uppercase tracking-widest text-hbf-orange">Phase 2</p>
              <h2 className="mt-2 text-2xl font-bold text-hbf-dark leading-tight">Essay Submission</h2>
              <p className="mt-4 text-hbf-muted font-medium">Nominees write a compelling essay (dissertation) on leadership and community impact.</p>
            </div>
            <div className="rounded-[2rem] border border-black/5 bg-[#f8f6f0]/50 p-10 shadow-soft transition-transform hover:-translate-y-1">
              <Trophy className="text-hbf-green" size={32} />
              <p className="mt-6 text-sm font-bold uppercase tracking-widest text-hbf-orange">Phase 3</p>
              <h2 className="mt-2 text-2xl font-bold text-hbf-dark leading-tight">Innovation Lab</h2>
              <p className="mt-4 text-hbf-muted font-medium">Finalists collaborate on a community project to solve local challenges and win the grand prize.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Eligibility & Requirements Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f8f6f0]/40 -skew-x-12 translate-x-1/2 pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mb-20">
            <Badge className="mb-6 bg-hbf-green/10 text-hbf-green border-none px-4 py-1 font-bold text-xs uppercase tracking-widest">Requirements</Badge>
            <h2 className="text-5xl md:text-6xl font-black text-hbf-dark leading-[1.1] mb-8">
              Who can apply for the <span className="text-hbf-green">HBF Excellence</span> scholarship?
            </h2>
            <p className="text-xl text-hbf-muted leading-relaxed">
              We identify and support the most promising students who demonstrate exceptional academic potential and a commitment to Haiti&apos;s future.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-6">
              {[
                { title: "Academic Level", desc: "Currently enrolled in NS3 (Rheto / 11th grade) in a partner school.", icon: <School size={24} /> },
                { title: "Academic Excellence", desc: "Maintained a minimum average of 7.5/10 in the previous school year.", icon: <Award size={24} /> },
                { title: "Leadership Potential", desc: "Active participation in school activities or community service is a must.", icon: <Trophy size={24} /> }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-[#f8f6f0]/50 p-8 rounded-[2rem] border border-black/5 hover:bg-white hover:shadow-xl hover:border-hbf-green/20 transition-all duration-500 flex gap-8 items-start"
                >
                  <div className="shrink-0 w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-hbf-green group-hover:bg-hbf-green group-hover:text-white transition-all duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-hbf-dark mb-2">{item.title}</h4>
                    <p className="text-hbf-muted font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-5">
              <div className="bg-hbf-dark rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <FileText size={120} />
                </div>
                <h4 className="text-3xl font-bold mb-10 relative text-white">Required <br />Documents</h4>
                <ul className="space-y-6 relative">
                  {[
                    "Last year's report card",
                    "Director recommendation",
                    "Birth certificate / NIF",
                    "Passport photo",
                    "Application form"
                  ].map((doc, i) => (
                    <li key={i} className="flex items-center gap-4 text-white/80 font-bold group">
                      <div className="w-2 h-2 rounded-full bg-hbf-green group-hover:scale-150 transition-transform" />
                      {doc}
                    </li>
                  ))}
                </ul>
                <div className="mt-12 pt-8 border-t border-white/10">
                  <p className="text-sm font-bold text-hbf-orange uppercase tracking-widest mb-4">Digital Submission</p>
                  <p className="text-sm text-white/60 leading-relaxed italic">
                    Scan and upload all documents to our portal. Physical copies are not accepted during the first phase.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Schools Section */}
      <section className="py-32 bg-[#f8f6f0]/30 border-y border-black/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-black text-hbf-dark mb-6">Our Partner <br /><span className="text-hbf-green">Network</span></h2>
              <p className="text-lg text-hbf-muted font-medium">To be eligible, students must belong to one of these prestigious institutions in Northern Haiti.</p>
            </div>
            <Link href="/contact" className="group flex items-center gap-3 font-bold text-hbf-dark bg-white px-8 py-4 rounded-full border border-black/5 shadow-sm hover:bg-hbf-dark hover:text-white transition-all">
              Register your school <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnerSchools.length > 0 ? (
              partnerSchools.map((school, i) => (
                <motion.div 
                  key={school.id} 
                  whileHover={{ y: -10 }}
                  className="bg-white p-10 rounded-[2.5rem] border border-black/5 flex flex-col gap-6 shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#f8f6f0] flex items-center justify-center text-hbf-dark font-black text-xl">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-hbf-dark leading-tight">{school.name}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <MapPin size={14} className="text-hbf-green" />
                      <span className="text-[10px] font-bold text-hbf-muted uppercase tracking-widest">{school.location || 'Cap-Haïtien, Nord'}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              // Fallback/Empty State
              <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border border-dashed border-black/10">
                <School className="mx-auto text-hbf-muted/30 mb-4" size={48} />
                <p className="text-xl font-bold text-hbf-dark mb-2">No partner schools registered yet</p>
                <p className="text-hbf-muted mb-8 max-w-md mx-auto">We are currently updating our network. Please check back soon or contact your school director.</p>
                <Link href="/admin/schools" className="inline-flex items-center gap-2 text-hbf-green font-bold hover:underline">
                   Admin: Add schools here <ArrowRight size={16} />
                </Link>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center mb-20">
          <h2 className="text-5xl font-black text-hbf-dark mb-6 text-center">Still have questions?</h2>
          <p className="text-xl text-hbf-muted font-medium">Everything you need to know about the HBF Scholarship process.</p>
        </div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-32">
          <FAQAccordion 
            items={[
              { q: "Is the scholarship application free?", a: "Yes, applying for the HBF scholarship is completely free for all nominated students. We believe financial status should never be a barrier to excellence." },
              { q: "What schools are currently partner schools?", a: "We work with a specific list of accredited schools in Northern Haiti (see the network section above). If your school is not listed, your director must register before you can apply." },
              { q: "What happens after I win?", a: "Winners receive a comprehensive support package: full university tuition grants, high-performance laptops, and access to our exclusive Leadership Mentoring program." },
              { q: "Who can nominate students?", a: "Only the School Director or the appointed Teacher Liaison can officially nominate students. This ensures that only the most dedicated students are entered into the competition." }
            ]} 
          />
        </div>
      </section>





      {/* Support & Resources Section */}
      <section className="pb-24 pt-12 bg-[#f8f6f0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Teacher Liaison Card */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-soft flex flex-col h-full border border-black/5">
              <div className="w-12 h-12 rounded-2xl bg-hbf-green/10 flex items-center justify-center text-hbf-green mb-8">
                <Users size={24} />
              </div>
              <h3 className="text-3xl font-bold text-hbf-dark mb-6">Teacher Liaison</h3>
              <p className="text-hbf-muted leading-relaxed text-lg">
                Each school appoints one teacher liaison as the main contact with HBF. This person coordinates essay collection, nominee communication, and WhatsApp updates.
              </p>
            </div>

            {/* Support & Resources Card */}
            <div className="bg-hbf-green rounded-[2.5rem] p-10 shadow-lg text-white flex flex-col h-full">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white mb-8">
                <MessageCircle size={24} />
              </div>
              <h3 className="text-3xl font-bold mb-4">Support & Resources</h3>
              <p className="text-white/80 mb-10 text-lg">
                Need help? Contact us via WhatsApp or download our guides.
              </p>

              <div className="space-y-4">
                {/* WhatsApp Support */}
                <a 
                  href={contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-6 rounded-2xl flex items-center justify-between group transition-all hover:bg-white/90 shadow-sm"
                >
                  <div className="flex items-center gap-4 text-hbf-dark">
                    <div className="w-10 h-10 rounded-xl bg-hbf-green/10 flex items-center justify-center text-hbf-green">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <p className="font-bold">WhatsApp Support</p>
                      <p className="text-xs text-hbf-muted font-medium">{contact.whatsapp}</p>
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-hbf-dark transition-transform group-hover:translate-x-1" />
                </a>

                {/* PDF Links */}
                <div className="bg-white/10 border border-white/20 p-6 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-white/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-bold">Teacher Liaison Guide</p>
                      <p className="text-[10px] uppercase font-bold text-white/60 tracking-wider">PDF Document</p>
                    </div>
                  </div>
                  <Download size={18} className="text-white" />
                </div>

                <div className="bg-white/10 border border-white/20 p-6 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-white/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-bold">Parent Consent Letter</p>
                      <p className="text-[10px] uppercase font-bold text-white/60 tracking-wider">PDF Document</p>
                    </div>
                  </div>
                  <Download size={18} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
