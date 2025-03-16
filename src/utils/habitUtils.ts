
import { formatDateKey } from './dateUtils';

// Habit object type
export interface Habit {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  color?: string;
}

// Tracked habit data type
export interface HabitData {
  [habitId: string]: {
    [date: string]: number; // 0: not done, 1-4: intensity levels
  };
}

// Default habits
export const defaultHabits: Habit[] = [
  {
    id: '1',
    name: 'Exercise',
    description: 'Physical activity for at least 30 minutes',
    createdAt: new Date('2023-01-01'),
    color: '#7bc96f',
  },
  {
    id: '2',
    name: 'Read',
    description: 'Read a book for at least 15 minutes',
    createdAt: new Date('2023-01-15'),
    color: '#c6e48b',
  },
  {
    id: '3',
    name: 'Meditate',
    description: 'Meditate for at least 10 minutes',
    createdAt: new Date('2023-02-01'),
    color: '#239a3b',
  },
];

// Generate sample habit data
export const generateSampleData = (): HabitData => {
  const data: HabitData = {};
  const now = new Date();
  const today = formatDateKey(now);
  
  // Create sample data for each habit
  defaultHabits.forEach(habit => {
    data[habit.id] = {};
    
    // Generate past 90 days with some random data
    for (let i = 0; i < 90; i++) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      const dateKey = formatDateKey(date);
      
      // Create some patterns
      if (habit.id === '1') { // Exercise: mostly every other day
        data[habit.id][dateKey] = i % 2 === 0 ? Math.floor(Math.random() * 3) + 1 : 0;
      } else if (habit.id === '2') { // Read: more consistent
        data[habit.id][dateKey] = Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0;
      } else if (habit.id === '3') { // Meditate: less frequent
        data[habit.id][dateKey] = Math.random() > 0.6 ? Math.floor(Math.random() * 2) + 1 : 0;
      }
      
      // Ensure today is empty for demo purposes
      if (dateKey === today) {
        data[habit.id][dateKey] = 0;
      }
    }
  });
  
  return data;
};

// Calculate streak for a habit
export const calculateStreak = (habitData: { [date: string]: number }, habitId: string): number => {
  if (!habitData) return 0;
  
  const sortedDates = Object.keys(habitData).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  let streak = 0;
  
  for (let i = 0; i < sortedDates.length; i++) {
    const dateKey = sortedDates[i];
    if (habitData[dateKey] > 0) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

// Calculate the level (0-4) based on count of habits completed on a day
export const calculateActivityLevel = (count: number): number => {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count === 2) return 2;
  if (count === 3) return 3;
  return 4; // 4 or more habits
};

// Get activity data for the contribution graph
export const getActivityData = (habitData: HabitData, days: Date[]): { [date: string]: number } => {
  const activityData: { [date: string]: number } = {};
  
  days.forEach(day => {
    const dateKey = formatDateKey(day);
    let count = 0;
    
    // Count how many habits were completed on this day
    Object.keys(habitData).forEach(habitId => {
      if (habitData[habitId][dateKey] && habitData[habitId][dateKey] > 0) {
        count++;
      }
    });
    
    activityData[dateKey] = calculateActivityLevel(count);
  });
  
  return activityData;
};
