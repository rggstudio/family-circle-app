"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, PlusCircle, FileText, Users } from 'lucide-react';

const Navigation: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-2 px-4">
      <div className="flex justify-around items-center">
        <Link href="/dashboard" className={`flex flex-col items-center p-2 ${isActive('/dashboard') ? 'text-amber-500' : 'text-gray-500 dark:text-gray-400'}`}>
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link href="/calendar" className={`flex flex-col items-center p-2 ${isActive('/calendar') ? 'text-amber-500' : 'text-gray-500 dark:text-gray-400'}`}>
          <Calendar size={24} />
          <span className="text-xs mt-1">Calendar</span>
        </Link>
        
        <Link href="/create" className="flex flex-col items-center p-2 text-amber-500">
          <div className="bg-amber-500 text-white rounded-full p-2 -mt-8 shadow-lg">
            <PlusCircle size={28} />
          </div>
          <span className="text-xs mt-1 invisible">Create</span>
        </Link>
        
        <Link href="/tasks" className={`flex flex-col items-center p-2 ${isActive('/tasks') ? 'text-amber-500' : 'text-gray-500 dark:text-gray-400'}`}>
          <FileText size={24} />
          <span className="text-xs mt-1">Tasks</span>
        </Link>
        
        <Link href="/directory" className={`flex flex-col items-center p-2 ${isActive('/directory') ? 'text-amber-500' : 'text-gray-500 dark:text-gray-400'}`}>
          <Users size={24} />
          <span className="text-xs mt-1">Family</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation; 