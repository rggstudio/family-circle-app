"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ActivityCardProps {
  title: string;
  value?: string | number;
  description?: string;
  icon?: React.ReactNode;
  color?: string;
  onClick?: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  value,
  description,
  icon,
  color = 'bg-red-100 text-red-500',
  onClick,
}) => {
  return (
    <div 
      className={`rounded-xl p-4 mb-3 ${color} cursor-pointer hover:shadow-md transition-shadow`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          {value && (
            <div className="text-2xl font-bold mb-1">{value}</div>
          )}
          <div className="font-medium">{title}</div>
          {description && (
            <div className="text-sm opacity-80 mt-1">{description}</div>
          )}
        </div>
        <div className="flex items-center">
          {icon}
          {!icon && <ArrowRight size={20} className="ml-2" />}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard; 