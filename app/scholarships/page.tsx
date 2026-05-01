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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { contact } from "@/lib/data";

export const metadata = {
  title: "Essay Competition 2026 | Haiti Bright Futures",
  description:
    "Haiti Bright Futures 2026 Essay Competition in Cap-Haitien for NS3 students from participating schools.",
};

const journey = [
  "School nominations: 5-10 NS3 students",
  "Essay submission by January 31, 2026",
  "Top 20 finalists selected",
  "Team community project phase",
  "5 winners awarded",
];

const prizes = [
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
    button: "Inscrire mon ecole / Register School",
    items: ["School name and address", "Principal name and WhatsApp", "Teacher liaison contact", "5-10 nominees"],
    icon: School,
  },
  {
    title: "Form B",
    label: "Essay Submission",
    dates: "Until Jan 31",
    href: "/scholarship-application",
    button: "Deposer une dissertation / Submit Essay",
    items: ["Student name, age, and NS3 grade", "School and teacher liaison", "Essay PDF or Word upload", "Parent consent"],
    icon: FileText,
  },
];

export default function ScholarshipsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="relative overflow-hidden bg-hbf-dark pt-28 text-white">
        <Image
          src="/images/JOA03692.jpg"
          alt="Haiti Bright Futures students"
          fill
          priority
          className="object-cover opacity-28"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-hbf-dark via-hbf-dark/88 to-hbf-green/70" />
        <div className="relative mx-auto grid min-h-[640px] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <Badge variant="warning" className="bg-white/12 text-white ring-white/25">
              Cap-Haitien 2026
            </Badge>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
              Concours de Dissertation Haiti Bright Futures 2026
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/86">
              School nominations, essay writing, top 20 finalists, a team community project, and 5 final winners.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 rounded-full bg-hbf-green px-6 font-bold text-white hover:bg-hbf-green-light">
                <Link href="/scholarship-application">
                  Submit Essay
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-full border-white/35 bg-white/10 px-6 font-bold text-white hover:bg-white hover:text-hbf-dark"
              >
                <Link href="/contact">Register School</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/16 bg-white/12 p-6 backdrop-blur-md">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-hbf-orange">Competition path</p>
            <div className="mt-6 space-y-4">
              {journey.map((item, index) => (
                <div key={item} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-hbf-green">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-6 text-white/88">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-hbf-cream py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="rounded-2xl bg-white p-6 shadow-soft">
            <CalendarDays className="text-hbf-green" size={28} />
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-hbf-orange">School registration</p>
            <h2 className="mt-2 text-2xl font-bold text-hbf-dark">Nov 1-15</h2>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-soft">
            <BookOpenCheck className="text-hbf-green" size={28} />
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-hbf-orange">Essay deadline</p>
            <h2 className="mt-2 text-2xl font-bold text-hbf-dark">January 31, 2026</h2>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-soft">
            <GraduationCap className="text-hbf-green" size={28} />
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-hbf-orange">Eligible students</p>
            <h2 className="mt-2 text-2xl font-bold text-hbf-dark">NS3 / Rheto</h2>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Badge variant="success">Phase 1</Badge>
              <h2 className="mt-4 text-4xl font-bold text-hbf-dark">Essay / Dissertation</h2>
              <p className="mt-4 text-lg leading-8 text-hbf-muted">
                Each participating school nominates 5 to 10 NS3 students. Students submit one original essay in French,
                up to 2,000 words, as a PDF or Word document.
              </p>
            </div>
            <div className="rounded-2xl border border-hbf-green/12 bg-hbf-green/5 p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-hbf-orange">Sujet 2025-26</p>
              <blockquote className="mt-4 text-2xl font-bold leading-10 text-hbf-dark">
                Et si la qualification d&apos;Haiti pour la coupe du Monde 2026 n&apos;etait pas qu&apos;un exploit
                sportif, mais le debut d&apos;une renaissance?
              </blockquote>
              <p className="mt-5 text-base leading-7 text-hbf-muted">
                What if Haiti&apos;s qualification for the 2026 World Cup was not just a sporting achievement, but the
                beginning of a renaissance?
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {["Originality", "Depth of thought", "Organization", "Creativity"].map((criterion) => (
              <div key={criterion} className="rounded-2xl border border-black/5 bg-white p-5 shadow-soft">
                <CheckCircle2 className="text-hbf-green" size={22} />
                <p className="mt-3 font-semibold text-hbf-dark">{criterion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-hbf-dark py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="warning" className="bg-white/12 text-white ring-white/25">
              Phase 2
            </Badge>
            <h2 className="mt-4 text-4xl font-bold">Community Project / Projet communautaire</h2>
            <p className="mt-4 text-lg leading-8 text-white/78">
              The top 20 finalists advance to a team-based community project phase. Details will be shared with
              finalists and teacher liaisons at the appropriate time.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-hbf-orange">Prizes / Prix</p>
            <h2 className="mt-3 text-4xl font-bold text-hbf-dark">Recognition that moves students forward</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {prizes.map((prize) => (
              <div key={prize.label} className="rounded-2xl bg-white p-7 shadow-soft">
                <prize.icon className="text-hbf-green" size={32} />
                <h3 className="mt-5 text-2xl font-bold text-hbf-dark">{prize.label}</h3>
                <p className="mt-3 leading-7 text-hbf-muted">{prize.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-hbf-cream py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {forms.map((form) => (
            <div key={form.title} className="rounded-2xl bg-white p-7 shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge variant="neutral">{form.title}</Badge>
                  <h2 className="mt-4 text-3xl font-bold text-hbf-dark">{form.label}</h2>
                  <p className="mt-2 text-sm font-semibold text-hbf-green">{form.dates}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-hbf-green/10 text-hbf-green">
                  <form.icon size={26} />
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {form.items.map((item) => (
                  <p key={item} className="flex gap-3 text-sm text-hbf-muted">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-hbf-green" size={18} />
                    {item}
                  </p>
                ))}
              </div>
              <Button asChild className="mt-7 h-12 rounded-full bg-hbf-green px-6 font-bold text-white">
                <Link href={form.href}>
                  {form.button}
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div className="rounded-2xl border border-black/5 bg-white p-7 shadow-soft">
            <Users className="text-hbf-green" size={30} />
            <h2 className="mt-4 text-3xl font-bold text-hbf-dark">Teacher Liaison / Professeur referent</h2>
            <p className="mt-4 leading-8 text-hbf-muted">
              Each school appoints one teacher liaison as the main contact with HBF. This person coordinates essay
              collection, nominee communication, and WhatsApp updates.
            </p>
          </div>
          <div className="rounded-2xl bg-hbf-green p-7 text-white shadow-soft">
            <MessageCircle size={30} />
            <h2 className="mt-4 text-3xl font-bold">Support & Resources</h2>
            <p className="mt-4 text-white/85">WhatsApp Support: {contact.whatsapp}</p>
            <div className="mt-6 grid gap-3">
              <Button asChild variant="outline" className="h-12 justify-start rounded-full bg-white text-hbf-dark">
                <Link href={contact.whatsappUrl}>
                  <MessageCircle size={18} />
                  WhatsApp Support
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 justify-start rounded-full bg-white text-hbf-dark">
                <Link href="/contact">
                  <Download size={18} />
                  Teacher Liaison Guide (PDF)
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 justify-start rounded-full bg-white text-hbf-dark">
                <Link href="/contact">
                  <Download size={18} />
                  Parent Letter (PDF)
                </Link>
              </Button>
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
