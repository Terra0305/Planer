import React from 'react';
import { cn } from '../utils/cn';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  colorClass: string;
  bgColorClass: string;
}

export const StatCard = ({ title, value, icon: Icon, colorClass, bgColorClass }: StatCardProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5 transition-transform hover:-translate-y-1 duration-300">
      <div className={cn("p-4 rounded-xl", bgColorClass, colorClass)}>
        <Icon className="w-8 h-8" />
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
      </div>
    </div>
  );
};
