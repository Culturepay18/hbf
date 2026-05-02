import { Camera, Globe, Mail, MessageCircle, Play, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { contact, donation, navLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-hbf-dark text-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          {/* Column 1: Brand & Contact */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12">
                <Image
                  src="/images/logo-hbf-01.png"
                  alt="Haiti Bright Futures Logo"
                  fill
                  className="object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Haiti Bright <span className="text-hbf-green-light">Futures</span>
              </span>
            </div>
            <p className="text-white/70 leading-relaxed max-w-sm text-sm">
              Empowering the next generation of Haitian leaders through education, sports, and holistic development.
            </p>
            
            <div className="flex flex-wrap items-center gap-6 mt-1">
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group text-sm">
                <Mail className="size-4 text-hbf-green-light" />
                <span>{contact.email}</span>
              </a>
              <a href={contact.whatsappUrl} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group text-sm">
                <MessageCircle className="size-4 text-hbf-green-light" />
                <span>{contact.whatsapp}</span>
              </a>
              <a 
                href={contact.instagramUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-full bg-white/5 hover:bg-hbf-green transition-all hover:scale-110 flex items-center justify-center" 
                title="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="md:pl-12 lg:pl-24">
            <h3 className="text-sm font-bold uppercase tracking-widest text-hbf-brown mb-6">
              Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-4">
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
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex justify-center items-center text-sm text-white/40 text-center">
          <p>© {new Date().getFullYear()} Haiti Bright Futures. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
