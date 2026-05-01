import { useState, useEffect } from 'react';
import { DailyLog } from '../types';
import { Book, Languages, Timer, AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn';

interface GrowthProps {
  log: DailyLog;
  updateDailyLog: (date: Date, updater: (log: DailyLog) => DailyLog) => void;
}

export default function Growth({ log, updateDailyLog }: GrowthProps) {
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [examMode, setExamMode] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const serbianTask = log.tasks.find(t => t.label === 'Serbian Practice');
  const homeworkTask = log.tasks.find(t => t.label === 'Homework / Learning');

  const toggleTask = (label: string) => {
    updateDailyLog(new Date(), (prev) => ({
      ...prev,
      tasks: prev.tasks.map(t => t.label === label ? { ...t, completed: !t.completed } : t)
    }));
  };

  return (
    <div className="space-y-12">
      <header className="space-y-1">
        <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">Intellectual Expansion</h2>
        <p className="text-xl font-bold tracking-tight uppercase">Growth & Learning</p>
      </header>

      {/* Deep Work Timer */}
      <section className={cn(
        "bg-zinc-950 border p-6 transition-colors duration-500",
        examMode ? "border-red-900" : "border-zinc-900"
      )}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Timer className={cn("w-5 h-5", examMode ? "text-red-500" : "text-zinc-500")} />
            <span className="text-xs font-bold uppercase tracking-widest">Deep Work Timer</span>
          </div>
          {examMode && <span className="text-[10px] bg-red-900/20 text-red-500 px-2 py-0.5 font-bold">EXAM MODE</span>}
        </div>

        <div className="text-center py-8">
          <div className="text-6xl font-mono font-bold tracking-tighter mb-8">{formatTime(timerSeconds)}</div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "flex-1 py-3 text-[10px] font-bold uppercase tracking-widest border transition-colors",
                isActive 
                  ? "bg-red-900/20 border-red-900 text-red-500" 
                  : "bg-zinc-100 border-zinc-100 text-black"
              )}
            >
              {isActive ? 'Pause' : 'Start Session'}
            </button>
            <button 
              onClick={() => { setIsActive(false); setTimerSeconds(0); }}
              className="px-6 border border-zinc-900 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* School / Homework */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
          <Book className="w-4 h-4 text-zinc-500" />
          <h3 className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Education</h3>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => toggleTask('Homework / Learning')}
            className={cn(
              "w-full flex items-center justify-between p-4 border transition-colors",
              homeworkTask?.completed ? "bg-zinc-100 text-black border-zinc-100" : "bg-black text-zinc-100 border-zinc-900"
            )}
          >
            <span className="text-sm font-bold uppercase tracking-tight">Daily Homework / Study</span>
            <span className="text-[10px] font-mono">2h Session</span>
          </button>

          <button
            onClick={() => setExamMode(!examMode)}
            className={cn(
              "w-full flex items-center gap-3 p-4 border transition-colors",
              examMode ? "bg-red-900/20 border-red-900 text-red-500" : "bg-black border-zinc-900 text-zinc-500"
            )}
          >
            <AlertCircle className="w-5 h-5" />
            <div className="text-left">
              <p className="text-xs font-bold uppercase tracking-widest">Exam Mode Toggle</p>
              <p className="text-[10px] opacity-70">Focus increases, all entertainment logs locked.</p>
            </div>
          </button>
        </div>
      </section>

      {/* Serbian Practice */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
          <Languages className="w-4 h-4 text-zinc-500" />
          <h3 className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Language Mastery</h3>
        </div>

        <button
          onClick={() => toggleTask('Serbian Practice')}
          className={cn(
            "w-full flex items-center justify-between p-4 border transition-colors",
            serbianTask?.completed ? "bg-zinc-100 text-black border-zinc-100" : "bg-black text-zinc-100 border-zinc-900"
          )}
        >
          <div className="text-left">
            <p className="text-sm font-bold uppercase tracking-tight">Serbian Practice</p>
            <p className="text-[10px] font-mono uppercase text-zinc-500 mt-1">Daily Minimum: 15 min</p>
          </div>
          <div className="bg-zinc-900 text-zinc-100 px-3 py-1 text-xs font-mono">
            {serbianTask?.completed ? 'DONE' : 'TODO'}
          </div>
        </button>
      </section>

      <div className="pb-12" />
    </div>
  );
}
