"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { ArrowLeft, House } from "@gravity-ui/icons";

const NotFoundPage = () => {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">


      <div className="absolute top-1/4 left-1/3 -z-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 -z-10 w-80 h-80 bg-default-200/40 rounded-full blur-3xl" />

      <div className="max-w-md w-full text-center space-y-8 backdrop-blur-sm p-8 rounded-3xl border border-default-100/60 bg-background/60 shadow-xl">


        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-default-50 border border-default-100 p-2 shadow-sm">
            <Image
              src="/asset/company.png"
              alt="StartupForge Logo"
              width={44}
              height={44}
              priority
              className="object-contain opacity-90"
            />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Page Not Found
          </h1>
          <p className="text-sm text-default-500 max-w-xs mx-auto leading-relaxed">
            The page, startup profile, or opportunity you are looking for does not exist or has moved to a new domain.
          </p>
        </div>


        <div className="py-1 flex justify-center items-center gap-1.5 text-default-300">
          <span className="h-1 w-6 rounded-full bg-default-200" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="h-1 w-6 rounded-full bg-default-200" />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link href={'/'}>
            <Button
              className="w-full sm:w-auto bg-primary text-primary-foreground font-medium rounded-xl px-6 hover:opacity-90 transition-opacity"
            >
              <House></House>
              Back to Home
            </Button>
          </Link>

          <Button
            onClick={() => window.history.back()}
            variant="ghost"
            className="w-full sm:w-auto border border-default-200 hover:bg-default-100 font-medium text-default-700 rounded-xl px-5"
          >
            <ArrowLeft></ArrowLeft>
            Go Back
          </Button>
        </div>

      </div>
    </main>
  );
};

export default NotFoundPage;