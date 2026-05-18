import { Activity } from '../types/activity';
import { sampleActivities } from '../data/sampleActivities';

const STORAGE_KEY = 'planer_activities';

export const getActivities = (): Activity[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      // Return sample data on first load
      saveActivities(sampleActivities);
      return sampleActivities;
    }
    return JSON.parse(data) as Activity[];
  } catch (error) {
    console.error('Failed to parse activities from local storage', error);
    return [];
  }
};

export const saveActivities = (activities: Activity[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
  } catch (error) {
    console.error('Failed to save activities to local storage', error);
  }
};

export const addActivity = (activity: Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>) => {
  const newActivity: Activity = {
    ...activity,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const current = getActivities();
  saveActivities([...current, newActivity]);
  return newActivity;
};

export const updateActivity = (id: string, updates: Partial<Omit<Activity, 'id' | 'createdAt'>>) => {
  const current = getActivities();
  const updated = current.map(activity => 
    activity.id === id 
      ? { ...activity, ...updates, updatedAt: new Date().toISOString() } 
      : activity
  );
  saveActivities(updated);
};

export const deleteActivity = (id: string) => {
  const current = getActivities();
  saveActivities(current.filter(activity => activity.id !== id));
};
