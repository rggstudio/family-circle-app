import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import LoginCarousel from '@/components/login/LoginCarousel';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-900 flex flex-col items-center justify-start py-6">
      <div className="w-full max-w-md pt-6">
        <h1 className="text-center text-3xl font-extrabold text-amber-500 mb-4">
          Family Circle
        </h1>
      </div>

      <div className="w-full max-w-md">
        <LoginCarousel />
      </div>

      <div className="mt-6 w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
} 