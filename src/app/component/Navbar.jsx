"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import { ArrowRight, PersonPlus } from "@gravity-ui/icons";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Navigation Links Data
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Startup Details", href: "/startup-details" },
    { name: "Browse Opportunities", href: "/browse-opportunities" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-default-100 bg-background/70 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* LEFT SECTION: Logo & Brand */}
          <div className="flex items-center gap-2">
            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-default-600 hover:bg-default-100 hover:text-default-900 sm:hidden focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>

            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/asset/company.png"
                alt="StartupForge Logo"
                width={32}
                height={32}
                priority
                className="object-contain"
              />
              <span className="font-bold text-xl tracking-tight text-foreground">
                Startup<span className="text-primary">Forge</span>
              </span>
            </Link>
          </div>

          {/* MIDDLE SECTION: Navigation Links (Desktop Only) */}
          <div className="hidden sm:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${isActive(link.href)
                  ? "text-primary font-semibold"
                  : "text-default-600 hover:text-primary"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* RIGHT SECTION: Auth Actions (Desktop Only) */}
          <div className="hidden sm:flex items-center gap-3">
            <Link href={'/auth/login'}>
              <Button
                variant="ghost"
                className="border-none hover:bg-default-100 font-medium text-default-700"
                startContent={<ArrowRight size={16} />}
              >
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button
                // as={Link}
                className="bg-primary text-primary-foreground font-medium shadow-sm hover:opacity-90 rounded-xl"
                startContent={<PersonPlus size={16} />}
              >
                Register
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER MENU */}
      {isMenuOpen && (
        <div className="sm:hidden border-t border-default-100 bg-background px-4 pt-4 pb-6 space-y-3 animate-in fade-in slide-in-from-top-5 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`block py-2 text-base font-medium ${isActive(link.href) ? "text-primary font-semibold" : "text-default-700"
                }`}
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-default-100 my-2" />
          <div className="flex flex-col gap-3 pt-2">
            <Link href={'/auth/login'}>
              <Button
                variant="outline"
                className="w-full border-default-200 text-default-700 font-medium"
                startContent={<ArrowRight size={16} />}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Button>
            </Link>
            <Link href={'/auth/register'}>
              <Button
                className="w-full bg-primary text-primary-foreground font-medium rounded-xl"
                startContent={<PersonPlus size={16} />}
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}