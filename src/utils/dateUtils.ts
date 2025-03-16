
import { format, addDays, startOfWeek, startOfYear, eachDayOfInterval } from 'date-fns';

// Get the days for the contribution graph (default: 1 year)
export const getContributionDays = (numDays = 365): Date[] => {
  const today = new Date();
  const startDate = addDays(today, -numDays + 1);
  
  return eachDayOfInterval({
    start: startDate,
    end: today
  });
};

// Get the month labels for the contribution graph
export const getMonthLabels = (days: Date[]): { month: string, index: number }[] => {
  if (!days.length) return [];
  
  let currentMonth = '';
  const labels: { month: string, index: number }[] = [];
  
  days.forEach((day, index) => {
    const month = format(day, 'MMM');
    if (month !== currentMonth) {
      currentMonth = month;
      labels.push({ month, index });
    }
  });
  
  return labels;
};

// Get the day labels for the contribution graph
export const getDayLabels = (): string[] => {
  const weekStart = startOfWeek(new Date());
  
  return Array.from({ length: 7 }).map((_, i) => {
    const day = addDays(weekStart, i);
    return format(day, 'EEEEEE'); // Short day name (e.g., Mo, Tu)
  });
};

// Format a date to a readable string
export const formatDate = (date: Date): string => {
  return format(date, 'MMM d, yyyy');
};

// Get a readable date range string
export const getDateRangeString = (days: Date[]): string => {
  if (!days.length) return '';
  return `${formatDate(days[0])} - ${formatDate(days[days.length - 1])}`;
};

// Format a date to ISO format for keys
export const formatDateKey = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

// Get the current date key
export const getTodayKey = (): string => {
  return formatDateKey(new Date());
};
