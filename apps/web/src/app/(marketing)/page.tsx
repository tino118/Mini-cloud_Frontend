"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

// ── Icons (inline SVG, no extra deps) ─────────────────────────────────────────

function CloudLogoIcon() {
  return (
    <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M28.5 11.5C28.2 7.36 24.75 4 20.5 4C17.36 4 14.64 5.72 13.22 8.3C12.68 8.1 12.1 8 11.5 8C8.46 8 6 10.46 6 13.5C6 13.67 6.01 13.84 6.02 14H6C3.79 14 2 15.79 2 18C2 20.21 3.79 22 6 22H28C30.76 22 33 19.76 33 17C33 14.36 30.97 12.2 28.38 12.02C28.43 11.85 28.5 11.68 28.5 11.5Z"
        fill="#1a73e8"
        stroke="#1a73e8"
        strokeWidth="0.5"
      />
      <path
        d="M18 14L22 10M22 10H18M22 10V14"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ServerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="32" height="10" rx="2" fill="#1a73e8" opacity="0.15" stroke="#1a73e8" strokeWidth="1.5" />
      <rect x="8" y="22" width="32" height="10" rx="2" fill="#1a73e8" opacity="0.15" stroke="#1a73e8" strokeWidth="1.5" />
      <rect x="8" y="36" width="32" height="4" rx="1" fill="#1a73e8" opacity="0.08" stroke="#1a73e8" strokeWidth="1" />
      <circle cx="14" cy="13" r="2" fill="#1a73e8" />
      <circle cx="21" cy="13" r="2" fill="#1a73e8" opacity="0.5" />
      <circle cx="14" cy="27" r="2" fill="#1a73e8" />
      <circle cx="21" cy="27" r="2" fill="#1a73e8" opacity="0.5" />
      <line x1="28" y1="13" x2="34" y2="13" stroke="#1a73e8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="27" x2="34" y2="27" stroke="#1a73e8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function FlaskIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 8V22L10 36C9 38 10.5 40 13 40H35C37.5 40 39 38 38 36L30 22V8"
        stroke="#16a34a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#16a34a"
        fillOpacity="0.1"
      />
      <line x1="16" y1="8" x2="32" y2="8" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
      <circle cx="18" cy="30" r="2" fill="#16a34a" opacity="0.7" />
      <circle cx="26" cy="34" r="1.5" fill="#16a34a" opacity="0.5" />
    </svg>
  )
}

function RocketIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 4C24 4 14 14 14 26L18 30L24 24L30 30L34 26C34 14 24 4 24 4Z"
        fill="#ea580c"
        fillOpacity="0.15"
        stroke="#ea580c"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="18" r="4" stroke="#ea580c" strokeWidth="1.8" fill="white" />
      <path d="M18 30L14 38L22 34" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 30L34 38L26 34" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="7" r="3" stroke="#1a73e8" strokeWidth="1.5" />
      <path d="M3 20C3 17 5.5 15 9 15C12.5 15 15 17 15 20" stroke="#1a73e8" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17" cy="8" r="2.5" stroke="#1a73e8" strokeWidth="1.5" />
      <path d="M15.5 15.5C16.2 15.2 17 15 17.8 15C20.2 15 22 16.7 22 19" stroke="#1a73e8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function UptimeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12" stroke="#1a73e8" strokeWidth="1.5" strokeLinecap="round" />
      <polyline points="22,2 22,8 16,8" stroke="#1a73e8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 2L15 9" stroke="#1a73e8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 7V12L15 15" stroke="#1a73e8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function SupportIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="#1a73e8" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="#1a73e8" strokeWidth="1.5" />
      <line x1="3" y1="12" x2="8" y2="12" stroke="#1a73e8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="12" x2="21" y2="12" stroke="#1a73e8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="3" x2="12" y2="8" stroke="#1a73e8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="16" x2="12" y2="21" stroke="#1a73e8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function LabIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="#1a73e8" strokeWidth="1.5" />
      <path d="M3 9H21" stroke="#1a73e8" strokeWidth="1.5" />
      <path d="M9 3V9" stroke="#1a73e8" strokeWidth="1.5" />
      <circle cx="15" cy="15" r="3" stroke="#1a73e8" strokeWidth="1.5" />
    </svg>
  )
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Isometric cloud illustration (SVG) ───────────────────────────────────────

