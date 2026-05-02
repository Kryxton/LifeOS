import { AppState, DailyLog, DisciplineTask } from '../types';
import { format } from 'date-fns';

const STORAGE_KEY = 'life_os_data';

export const DEFAULT_TASKS: DisciplineTask[] = [
  { id: 'p1', label: 'No Porn', weight: 3, category: 'DISCIPLINE', completed: false },
  { id: 'g1', label: 'No Gambling', weight: 3, category: 'DISCIPLINE', completed: false },
  { id: 'ph1', label: 'No Phone Before Learning', weight: 2, category: 'DISCIPLINE', completed: false },
  { id: 'nf1', label: 'No Netflix (Weekday)', weight: 2, category: 'DISCIPLINE', completed: false, weekdayOnly: true },
  { id: 'al1', label: 'No Alcohol', weight: 1, category: 'DISCIPLINE', completed: false },
  { id: 'sm1', label: 'No Smoking', weight: 1, category: 'DISCIPLINE', completed: false },
  { id: 'hw1', label: 'Homework / Learning', weight: 2, category: 'GROWTH', completed: false },
  { id: 'sb1', label: 'Serbian Practice', weight: 1, category: 'GROWTH', completed: false },
  { id: 'bc1', label: '15min Ball Control', weight: 1, category: 'BODY', completed: false },
  { id: 'tr1', label: 'Training Done', weight: 2, category: 'BODY', completed: false },
  { id: 'sk1', label: 'Skin Routine', weight: 1, category: 'BODY', completed: false },
  { id: 'ps1', label: 'Posture Routine', weight: 1, category: 'BODY', completed: false },
  { id: 'w1', label: '3L Water', weight: 1, category: 'BODY', completed: false },
  { id: 'sl1', label: '8h Sleep', weight: 1, category: 'BODY', completed: false },
];

const INITIAL_STATE: AppState = {
  identity: 'I am building discipline and an athletic body.',
  lastPornRelapse: null,
  lastGamblingRelapse: null,
  trainingPhase: 'FOUNDATION',
  dailyLogs: {},
  chores: [
    { id: 'c1', title: 'Clean room', frequency: 'daily', completedDates: [] },
    { id: 'c2', title: 'Take trash out', frequency: 'daily', completedDates: [] },
  ],
  financialLogs: [],
  weeklyReviews: [],
  skillMetrics: [],
  currentVersion: 'Focused',
  earningFor: '',
  contract: {
    name: '',
    date: '',
    signature: '',
  },
};

export const loadState = (): AppState => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return INITIAL_STATE;
    
    const parsed = JSON.parse(data);
    // Basic validation to ensure it's a valid object
    if (!parsed || typeof parsed !== 'object') return INITIAL_STATE;
    
    // Ensure critical arrays exist
    return {
      ...INITIAL_STATE,
      ...parsed,
      dailyLogs: parsed.dailyLogs || {},
      chores: parsed.chores || INITIAL_STATE.chores,
      skillMetrics: parsed.skillMetrics || [],
    };
  } catch (e) {
    console.error("Failed to load local state:", e);
    return INITIAL_STATE;
  }
};

export const saveState = (state: AppState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const getDailyLog = (state: AppState, date: Date): DailyLog => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const dailyLogs = state?.dailyLogs || {};
    const existing = dailyLogs[dateKey];
    
    if (existing && existing.tasks && existing.reflection) {
    // Update existing day with new master tasks if they are missing
    const currentTaskIds = new Set(existing.tasks.map(t => t.id));
    const missingTasks = DEFAULT_TASKS.filter(t => !currentTaskIds.has(t.id));
    
    if (missingTasks.length > 0 && !existing.locked) {
      existing.tasks = [...existing.tasks, ...missingTasks.map(t => ({ ...t }))];
    }

    // Lock if older than yesterday
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const logDate = new Date(date);
    if (logDate < yesterday && !existing.locked) {
      existing.locked = true;
    }
    return existing;
  }

  // Create new log for the day
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  const tasks = (DEFAULT_TASKS || []).filter(t => {
    if (t.weekdayOnly && isWeekend) return false;
    if (t.weekendOnly && !isWeekend) return false;
    return true;
  }).map(t => ({ ...t }));

  return {
    date: dateKey,
    focus: '',
    tasks,
    screenTime: 0,
    netflixHours: 0,
    recovery: { energy: 3, soreness: 1, injury: 1 },
    reflection: {
      well: '',
      escape: '',
      bestVersion: false,
      improvement: '',
      rating: 0,
    },
    score: 0,
    isUrgeFailed: false,
    locked: false,
  };
};

export const calculateScore = (log: DailyLog): number => {
  if (!log || !log.tasks) return 0;
  if (log.isUrgeFailed) return 0;
  
  try {
    const totalWeight = log.tasks.reduce((sum, t) => sum + (t.weight || 0), 0);
    const completedWeight = log.tasks.reduce((sum, t) => sum + (t.completed ? (t.weight || 0) : 0), 0);
    
    // Discipline Check: Porn and Gambling are critical
    const pornTask = log.tasks.find(t => t.label === 'No Porn');
    const gamblingTask = log.tasks.find(t => t.label === 'No Gambling');
    
    if ((pornTask && !pornTask.completed) || (gamblingTask && !gamblingTask.completed)) {
      return 0; // Automatic red day
    }

    if (totalWeight === 0) return 0;
    return Math.round((completedWeight / totalWeight) * 100);
  } catch (e) {
    return 0;
  }
};

export const getStreak = (state: AppState, type: 'porn' | 'gambling' | 'training'): number => {
  if (!state) return 0;

  const dailyLogs = state.dailyLogs || {};
  const sortedDates = Object.keys(dailyLogs).sort().reverse();
  const todayKey = format(new Date(), 'yyyy-MM-dd');

  if (type === 'porn' || type === 'gambling') {
    let streak = 0;
    const taskLabel = type === 'porn' ? 'No Porn' : 'No Gambling';
    
    // Check if there was a manual relapse today
    const todayLog = dailyLogs[todayKey];
    if (todayLog?.isUrgeFailed) return 0;

    for (const dateKey of sortedDates) {
      const log = dailyLogs[dateKey];
      const task = log?.tasks?.find(t => t.label === taskLabel);
      
      if (task?.completed) {
        streak++;
      } else if (dateKey === todayKey) {
        // If today is not completed yet, keep the streak from yesterday
        continue;
      } else {
        // Break at the first failure
        break;
      }
    }
    
    return streak;
  }
  
  // Training streak logic
  let streak = 0;
  for (const dateKey of sortedDates) {
    const log = dailyLogs[dateKey];
    if (!log || !log.tasks) continue;
    
    const trainingDone = log.tasks.find(t => t.label === 'Training Done')?.completed;
    if (trainingDone) {
      streak++;
    } else if (dateKey !== todayKey) {
      break;
    }
  }
  return streak;
};
