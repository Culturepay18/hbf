"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { donation } from "@/lib/data";

type NavigationItem = {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
};

type NavigationGroup = {
  label: string;
  activePaths: string[];
  items: NavigationItem[];
};

const navigationGroups: NavigationGroup[] = [
  {
    label: "What we do",
    activePaths: ["/scholarships", "/innovation-lab", "/how-it-works"],
    items: [
      {
        label: "Scholarships",
        href: "/scholarships",
        description: "Funding pathways for high-potential Haitian students.",
      },
      {
        label: "Innovation Lab",
        href: "/innovation-lab",
        description: "Student-led ideas, projects, and national competition work.",
      },
      {
        label: "How it works",
        href: "/how-it-works",
        description: "How students apply, advance, and receive support.",
      },
    ],
  },
  {
    label: "About us",
    activePaths: ["/about", "/team", "/contact"],
    items: [
      {
        label: "Our mission",
        href: "/about",
        description: "The purpose and story behind Haiti Bright Futures.",
      },
      {
        label: "Team",
        href: "/team",
        description: "Meet the board and people building the organization.",
      },
      {
        label: "Contact us",
        href: "/contact",
        description: "Reach the HBF team directly.",
      },
    ],
  },
  {
    label: "News and stories",
    activePaths: ["/"],
    items: [
      {
        label: "Latest stories",
        href: "/#blog",
        description: "Updates, student stories, and organization news.",
      },
      {
        label: "Impact",
        href: "/#impact",
        description: "A quick view of HBF progress and program reach.",
      },
    ],
  },
  {
    label: "How to help",
    activePaths: ["/scholarship-application"],
    items: [
      {
        label: "Donate",
        href: donation.href,
        description: "Support scholarships and student programs.",
        external: true,
      },
      {
        label: "Apply for a scholarship",
        href: "/scholarship-application",
        description: "Start a student application.",
      },
      {
        label: "Get in touch",
        href: "/contact",
        description: "Partner, volunteer, or ask a question.",
      },
    ],
  },
];

function isGroupActive(pathname: string, group: NavigationGroup) {
  return group.activePaths.includes(pathname);
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const prefersReducedMotion = useReducedMotion();
  const isSolid = !isHomePage || isScrolled || isOpen;

  useEffect(() => {
    if (!isHomePage) {
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const frame = window.requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 border-b transition duration-300",
        isSolid
          ? "border-black/5 bg-white/95 shadow-[0_12px_34px_rgba(15,23,42,0.08)] backdrop-blur-md"
          : "border-transparent bg-transparent",
      ].join(" ")}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link href="/" className="focus-hbf flex shrink-0 items-center gap-3 rounded-full">
          <Image
            src="/images/hbf-logo.png"
            alt="Logo Haiti Bright Futures"
            width={58}
            height={58}
            className="h-12 w-12 rounded-full object-contain"
            style={{ filter: isSolid ? "none" : "brightness(0) invert(1)" }}
            priority
          />
          <span
            className={[
              "hidden text-sm font-semibold leading-tight sm:block",
              isSolid ? "text-hbf-dark" : "text-white",
            ].join(" ")}
          >
            Haiti Bright
            <span className={isSolid ? "block text-hbf-green" : "block text-white/90"}>Futures</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navigationGroups.map((group) => {
            const active = isGroupActive(pathname, group);

            return (
              <div key={group.label} className="group relative">
                <button
                  type="button"
                  className={[
                    "focus-hbf nav-link inline-flex h-12 items-center gap-1.5 rounded-none px-5 text-[15px] font-semibold transition",
                    isSolid
                      ? active
                        ? "nav-link-active text-hbf-dark"
                        : "text-hbf-dark hover:text-hbf-green"
                      : active
                        ? "nav-link-active text-white"
                        : "text-white/95 hover:text-white",
                  ].join(" ")}
                  aria-haspopup="menu"
                >
                  {group.label}
                  <ChevronDown
                    aria-hidden="true"
                    size={16}
                    className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                  />
                </button>

                <div className="invisible absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="rounded-md border border-black/10 bg-white p-2 shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
                    {group.items.map((item) => {
                      const className = [
                        "focus-hbf block rounded px-4 py-3 transition",
                        !item.external && pathname === item.href
                          ? "bg-hbf-green/10 text-hbf-green"
                          : "text-hbf-dark hover:bg-hbf-cream",
                      ].join(" ");

                      const content = (
                        <>
                          <span className="block text-sm font-semibold">{item.label}</span>
                          {item.description ? (
                            <span className="mt-1 block text-xs leading-5 text-slate-500">{item.description}</span>
                          ) : null}
                        </>
                      );

                      return item.external ? (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className={className}
                          onClick={() => setIsOpen(false)}
                        >
                          {content}
                        </a>
                      ) : (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={className}
                          onClick={() => setIsOpen(false)}
                        >
                          {content}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <a
          href={donation.href}
          target="_blank"
          rel="noreferrer"
          className="focus-hbf hidden rounded-full bg-hbf-green px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(46,125,50,0.18)] transition hover:bg-hbf-green-light lg:inline-flex"
        >
          Donate
        </a>

        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className={[
            "focus-hbf inline-flex h-11 w-11 items-center justify-center rounded-full transition-all lg:hidden",
            isSolid
              ? "bg-white text-hbf-dark shadow-soft"
              : "border border-white/20 bg-white/10 text-white backdrop-blur-sm",
          ].join(" ")}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -16 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-20 z-40 max-h-[calc(100vh-5rem)] overflow-y-auto bg-white px-5 py-6 shadow-[0_24px_60px_rgba(15,23,42,0.14)] lg:hidden"
          >
            <div className="mx-auto flex max-w-2xl flex-col gap-5">
              {navigationGroups.map((group) => (
                <section key={group.label} className="border-b border-black/10 pb-5 last:border-b-0">
                  <h2 className="text-base font-bold text-hbf-dark">{group.label}</h2>
                  <div className="mt-3 grid gap-2">
                    {group.items.map((item) => {
                      const className = [
                        "focus-hbf rounded-md px-3 py-2.5 transition",
                        !item.external && pathname === item.href
                          ? "bg-hbf-green/10 text-hbf-green"
                          : "text-hbf-dark hover:bg-hbf-cream",
                      ].join(" ");

                      const content = (
                        <>
                          <span className="block text-sm font-semibold">{item.label}</span>
                          {item.description ? (
                            <span className="mt-0.5 block text-xs leading-5 text-slate-500">{item.description}</span>
                          ) : null}
                        </>
                      );

                      return item.external ? (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className={className}
                        >
                          {content}
                        </a>
                      ) : (
                        <Link key={item.href} href={item.href} className={className}>
                          {content}
                        </Link>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
