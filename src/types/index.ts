export type DisciplineTask = {
  id: string;
  label: string;
  weight: number;
  category: 'DISCIPLINE' | 'GROWTH' | 'BODY' | 'HOUSE';
  completed: boolean;
  weekendOnly?: boolean;
  weekdayOnly?: boolean;
};

export type RecoveryMetrics = {
  energy: number; // 1-5
  soreness: number; // 1-5
  injury: number; // 1-5
};

export type DailyLog = {
  date: string; // ISO string
  focus: string;
  tasks: DisciplineTask[];
  screenTime: number;
  netflixHours: number;
  recovery: RecoveryMetrics;
  reflection: {
    well: string;
    escape: string;
    bestVersion: boolean;
    improvement: string;
    rating: number;
  };
  score: number;
  isUrgeFailed: boolean;
  locked: boolean;
};

export type Chore = {
  id: string;
  title: string;
  frequency: 'daily' | 'weekly';
  completedDates: string[];
};

export type TrainingPhase = 'FOUNDATION' | 'HYBRID';

export type TrainingSession = {
  id: string;
  date: string;
  type: string;
  exercises: {
    name: string;
    sets: { reps?: number; weight?: number; time?: number; completed: boolean }[];
  }[];
};

export type FinancialLog = {
  id: string;
  date: string;
  type: 'SAVINGS' | 'INVESTMENT';
  amount: number;
};

export type WeeklyReview = {
  id: string;
  weekStarting: string;
  improved: string;
  relapseRisk: string;
  distractions: string;
  trainingProgress: string;
  nextWeekFocus: string;
};

export type SkillMetricEntry = {
  maxPullups: number;
  maxDips: number;
  plancheLeanTime: number;
  tuckPlancheTime: number;
  handstandMaxHold: number;
  bodyweight: number;
  bodyfat: number;
  date: string;
};

export type AppState = {
  identity: string;
  lastPornRelapse: string | null;
  lastGamblingRelapse: string | null;
  trainingPhase: TrainingPhase;
  dailyLogs: Record<string, DailyLog>;
  chores: Chore[];
  financialLogs: FinancialLog[];
  weeklyReviews: WeeklyReview[];
  skillMetrics: SkillMetricEntry[];
  currentVersion: string;
  earningFor: string;
  contract: {
    name: string;
    date: string;
    signature: string;
  };
};
