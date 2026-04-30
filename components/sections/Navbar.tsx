"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { donation, navLinks } from "@/lib/data";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Check initial scroll
    } else {
      setIsScrolled(true); // Force dark mode on other pages
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    // If we are on a dedicated page (Scholarships, Team, Contact)
    if (pathname === href) return true;

    // Special case for Home: only active if pathname is / and href is /
    // We avoid highlighting /#about and /#blog when we are just at /
    if (pathname === "/" && href === "/") return true;

    return false;
  };

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition duration-300",
        isScrolled ? "bg-white/85 shadow-soft backdrop-blur-md" : "bg-transparent",
      ].join(" ")}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link href="/" className="focus-hbf flex items-center gap-3 rounded-full">
          <Image
            src="/images/hbf-logo.png"
            alt="Logo Haiti Bright Futures"
            width={58}
            height={58}
            className="h-12 w-12 rounded-full object-contain brightness-0 invert"
            style={{ filter: isScrolled ? "none" : "brightness(0) invert(1)" }}
            priority
          />
          <span className={["hidden text-sm font-semibold leading-tight sm:block", isScrolled ? "text-hbf-dark" : "text-white"].join(" ")}>
            Haiti Bright
            <span className={isScrolled ? "block text-hbf-green" : "block text-white/90"}>Futures</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                "nav-link focus-hbf rounded-sm text-sm font-medium transition",
                isScrolled 
                  ? (isActive(link.href) ? "nav-link-active text-hbf-green" : "text-hbf-dark hover:text-hbf-green")
                  : (isActive(link.href) ? "nav-link-active text-white" : "text-white/90 hover:text-white")
              ].join(" ")}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            asChild
            className="rounded-full bg-hbf-green px-8 text-white font-bold shadow-[0_10px_24px_rgba(46,125,50,0.18)] hover:bg-hbf-green-light hover:shadow-[0_14px_30px_rgba(46,125,50,0.22)] transition-all hover:scale-105"
          >
            <a href={donation.href} target="_blank" rel="noreferrer">
              Donate
            </a>
          </Button>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className={[
            "focus-hbf inline-flex h-11 w-11 items-center justify-center rounded-full transition-all lg:hidden",
            isScrolled ? "bg-white text-hbf-dark shadow-soft" : "bg-white/10 text-white border border-white/20 backdrop-blur-sm"
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
            className="fixed inset-x-0 top-20 z-40 min-h-[calc(100vh-5rem)] bg-hbf-cream/98 px-6 py-8 backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Link
                    href={link.href}
                    className={[
                      "focus-hbf block rounded-md py-2 text-2xl font-semibold transition-colors",
                      isActive(link.href) ? "text-hbf-green" : "text-hbf-dark hover:text-hbf-green"
                    ].join(" ")}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Button
                asChild
                className="mt-4 w-full rounded-xl bg-hbf-green text-white font-bold shadow-lg hover:bg-hbf-green-light"
                onClick={() => setIsOpen(false)}
              >
                <a href={donation.href} target="_blank" rel="noreferrer">
                  Donate
                </a>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
