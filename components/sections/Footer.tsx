import { Camera, Globe, Mail, MessageCircle, Play, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { contact, donation, navLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-hbf-dark text-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="relative size-12 overflow-hidden rounded-full bg-white p-1">
                <Image
                  src="/images/hbf-logo.png"
                  alt="Haiti Bright Futures Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Haiti Bright <span className="text-hbf-green-light">Futures</span>
              </span>
            </div>
            <p className="text-white/70 leading-relaxed max-w-xs text-sm">
              Empowering the next generation of Haitian leaders through education, sports, and holistic development.
            </p>
            <div className="flex gap-4">
              <a 
                href={contact.instagramUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-full bg-white/5 hover:bg-hbf-green transition-all hover:scale-110" 
                title="Instagram"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="size-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-hbf-brown mb-6 relative pb-2 inline-block group cursor-default">
              Navigation
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hbf-orange transition-all duration-300 group-hover:w-full"></span>
            </h3>
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-white/70 hover:text-white transition-colors hover:translate-x-1 inline-block transform text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-hbf-brown mb-6 relative pb-2 inline-block group cursor-default">
              Get in Touch
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hbf-orange transition-all duration-300 group-hover:w-full"></span>
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-hbf-green/20 transition-colors">
                    <Mail className="size-5 text-hbf-brown" />
                  </div>
                  <span className="text-sm">{contact.email}</span>
                </a>
              </li>
              <li>
                <a href={contact.whatsappUrl} className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-hbf-green/20 transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 text-hbf-brown">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03c0 2.122.554 4.193 1.607 6.048L0 24l6.117-1.605a11.793 11.793 0 005.93 1.588h.005c6.631 0 12.028-5.397 12.033-12.034a11.85 11.85 0 00-3.535-8.503z"/>
                    </svg>
                  </div>
                  <span className="text-sm">{contact.whatsapp}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-hbf-orange mb-6 relative pb-2 inline-block group cursor-default">
              Support Our Mission
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hbf-gold transition-all duration-300 group-hover:w-full"></span>
            </h3>
            <p className="text-sm text-white/60">
              Your contribution directly impacts the lives of students across Haiti. Haiti Bright Futures (HBF) is a 501(c)(3) nonprofit organization.
            </p>
            <Button asChild className="bg-hbf-green hover:bg-hbf-green-light text-white font-black h-14 rounded-xl shadow-lg transition-all hover:scale-105">
              <a href={donation.href} target="_blank" rel="noreferrer">
                Donate Now
              </a>
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40 text-center md:text-left">
          <p>© {new Date().getFullYear()} Haiti Bright Futures. A registered 501(c)(3) nonprofit organization. All Rights Reserved.</p>
          <div className="flex gap-6 text-[13px]">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
