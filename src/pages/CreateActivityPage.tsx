import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addActivity } from '../utils/storage';
import { ActivityForm } from '../components/ActivityForm';

export const CreateActivityPage = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center mb-stack-md">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      <ActivityForm 
        onSubmit={(data) => {
          const newActivity = addActivity(data);
          navigate(`/activities/${newActivity.id}`);
        }}
        onCancel={() => navigate(-1)}
        submitLabel="활동 등록"
      />
    </div>
  );
};
