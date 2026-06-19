"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { Envelope, Handset, House, LogoFacebook, LogoGithub, LogoLinkedin, LogoLinux, Printer } from "@gravity-ui/icons";
import { IoLogoGithub, IoLogoInstagram, IoLogoTwitter } from "react-icons/io";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-default-50 border-t border-default-100/80 text-default-600">


      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">


          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/asset/company.png"
                alt="StartupForge Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="font-bold text-xl tracking-tight text-foreground">
                Startup<span className="text-primary">Forge</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-default-500 max-w-xs">
              StartupForge is a platform where startup founders can publish startup ideas, build teams, and recruit collaborators.
            </p>
          </div>

          {/* quick links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Quick Link
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/startupDetails" className="hover:text-primary transition-colors">
                  StartUp Details
                </Link>
              </li>
              <li>
                <Link href="/browseOpportunities" className="hover:text-primary transition-colors">
                  Browse Opportunity
                </Link>
              </li>
            </ul>
          </div>

          {/* contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <span className="flex items-center gap-1">
                  <House></House>
                  Sylhet, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <a href="mailto:info@gmail.com" className="hover:text-primary transition-colors flex items-center gap-2">
                  <Envelope></Envelope>
                  info.zamnadeveloper@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="flex items-center gap-1">
                  <Handset></Handset>
                  + 880 1712 236987
                </span>
              </li>
            </ul>
          </div>

          {/* social links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Follow Us
            </h4>
            <div className="flex flex-wrap gap-2.5">
              <Button
                isIconOnly
                variant="flat"
                radius="full"
                className="bg-blue-600/10 text-blue-600 hover:bg-blue-600 hover:text-white transition-all min-w-10 h-10"
                aria-label="Facebook"
              >
                <LogoFacebook size={18} />
              </Button>
              <Button
                isIconOnly
                variant="flat"
                radius="full"
                className="bg-sky-500/10 text-sky-500 hover:bg-sky-500 hover:text-white transition-all min-w-10 h-10"
                aria-label="X (Twitter)"
              >
                <IoLogoTwitter size={14} />
              </Button>
              <Button
                isIconOnly
                variant="flat"
                radius="full"
                className="bg-blue-700/10 text-blue-700 hover:bg-blue-700 hover:text-white transition-all min-w-10 h-10"
                aria-label="LinkedIn"
              >
                <LogoLinkedin size={18} />
              </Button>
              <Button
                isIconOnly
                variant="flat"
                radius="full"
                className="bg-blue-700/10 text-blue-700 hover:bg-blue-700 hover:text-white transition-all min-w-10 h-10"
                aria-label="GitHub"
              >
                <IoLogoInstagram size={18} />
              </Button>
            </div>
          </div>

        </div>
      </div>

      {/* Separator Section & Copyright Text */}
      <div className="w-full border-t border-default-100 bg-default-100/50 py-5 text-center text-xs text-default-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p>
            © {currentYear} Copyright:{" "}
            <Link href="/" className="font-semibold text-default-700 hover:text-primary transition-colors">
              StartupForge.com
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;