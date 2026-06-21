"use client";
import React, { useState } from 'react';
import { Card, Button, Input } from "@heroui/react";
import { Eye, EyeSlash, ArrowRight } from '@gravity-ui/icons';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { authClient } from "@/lib/auth-client";
import { useRouter } from 'next/navigation';

const Register = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Collaborator'
  });

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validatePassword = (value) => {
    if (value.length < 8) return "Password must be at least 8 characters long.";
    if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter.";
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'password') setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        data: {
          role: formData.role,
        },
        // callbackURL: "/auth/login",
      });

      if (error) {
        setErrorMessage(error.message || "Registration failed. Please try again.");
        return;
      }

      console.log("Registration successful:", data);
      router.push('/auth/login')

    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      setErrorMessage("Could not connect to Google. Please try again.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#4f46e5] flex items-center justify-center p-4">

      <Card className="w-full max-w-xl p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-[32px] border border-default-100 flex flex-col items-center">

        <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-900 tracking-tight text-center mb-8">
          Create an account
        </h1>

        {/* role */}
        {/* <div className="w-full max-w-sm grid grid-cols-2 p-1 bg-zinc-100 rounded-xl mb-8">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, role: 'Founder' }))}
            className={`py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${formData.role === 'Founder'
              ? 'bg-black text-white shadow-sm'
              : 'text-zinc-600 hover:text-zinc-900'
              }`}
          >
            Founder
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, role: 'Collaborator' }))}
            className={`py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${formData.role === 'Collaborator'
              ? 'bg-black text-white shadow-sm'
              : 'text-zinc-600 hover:text-zinc-900'
              }`}
          >
            Collaborator
          </button>
        </div> */}

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">
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

          <div className="relative w-full">
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
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 focus:outline-none"
            >
              {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errorMessage && (
            <p className="text-xs text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">
              {errorMessage}
            </p>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#4f46e5] text-white font-medium text-sm h-12 rounded-xl shadow-sm hover:opacity-95 transition-opacity mt-2"
            isLoading={loading}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create an Account"}
          </Button>

          <div className="relative flex py-3 items-center justify-center">
            <div className="flex-grow border-t border-zinc-100"></div>
            <span className="flex-shrink mx-4 text-zinc-400 text-xs font-medium uppercase tracking-wider">Or</span>
            <div className="flex-grow border-t border-zinc-100"></div>
          </div>

          <Button
            type="button"
            onClick={handleGoogleLogin}
            variant="bordered"
            className="w-full bg-white border border-zinc-200 text-zinc-700 font-medium text-sm h-12 rounded-xl shadow-sm hover:bg-zinc-50 transition-colors"
          >
            <FcGoogle className="mr-2" />
            Continue with Google
          </Button>

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