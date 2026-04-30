import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Contact as ContactSection } from "@/components/sections/Contact";
import { Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { contact } from "@/lib/data";

export const metadata = {
  title: "Contact Us | Haiti Bright Futures",
  description: "Get in touch with Haiti Bright Futures. We welcome questions from families, partners, and donors.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-32 pb-16 bg-hbf-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-hbf-orange">Get in touch</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-hbf-dark">
            Contact Us <span className="text-hbf-green">Today</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-hbf-muted">
            Whether you have questions about our programs, want to learn how you can get involved, or need more information about our initiatives, we&apos;re here to help. Reach out to us using the contact details below or fill out the contact form, and we&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="py-20 -mt-10 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Email */}
            <a href={`mailto:${contact.email}`} className="group bg-white p-8 rounded-3xl shadow-soft border border-hbf-green/5 hover:border-hbf-green transition-all hover:-translate-y-1">
              <div className="size-12 rounded-2xl bg-hbf-green/10 flex items-center justify-center mb-6 group-hover:bg-hbf-green group-hover:text-white transition-colors">
                <Mail className="size-6 text-hbf-green" />
              </div>
              <h3 className="text-xl font-bold text-hbf-dark mb-2">Email Us</h3>
              <p className="text-hbf-muted text-sm mb-4">Our team is here to help you.</p>
              <span className="text-hbf-green font-semibold text-sm break-all">{contact.email}</span>
            </a>

            {/* WhatsApp */}
            <a href={contact.whatsappUrl} target="_blank" rel="noreferrer" className="group bg-white p-8 rounded-3xl shadow-soft border border-hbf-green/5 hover:border-hbf-green transition-all hover:-translate-y-1">
              <div className="size-12 rounded-2xl bg-hbf-green/10 flex items-center justify-center mb-6 group-hover:bg-hbf-green group-hover:text-white transition-colors">
                <MessageCircle className="size-6 text-hbf-green" />
              </div>
              <h3 className="text-xl font-bold text-hbf-dark mb-2">WhatsApp</h3>
              <p className="text-hbf-muted text-sm mb-4">Fastest way to reach us.</p>
              <span className="text-hbf-green font-semibold text-sm">{contact.whatsapp}</span>
            </a>

            {/* Location */}
            <div className="bg-white p-8 rounded-3xl shadow-soft border border-hbf-green/5">
              <div className="size-12 rounded-2xl bg-hbf-green/10 flex items-center justify-center mb-6">
                <MapPin className="size-6 text-hbf-green" />
              </div>
              <h3 className="text-xl font-bold text-hbf-dark mb-2">Location</h3>
              <p className="text-hbf-muted text-sm mb-1">Cap-Haïtien, Haiti</p>
              <p className="text-hbf-muted text-sm">Miami, FL, USA</p>
            </div>

            {/* Hours */}
            <div className="bg-white p-8 rounded-3xl shadow-soft border border-hbf-green/5">
              <div className="size-12 rounded-2xl bg-hbf-green/10 flex items-center justify-center mb-6">
                <Clock className="size-6 text-hbf-green" />
              </div>
              <h3 className="text-xl font-bold text-hbf-dark mb-2">Office Hours</h3>
              <p className="text-hbf-muted text-sm mb-1">Mon - Fri: 9am - 5pm</p>
              <p className="text-hbf-muted text-sm">Sat: 10am - 2pm</p>
            </div>
          </div>
        </div>
      </section>

      {/* Re-use existing Contact section for the main CTA area */}
      <div className="pb-24">
        <ContactSection />
      </div>

      <Footer />
    </main>
  );
}
