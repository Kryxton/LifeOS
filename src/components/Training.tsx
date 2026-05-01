import { useState } from 'react';
import { AppState } from '../types';
import { Dumbbell, Target } from 'lucide-react';
import { cn } from '../utils/cn';

interface TrainingProps {
  state: AppState;
  updateTrainingPhase: (phase: 'FOUNDATION' | 'HYBRID') => void;
  addSkillMetrics: (metrics: any) => void;
}

const WORKOUTS = {
  FOUNDATION: [
    {
      name: 'Day A – Push + Planche',
      exercises: [
        { name: 'Planche Lean', target: '4x20s' },
        { name: 'Dips', target: '4x6–8' },
        { name: 'Pseudo Planche Pushups', target: '4x6' },
        { name: 'Pike Pushups', target: '3x8–10' },
        { name: 'L-Sit', target: '3x15–20s' }
      ]
    },
    {
      name: 'Day B – Pull',
      exercises: [
        { name: 'Pullups', target: '4x6–8' },
        { name: 'Australian Rows', target: '3x10–12' },
        { name: 'Negatives', target: '3 reps' },
        { name: 'Face Pulls', target: '3x12–15' },
        { name: 'Hanging Leg Raises', target: '3x8–10' }
      ]
    },
    {
      name: 'Day C – Legs + Handstand',
      exercises: [
        { name: 'Goblet Squats', target: '3x10' },
        { name: 'RDL', target: '3x8' },
        { name: 'Glute Bridges', target: '3x12' },
        { name: 'Calf Raises', target: '3x15' },
        { name: 'Wall Handstand', target: 'Accumulate 2 min' },
        { name: 'Mobility', target: '5–8 min' }
      ]
    }
  ],
  HYBRID: [
    {
      name: 'Day 1 – Upper',
      exercises: [
        { name: 'Weighted Pullups', target: '4x5–8' },
        { name: 'Dips', target: '4x6–8' },
        { name: 'Explosive Pullups', target: '3x3–5' },
        { name: 'Tuck Planche', target: '4x10–15s' },
        { name: 'Handstand Practice', target: '5–8 min' },
        { name: 'Core', target: '3x10' }
      ]
    },
    {
      name: 'Day 2 – Lower + Muscle-Up',
      exercises: [
        { name: 'Squats', target: '3x5–8' },
        { name: 'RDL', target: '3x6–8' },
        { name: 'Bulgarian Split Squats', target: '3x8' },
        { name: 'Calf Raises', target: '3x12–15' },
        { name: 'False Grip Hangs', target: '3x20s' },
        { name: 'Band Muscle-Ups', target: '3x3–5' },
        { name: 'Slow Transition Negatives', target: '3 reps' }
      ]
    }
  ]
};

