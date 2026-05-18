import { differenceInDays, parseISO, isToday, isTomorrow, isPast, isFuture, startOfDay } from 'date-fns';

export const calculateDDay = (deadline: string): { text: string; days: number; type: 'past' | 'today' | 'future' } => {
  const today = startOfDay(new Date());
  const targetDate = startOfDay(parseISO(deadline));
  
  const diff = differenceInDays(targetDate, today);
  
  if (diff === 0) {
    return { text: 'D-Day', days: 0, type: 'today' };
  } else if (diff === 1) {
    return { text: 'D-1', days: 1, type: 'future' };
  } else if (diff > 1) {
    return { text: `D-${diff}`, days: diff, type: 'future' };
  } else {
    // diff < 0
    return { text: `D+${Math.abs(diff)}`, days: diff, type: 'past' };
  }
};

export const formatDate = (dateString: string): string => {
  const date = parseISO(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
