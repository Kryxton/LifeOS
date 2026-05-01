import { useState, useEffect, useCallback } from 'react';
import { AppState, DailyLog, Chore, FinancialLog, WeeklyReview } from '../types';
import { loadState, saveState, getDailyLog, calculateScore } from './storage';
import { format } from 'date-fns';
import { supabase, isSupabaseConfigured } from './supabase';

export const useAppState = () => {
  const [state, setState] = useState<AppState>(loadState());
  const [isSyncing, setIsSyncing] = useState(false);

  // Load from Cloud on startup
  useEffect(() => {
    const syncFromCloud = async () => {
      if (!isSupabaseConfigured()) return;
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('user_data')
        .select('payload')
        .eq('id', session.user.id)
        .single();

      if (data?.payload) {
        setState(data.payload);
      }
    };
    syncFromCloud();
  }, []);

  // Save to Cloud & Local on every change
  useEffect(() => {
    saveState(state);
    
    const syncToCloud = async () => {
      if (!isSupabaseConfigured()) return;
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      setIsSyncing(true);
      await supabase.from('user_data').upsert({
        id: session.user.id,
        payload: state,
        updated_at: new Date().toISOString()
      });
      setIsSyncing(false);
    };

    const timeout = setTimeout(syncToCloud, 1000); // Debounce saves
    return () => clearTimeout(timeout);
  }, [state]);

  const updateDailyLog = useCallback((date: Date, updater: (log: DailyLog) => DailyLog) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    setState(prev => {
      const currentLog = getDailyLog(prev, date);
      const updatedLog = updater(currentLog);
      updatedLog.score = calculateScore(updatedLog);
      
      return {
        ...prev,
        dailyLogs: {
          ...prev.dailyLogs,
          [dateKey]: updatedLog
        }
      };
    });
  }, []);

  const setIdentity = (identity: string) => {
    setState(prev => ({ ...prev, identity }));
  };

  const relapsed = (type: 'porn' | 'gambling') => {
    const now = new Date().toISOString();
    const dateKey = format(new Date(), 'yyyy-MM-dd');
    setState(prev => {
      const log = getDailyLog(prev, new Date());
      log.isUrgeFailed = true;
      log.score = 0;
      
      return {
        ...prev,
        [type === 'porn' ? 'lastPornRelapse' : 'lastGamblingRelapse']: now,
        dailyLogs: {
          ...prev.dailyLogs,
          [dateKey]: log
        }
      };
    });
  };

  const addChore = (title: string, frequency: 'daily' | 'weekly') => {
    const newChore: Chore = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      frequency,
      completedDates: []
    };
    setState(prev => ({ ...prev, chores: [...prev.chores, newChore] }));
  };

  const toggleChore = (id: string, date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    setState(prev => ({
      ...prev,
      chores: prev.chores.map(c => {
        if (c.id !== id) return c;
        const exists = c.completedDates.includes(dateKey);
        return {
          ...c,
          completedDates: exists 
            ? c.completedDates.filter(d => d !== dateKey)
            : [...c.completedDates, dateKey]
        };
      })
    }));
  };

  const addFinancialLog = (type: 'SAVINGS' | 'INVESTMENT', amount: number) => {
    const newLog: FinancialLog = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      type,
      amount
    };
    setState(prev => ({ ...prev, financialLogs: [...prev.financialLogs, newLog] }));
  };

  const updateTrainingPhase = (phase: 'FOUNDATION' | 'HYBRID') => {
    setState(prev => ({ ...prev, trainingPhase: phase }));
  };

  const addWeeklyReview = (review: Omit<WeeklyReview, 'id'>) => {
    const newReview: WeeklyReview = {
      ...review,
      id: Math.random().toString(36).substr(2, 9),
    };
    setState(prev => ({ ...prev, weeklyReviews: [newReview, ...prev.weeklyReviews] }));
  };

  const addSkillMetrics = (metrics: any) => {
    setState(prev => ({
      ...prev,
      skillMetrics: [{ ...metrics, date: new Date().toISOString() }, ...prev.skillMetrics]
    }));
  };

  const setCurrentVersion = (version: string) => {
    setState(prev => ({ ...prev, currentVersion: version }));
  };

  const setEarningFor = (value: string) => {
    setState(prev => ({ ...prev, earningFor: value }));
  };

  return {
    state,
    updateDailyLog,
    setIdentity,
    relapsed,
    addChore,
    toggleChore,
    addFinancialLog,
    updateTrainingPhase,
    addWeeklyReview,
    addSkillMetrics,
    setCurrentVersion,
    setEarningFor
  };
};
