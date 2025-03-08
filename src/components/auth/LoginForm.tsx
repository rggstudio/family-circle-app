"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/services/authService';

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
      // Call the login service
      await login({ email, password });
      
      // Handle successful login
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Invalid email or password');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="p-5 bg-gray-800 rounded-lg shadow-md" style={{ marginLeft: '16px', marginRight: '16px', width: 'calc(100% - 32px)' }}>
      <h2 className="text-xl font-bold text-center mb-3 text-white">Login</h2>
      
      {error && (
        <div className="mb-2 p-2 bg-red-900/30 text-red-300 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <a href="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300">
              Forgot password?
            </a>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-1.5 px-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 mb-2"
        >
          {isLoading ? 'Logging in...' : 'LOG IN'}
        </button>
        
        <div className="text-center">
          <p className="text-xs text-gray-400">
            Don't have an account?{' '}
            <a href="/register" className="text-amber-500 hover:text-amber-400 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm; 