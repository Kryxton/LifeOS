import { useState } from 'react';
import { DailyLog, AppState } from '../types';
import { format, subDays } from 'date-fns';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Circle, 
  Smartphone, 
  Tv,
  X,
  Target
} from 'lucide-react';
import { cn } from '../utils/cn';
import { calculateScore } from '../utils/storage';

interface DashboardProps {
  state: AppState;
  log: DailyLog;
  streaks: { porn: number; gambling: number; training: number };
  updateDailyLog: (date: Date, updater: (log: DailyLog) => DailyLog) => void;
  relapsed: (type: 'porn' | 'gambling') => void;
  toggleChore: (id: string, date: Date) => void;
  setCurrentVersion: (version: string) => void;
  setEarningFor: (value: string) => void;
}

export default function Dashboard({ 
  state, 
  log, 
  streaks, 
  updateDailyLog, 
  relapsed, 
  toggleChore, 
  setCurrentVersion,
  setEarningFor
}: DashboardProps) {
  const yesterdayDate = subDays(new Date(), 1);
  const yesterdayKey = format(yesterdayDate, 'yyyy-MM-dd');
  const dailyLogs = state.dailyLogs || {};
  const yesterdayLog = dailyLogs[yesterdayKey];
  const yesterdayScore = yesterdayLog ? calculateScore(yesterdayLog) : 0;

  const handleTaskToggle = (id: string) => {
    if (log.locked) return;
    updateDailyLog(new Date(), (prev) => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    }));
  };

  const [urgeStep, setUrgeStep] = useState<number | null>(null);
  const [triggerSentence, setTriggerSentence] = useState('');

  const handleUrge = () => {
    setUrgeStep(1);
  };

  const handleUrgeFail = () => {
    relapsed('porn');
    setUrgeStep(null);
  };

  const handleUrgeResisted = () => {
    setUrgeStep(null);
    setTriggerSentence('');
    alert("DISCIPLINE MAINTAINED. GET BACK TO WORK.");
  };

  const updateLogField = (field: keyof DailyLog | string, value: any, nested?: string) => {
    if (log.locked) return;
    updateDailyLog(new Date(), (prev) => {
      if (nested) {
        return {
          ...prev,
          [field]: { ...(prev as any)[field], [nested]: value }
        };
      }
      return { ...prev, [field]: value };
    });
  };

  const categories = ['DISCIPLINE', 'GROWTH', 'BODY'];

  const [selectedDateLog, setSelectedDateLog] = useState<DailyLog | null>(null);

  if (selectedDateLog) {
    return (
      <div className="space-y-8 pb-12">
        <button 
          onClick={() => setSelectedDateLog(null)}
          className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Close History
        </button>
        <header className="space-y-1">
          <h2 className="text-2xl font-bold font-mono tracking-tighter">{format(new Date(selectedDateLog.date), 'MMMM d, yyyy')}</h2>
          <p className="text-zinc-500 uppercase text-[10px] font-bold tracking-widest">Score: {selectedDateLog.score}%</p>
        </header>
        <div className="space-y-4">
          <div className="bg-zinc-950 border border-zinc-900 p-4">
            <span className="text-[9px] uppercase font-bold text-zinc-600 block mb-2">Focus</span>
            <p className="text-sm italic">"{selectedDateLog.focus || 'No focus set'}"</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-zinc-950 border border-zinc-900 p-3">
              <span className="text-[8px] uppercase font-bold text-zinc-600 block">Screen Time</span>
              <p className="text-sm font-mono">{selectedDateLog.screenTime || 0}h</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-900 p-3">
              <span className="text-[8px] uppercase font-bold text-zinc-600 block">Netflix</span>
              <p className="text-sm font-mono">{selectedDateLog.netflixHours || 0}h</p>
            </div>
          </div>

          <div className="space-y-1">
            {selectedDateLog.tasks.map(t => (
              <div key={t.id} className={cn(
                "flex justify-between p-3 border text-xs",
                t.completed ? "bg-zinc-100 text-black border-zinc-100" : "bg-black text-zinc-600 border-zinc-900"
              )}>
                <span className="font-medium">{t.label}</span>
                <span className="font-mono text-[10px]">{t.completed ? 'DONE' : 'MISS'}</span>
              </div>
            ))}
          </div>

          <div className="bg-zinc-950 border border-zinc-900 p-4 space-y-4">
            <span className="text-[9px] uppercase font-bold text-zinc-600 block">Reflection</span>
            <p className="text-xs leading-relaxed"><span className="text-zinc-500 underline decoration-zinc-800 underline-offset-4 mr-2">Strengths:</span> {selectedDateLog.reflection.well}</p>
            <p className="text-xs leading-relaxed"><span className="text-zinc-500 underline decoration-zinc-800 underline-offset-4 mr-2">Escapes:</span> {selectedDateLog.reflection.escape}</p>
            <p className="text-xs leading-relaxed"><span className="text-zinc-500 underline decoration-zinc-800 underline-offset-4 mr-2">Improve:</span> {selectedDateLog.reflection.improvement}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Identity Header */}
      <section className="text-center space-y-2">
        <h2 className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold">Identity</h2>
        <p className="text-xl font-bold tracking-tight italic">"{state.identity}"</p>
      </section>

      {/* Morning Section */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-none space-y-1">
          <span className="text-zinc-500 text-[9px] uppercase font-bold">Yesterday</span>
          <div className="text-2xl font-mono font-bold">{yesterdayScore}%</div>
        </div>
        <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-none space-y-1">
          <span className="text-zinc-500 text-[9px] uppercase font-bold">Training Streak</span>
          <div className="text-2xl font-mono font-bold">{streaks.training}d</div>
        </div>
        
        <div className="col-span-2 flex items-center justify-between border border-zinc-900 bg-zinc-950/50 px-4 py-2">
          <span className="text-[9px] uppercase font-black text-zinc-500 tracking-[0.2em]">Current Version of Me:</span>
          <input 
            type="text"
            className="bg-transparent text-right text-xs font-bold uppercase text-zinc-300 focus:outline-none focus:text-white transition-colors"
            value={state.currentVersion}
            onChange={(e) => setCurrentVersion(e.target.value)}
          />
        </div>

        <div className="col-span-2 space-y-3">
          <label className="text-[10px] uppercase font-bold text-zinc-500">Today's Focus</label>
          <input 
            type="text" 
            placeholder="One sentence. Execution only."
            className="w-full bg-black border-b border-zinc-800 py-2 focus:outline-none focus:border-zinc-100 text-sm transition-colors"
            value={log.focus}
            onChange={(e) => updateLogField('focus', e.target.value)}
            disabled={log.locked}
          />
        </div>
      </section>

      {/* Checklist */}
      <section className="space-y-6">
        <h3 className="text-[10px] uppercase font-bold text-zinc-500 border-b border-zinc-900 pb-2">Daily Execution</h3>
        <div className="space-y-8">
          {categories.map(cat => (
            <div key={cat} className="space-y-3">
              <h4 className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">{cat}</h4>
              <div className="space-y-1">
                {log.tasks.filter(t => t.category === cat).map(task => (
                  <button
                    key={task.id}
                    onClick={() => handleTaskToggle(task.id)}
                    className={cn(
                      "w-full flex items-center justify-between p-3 border transition-colors",
                      task.completed 
                        ? "bg-zinc-100 border-zinc-100 text-black" 
                        : "bg-black border-zinc-900 text-zinc-400"
                    )}
                    disabled={log.locked}
                  >
                    <span className="text-sm font-medium">{task.label}</span>
                    <span className="text-[10px] font-mono">+{task.weight}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chores (Dynamic) */}
      <section className="space-y-4">
        <h3 className="text-[10px] uppercase font-bold text-zinc-500 border-b border-zinc-900 pb-2">House Chores</h3>
        <div className="grid grid-cols-1 gap-1">
          {state.chores.map(chore => {
            const completed = chore.completedDates.includes(log.date);
            return (
              <button
                key={chore.id}
                onClick={() => toggleChore(chore.id, new Date())}
                className={cn(
                  "flex items-center justify-between p-3 border border-zinc-900 text-sm transition-colors text-left",
                  completed ? "bg-zinc-900/50 text-zinc-600 line-through" : "text-zinc-100"
                )}
              >
                {chore.title}
                {completed ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
              </button>
            );
          })}
        </div>
      </section>

      {/* Recovery & Entertainment */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-[10px] uppercase font-bold text-zinc-500 border-b border-zinc-900 pb-2">Screen Time</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Smartphone className="w-5 h-5 text-zinc-600" />
              <input 
                type="number" 
                className="w-16 bg-zinc-950 border border-zinc-900 p-2 text-center text-sm"
                value={log.screenTime}
                onChange={(e) => updateLogField('screenTime', Number(e.target.value))}
                disabled={log.locked}
              />
              <span className="text-xs text-zinc-500">Hours Total</span>
            </div>
            <div className="flex items-center gap-4">
              <Tv className="w-5 h-5 text-zinc-600" />
              <input 
                type="number" 
                className="w-16 bg-zinc-950 border border-zinc-900 p-2 text-center text-sm"
                value={log.netflixHours}
                onChange={(e) => updateLogField('netflixHours', Number(e.target.value))}
                disabled={log.locked}
              />
              <span className="text-xs text-zinc-500">Netflix (Max 2h WE)</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-[10px] uppercase font-bold text-zinc-500 border-b border-zinc-900 pb-2">Recovery</h3>
          <div className="space-y-3">
            {Object.keys(log.recovery).map((key) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-xs capitalize text-zinc-400">{key}</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(v => (
                    <button
                      key={v}
                      onClick={() => updateLogField('recovery', v, key)}
                      className={cn(
                        "w-6 h-6 text-[10px] border transition-colors",
                        (log.recovery as any)[key] === v 
                          ? "bg-zinc-100 border-zinc-100 text-black" 
                          : "border-zinc-900 text-zinc-500"
                      )}
                      disabled={log.locked}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urge Protocol */}
      <section className="pt-4">
        {!urgeStep ? (
          <button 
            onClick={handleUrge}
            className="w-full bg-red-950/20 border border-red-900/50 text-red-500 py-6 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-red-950/40 transition-colors"
          >
            <AlertTriangle className="w-5 h-5" />
            I Have an Urge
          </button>
        ) : (
          <div className="bg-zinc-950 border border-red-900 p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
              <h3 className="text-red-500 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Urge Protocol Active
              </h3>
              <button onClick={() => setUrgeStep(null)}><X className="w-4 h-4 text-zinc-600" /></button>
            </div>
            
            <div className="space-y-4">
              <div className={cn("flex gap-3 text-sm transition-opacity", urgeStep < 1 && "opacity-30")}>
                <span className="font-mono text-zinc-500">01</span>
                <p>Do 20 pushups immediately.</p>
              </div>
              <div className={cn("flex gap-3 text-sm transition-opacity", urgeStep < 2 && "opacity-30")}>
                <span className="font-mono text-zinc-500">02</span>
                <p>Leave the room for 5 minutes.</p>
              </div>
              <div className={cn("flex gap-3 text-sm transition-opacity", urgeStep < 3 && "opacity-30")}>
                <span className="font-mono text-zinc-500">03</span>
                <p>Wash your face with cold water.</p>
              </div>
              <div className={cn("flex gap-3 text-sm transition-opacity", urgeStep < 4 && "opacity-30")}>
                <span className="font-mono text-zinc-500">04</span>
                <div className="space-y-2 flex-1">
                  <p>What triggered this? (Write it down)</p>
                  <input 
                    type="text"
                    className="w-full bg-black border border-zinc-800 p-2 text-xs focus:border-zinc-500"
                    placeholder="Trigger sentence..."
                    value={triggerSentence}
                    onChange={(e) => {
                      setTriggerSentence(e.target.value);
                      if (urgeStep < 4) setUrgeStep(4);
                    }}
                  />
                </div>
              </div>
            </div>

            {urgeStep === 1 && <button onClick={() => setUrgeStep(2)} className="w-full py-3 bg-zinc-100 text-black text-[10px] font-bold uppercase">Pushups Done</button>}
            {urgeStep === 2 && <button onClick={() => setUrgeStep(3)} className="w-full py-3 bg-zinc-100 text-black text-[10px] font-bold uppercase">Left Room</button>}
            {urgeStep === 3 && <button onClick={() => setUrgeStep(4)} className="w-full py-3 bg-zinc-100 text-black text-[10px] font-bold uppercase">Face Washed</button>}
            
            {urgeStep === 4 && (
              <div className="flex gap-2">
                <button 
                  onClick={handleUrgeResisted}
                  className="flex-1 py-4 bg-green-900/20 border border-green-900 text-green-500 text-[10px] font-bold uppercase tracking-widest"
                >
                  Urge Resisted
                </button>
                <button 
                  onClick={handleUrgeFail}
                  className="flex-1 py-4 bg-red-900/20 border border-red-900 text-red-500 text-[10px] font-bold uppercase tracking-widest"
                >
                  Urge Failed
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* North Star Section */}
      <section className="bg-zinc-950 border border-zinc-900 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-zinc-100" />
          <h3 className="text-[10px] uppercase font-bold text-zinc-100 tracking-[0.2em]">The North Star</h3>
        </div>
        <div className="space-y-2">
          <label className="text-[9px] uppercase font-black text-zinc-500 tracking-widest">I AM EARNING THIS FOR:</label>
          <input 
            type="text"
            className="w-full bg-black border border-zinc-900 p-4 text-sm font-bold uppercase tracking-tight text-zinc-100 focus:border-zinc-500 transition-colors"
            placeholder="e.g. A high-value girlfriend"
            value={state.earningFor}
            onChange={(e) => setEarningFor(e.target.value)}
          />
          <p className="text-[10px] text-zinc-600 italic">
            "I’m not giving this away for free. I’m saving it for a real woman."
          </p>
        </div>
      </section>

      {/* Evening Reflection */}
      <section className="space-y-6">
        <h3 className="text-[10px] uppercase font-bold text-zinc-500 border-b border-zinc-900 pb-2">Evening Reflection</h3>
        <div className="space-y-4">
          {[
            { id: 'well', label: 'What did I do well?' },
            { id: 'escape', label: 'Where did I escape discomfort?' },
            { id: 'improvement', label: 'One improvement for tomorrow' },
          ].map(field => (
            <div key={field.id} className="space-y-2">
              <label className="text-xs text-zinc-400">{field.label}</label>
              <textarea 
                className="w-full bg-zinc-950 border border-zinc-900 p-3 text-sm focus:outline-none focus:border-zinc-700 min-h-[80px]"
                value={(log.reflection as any)[field.id]}
                onChange={(e) => updateLogField('reflection', e.target.value, field.id)}
                disabled={log.locked}
              />
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-zinc-900 pt-4">
            <span className="text-sm font-medium">Acted like best version?</span>
            <button 
              onClick={() => updateLogField('reflection', !log.reflection.bestVersion, 'bestVersion')}
              className={cn(
                "px-4 py-2 text-xs font-bold uppercase tracking-tighter transition-colors",
                log.reflection.bestVersion ? "bg-zinc-100 text-black" : "bg-zinc-900 text-zinc-500"
              )}
              disabled={log.locked}
            >
              {log.reflection.bestVersion ? 'YES' : 'NO'}
            </button>
          </div>
        </div>
      </section>

      {/* Calendar Preview (Simple Dots) */}
      <section className="space-y-4 pb-12">
        <h3 className="text-[10px] uppercase font-bold text-zinc-500 border-b border-zinc-900 pb-2">Calendar</h3>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 28 }).map((_, i) => {
            const date = subDays(new Date(), 27 - i);
            const key = format(date, 'yyyy-MM-dd');
            const dayLog = state.dailyLogs[key];
            const score = dayLog ? calculateScore(dayLog) : null;
            
            return (
              <button 
                key={i} 
                onClick={() => dayLog && setSelectedDateLog(dayLog)}
                className={cn(
                  "aspect-square flex items-center justify-center text-[8px] font-mono transition-transform active:scale-95",
                  score === null ? "bg-zinc-900 text-zinc-700 cursor-default" :
                  score >= 85 ? "bg-zinc-100 text-black" :
                  score >= 60 ? "bg-zinc-700 text-zinc-100" :
                  "bg-red-900/50 text-red-100"
                )}
              >
                {format(date, 'd')}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
