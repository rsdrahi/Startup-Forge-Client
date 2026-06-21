"use client";

import React, { useState } from 'react';
import { Card, Button, Input } from "@heroui/react";
import { Eye, EyeSlash, ArrowRight } from '@gravity-ui/icons';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Form & UI States
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleVisibility = () => setIsVisible(!isVisible);

  // 2. Capture changes safely
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  // 3. Handle Credentials Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      // --- Your Authentication Request Logic Goes Here ---
      // const res = await signIn('credentials', { ...formData, redirect: false });

      console.log("Submitting login credentials:", formData);

      // Simulate successful server response
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 4. Post-Login Redirection Logic
      // Checks if user was bounced from a private route, otherwise routes to Home ('/')
      const callbackUrl = searchParams.get('callbackUrl') || '/';
      router.push(callbackUrl);
      router.refresh();

    } catch (error) {
      setErrorMessage("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 5. Handle Google Single-Sign-On
  const handleGoogleLogin = async () => {
    try {
      console.log("Initiating Google OAuth flow...");
      // --- Your OAuth Provider Sign-In Logic Goes Here ---
      // await signIn('google', { callbackUrl: searchParams.get('callbackUrl') || '/' });
    } catch (error) {
      setErrorMessage("Could not connect to Google. Please try again.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#4f46e5] flex items-center justify-center p-4">

      <Card className="w-full max-w-xl p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-[32px] border border-default-100 flex flex-col items-center">

        {/* Header Title */}
        <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-900 tracking-tight text-center mb-2">
          Welcome back
        </h1>
        <p className="text-sm text-zinc-500 text-center mb-8">
          Log in to continue building on StartupForge
        </p>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">

          {/* Email Field */}
          <Input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            variant="flat"
            radius="lg"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full text-zinc-800 placeholder:text-zinc-400 text-sm"
          />

          {/* Password Field - Extracted button container to avoid React Aria DOM leak warnings */}
          <div className="relative w-full flex items-center">
            <Input
              type={isVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              variant="flat"
              radius="lg"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="w-full text-zinc-800 placeholder:text-zinc-400 text-sm pr-12"
            />
            <button
              type="button"
              onClick={toggleVisibility}
              className="absolute right-4 z-20 focus:outline-none text-zinc-400 hover:text-zinc-600"
            >
              {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Error Message Space */}
          {errorMessage && (
            <p className="text-xs text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">
              {errorMessage}
            </p>
          )}

          {/* Main Action Login Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#4f46e5] text-white font-medium text-sm h-12 rounded-xl shadow-sm hover:opacity-95 transition-opacity mt-2"
            isLoading={loading}
          >
            {loading ? "Signing in..." : "Log In"}
          </Button>

          {/* Divider UI Element */}
          <div className="relative flex py-3 items-center justify-center">
            <div className="flex-grow border-t border-zinc-100"></div>
            <span className="flex-shrink mx-4 text-zinc-400 text-xs font-medium uppercase tracking-wider">Or</span>
            <div className="flex-grow border-t border-zinc-100"></div>
          </div>

          {/* Social Google Login Button */}
          <Button
            type="button"
            onClick={handleGoogleLogin}
            variant="bordered"
            className="w-full bg-white border border-zinc-200 text-zinc-700 font-medium text-sm h-12 rounded-xl shadow-sm hover:bg-zinc-50/80 transition-colors"
          >
            <FcGoogle></FcGoogle>
            Continue with Google
          </Button>

          {/* Link back to registration options */}
          <div className="flex items-center justify-center gap-1.5 pt-4 text-xs text-zinc-500">
            <span>New to StartupForge?</span>
            <Link href="/auth/register" className="text-zinc-900 font-medium hover:underline inline-flex items-center gap-1">
              Create an Account <ArrowRight size={12} />
            </Link>
          </div>

        </form>
      </Card>
    </div>
  );
};

export default LoginPage;