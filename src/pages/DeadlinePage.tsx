import React, { useEffect, useState } from 'react';
import { getActivities } from '../utils/storage';
import { Activity } from '../types/activity';
import { calculateDDay, formatDate } from '../utils/date';
import { Link } from 'react-router-dom';

export const DeadlinePage = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    setActivities(getActivities());
  }, []);

  const groups = {
    thisWeek: [] as Activity[],
    thisMonth: [] as Activity[],
    past: [] as Activity[],
  };

  activities.forEach(activity => {
    const dday = calculateDDay(activity.deadline);
    
    if (dday.type === 'past') {
      groups.past.push(activity);
    } else if (dday.days <= 7) {
      groups.thisWeek.push(activity);
    } else if (dday.days <= 30) {
      groups.thisMonth.push(activity);
    }
  });

  const sortByDeadline = (a: Activity, b: Activity) => 
    new Date(a.deadline).getTime() - new Date(b.deadline).getTime();

  groups.thisWeek.sort(sortByDeadline);
  groups.thisMonth.sort(sortByDeadline);
  groups.past.sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime());

  return (
    <div className="animate-in fade-in duration-500">
      <header className="mb-stack-lg max-w-container-max mx-auto flex justify-between items-end border-b border-outline-variant/30 pb-stack-md">
        <div>
          <h2 className="text-display-lg font-display-lg italic text-on-surface">마감 일정</h2>
          <p className="text-body-md font-body-md text-on-surface-variant mt-stack-sm max-w-xl">
            다가오는 주요 학업 및 커리어 데드라인을 확인하세요.
          </p>
        </div>
      </header>

      <div className="max-w-container-max mx-auto space-y-stack-lg">
        {/* 기한 지남 */}
        <section>
          <h3 className="text-headline-md font-headline-md text-on-surface border-b border-outline-variant pb-stack-sm mb-stack-md flex justify-between items-baseline">
            기한 지남
            <span className="text-label-sm font-label-sm text-secondary tracking-widest uppercase">Overdue</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {groups.past.length > 0 ? groups.past.map(activity => (
              <article key={activity.id} className="bg-secondary-fixed/30 border border-secondary-fixed p-6 rounded-lg shadow-sm flex flex-col relative group">
                <div className="absolute top-0 left-0 w-1 h-full bg-secondary-fixed rounded-l-lg"></div>
                <div className="flex justify-between items-start mb-stack-sm pl-2">
                  <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">{activity.category}</span>
                  <span className="text-label-sm font-label-sm text-error font-semibold">{calculateDDay(activity.deadline).text}</span>
                </div>
                <h4 className="text-headline-md font-headline-md text-on-surface mb-stack-sm pl-2">{activity.title}</h4>
                <div className="mt-auto pl-2 pt-stack-md flex items-center justify-between border-t border-secondary-fixed/50">
                  <span className="text-body-md font-body-md text-on-surface-variant">{formatDate(activity.deadline)}</span>
                  <Link to={`/activities/${activity.id}`} className="text-label-sm font-label-sm hover:underline flex items-center">
                    DETAIL <span className="material-symbols-outlined ml-1 text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </article>
            )) : <p className="text-on-surface-variant">기한이 지난 일정이 없습니다.</p>}
          </div>
        </section>

        {/* 이번 주 */}
        <section>
          <h3 className="text-headline-md font-headline-md text-on-surface border-b border-outline-variant pb-stack-sm mb-stack-md flex justify-between items-baseline">
            이번 주
            <span className="text-label-sm font-label-sm text-on-surface-variant tracking-widest uppercase">This Week</span>
          </h3>
          <div className="space-y-unit">
            {groups.thisWeek.length > 0 ? groups.thisWeek.map(activity => (
              <Link to={`/activities/${activity.id}`} key={activity.id} className="flex items-center py-4 border-b border-surface-container-high hover:bg-surface-container-lowest transition-colors group cursor-pointer px-4 -mx-4">
                <div className="w-32 flex-shrink-0 text-body-md font-body-md text-on-surface-variant font-bold">
                  {new Date(activity.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="flex-1">
                  <h4 className="text-body-lg font-body-lg text-on-surface font-semibold group-hover:text-primary transition-colors">{activity.title}</h4>
                  <p className="text-body-md font-body-md text-on-surface-variant mt-1">{activity.memo || '메모 없음'}</p>
                </div>
                <div className="w-32 flex-shrink-0 text-right hidden md:block">
                  <span className="inline-block px-3 py-1 bg-surface-container-high text-on-surface text-label-sm font-label-sm rounded-full">{activity.category}</span>
                </div>
              </Link>
            )) : <p className="text-on-surface-variant">이번 주 일정이 없습니다.</p>}
          </div>
        </section>

        {/* 이번 달 */}
        <section>
          <h3 className="text-headline-md font-headline-md text-on-surface border-b border-outline-variant pb-stack-sm mb-stack-md flex justify-between items-baseline">
            이번 달
            <span className="text-label-sm font-label-sm text-on-surface-variant tracking-widest uppercase">This Month</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {groups.thisMonth.length > 0 ? groups.thisMonth.map(activity => (
              <Link to={`/activities/${activity.id}`} key={activity.id} className="bg-surface-container-lowest border border-outline-variant/50 p-6 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col hover:-translate-y-1 transition-transform duration-300">
                <div className="flex justify-between items-start mb-stack-sm">
                  <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">{activity.category}</span>
                  <span className="text-body-md font-body-md text-on-surface-variant">{new Date(activity.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
                <h4 className="text-headline-md font-headline-md text-on-surface mb-stack-sm">{activity.title}</h4>
                <div className="w-full bg-surface-container-high h-1 rounded-full mb-stack-md">
                  <div className="bg-primary h-1 rounded-full" style={{ width: `${activity.documents.length ? (activity.documents.filter(d => d.checked).length / activity.documents.length) * 100 : 0}%` }}></div>
                </div>
                <p className="text-body-md font-body-md text-on-surface-variant mt-auto">{calculateDDay(activity.deadline).text}</p>
              </Link>
            )) : <p className="text-on-surface-variant">이번 달 일정이 없습니다.</p>}
          </div>
        </section>
      </div>
    </div>
  );
};
