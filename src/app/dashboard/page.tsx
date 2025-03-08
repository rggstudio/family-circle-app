import React from 'react';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import ActivityCard from '@/components/feed/ActivityCard';
import { Calendar } from 'lucide-react';

export default function Dashboard() {
  // Mock data - in a real app, this would come from an API
  const familyName = 'Craigstons';
  const userName = 'Jake';
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header familyName={familyName} userName={userName} />
      
      <main className="p-4 pt-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">WHAT'S NEW</h2>
          <a href="/feed" className="text-sm text-amber-500 font-medium">SEE ALL</a>
        </div>
        
        <ActivityCard 
          title="Family Productivity" 
          value="+12%" 
          description="is 12% better" 
          color="bg-red-50 text-red-500"
        />
        
        <ActivityCard 
          title="Family Movie Night" 
          description="is Today!" 
          icon={<Calendar size={24} />}
          color="bg-purple-50 text-purple-500"
        />
        
        {/* More activity cards can be added here */}
      </main>
      
      <Navigation />
    </div>
  );
} 