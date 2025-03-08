"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { UserCircle } from 'lucide-react';
import { register } from '@/services/authService';

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    familyName: '',
    familyCode: '',
    joinType: 'create', // 'create' or 'join'
    agreedToTerms: false,
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

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
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

    // Validate terms agreement
    if (!formData.agreedToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return;
    }

    setIsLoading(true);

    try {
      // Prepare registration data
      const registrationData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        profileImage: profileImage || undefined,
        familyName: formData.joinType === 'create' ? formData.familyName : undefined,
        familyCode: formData.joinType === 'join' ? formData.familyCode : undefined,
      };

      // Call the register service
      await register(registrationData);
      
      // Handle successful registration
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Registration failed. Please try again.');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="p-5 bg-gray-800 rounded-lg shadow-md" style={{ marginLeft: '16px', marginRight: '16px', width: 'calc(100% - 32px)' }}>
      <h2 className="text-xl font-bold text-center mb-3 text-white">Create Account</h2>
      
      {/* Profile Picture Upload */}
      <div className="flex flex-col items-center mb-4">
        <div 
          className="w-24 h-24 rounded-full bg-gray-700 border-2 border-amber-500 flex items-center justify-center overflow-hidden cursor-pointer"
          onClick={handleImageClick}
        >
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <UserCircle size={64} className="text-gray-400" />
          )}
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        <p className="text-xs text-gray-400 mt-2">Click to add profile picture</p>
      </div>
      
      {error && (
        <div className="mb-2 p-2 bg-red-900/30 text-red-300 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-1.5 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>
        
        <div className="mb-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-1.5 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>
        
        <div className="mb-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-1.5 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-1.5 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            I want to:
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div 
              className={`border rounded-md p-3 cursor-pointer text-center transition-colors ${
                formData.joinType === 'create' 
                  ? 'bg-amber-500 border-amber-600 text-white' 
                  : 'border-gray-600 text-gray-300 hover:border-amber-700'
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
              <label htmlFor="create" className="cursor-pointer text-sm font-medium">
                Create a Family Circle
              </label>
            </div>
            
            <div 
              className={`border rounded-md p-3 cursor-pointer text-center transition-colors ${
                formData.joinType === 'join' 
                  ? 'bg-amber-500 border-amber-600 text-white' 
                  : 'border-gray-600 text-gray-300 hover:border-amber-700'
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
              <label htmlFor="join" className="cursor-pointer text-sm font-medium">
                Join a Family Circle
              </label>
            </div>
          </div>
        </div>
        
        {formData.joinType === 'create' && (
          <div className="mb-3">
            <label htmlFor="familyName" className="block text-sm font-medium text-gray-300 mb-1">
              Family Name
            </label>
            <input
              id="familyName"
              name="familyName"
              type="text"
              value={formData.familyName}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g., The Goodes"
              required={formData.joinType === 'create'}
            />
          </div>
        )}
        
        {formData.joinType === 'join' && (
          <div className="mb-3">
            <label htmlFor="familyCode" className="block text-sm font-medium text-gray-300 mb-1">
              Family Invite Code
            </label>
            <input
              id="familyCode"
              name="familyCode"
              type="text"
              value={formData.familyCode}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Enter the code you received"
              required={formData.joinType === 'join'}
            />
          </div>
        )}
        
        {/* Terms of Service Agreement with Checkbox */}
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center">
            <input
              id="agreedToTerms"
              name="agreedToTerms"
              type="checkbox"
              checked={formData.agreedToTerms}
              onChange={handleChange}
              className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-600 rounded bg-gray-700"
            />
            <label htmlFor="agreedToTerms" className="ml-2 block text-sm text-gray-300">
              I have read and agree to the{' '}
              <a href="/terms" className="text-amber-500 hover:text-amber-400">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-amber-500 hover:text-amber-400">
                Privacy Policy
              </a>
            </label>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-1.5 px-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 mb-2"
        >
          {isLoading ? 'Creating Account...' : 'SIGN UP'}
        </button>
        
        <div className="text-center">
          <p className="text-xs text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="text-amber-500 hover:text-amber-400 font-medium">
              Log in
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm; 