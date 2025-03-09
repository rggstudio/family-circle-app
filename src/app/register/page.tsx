"use client";

import React from 'react';
import Link from 'next/link';
import RegisterForm from '@/components/auth/RegisterForm';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <header className="p-4 text-center">
        <h1 className="text-3xl font-bold">Family Circle</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
          
          <RegisterForm onSuccess={() => router.push('/')} />
          
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Already have an account?{' '}
              <Link href="/login" className="text-amber-400 hover:text-amber-300">
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm opacity-70">
        <Link href="/" className="hover:underline">
          Back to Home
        </Link>
      </footer>
    </div>
  );
} 