export default function Training({ state, updateTrainingPhase, addSkillMetrics }: TrainingProps) {
  const [activeTab, setActiveTab] = useState<'workout' | 'metrics'>('workout');
  const [isLogging, setIsLogging] = useState(false);
  const [formData, setFormData] = useState({
    maxPullups: '',
    maxDips: '',
    plancheLeanTime: '',
    tuckPlancheTime: '',
    handstandMaxHold: '',
    bodyweight: '',
    bodyfat: '',
  });

  const currentWorkouts = WORKOUTS[state.trainingPhase];

  const handleMetricSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSkillMetrics({
      maxPullups: Number(formData.maxPullups),
      maxDips: Number(formData.maxDips),
      plancheLeanTime: Number(formData.plancheLeanTime),
      tuckPlancheTime: Number(formData.tuckPlancheTime),
      handstandMaxHold: Number(formData.handstandMaxHold),
      bodyweight: Number(formData.bodyweight),
      bodyfat: Number(formData.bodyfat),
    });
    setIsLogging(false);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4">
        <div className="space-y-1">
          <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">Physical Mastery</h2>
          <p className="text-xl font-bold tracking-tight uppercase">Training Phase: {state.trainingPhase}</p>
        </div>
        
        <div className="flex border border-zinc-900 bg-zinc-950 p-1">
          {(['FOUNDATION', 'HYBRID'] as const).map((p) => (
            <button
              key={p}
              onClick={() => updateTrainingPhase(p)}
              className={cn(
                "flex-1 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors",
                state.trainingPhase === p ? "bg-zinc-100 text-black" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </header>

      <div className="flex gap-4 border-b border-zinc-900 pb-4">
        <button 
          onClick={() => setActiveTab('workout')}
          className={cn(
            "flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest",
            activeTab === 'workout' ? "text-zinc-100" : "text-zinc-500"
          )}
        >
          <Dumbbell className="w-4 h-4" />
          Workout
        </button>
        <button 
          onClick={() => setActiveTab('metrics')}
          className={cn(
            "flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest",
            activeTab === 'metrics' ? "text-zinc-100" : "text-zinc-500"
          )}
        >
          <Target className="w-4 h-4" />
          Metrics
        </button>
      </div>

      {activeTab === 'workout' ? (
        <div className="space-y-8">
          {currentWorkouts.map((workout, idx) => (
            <section key={idx} className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 bg-zinc-950 border border-zinc-900 p-3">
                {workout.name}
              </h3>
              <div className="space-y-1">
                {workout.exercises.map((ex, eIdx) => (
                  <div key={eIdx} className="flex items-center justify-between p-4 border border-zinc-900 bg-black">
                    <span className="text-sm font-medium">{ex.name}</span>
                    <span className="text-xs font-mono text-zinc-500">{ex.target}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="space-y-8 pb-12">
          {isLogging ? (
            <form onSubmit={handleMetricSubmit} className="bg-zinc-950 border border-zinc-900 p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-100">Log New Entry</h3>
                <button type="button" onClick={() => setIsLogging(false)} className="text-[10px] uppercase font-bold text-zinc-500 hover:text-zinc-100 transition-colors">Cancel</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: 'maxPullups', label: 'Max Pullups' },
                  { id: 'maxDips', label: 'Max Dips' },
                  { id: 'plancheLeanTime', label: 'Planche Lean (s)' },
                  { id: 'tuckPlancheTime', label: 'Tuck Planche (s)' },
                  { id: 'handstandMaxHold', label: 'Handstand Max (s)' },
                  { id: 'bodyweight', label: 'Bodyweight (kg)' },
                  { id: 'bodyfat', label: 'Bodyfat (%)' },
                ].map((field) => (
                  <div key={field.id} className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-zinc-500 tracking-widest">{field.label}</label>
                    <input 
                      type="number" 
                      step="0.1"
                      required
                      className="w-full bg-black border border-zinc-900 p-3 text-sm focus:border-zinc-100 transition-colors"
                      value={(formData as any)[field.id]}
                      onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                    />
                  </div>
                ))}
              </div>
              <button 
                type="submit"
                className="w-full bg-zinc-100 text-black py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors"
              >
                Save New Metrics
              </button>
            </form>
          ) : (
            <>
              <section className="bg-zinc-950 border border-zinc-900 p-6 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-900 pb-2">Skill Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Max Pullups', value: (state.skillMetrics || [])[0]?.maxPullups || 0 },
                    { label: 'Max Dips', value: (state.skillMetrics || [])[0]?.maxDips || 0 },
                    { label: 'Planche Lean', value: ((state.skillMetrics || [])[0]?.plancheLeanTime || 0) + 's' },
                    { label: 'Tuck Planche', value: ((state.skillMetrics || [])[0]?.tuckPlancheTime || 0) + 's' },
                  ].map((m, i) => (
                    <div key={i} className="space-y-1">
                      <span className="text-[9px] uppercase font-bold text-zinc-600">{m.label}</span>
                      <div className="text-xl font-mono font-bold">{m.value}</div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-zinc-950 border border-zinc-900 p-6 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-900 pb-2">Body Composition</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase font-bold text-zinc-600">Weight</span>
                    <div className="text-xl font-mono font-bold">{(state.skillMetrics || [])[0]?.bodyweight || 0}kg</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase font-bold text-zinc-600">Bodyfat</span>
                    <div className="text-xl font-mono font-bold">{(state.skillMetrics || [])[0]?.bodyfat || 0}%</div>
                  </div>
                </div>
              </section>

              <button 
                onClick={() => setIsLogging(true)}
                className="w-full bg-zinc-900 border border-zinc-800 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-100 hover:bg-zinc-800 transition-colors"
              >
                Log New Metrics
              </button>
            </>
          )}
        </div>
      )}
      
      <div className="pb-12 h-1" />
    </div>
  );
}
