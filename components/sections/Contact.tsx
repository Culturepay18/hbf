import { Mail, MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { contact, donation } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="bg-hbf-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] bg-hbf-green p-8 text-white shadow-soft sm:p-12 lg:p-16 relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-hbf-green-light">Contact</p>
              <h2 className="mt-4 text-4xl font-bold leading-tight tracking-normal">
                Support a student, a school, or the next cohort.
              </h2>
              <p className="mt-6 max-w-2xl text-white/80 text-lg">
                Haiti Bright Futures welcomes questions from families, partners, donors, and schools that want to get involved.
              </p>
            </div>
            <div className="space-y-4">
              <a className="focus-hbf flex items-center rounded-2xl bg-white/10 p-5 hover:bg-white/20 transition-all group" href={`mailto:${contact.email}`}>
                <div className="p-3 rounded-xl bg-white/10 mr-4 group-hover:bg-white/20 transition-colors">
                  <Mail aria-hidden="true" className="shrink-0 text-white" />
                </div>
                <span className="text-lg font-medium">{contact.email}</span>
              </a>
              <a className="focus-hbf flex items-center rounded-2xl bg-white/10 p-5 hover:bg-white/20 transition-all group" href={contact.whatsappUrl}>
                <div className="p-3 rounded-xl bg-white/10 mr-4 group-hover:bg-white/20 transition-colors">
                  <MessageCircle aria-hidden="true" className="shrink-0 text-white" />
                </div>
                <span className="text-lg font-medium">WhatsApp {contact.whatsapp}</span>
              </a>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="flex-1 h-14 bg-white hover:bg-white/90 text-hbf-green font-bold text-lg">
                  <a href={donation.href} target="_blank" rel="noreferrer">
                    Donate Now
                  </a>
                </Button>
                <Button asChild size="lg" className="flex-1 h-14 bg-hbf-orange hover:bg-hbf-orange-light text-white font-bold text-lg">
                  <Link href="/scholarship-application">
                    Start an application
                    <Send aria-hidden="true" size={18} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
