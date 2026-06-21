"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@heroui/react";
import { ArrowRight } from "@gravity-ui/icons";

const Banner = () => {
  return (
    <div className="relative w-full min-h-[100vh] md:min-h-[85vh] flex items-center overflow-hidden bg-fixed bg-center bg-cover">

      <div
        className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#4f46e5] bg-fixed bg-center"
      />

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10 w-full">
        
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* left side */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">

            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-medium mx-auto lg:mx-0 text-white">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              Now accepting applications
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] text-white">
              Startup<br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-400 bg-clip-text text-transparent">
                Forge
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-lg mx-auto lg:mx-0">
              StartupForge is a platform where startup founders can publish startup ideas, build teams, and recruit collaborators.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/auth/register" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-white hover:bg-white/90 text-black font-semibold text-lg px-8 py-7 rounded-2xl shadow-xl flex items-center justify-center gap-3 group w-full sm:w-auto"
                >
                  Get Started Free
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link href="/browseOpportunities" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="bordered"
                  className="border-2 border-white/70 hover:bg-white/10 text-white font-medium px-8 py-7 rounded-2xl text-lg w-full sm:w-auto"
                >
                  Browse Opportunities
                </Button>
              </Link>
            </div>
          </div>

          {/* right side */}
          <div className="relative flex justify-center lg:justify-end pt-6 lg:pt-0">
            <Image
              src="/asset/HomeOffice.png"
              alt="Startup Team Illustration"
              width={480}
              height={480}
              className="drop-shadow-2xl w-full max-w-[380px] md:max-w-[420px] lg:max-w-[520px] h-auto"
              priority
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Banner;