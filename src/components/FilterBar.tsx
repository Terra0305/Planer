import React from 'react';
import { ActivityCategory, ActivityStatus } from '../types/activity';
import { Search } from 'lucide-react';

export const categoryLabels: Record<ActivityCategory | 'all', string> = {
  all: "전체",
  contest: "공모전",
  activity: "대외활동",
  internship: "인턴",
  certificate: "자격증",
  hackathon: "해커톤",
  assignment: "학교과제",
  interview: "면접",
  etc: "기타"
};

export const statusLabels: Record<ActivityStatus | 'all', string> = {
  all: "전체",
  interested: "관심",
  preparing: "준비중",
  submitted: "제출완료",
  document_passed: "서류합격",
  interview_scheduled: "면접예정",
  accepted: "최종합격",
  rejected: "불합격"
};

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: ActivityCategory | 'all';
  setSelectedCategory: (c: ActivityCategory | 'all') => void;
  selectedStatus: ActivityStatus | 'all';
  setSelectedStatus: (s: ActivityStatus | 'all') => void;
}

export const FilterBar = ({
  searchQuery, setSearchQuery,
  selectedCategory, setSelectedCategory,
  selectedStatus, setSelectedStatus
}: FilterBarProps) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="활동명 검색..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all outline-none"
        />
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as ActivityCategory | 'all')}
          className="px-4 py-2.5 bg-gray-50 rounded-xl border-none text-gray-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer min-w-[120px]"
        >
          {Object.entries(categoryLabels).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        
        <select 
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as ActivityStatus | 'all')}
          className="px-4 py-2.5 bg-gray-50 rounded-xl border-none text-gray-700 font-medium focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer min-w-[120px]"
        >
          {Object.entries(statusLabels).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
