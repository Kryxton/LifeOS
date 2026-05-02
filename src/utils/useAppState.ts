import { useState, useEffect, useCallback } from 'react';
import { AppState, DailyLog, Chore, FinancialLog, WeeklyReview } from '../types';
import { loadState, saveState, getDailyLog, calculateScore } from './storage';
import { format } from 'date-fns';
import { supabase, isSupabaseConfigured } from './supabase';

export const useAppState = () => {
  const [state, setState] = useState<AppState>(loadState);
  const [isCloudLoaded, setIsCloudLoaded] = useState(false);

  // Load from Cloud (ONLY ONCE ON LOGIN)
  useEffect(() => {
    let mounted = true;
    
    const initialSync = async () => {
      try {
        if (!isSupabaseConfigured()) return;
        const { data: { session } } = await supabase.auth.getSession();
        if (!session || !mounted) return;

        const { data, error } = await supabase
          .from('user_data')
          .select('payload')
          .eq('id', session.user.id);
        
        if (error) throw error;

        if (data && data.length > 0 && data[0].payload && mounted) {
          const cloud = data[0].payload;
          setState(current => {
            const newState = {
              ...current,
              ...cloud,
              dailyLogs: { ...(current?.dailyLogs || {}), ...(cloud.dailyLogs || {}) },
              chores: cloud.chores || current?.chores || [],
              skillMetrics: cloud.skillMetrics || current?.skillMetrics || [],
              financialLogs: cloud.financialLogs || current?.financialLogs || [],
              weeklyReviews: cloud.weeklyReviews || current?.weeklyReviews || [],
            };
            return newState;
          });
          setIsCloudLoaded(true);
        } else {
          setIsCloudLoaded(true); // Mark loaded even if no cloud data exists yet
        }
      } catch (e) {
        console.error("Sync failed", e);
        setIsCloudLoaded(true); // Don't block saving if sync fails once
      }
    };

    initialSync();
    return () => { mounted = false; };
  }, []);

  // Save changes
  useEffect(() => {
    if (!state || !isCloudLoaded) return; // CRITICAL: Don't save until we've at least tried to load
    saveState(state);

    const timer = setTimeout(async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      await supabase.from('user_data').upsert({
        id: session.user.id,
        payload: state,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });
    }, 2000);

    return () => clearTimeout(timer);
  }, [state, isCloudLoaded]);

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
    isCloudLoaded,
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
