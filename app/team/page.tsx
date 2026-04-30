import Image from "next/image";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { team } from "@/lib/data";

export const metadata = {
  title: "Our Team | Haiti Bright Futures",
  description: "Meet the dedicated individuals behind Haiti Bright Futures, working to empower the next generation of Haitian leaders.",
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-32 pb-16 bg-hbf-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-hbf-green">Our Leadership</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-hbf-dark">
            Meet the Dedicated <span className="text-hbf-green">HBF Team</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-hbf-muted">
            The dedicated individuals working tirelessly to create a brighter future for the youth of Haiti through education, sports, and mentorship.
          </p>
        </div>
      </section>

      {/* Team Details Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-20">
            {team.map((member, index) => (
              <div 
                key={member.name} 
                className={`flex flex-col md:flex-row gap-12 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Photo with frame effect */}
                <div className="w-full md:w-2/5 shrink-0 group">
                  <div className="relative aspect-square overflow-hidden rounded-[2.5rem] shadow-xl border-4 border-white">
                    <Image
                      src={member.image || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-hbf-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute -left-6 top-0 w-1 h-12 bg-hbf-orange rounded-full hidden md:block" />
                    <h2 className="text-3xl font-bold text-hbf-dark">{member.name}</h2>
                    <p className="text-xl font-medium text-hbf-green-light mt-1">{member.role}</p>
                    <p className="text-sm font-semibold uppercase tracking-widest text-hbf-brown mt-4 mb-8">
                      Alumnus: {member.school}
                    </p>
                  </div>
                  <div className="prose prose-lg text-hbf-muted leading-relaxed">
                    {member.bio.split('\n').map((para, i) => (
                      <p key={i} className="mb-4">{para}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-24 bg-hbf-cream">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-hbf-dark mb-6">Want to get involved?</h2>
          <p className="text-lg text-hbf-muted mb-10">
            HBF is always looking for passionate partners and volunteers who share our vision for Haiti.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/contact" 
              className="px-8 h-14 flex items-center justify-center rounded-full bg-hbf-green text-white font-bold hover:bg-hbf-green-light transition-all"
            >
              Join Our Mission
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
