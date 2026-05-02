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
  return (
    <main className="min-h-screen bg-[#f8f6f0]">
      <Navbar />

      <section className="pt-28">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <h1 className="max-w-3xl text-3xl font-bold leading-[1.08] text-hbf-dark md:text-5xl">
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
                src="/images/JOA03692.jpg"
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

          <div className="mt-12 rounded-lg border border-black/8 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-hbf-orange">Competition path</p>
            <div className="mt-6 grid gap-6 md:mt-5 md:gap-4 md:grid-cols-5 md:text-center">
              {journey.map((item, index) => (
                <div key={item} className="relative">
                  {index < journey.length - 1 ? (
                    <>
                      <div className="absolute left-1/2 top-4 hidden h-px w-full bg-black/10 md:block" />
                      <div className="absolute bottom-[-24px] left-[15px] top-8 w-px bg-black/10 md:hidden" />
                    </>
                  ) : null}
                  <div className="relative flex items-start gap-4 md:block">
                    <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-hbf-green text-sm font-bold text-white md:mx-auto">
                      {index + 1}
                    </div>
                    <p className="pt-1 text-left text-sm font-medium leading-6 text-hbf-dark md:mx-auto md:mt-4 md:max-w-36 md:p-0 md:text-center">
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="rounded-lg border border-black/8 bg-[#f8f6f0] p-6">
            <CalendarDays className="text-hbf-green" size={28} />
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-hbf-orange">School registration</p>
            <h2 className="mt-2 text-2xl font-bold text-hbf-dark">Nov 1-15</h2>
          </div>
          <div className="rounded-lg border border-black/8 bg-[#f8f6f0] p-6">
            <BookOpenCheck className="text-hbf-green" size={28} />
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-hbf-orange">Essay deadline</p>
            <h2 className="mt-2 text-2xl font-bold text-hbf-dark">January 31, 2026</h2>
          </div>
          <div className="rounded-lg border border-black/8 bg-[#f8f6f0] p-6">
            <GraduationCap className="text-hbf-green" size={28} />
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-hbf-orange">Eligible students</p>
            <h2 className="mt-2 text-2xl font-bold text-hbf-dark">NS3 students</h2>
          </div>
        </div>
      </section>

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
              <div className="mt-6 grid gap-3 text-sm text-hbf-muted sm:grid-cols-3">
                <p className="rounded-md bg-white p-3 text-center font-semibold">Max: 2,000 words</p>
                <p className="rounded-md bg-white p-3 text-center font-semibold">Format: PDF or Word</p>
                <p className="rounded-md bg-white p-3 text-center font-semibold">Deadline: Jan 31, 2026</p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {["Originality", "Depth of thought", "Organization", "Creativity"].map((criterion) => (
              <div key={criterion} className="rounded-lg border border-black/8 bg-white p-5 shadow-soft">
                <CheckCircle2 className="text-hbf-green" size={22} />
                <p className="mt-3 font-semibold text-hbf-dark">{criterion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8f6f0] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 rounded-lg border border-black/8 bg-white p-7 shadow-soft md:grid-cols-[0.7fr_1.3fr] md:items-center">
            <div>
              <Badge variant="warning">Phase 2</Badge>
              <h2 className="mt-4 text-4xl font-bold text-hbf-dark">Community Project</h2>
            </div>
            <div className="border-l-0 border-black/10 md:border-l md:pl-8">
              <p className="text-lg leading-8 text-hbf-muted">
                The top 20 finalists advance to a team-based community project phase. Details will be shared with
                finalists and teacher liaisons at the appropriate time.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {["Teamwork", "Community impact", "Final judging"].map((item) => (
                  <p key={item} className="rounded-md bg-hbf-green/8 px-4 py-3 text-sm font-semibold text-hbf-dark">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-hbf-orange">Prizes</p>
            <h2 className="mt-3 text-4xl font-bold text-hbf-dark">Recognition that moves students forward</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {prizes.map((prize) => (
              <div key={prize.label} className="rounded-lg border border-black/8 bg-white p-7 shadow-soft">
                <prize.icon className="text-hbf-green" size={32} />
                <h3 className="mt-5 text-2xl font-bold text-hbf-dark">{prize.label}</h3>
                <p className="mt-3 leading-7 text-hbf-muted">{prize.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8f6f0] py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {forms.map((form) => (
            <div key={form.title} className="rounded-lg border border-black/8 bg-white p-7 shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge variant="neutral">{form.title}</Badge>
                  <h2 className="mt-4 text-3xl font-bold text-hbf-dark">{form.label}</h2>
                  <p className="mt-2 text-sm font-semibold text-hbf-green">{form.dates}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-hbf-green/10 text-hbf-green">
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
          <div className="rounded-lg border border-black/8 bg-white p-7 shadow-soft">
            <Users className="text-hbf-green" size={30} />
            <h2 className="mt-4 text-3xl font-bold text-hbf-dark">Teacher Liaison</h2>
            <p className="mt-4 leading-8 text-hbf-muted">
              Each school appoints one teacher liaison as the main contact with HBF. This person coordinates essay
              collection, nominee communication, and WhatsApp updates.
            </p>
          </div>
          <div className="rounded-lg bg-hbf-green p-7 text-white shadow-soft">
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
