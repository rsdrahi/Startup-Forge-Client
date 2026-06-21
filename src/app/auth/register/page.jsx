"use client";

import React, { useState } from 'react';
import { Card, Button, Input } from "@heroui/react";
import { Eye, EyeSlash, FilePlus, PersonPlus, ArrowRight } from '@gravity-ui/icons';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
  // Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Collaborator'
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // UI States
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validatePassword = (value) => {
    if (value.length < 6) return "Password must be at least 6 characters long.";
    if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter.";
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'password') setErrorMessage('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }

    if (!imageFile) {
      setErrorMessage("Please select a profile image.");
      return;
    }

    setLoading(true);

    try {
      const imgData = new FormData();
      imgData.append('image', imageFile);

      const IMGBB_API_KEY = "YOUR_IMGBB_API_KEY";

      const imgBbRes = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: imgData,
      });

      const imgBbResult = await imgBbRes.json();

      if (!imgBbResult.success) {
        throw new Error("Image upload to ImgBB failed.");
      }

      const imageUrl = imgBbResult.data.url;

      const finalPayload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        image: imageUrl
      };

      console.log("Registration Payload ready for MongoDB backend:", finalPayload);
      alert("Registration complete! Check your console for the ImgBB payload structure.");

    } catch (error) {
      setErrorMessage(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-900 tracking-tight text-center mb-8">
          Create an account
        </h1>

        {/* Role Toggle Button Switcher */}
        <div className="w-full max-w-sm grid grid-cols-2 p-1 bg-zinc-100 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, role: 'Founder' }))}
            className={`py-2.5 text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${formData.role === 'Founder'
              ? 'bg-black text-white shadow-sm'
              : 'text-zinc-600 hover:text-zinc-900'
              }`}
          >
            Founder
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, role: 'Collaborator' }))}
            className={`py-2.5 text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${formData.role === 'Collaborator'
              ? 'bg-black text-white shadow-sm'
              : 'text-zinc-600 hover:text-zinc-900'
              }`}
          >
            Collaborator
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">

          {/* Name Field - Wrapped classes cleanly via className string targeting */}
          <Input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            variant="flat"
            radius="lg"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full text-zinc-800 placeholder:text-zinc-400 text-sm"
          />

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

          {/* Password Field - Extracted endContent securely to block DOM bleeding */}
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

          {/* Clean File Upload Input */}
          <div className="w-full flex items-center justify-between border border-zinc-100 rounded-xl p-3 bg-zinc-50">
            <label className="cursor-pointer flex items-center gap-2 bg-white hover:bg-zinc-100 border border-zinc-200 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-700 shadow-sm transition-all">
              <FilePlus size={14} />
              Upload Avatar
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <span className="text-xs text-zinc-400 truncate max-w-[180px] px-2">
              {imageFile ? imageFile.name : "No file selected"}
            </span>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-8 h-8 object-cover rounded-full border border-zinc-200"
              />
            )}
          </div>

          {/* Error Warning Box */}
          {errorMessage && (
            <p className="text-xs text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">
              {errorMessage}
            </p>
          )}

          {/* Orange Action CTA Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#4f46e5] text-white font-medium text-sm h-12 rounded-xl shadow-sm hover:opacity-95 transition-opacity mt-4"
            isLoading={loading}
          >
            {loading ? "Creating Account..." : "Create an Account"}
          </Button>

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

          {/* Redirect to Login */}
          <div className="flex items-center justify-center gap-1.5 pt-4 text-xs text-zinc-500">
            <span>Already have an account?</span>
            <Link href="/auth/login" className="text-zinc-900 font-medium hover:underline inline-flex items-center gap-1">
              Log In <ArrowRight size={12} />
            </Link>
          </div>

        </form>
      </Card>
    </div>
  );
};

export default Register;