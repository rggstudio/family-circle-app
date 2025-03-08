"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import ActivityCard from '@/components/feed/ActivityCard';
import { Calendar } from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
        <Header 
          familyName={'Your Family'} 
          userName={user?.name?.split(' ')[0] || 'User'} 
        />
        
        <main className="p-4 pt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold dark:text-white">WHAT'S NEW</h2>
            <a href="/feed" className="text-sm text-amber-500 font-medium">SEE ALL</a>
          </div>
          
          <ActivityCard 
            title="Family Productivity" 
            value="+12%" 
            description="is 12% better" 
            color="bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-300"
          />
          
          <ActivityCard 
            title="Family Movie Night" 
            description="is Today!" 
            icon={<Calendar size={24} />}
            color="bg-purple-50 text-purple-500 dark:bg-purple-900/30 dark:text-purple-300"
          />
          
          {/* More activity cards can be added here */}
        </main>
        
        <Navigation />
      </div>
    </ProtectedRoute>
  );
} 