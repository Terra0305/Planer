import React, { useEffect, useState } from 'react';
import { getActivities } from '../utils/storage';
import { Activity } from '../types/activity';
import { calculateDDay, formatDate } from '../utils/date';
import { Link } from 'react-router-dom';

export const DashboardPage = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    setActivities(getActivities());
  }, []);

  const stats = {
    total: activities.length,
    urgent: activities.filter(a => {
      const dday = calculateDDay(a.deadline);
      return dday.type !== 'past' && dday.days <= 7;
    }).length,
    completed: activities.filter(a => a.status === 'submitted' || a.status === 'document_passed' || a.status === 'accepted').length,
    interviews: activities.filter(a => a.status === 'interview_scheduled').length,
  };

  const upcomingActivities = activities
    .filter(a => calculateDDay(a.deadline).type !== 'past')
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3);

  const getDDayColorClass = (dday: any) => {
    if (dday.days <= 3) return 'bg-error text-error-container';
    if (dday.days <= 7) return 'bg-primary text-primary-container';
    return 'bg-surface-dim text-on-surface-variant';
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* Greeting Header */}
      <section className="mb-stack-lg">
        <h2 className="text-display-lg font-display-lg text-primary mb-2">안녕하세요, Minji님</h2>
        <p className="text-body-lg font-body-lg text-on-surface-variant">오늘의 학업 및 커리어 일정을 확인하세요.</p>
      </section>

      {/* Stats Bento Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-gutter mb-stack-lg border-t border-outline-variant/30 pt-stack-md">
        <div className="flex flex-col gap-2">
          <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">전체 활동</span>
          <span className="text-headline-lg font-headline-lg text-primary">{stats.total}</span>
        </div>
        <div className="flex flex-col gap-2 border-l border-outline-variant/30 pl-4 md:pl-gutter">
          <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">마감 임박</span>
          <span className="text-headline-lg font-headline-lg text-error">{stats.urgent}</span>
        </div>
        <div className="flex flex-col gap-2 border-t md:border-t-0 md:border-l border-outline-variant/30 pt-4 md:pt-0 pl-0 md:pl-gutter">
          <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">제출 완료</span>
          <span className="text-headline-lg font-headline-lg text-primary">{stats.completed}</span>
        </div>
        <div className="flex flex-col gap-2 border-t md:border-t-0 border-l border-outline-variant/30 pt-4 md:pt-0 pl-4 md:pl-gutter">
          <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">면접 예정</span>
          <span className="text-headline-lg font-headline-lg text-primary">{stats.interviews}</span>
        </div>
      </section>

      {/* Upcoming Deadlines */}
      <section>
        <div className="flex justify-between items-end mb-stack-md pb-4 border-b border-outline-variant/30">
          <h3 className="text-headline-md font-headline-md text-primary italic">다가오는 마감 일정</h3>
          <Link to="/activities" className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
            VIEW ALL <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
          {upcomingActivities.length > 0 ? (
            upcomingActivities.map((activity, index) => {
              const dday = calculateDDay(activity.deadline);
              const colorClasses = [
                'bg-error',
                'bg-primary-fixed-dim',
                'bg-surface-dim'
              ];
              const sideColorClass = colorClasses[index % colorClasses.length];
              
              return (
                <article key={activity.id} className="bg-surface-container-lowest p-6 flex flex-col gap-4 ambient-shadow border border-outline-variant/10 rounded-DEFAULT relative overflow-hidden group">
                  <div className={`absolute top-0 left-0 w-1 h-full ${sideColorClass}`}></div>
                  <div className="flex justify-between items-start">
                    <span className="inline-flex items-center px-2 py-1 bg-secondary-fixed/30 text-on-secondary-fixed-variant text-label-sm font-label-sm rounded-sm">
                      {activity.category}
                    </span>
                    <span className={`font-bold text-label-sm font-label-sm px-2 py-1 rounded-sm ${dday.days <= 3 ? 'text-error bg-error-container/50' : 'text-primary'}`}>
                      {dday.text}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-body-lg font-body-lg text-on-surface mb-1">{activity.title}</h4>
                    <p className="text-label-sm font-label-sm text-on-surface-variant truncate">
                      {activity.memo || '저장된 메모가 없습니다.'}
                    </p>
                  </div>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-outline-variant/10">
                    <span className="text-label-sm font-label-sm text-outline flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span> {formatDate(activity.deadline)}
                    </span>
                    <Link to={`/activities/${activity.id}`} className="text-primary hover:text-primary-container transition-colors">
                      <span className="material-symbols-outlined">arrow_outward</span>
                    </Link>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12 text-on-surface-variant bg-surface-container-low rounded-lg border border-dashed border-outline-variant/30">
              다가오는 마감 일정이 없습니다. 여유로운 하루네요!
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