function CloudIllustration() {
  return (
    <svg
      viewBox="0 0 520 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Grid / platform base */}
      <ellipse cx="260" cy="330" rx="180" ry="30" fill="#e8f0fe" opacity="0.7" />

      {/* Large cloud left */}
      <g className="animate-float">
        <path
          d="M100 130 C90 130 82 122 82 112 C82 102 90 94 100 94 C100 94 98 90 100 86 C106 74 122 70 132 80 C136 72 148 68 158 74 C166 66 182 66 190 78 C202 76 212 86 210 98 C218 100 222 110 216 118 C212 124 204 128 196 128 L100 130Z"
          fill="#4285f4"
          opacity="0.9"
        />
        {/* Cloud shading */}
        <path
          d="M100 130 C90 130 82 122 82 112 C82 104 88 98 96 95 L196 128 L100 130Z"
          fill="#1a73e8"
          opacity="0.4"
        />
      </g>

      {/* Small cloud right */}
      <g className="animate-float animation-delay-500">
        <path
          d="M320 80 C313 80 308 75 308 68 C308 61 313 56 320 56 C320 53 322 50 326 48 C332 42 342 44 346 52 C350 46 360 44 364 52 C372 50 378 58 374 66 C378 68 380 74 376 80 L320 80Z"
          fill="#4285f4"
          opacity="0.85"
        />
      </g>

      {/* Rain / connection lines from cloud to servers */}
      <g className="animate-pulse-soft">
        <line x1="160" y1="130" x2="160" y2="175" stroke="#1a73e8" strokeWidth="2" strokeDasharray="4 3" opacity="0.5" />
        <line x1="185" y1="130" x2="235" y2="175" stroke="#1a73e8" strokeWidth="2" strokeDasharray="4 3" opacity="0.5" />
        <line x1="140" y1="130" x2="90" y2="175" stroke="#1a73e8" strokeWidth="2" strokeDasharray="4 3" opacity="0.5" />
      </g>

      {/* === Server rack left (isometric) === */}
      {/* Top face */}
      <polygon points="50,175 110,145 170,175 110,205" fill="#e8f0fe" stroke="#4285f4" strokeWidth="1" />
      {/* Left face */}
      <polygon points="50,175 50,275 110,305 110,205" fill="#c5d8fb" stroke="#4285f4" strokeWidth="1" />
      {/* Right face */}
      <polygon points="170,175 170,275 110,305 110,205" fill="#a8c4f8" stroke="#4285f4" strokeWidth="1" />
      {/* Rack slots - left */}
      <rect x="55" y="190" width="50" height="5" rx="1" fill="#4285f4" opacity="0.4" transform="skewY(-30)" />
      <rect x="55" y="205" width="50" height="5" rx="1" fill="#4285f4" opacity="0.4" transform="skewY(-30)" />
      <rect x="55" y="220" width="50" height="5" rx="1" fill="#4285f4" opacity="0.4" transform="skewY(-30)" />
      {/* LED dots left rack */}
      <circle cx="62" cy="197" r="2" fill="#34a853" className="animate-pulse-soft" />
      <circle cx="62" cy="212" r="2" fill="#34a853" className="animate-pulse-soft animation-delay-200" />
      <circle cx="62" cy="227" r="2" fill="#fbbc04" className="animate-pulse-soft animation-delay-400" />

      {/* === Server rack center (isometric) === */}
      <polygon points="180,155 250,120 320,155 250,190" fill="#dce8fd" stroke="#1a73e8" strokeWidth="1.2" />
      <polygon points="180,155 180,265 250,300 250,190" fill="#b8d0fb" stroke="#1a73e8" strokeWidth="1.2" />
      <polygon points="320,155 320,265 250,300 250,190" fill="#9bbdf9" stroke="#1a73e8" strokeWidth="1.2" />
      {/* Rack slots center */}
      <rect x="188" y="175" width="58" height="6" rx="1" fill="#1a73e8" opacity="0.35" transform="skewY(-28)" />
      <rect x="188" y="195" width="58" height="6" rx="1" fill="#1a73e8" opacity="0.35" transform="skewY(-28)" />
      <rect x="188" y="215" width="58" height="6" rx="1" fill="#1a73e8" opacity="0.35" transform="skewY(-28)" />
      <circle cx="197" cy="183" r="2.5" fill="#34a853" className="animate-pulse-soft animation-delay-100" />
      <circle cx="197" cy="203" r="2.5" fill="#34a853" className="animate-pulse-soft animation-delay-300" />
      <circle cx="197" cy="223" r="2.5" fill="#34a853" className="animate-pulse-soft animation-delay-500" />

      {/* === Server rack right (isometric) === */}
      <polygon points="310,190 360,165 410,190 360,215" fill="#e8f0fe" stroke="#4285f4" strokeWidth="1" />
      <polygon points="310,190 310,280 360,305 360,215" fill="#c5d8fb" stroke="#4285f4" strokeWidth="1" />
      <polygon points="410,190 410,280 360,305 360,215" fill="#a8c4f8" stroke="#4285f4" strokeWidth="1" />
      <rect x="315" y="208" width="42" height="5" rx="1" fill="#4285f4" opacity="0.35" transform="skewY(-26)" />
      <rect x="315" y="222" width="42" height="5" rx="1" fill="#4285f4" opacity="0.35" transform="skewY(-26)" />
      <circle cx="322" cy="216" r="2" fill="#34a853" className="animate-pulse-soft animation-delay-200" />
      <circle cx="322" cy="230" r="2" fill="#fbbc04" className="animate-pulse-soft animation-delay-400" />

      {/* Laptop front-left */}
      <polygon points="30,285 80,260 100,275 50,300" fill="#f0f4ff" stroke="#4285f4" strokeWidth="1" />
      <polygon points="30,285 50,300 55,340 35,325" fill="#dce8fd" stroke="#4285f4" strokeWidth="0.8" />
      <polygon points="100,275 50,300 55,340 105,315" fill="#c5d8fb" stroke="#4285f4" strokeWidth="0.8" />
      {/* Laptop screen hint */}
      <polygon points="35,278 75,258 95,270 55,290" fill="#4285f4" opacity="0.2" />

      {/* Shield badge on laptop */}
      <path
        d="M56 270 L62 268 L68 270 L68 278 C68 282 62 284 62 284 C62 284 56 282 56 278 Z"
        fill="#1a73e8"
        opacity="0.8"
      />
      <path d="M59 275 L61 277 L66 272" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Box / cube right */}
      <polygon points="410,230 450,210 490,230 450,250" fill="#e8f0fe" stroke="#4285f4" strokeWidth="1" />
      <polygon points="410,230 410,275 450,295 450,250" fill="#b8d0fb" stroke="#4285f4" strokeWidth="1" />
      <polygon points="490,230 490,275 450,295 450,250" fill="#9bbdf9" stroke="#4285f4" strokeWidth="1" />

      {/* Floating small cubes */}
      <g className="animate-float animation-delay-300">
        <polygon points="380,80 395,72 410,80 395,88" fill="#c5d8fb" stroke="#4285f4" strokeWidth="0.8" opacity="0.7" />
        <polygon points="380,80 380,98 395,106 395,88" fill="#a8c4f8" stroke="#4285f4" strokeWidth="0.8" opacity="0.7" />
        <polygon points="410,80 410,98 395,106 395,88" fill="#8ab7f7" stroke="#4285f4" strokeWidth="0.8" opacity="0.7" />
      </g>

      <g className="animate-float animation-delay-700">
        <polygon points="60,80 72,74 84,80 72,86" fill="#c5d8fb" stroke="#4285f4" strokeWidth="0.8" opacity="0.6" />
        <polygon points="60,80 60,94 72,100 72,86" fill="#a8c4f8" stroke="#4285f4" strokeWidth="0.8" opacity="0.6" />
        <polygon points="84,80 84,94 72,100 72,86" fill="#8ab7f7" stroke="#4285f4" strokeWidth="0.8" opacity="0.6" />
      </g>

      {/* Connectivity lines */}
      <line x1="110" y1="305" x2="250" y2="300" stroke="#4285f4" strokeWidth="1" strokeDasharray="5 4" opacity="0.4" />
      <line x1="250" y1="300" x2="360" y2="305" stroke="#4285f4" strokeWidth="1" strokeDasharray="5 4" opacity="0.4" />
    </svg>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function MiniCloudPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)

  // Mechanism for scroll reveal
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { label: "Accueil", href: "#", active: true },
    { 
      label: "Solutions", 
      href: "#solutions", 
      hasDropdown: true,
      subLinks: [
        { title: "Mini Cloud Infra", desc: "Hébergement haute performance", href: "#solutions", icon: <ServerIcon className="w-4 h-4 text-[#1a73e8]" /> },
        { title: "Mini Cloud Labs", desc: "Laboratoires virtuels EVE-NG/GNS3", href: "#labs", icon: <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/></svg> },
        { title: "Mini Cloud Deploy", desc: "Accompagnement sur-mesure", href: "#solutions", icon: <svg className="w-4 h-4 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15v5s3.03-.55 4-2"/></svg> }
      ]
    },
    { label: "Tarifs", href: "#tarifs" },
    { label: "Documentation", href: "#" },
    { label: "À propos", href: "#" },
    { label: "Contact", href: "#" },
  ]

  const stats = [
    { icon: <UsersIcon className="w-8 h-8" />, value: "+500", label: "Clients satisfaits" },
    { icon: <UptimeIcon className="w-8 h-8" />, value: "99,9%", label: "Uptime" },
    { icon: <SupportIcon className="w-8 h-8" />, value: "24/7", label: "Support technique" },
    { icon: <LabIcon className="w-8 h-8" />, value: "50+", label: "Laboratoires disponibles" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* ── NAVBAR ────────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <CloudLogoIcon />
              <span className="font-serif font-bold text-base tracking-wide text-foreground uppercase">
                Mini Cloud
              </span>
            </div>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
              {navLinks.map((link) => (
                <div 
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setSolutionsOpen(true)}
                  onMouseLeave={() => link.hasDropdown && setSolutionsOpen(false)}
                >
                  <a
                    href={link.href}
                    className={`flex items-center gap-1 px-3.5 py-2 text-sm rounded-md transition-all duration-200 ${
                      link.active
                        ? "text-[#1a73e8] font-semibold bg-blue-50/80"
                        : "text-foreground hover:text-[#1a73e8] hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                    {link.hasDropdown && (
                      <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${solutionsOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {link.hasDropdown && solutionsOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 animate-scale-in z-50">
                      <div className="bg-white border border-border rounded-2xl shadow-xl shadow-primary/10 p-2 overflow-hidden">
                        <div className="grid gap-1">
                          {link.subLinks?.map((sub) => (
                            <a 
                              key={sub.title}
                              href={sub.href}
                              className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group/sub"
                            >
                              <div className="mt-0.5 p-2 bg-gray-50 rounded-lg group-hover/sub:bg-white transition-colors">
                                {sub.icon}
                              </div>
                              <div>
                                <div className="text-xs font-bold text-foreground mb-0.5">{sub.title}</div>
                                <div className="text-[10px] text-muted-foreground leading-tight">{sub.desc}</div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="#"
                className="px-4 py-2 text-sm font-medium text-foreground border border-border rounded-lg hover:border-[#1a73e8] hover:text-[#1a73e8] transition-all duration-200 hover:shadow-sm"
              >
                Connexion
              </a>
              <a
                href="#"
                className="px-5 py-2 text-sm text-white bg-[#1a73e8] rounded-lg hover:bg-[#1557b0] transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
              >
                Essai gratuit
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg text-foreground hover:text-[#1a73e8] hover:bg-gray-50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Ouvrir le menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-1 animate-fade-in">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href="#"
                className={`py-2.5 px-3 text-sm rounded-lg transition-colors ${link.active ? "text-[#1a73e8] font-semibold bg-blue-50" : "text-foreground hover:bg-gray-50"}`}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-border">
              <a href="#" className="py-2.5 text-sm text-center font-medium border border-border rounded-lg hover:border-[#1a73e8]">Connexion</a>
              <a href="#" className="py-2.5 text-sm text-center text-white bg-[#1a73e8] rounded-lg font-semibold">Essai gratuit</a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ── HERO ────────────────────────────────────────────────────────── */}
        <section className="bg-background overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-6 items-center">
              {/* Left */}
              <div className="order-2 lg:order-1">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-foreground leading-[1.1] tracking-tight text-balance animate-fade-in-up">
                  Votre{" "}
                  <span className="text-[#1a73e8] relative">
                    cloud.
                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#1a73e8]/20 rounded-full"></span>
                  </span>
                  <br />
                  Votre potentiel.
                  <br />
                  Notre engagement.
                </h1>
                <p className="mt-6 text-muted-foreground text-base leading-relaxed max-w-lg animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
                  Mini Cloud fournit des infrastructures cloud fiables, des laboratoires virtuels avancés et des services de déploiement sur-mesure pour accompagner votre croissance.
                </p>
                <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
                  <a
                    href="#"
                    className="group px-6 py-3 text-sm font-semibold text-white bg-[#1a73e8] rounded-lg hover:bg-[#1557b0] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5"
                  >
                    Créer un compte
                  </a>
                  <a
                    href="#"
                    className="group px-6 py-3 text-sm font-semibold text-foreground border border-border rounded-lg hover:border-[#1a73e8] hover:text-[#1a73e8] transition-all duration-300 hover:shadow-sm"
                  >
                    Demander une démo
                  </a>
                </div>
              </div>

              {/* Right – illustration */}
              <div className="order-1 lg:order-2 flex justify-center items-center h-64 sm:h-80 lg:h-96 animate-slide-in-right" style={{ animationDelay: "0.1s" }}>
                <CloudIllustration />
              </div>
            </div>
          </div>
        </section>

        {/* ── SOLUTIONS ───────────────────────────────────────────────────── */}
        <section id="solutions" className="bg-background py-16 lg:py-20" aria-labelledby="solutions-heading">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center mb-16 reveal">
              <div className="text-primary text-xs font-bold tracking-widest uppercase mb-3">Nos Solutions</div>
              <h2 id="solutions-heading" className="font-serif text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
                Trois univers, une seule plateforme.
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Des outils puissants pour héberger, apprendre et déployer — tout en un, conçu pour vous.
              </p>
            </div>

            {/* Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 reveal">
              {/* Infra */}
              <div className="group bg-card border border-border rounded-2xl p-8 hover:border-primary transition-all duration-300 hover:-translate-y-1 animate-scale-in" style={{ animationDelay: "0.1s" }}>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <ServerIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif font-bold text-lg text-primary mb-3">
                  MINI CLOUD INFRA
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Infrastructure cloud performante pour héberger vos workloads en toute sécurité. Instances, volumes, réseaux et snapshots à portée de main.
                </p>
                <a href="#" className="text-primary font-bold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all">
                  Découvrir <span>→</span>
                </a>
              </div>

              {/* Labs */}
              <div className="group bg-card border border-border rounded-2xl p-8 hover:border-green-500 transition-all duration-300 hover:-translate-y-1 animate-scale-in" style={{ animationDelay: "0.2s" }}>
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors">
                  <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
                </div>
                <h3 className="font-serif font-bold text-lg text-green-600 mb-3">
                  MINI CLOUD LABS
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Laboratoires virtuels pour apprendre, tester et certifier vos compétences. EVE-NG et GNS3 Full Pack, disponibles depuis le cloud.
                </p>
                <a href="#" className="text-green-600 font-bold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all">
                  Découvrir <span>→</span>
                </a>
              </div>

              {/* Deploy */}
              <div className="group bg-card border border-border rounded-2xl p-8 hover:border-orange-500 transition-all duration-300 hover:-translate-y-1 animate-scale-in" style={{ animationDelay: "0.3s" }}>
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors">
                  <svg className="w-6 h-6 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
                </div>
                <h3 className="font-serif font-bold text-lg text-orange-600 mb-3">
                  MINI CLOUD DEPLOY
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Déploiement de solutions On-Premise ou hébergées. Accompagnement par nos experts pour vos projets les plus complexes.
                </p>
                <a href="#" className="text-orange-600 font-bold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all">
                  Découvrir <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ───────────────────────────────────────────────────────── */}
        <section className="bg-background border-t border-border py-10 lg:py-14 reveal" aria-label="Statistiques">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {stats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-4 animate-count-up"
                  style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
                >
                  <div className="p-2.5 bg-blue-50 rounded-xl flex-shrink-0">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="font-serif text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                      {stat.value}
                    </p>
                    <p className="text-muted-foreground text-xs sm:text-sm">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── DASHBOARD PREVIEW ────────────────────────────────────────────── */}
      <section className="bg-[#0d1b3e] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_50%,rgba(21,101,245,0.15)_0%,transparent_60%)] pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <div className="text-[#4f9eff] text-sm font-bold tracking-widest uppercase mb-4">Tableau de bord</div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">
                Gérez tout depuis une interface intuitive.
              </h2>
              <p className="text-white/65 text-lg mb-10 leading-relaxed">
                Surveillez vos ressources en temps réel, créez des instances, gérez vos volumes et réseaux — tout est centralisé et accessible en quelques clics.
              </p>

              <div className="space-y-6">
                {[
                  { title: "Instances à la demande", desc: "Déployez des serveurs virtuels en quelques secondes avec le plan de ressources adapté à vos besoins." },
                  { title: "Monitoring en temps réel", desc: "CPU, mémoire, stockage — suivez l'utilisation de vos ressources sur les 7 derniers jours." },
                  { title: "Sécurité & Snapshots", desc: "Sauvegardez automatiquement, gérez vos clés SSH et configurez vos règles de sécurité réseau." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-blue-600/30 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[#4f9eff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-white mb-1">{item.title}</div>
                      <div className="text-white/50 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard Mockup */}
            <div className="bg-[#1a2b50] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-lg shadow-black/20 animate-slide-in-right">
              <div className="bg-[#0f1f3d] px-6 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <CloudLogoIcon />
                  </div>
                  <div>
                    <div className="text-white font-bold text-xs">MINI CLOUD</div>
                    <div className="text-[#4f9eff] font-bold text-[10px] tracking-tighter">INFRA</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-6 h-6 bg-white/10 rounded-md"></div>
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-[10px] font-bold">MD</div>
                </div>
              </div>
              <div className="flex">
                <div className="w-44 bg-[#0f1f3d] py-6 border-r border-white/5 hidden sm:block">
                  {['Tableau de bord', 'Instances', 'Volumes', 'Réseaux', 'Snapshots', 'Sécurité'].map((nav, i) => (
                    <div key={nav} className={`flex items-center gap-3 px-6 py-3 text-[11px] ${i === 0 ? 'text-white bg-blue-600/20 border-l-2 border-blue-600' : 'text-white/50 border-l-2 border-transparent'}`}>
                      <div className="w-4 h-4 rounded-sm bg-white/10"></div>
                      {nav}
                    </div>
                  ))}
                </div>
                <div className="flex-1 p-6">
                  <div className="text-white font-bold text-sm mb-5">Tableau de bord</div>
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {[
                      { val: "12", label: "Instances" },
                      { val: "4", label: "Volumes" },
                      { val: "2", label: "Réseaux" },
                      { val: "256 GB", label: "Stockage" }
                    ].map((kpi) => (
                      <div key={kpi.label} className="bg-white/5 border border-white/10 rounded-xl p-3">
                        <div className="text-white font-bold text-base leading-none">{kpi.val}</div>
                        <div className="text-white/40 text-[9px] mt-1">{kpi.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
                    <div className="text-white/70 text-[10px] font-semibold mb-3">Utilisation des ressources — 7 jours</div>
                    <div className="flex items-end gap-1.5 h-16">
                      {[30, 45, 80, 60, 40, 90, 50, 35, 65, 45, 30, 55].map((h, i) => (
                        <div key={i} className={`flex-1 rounded-sm ${i > 7 ? 'bg-green-500' : 'bg-blue-600'} ${h > 70 ? 'opacity-100' : 'opacity-60'}`} style={{ height: `${h}%` }}></div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: 'web-01', status: 'En cours', ip: '192.168.1.10', color: 'bg-green-500' },
                      { name: 'db-01', status: 'En cours', ip: '192.168.1.11', color: 'bg-green-500' },
                      { name: 'app-01', status: 'Arrêtée', ip: '192.168.1.12', color: 'bg-red-500' }
                    ].map((row) => (
                      <div key={row.name} className="flex items-center justify-between text-[10px] py-2 border-t border-white/5">
                        <span className="text-white/80 w-16">{row.name}</span>
                        <span className="text-white/60 flex items-center gap-1.5 w-20">
                          <span className={`w-1.5 h-1.5 rounded-full ${row.color}`}></span>
                          {row.status}
                        </span>
                        <span className="text-white/40">{row.ip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LABS SECTION ─────────────────────────────────────────────────── */}
      <section id="labs" className="bg-background py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <div className="text-primary text-sm font-bold tracking-widest uppercase mb-3">Mini Cloud Labs</div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">Environnements de laboratoires disponibles</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Accédez à des environnements EVE-NG ou GNS3 Full Pack complets depuis le cloud.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 reveal">
            {/* EVE-NG Card */}
            <div className="border-2 border-border rounded-[2rem] overflow-hidden hover:border-primary transition-all hover:-translate-y-2 group bg-card shadow-sm">
              <div className="p-8 pb-4 flex items-center gap-5">
                <div className="w-14 h-14 bg-[#1a1a2e] rounded-2xl flex items-center justify-center font-black text-[#00d4ff] text-2xl">EVE</div>
                <div>
                  <div className="font-serif font-bold text-xl text-gray-900">EVE-NG</div>
                  <div className="text-gray-400 text-sm">Cloud Lab</div>
                </div>
              </div>
              <div className="px-8 pb-8">
                <ul className="space-y-3 mb-8">
                  {['Accès à des milliers d\'images IOS & devices', 'Topologies illimitées', 'Connexion Web sécurisée (HTML5)', 'Sauvegarde & restauration automatique', 'Idéal pour CCNA, CCNP, ENCOR, etc.'].map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="text-green-500 font-bold">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 p-8 border-t border-gray-100 flex items-center justify-between">
                <div className="font-serif font-bold text-xl">2.000 FCFA <span className="text-xs font-normal text-gray-400">/ heure</span></div>
                <a href="#" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors">Lancer un lab</a>
              </div>
            </div>

            {/* GNS3 Card */}
            <div className="border-2 border-border rounded-[2rem] overflow-hidden hover:border-purple-600 transition-all hover:-translate-y-2 group bg-card shadow-sm">
              <div className="p-8 pb-4 flex items-center gap-5">
                <div className="w-14 h-14 bg-purple-700 rounded-2xl flex items-center justify-center font-black text-white text-2xl">GNS</div>
                <div>
                  <div className="font-serif font-bold text-xl text-gray-900">GNS3 Full Pack</div>
                  <div className="text-gray-400 text-sm">Cloud Lab</div>
                </div>
              </div>
              <div className="px-8 pb-8">
                <ul className="space-y-3 mb-8">
                  {['GNS3 + toutes les appliances intégrées', 'IOS, NX-OS, ASA, Palo Alto, FortiGate…', 'Multi-utilisateurs', 'Projets sauvegardés dans le cloud', 'Parfait pour les réseaux avancés'].map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="text-green-500 font-bold">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 p-8 border-t border-gray-100 flex items-center justify-between">
                <div className="font-serif font-bold text-xl">2.500 FCFA <span className="text-xs font-normal text-gray-400">/ heure</span></div>
                <a href="#" className="bg-purple-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-purple-500/30 hover:bg-purple-700 transition-colors">Lancer un lab</a>
              </div>
            </div>
          </div>

          {/* Labs Bottom Bar */}
          <div className="mt-12 bg-[#0d1b3e] rounded-[2rem] overflow-hidden grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {[
              { 
                title: "Aucun matériel", 
                desc: "Travaillez depuis votre PC.", 
                icon: <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> 
              },
              { 
                title: "Accès partout", 
                desc: "Disponible 24h/7j partout.", 
                icon: <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg> 
              },
              { 
                title: "Performance", 
                desc: "Ressources dédiées.", 
                icon: <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> 
              },
              { 
                title: "À l'usage", 
                desc: "Payez ce que vous utilisez.", 
                icon: <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> 
              }
            ].map((item) => (
              <div key={item.title} className="bg-[#0d1b3e] p-8 flex gap-4 items-start">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">{item.icon}</div>
                <div>
                  <div className="text-white font-bold text-sm mb-1">{item.title}</div>
                  <div className="text-white/50 text-[11px] leading-tight">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING SECTION ─────────────────────────────────────────────── */}
      <section id="tarifs" className="bg-[#f8faff] py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <div className="text-primary text-sm font-bold tracking-widest uppercase mb-3">Tarifs</div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">Des offres adaptées à chaque besoin.</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Commencez gratuitement, montez en puissance quand vous en avez besoin.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { name: "Starter", price: "5.000", desc: "Parfait pour tester et lancer vos premiers projets cloud.", featured: false, features: ["2 instances (1 vCPU / 1 GB)", "50 GB de stockage SSD", "1 adresse IP publique", "Snapshots manuels", "Support email"] },
              { name: "Pro", price: "25.000", desc: "La puissance nécessaire pour les applications en production.", featured: true, features: ["10 instances (4 vCPU / 8 GB)", "500 GB de stockage SSD", "5 adresses IP publiques", "Snapshots automatiques", "Support 24/7 prioritaire", "Accès Labs inclus"] },
              { name: "Entreprise", price: "Sur devis", isQuote: true, desc: "Infrastructure dédiée et accompagnement expert.", featured: false, features: ["Instances illimitées", "Stockage illimité", "IP dédiées", "SLA 99.9% garanti", "Manager de compte dédié", "Déploiement On-Premise"] }
            ].map((plan) => (
              <div key={plan.name} className={`relative bg-card border-2 rounded-[2rem] p-10 transition-all hover:-translate-y-2 reveal ${plan.featured ? 'border-primary shadow-lg shadow-primary/10 bg-primary text-primary-foreground animate-pulse-glow' : 'border-border shadow-sm'}`}>
                {plan.featured && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-bold tracking-widest px-4 py-1 rounded-full uppercase">Le plus populaire</div>}
                <div className={`text-xs font-bold tracking-widest uppercase mb-4 ${plan.featured ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{plan.name}</div>
                <div className="font-serif font-black text-4xl mb-2 flex items-baseline gap-1">
                  {!plan.isQuote && <span className="text-lg">FCFA</span>}
                  {plan.price}
                  {!plan.isQuote && <span className={`text-sm font-normal ${plan.featured ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>/mois</span>}
                </div>
                <p className={`text-sm mb-10 leading-relaxed ${plan.featured ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{plan.desc}</p>
                <ul className="space-y-4 mb-10">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm font-medium">
                      <span className={`w-1.5 h-1.5 rounded-full ${plan.featured ? 'bg-primary-foreground' : 'bg-green-500'}`}></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${plan.featured ? 'bg-primary-foreground text-primary hover:bg-gray-100' : 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'}`}>
                  {plan.isQuote ? 'Nous contacter' : 'Commencer'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ─────────────────────────────────────────────────── */}
      <section className="bg-[#0d1b3e] py-24 text-center relative overflow-hidden reveal">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6">Prêt à propulser votre infrastructure ?</h2>
          <p className="text-white/60 text-lg mb-10">Rejoignez plus de 500 entreprises qui font confiance à Mini Cloud pour leur croissance digitale.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="bg-white text-[#0d1b3e] px-10 py-4 rounded-xl font-bold text-sm shadow-xl hover:-translate-y-1 transition-all">Créer un compte gratuit</a>
            <a href="#" className="border-2 border-white/20 text-white px-10 py-4 rounded-xl font-bold text-sm hover:bg-white/5 transition-all">Parler à un expert</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="bg-[#080f20] pt-20 pb-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <CloudLogoIcon />
                <span className="text-white font-serif font-bold text-xl tracking-tight">MINI CLOUD</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                Infrastructure cloud fiable, laboratoires virtuels avancés et déploiement sur-mesure pour accompagner votre croissance.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Solutions</h4>
              <ul className="space-y-4 text-sm text-white/40">
                <li><a href="#" className="hover:text-white transition-colors">Mini Cloud Infra</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mini Cloud Labs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mini Cloud Deploy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tarifs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Ressources</h4>
              <ul className="space-y-4 text-sm text-white/40">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutoriels</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Entreprise</h4>
              <ul className="space-y-4 text-sm text-white/40">
                <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-white/20 text-xs">© 2024 Mini Cloud. Tous droits réservés.</div>
            <div className="flex gap-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <div className="w-4 h-4 bg-white/20 rounded-sm"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
