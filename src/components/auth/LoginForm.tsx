"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // TODO: Implement actual authentication logic
      console.log('Login with:', email, password);
      
      // Simulate successful login
      setTimeout(() => {
        setIsLoading(false);
        if (onSuccess) {
          onSuccess();
        } else {
          router.push('/dashboard');
        }
      }, 1000);
    } catch (err) {
      setIsLoading(false);
      setError('Invalid email or password');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">Login</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900/30 text-red-300 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
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
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="mt-1 text-right">
            <a href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
              Forgot password?
            </a>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Logging in...' : 'LOG IN'}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-400">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-400 hover:text-blue-300 font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm; 