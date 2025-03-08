"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    familyName: '',
    familyCode: '',
    joinType: 'create', // 'create' or 'join'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate family-specific fields
    if (formData.joinType === 'create' && !formData.familyName) {
      setError('Family name is required when creating a new family');
      return;
    }

    if (formData.joinType === 'join' && !formData.familyCode) {
      setError('Family code is required when joining an existing family');
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement actual registration logic
      console.log('Register with:', formData);
      
      // Simulate successful registration
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
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">Join Family Circle</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            I want to:
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div 
              className={`border rounded-md p-4 cursor-pointer text-center transition-colors ${
                formData.joinType === 'create' 
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-700'
              }`}
              onClick={() => setFormData({...formData, joinType: 'create'})}
            >
              <input 
                type="radio" 
                id="create" 
                name="joinType" 
                value="create"
                checked={formData.joinType === 'create'}
                onChange={handleChange}
                className="sr-only"
              />
              <label htmlFor="create" className="cursor-pointer font-medium">
                Create a Family Circle
              </label>
              <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">Start a new family group</p>
            </div>
            
            <div 
              className={`border rounded-md p-4 cursor-pointer text-center transition-colors ${
                formData.joinType === 'join' 
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-700'
              }`}
              onClick={() => setFormData({...formData, joinType: 'join'})}
            >
              <input 
                type="radio" 
                id="join" 
                name="joinType" 
                value="join"
                checked={formData.joinType === 'join'}
                onChange={handleChange}
                className="sr-only"
              />
              <label htmlFor="join" className="cursor-pointer font-medium">
                Join a Family Circle
              </label>
              <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">Join with an invite code</p>
            </div>
          </div>
        </div>
        
        {formData.joinType === 'create' && (
          <div className="mb-6">
            <label htmlFor="familyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Family Name
            </label>
            <input
              id="familyName"
              name="familyName"
              type="text"
              value={formData.familyName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g., The Goodes"
              required={formData.joinType === 'create'}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              This will be the name of your family circle
            </p>
          </div>
        )}
        
        {formData.joinType === 'join' && (
          <div className="mb-6">
            <label htmlFor="familyCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Family Invite Code
            </label>
            <input
              id="familyCode"
              name="familyCode"
              type="text"
              value={formData.familyCode}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Enter the code you received"
              required={formData.joinType === 'join'}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Ask your family admin for the invite code
            </p>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-amber-600 hover:text-amber-800 font-medium">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm; 