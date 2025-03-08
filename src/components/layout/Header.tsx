"use client";

import React from 'react';
import Link from 'next/link';
import { Settings, Bell } from 'lucide-react';

interface HeaderProps {
  familyName: string;
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ familyName, userName }) => {
  return (
    <header className="bg-amber-400 text-white p-4 rounded-b-3xl">
      <div className="flex justify-between items-center mb-2">
        <button className="p-2 rounded-full hover:bg-amber-500 transition-colors">
          <Settings size={20} />
        </button>
        <div className="text-center">
          <p className="text-sm">Hello {userName}</p>
        </div>
        <button className="p-2 rounded-full hover:bg-amber-500 transition-colors">
          <Bell size={20} />
        </button>
      </div>
      
      <div className="mt-4 mb-6">
        <h1 className="text-3xl font-bold">{familyName}</h1>
        <p className="text-xl opacity-80">Family</p>
      </div>
      
      <div className="flex -mb-8 relative z-10">
        {/* Family member avatars */}
        <div className="w-12 h-12 rounded-full bg-white border-2 border-white overflow-hidden">
          <img 
            src="https://randomuser.me/api/portraits/women/44.jpg" 
            alt="Family member" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-12 h-12 rounded-full bg-white border-2 border-white overflow-hidden -ml-2">
          <img 
            src="https://randomuser.me/api/portraits/men/32.jpg" 
            alt="Family member" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-12 h-12 rounded-full bg-white border-2 border-white overflow-hidden -ml-2">
          <img 
            src="https://randomuser.me/api/portraits/women/68.jpg" 
            alt="Family member" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-12 h-12 rounded-full bg-white border-2 border-white overflow-hidden -ml-2">
          <img 
            src="https://randomuser.me/api/portraits/men/75.jpg" 
            alt="Family member" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-12 h-12 rounded-full bg-white border-2 border-white overflow-hidden -ml-2 flex items-center justify-center bg-gray-100">
          <span className="text-amber-500 text-xl font-bold">+</span>
        </div>
      </div>
    </header>
  );
};

export default Header; 