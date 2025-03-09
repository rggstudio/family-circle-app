"use client";

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <header className="p-6 text-center">
        <h1 className="text-4xl font-bold">Family Circle</h1>
        <p className="mt-2 text-xl opacity-80">Connect with your family</p>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center mb-8">
            <p className="text-xl">
              A central hub for sharing family news, events, photos, and messages
            </p>
          </div>
          
          <div className="space-y-4">
            <Link href="/login" className="block w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg text-center transition-colors">
              Login
            </Link>
            
            <Link href="/register" className="block w-full py-3 px-4 bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold rounded-lg text-center transition-colors">
              Create Account
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm opacity-70">
        <p>© {new Date().getFullYear()} Family Circle</p>
      </footer>
    </div>
  );
}
