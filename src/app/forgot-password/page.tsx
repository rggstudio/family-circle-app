"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // This is a placeholder for actual password reset functionality
      // In a real implementation, you would call a service to send a reset email
      console.log('Password reset requested for:', email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <header className="p-4 text-center">
        <h1 className="text-3xl font-bold">Family Circle</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
          
          {!isSubmitted ? (
            <>
              {error && (
                <div className="mb-4 p-3 bg-red-900/30 text-red-300 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <p className="text-gray-300 mb-4">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 px-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="mb-4 p-3 bg-green-900/30 text-green-300 rounded-md">
                If an account exists with the email <strong>{email}</strong>, you will receive a password reset link shortly.
              </div>
              <p className="text-gray-300 mb-4">
                Please check your email and follow the instructions to reset your password.
              </p>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <Link href="/login" className="text-amber-400 hover:text-amber-300">
              Back to Login
            </Link>
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