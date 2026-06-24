"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, Button } from "@heroui/react";
import { ArrowRight, PersonPlus } from "@gravity-ui/icons";
import { signOut, useSession } from "@/lib/auth-client";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession()
  console.log("session Data", session, "Is Pending", isPending);
  const user = session?.user

  const handleSignOut = async () => {
    await signOut();
    router.push('/')
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Startup Details", href: "/startupDetails" },
    { name: "Browse Opportunities", href: "/browseOpportunities" },
  ];

  const allLinks = user
    ? [...navLinks, { name: "Dashboard", href: "/dashboard" }]
    : navLinks;

  const isActive = (href) => pathname === href;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-default-100 bg-background/70 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          <div className="flex items-center gap-2">

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

          {/* nav link desk  */}
          <div className="hidden sm:flex items-center gap-6">
            {allLinks.map((link) => (
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

          {/* desktop */}
          <div className="hidden sm:flex items-center gap-3">
            {
              user ? (
                <>
                  <Link href="/dashboard">
                    <img
                      src={user?.image}
                      name={user?.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </Link>

                  <Button
                    className="rounded-full"
                    onClick={handleSignOut}
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button
                      className="w-full"
                      startContent={<ArrowRight size={16} />}
                    >
                      Login
                    </Button>
                  </Link>

                  <Link href="/auth/register">
                    <Button
                      className="w-full bg-primary text-primary-foreground"
                      startContent={<PersonPlus size={16} />}
                    >
                      Register
                    </Button>
                  </Link>
                </>
              )
            }
          </div>
        </div>
      </div>

      {/* mobile */}
      {isMenuOpen && (
        <div className="flex flex-col gap-3 pt-2">
          {user ? (
            <>
              <div className="flex justify-center mb-2">
                <img
                  src={user.image || "/asset/default-avatar.png"}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover border"
                />
              </div>

              <Button onClick={handleSignOut} className={'w-full my-2'}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button
                  className="w-full"
                  startContent={<ArrowRight size={16} />}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Button>
              </Link>

              <Link href="/auth/register">
                <Button
                  className="w-full bg-primary text-primary-foreground"
                  startContent={<PersonPlus size={16} />}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}