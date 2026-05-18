import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ActivityCategory, ActivityStatus } from '../types/activity';
import { calculateDDay, formatDate } from '../utils/date';
import { cn } from '../utils/cn';
import { Calendar, CheckCircle2, ChevronRight, Link as LinkIcon } from 'lucide-react';

const categoryLabels: Record<ActivityCategory, string> = {
  contest: "공모전",
  activity: "대외활동",
  internship: "인턴",
  certificate: "자격증",
  hackathon: "해커톤",
  assignment: "학교과제",
  interview: "면접",
  etc: "기타"
};

const statusConfig: Record<ActivityStatus, { label: string; color: string; bg: string }> = {
  interested: { label: "관심", color: "text-gray-600", bg: "bg-gray-100" },
  preparing: { label: "준비중", color: "text-blue-600", bg: "bg-blue-100" },
  submitted: { label: "제출완료", color: "text-indigo-600", bg: "bg-indigo-100" },
  document_passed: { label: "서류합격", color: "text-emerald-600", bg: "bg-emerald-100" },
  interview_scheduled: { label: "면접예정", color: "text-purple-600", bg: "bg-purple-100" },
  accepted: { label: "최종합격", color: "text-rose-600", bg: "bg-rose-100" },
  rejected: { label: "불합격", color: "text-slate-500", bg: "bg-slate-100" }
};

interface ActivityCardProps {
  activity: Activity;
}

export const ActivityCard = ({ activity }: ActivityCardProps) => {
  const dday = calculateDDay(activity.deadline);
  
  const ddayColor = dday.type === 'past' 
    ? "bg-gray-100 text-gray-500" 
    : dday.days <= 3 
      ? "bg-red-100 text-red-600 animate-pulse" 
      : dday.days <= 7 
        ? "bg-orange-100 text-orange-600" 
        : "bg-primary/10 text-primary";

  const totalDocs = activity.documents.length;
  const checkedDocs = activity.documents.filter(d => d.checked).length;
  const progress = totalDocs === 0 ? 0 : Math.round((checkedDocs / totalDocs) * 100);

  return (
    <Link to={`/activities/${activity.id}`} className="block group">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-primary/30 relative overflow-hidden">
        {dday.type === 'past' && <div className="absolute inset-0 bg-gray-50/50 pointer-events-none" />}
        
        <div className="flex justify-between items-start mb-3 relative z-10">
          <div className="flex gap-2 items-center">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-gray-100 text-gray-600">
              {categoryLabels[activity.category]}
            </span>
            <span className={cn("px-2.5 py-1 text-xs font-semibold rounded-lg", statusConfig[activity.status].bg, statusConfig[activity.status].color)}>
              {statusConfig[activity.status].label}
            </span>
          </div>
          <span className={cn("px-3 py-1 text-xs font-bold rounded-full", ddayColor)}>
            {dday.text}
          </span>
        </div>
        
        <h3 className={cn("text-lg font-bold mb-2 group-hover:text-primary transition-colors", dday.type === 'past' ? "text-gray-500" : "text-gray-900")}>
          {activity.title}
        </h3>
        
        <div className="flex items-center text-sm text-gray-500 mb-4 gap-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(activity.deadline)}</span>
          </div>
          {activity.link && (
            <div className="flex items-center gap-1">
              <LinkIcon className="w-4 h-4" />
              <span className="truncate max-w-[100px]">Link</span>
            </div>
          )}
        </div>

        {totalDocs > 0 && (
          <div className="space-y-1.5 relative z-10">
            <div className="flex justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> 서류 준비</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className={cn("h-full rounded-full transition-all duration-500", progress === 100 ? "bg-emerald-500" : "bg-primary")}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};
