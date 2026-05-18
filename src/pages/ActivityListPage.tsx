import React, { useEffect, useState, useMemo } from 'react';
import { getActivities } from '../utils/storage';
import { Activity, ActivityCategory, ActivityStatus } from '../types/activity';
import { calculateDDay, formatDate } from '../utils/date';
import { Link } from 'react-router-dom';

export const categoryLabels: Record<ActivityCategory | 'all', string> = {
  all: "모든 카테고리",
  contest: "공모전",
  activity: "대외활동",
  internship: "인턴십",
  certificate: "자격증",
  hackathon: "해커톤",
  assignment: "학업/과제",
  interview: "면접",
  etc: "개인 프로젝트"
};

export const statusLabels: Record<ActivityStatus | 'all', string> = {
  all: "상태: 전체",
  interested: "관심/대기 중",
  preparing: "진행 중",
  submitted: "제출 완료",
  document_passed: "서류 합격",
  interview_scheduled: "면접 대기",
  accepted: "최종 합격(완료됨)",
  rejected: "불합격"
};

export const ActivityListPage = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<ActivityStatus | 'all'>('all');

  useEffect(() => {
    setActivities(getActivities());
  }, []);

  const filteredActivities = useMemo(() => {
    return activities
      .filter(a => {
        const matchQuery = a.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchCategory = selectedCategory === 'all' || a.category === selectedCategory;
        const matchStatus = selectedStatus === 'all' || a.status === selectedStatus;
        return matchQuery && matchCategory && matchStatus;
      })
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  }, [activities, searchQuery, selectedCategory, selectedStatus]);

  return (
    <div className="animate-in fade-in duration-500">
      {/* Page Header */}
      <header className="mb-stack-lg border-b border-outline-variant/30 pb-stack-md">
        <h1 className="text-display-lg font-display-lg italic text-on-surface mb-2">활동 목록</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant font-light">예정된 마감일과 진행 중인 프로젝트를 관리하세요.</p>
      </header>

      {/* Filters & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-stack-md gap-4">
        <div className="flex gap-4 w-full sm:w-auto">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as ActivityCategory | 'all')}
            className="bg-transparent border-0 border-b border-outline-variant text-on-surface text-label-sm font-label-sm uppercase tracking-widest py-2 pl-0 pr-8 focus:ring-0 focus:border-primary cursor-pointer w-full sm:w-auto"
          >
            {Object.entries(categoryLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as ActivityStatus | 'all')}
            className="bg-transparent border-0 border-b border-outline-variant text-on-surface text-label-sm font-label-sm uppercase tracking-widest py-2 pl-0 pr-8 focus:ring-0 focus:border-primary cursor-pointer w-full sm:w-auto"
          >
            {Object.entries(statusLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
        <div className="relative w-full sm:w-64">
          <span className="material-symbols-outlined absolute left-0 top-2.5 text-on-surface-variant text-lg">search</span>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-0 border-b border-outline-variant text-body-md py-2 pl-8 pr-0 focus:ring-0 focus:border-primary placeholder-on-surface-variant/50 transition-colors outline-none" 
            placeholder="Search activities..." 
          />
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-6">
        {filteredActivities.length > 0 ? (
          filteredActivities.map(activity => {
            const dday = calculateDDay(activity.deadline);
            let statusColorClass = "bg-surface-container-high text-on-surface-variant"; // default
            let icon = "work_outline";
            
            if (activity.status === 'preparing') { statusColorClass = "bg-primary-fixed-dim/20 text-primary"; icon = "edit_document"; }
            if (activity.status === 'accepted' || activity.status === 'submitted') { statusColorClass = "bg-surface-variant text-on-surface-variant"; icon = "done_all"; }
            if (activity.status === 'interested') { statusColorClass = "bg-tertiary-fixed-dim/30 text-on-tertiary-fixed-variant"; icon = "draw"; }

            return (
              <Link to={`/activities/${activity.id}`} key={activity.id} className="block group bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/20 hover:border-outline-variant/60 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-fixed-dim/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                <div className="w-16 h-16 shrink-0 bg-surface-container flex items-center justify-center rounded-md border border-outline-variant/30 text-primary-container">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'wght' 200" }}>{icon}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">{categoryLabels[activity.category]}</span>
                    <span className={`${statusColorClass} font-label-sm text-label-sm px-2 py-0.5 rounded-full uppercase tracking-widest`}>
                      {statusLabels[activity.status]}
                    </span>
                  </div>
                  <h2 className="text-headline-md font-headline-md text-on-surface mb-2">{activity.title}</h2>
                  <p className="text-body-md font-body-md text-on-surface-variant line-clamp-2 md:line-clamp-1">
                    {activity.memo || '메모가 없습니다.'}
                  </p>
                </div>
                
                <div className="flex flex-col items-start md:items-end gap-2 md:w-32 shrink-0">
                  <div className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">마감일</div>
                  <div className={`text-body-md font-body-md ${dday.days <= 3 && dday.type !== 'past' ? 'text-error' : 'text-on-surface'}`}>
                    {formatDate(activity.deadline)}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="text-center py-20 text-on-surface-variant">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};
