"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  
  // Use try-catch to handle potential auth context errors
  let isAuthenticated = false;
  let logout = () => {};
  
  try {
    const auth = useAuth();
    isAuthenticated = auth.isAuthenticated;
    logout = auth.logout;
  } catch (error) {
    console.error('Auth context error:', error);
    // Continue with default values
  }

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Family Circle
            </Link>
            
            <div className="ml-10 flex items-center space-x-4">
              <Link 
                href="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/') 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                Home
              </Link>
              
              {isAuthenticated && (
                <Link 
                  href="/dashboard" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/dashboard') 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>
          
          <div className="flex items-center">
            {isAuthenticated ? (
              <button
                onClick={() => logout()}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Logout
              </button>
            ) : (
              <div className="flex space-x-2">
                <Link 
                  href="/login" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/login') 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/register') 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 