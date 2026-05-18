import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getActivities, updateActivity, deleteActivity } from '../utils/storage';
import { Activity } from '../types/activity';
import { ActivityForm } from '../components/ActivityForm';

export const ActivityDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    const activities = getActivities();
    const found = activities.find(a => a.id === id);
    if (found) {
      setActivity(found);
    } else {
      navigate('/activities');
    }
  }, [id, navigate]);

  if (!activity) return null;

  const handleUpdate = (data: Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (id) {
      updateActivity(id, data);
      navigate('/activities');
    }
  };

  const handleDelete = () => {
    if (window.confirm('정말로 이 활동을 삭제하시겠습니까?')) {
      deleteActivity(activity.id);
      navigate('/activities');
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-stack-md">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span className="text-sm font-medium">Back to Activities</span>
        </button>
        <button onClick={handleDelete} className="text-error hover:text-error/80 flex items-center gap-1 text-sm font-medium">
          <span className="material-symbols-outlined text-sm">delete</span>
          Delete
        </button>
      </div>

      <ActivityForm 
        initialData={activity} 
        onSubmit={handleUpdate} 
        onCancel={() => navigate(-1)} 
        submitLabel="Save Changes"
      />
    </div>
  );
};
