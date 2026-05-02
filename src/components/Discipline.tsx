import { ShieldAlert, Ban } from 'lucide-react';

interface DisciplineProps {
  streaks: { porn: number; gambling: number };
  relapsed: (type: 'porn' | 'gambling') => void;
}

export default function Discipline({ streaks, relapsed }: DisciplineProps) {
  const combinedStreak = Math.min(streaks.porn, streaks.gambling);

  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">Addiction Control</h2>
        <p className="text-xl font-bold tracking-tight uppercase">Discipline {'>'} Dopamine</p>
      </header>

      {/* Overview */}
      <section className="grid grid-cols-1 gap-4">
        <div className="bg-zinc-100 p-6 text-black flex justify-between items-center">
          <div>
            <p className="text-[10px] uppercase font-black tracking-widest opacity-60">Total Discipline Score</p>
            <h3 className="text-3xl font-black uppercase italic">Mastery</h3>
          </div>
          <div className="text-right">
            <div className="text-4xl font-mono font-black tracking-tighter">{combinedStreak}d</div>
            <p className="text-[9px] uppercase font-bold">Absolute Clean Streak</p>
          </div>
        </div>
      </section>

      {/* Porn Section */}
      <section className="bg-zinc-950 border border-zinc-900 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-zinc-100">
            <ShieldAlert className="w-6 h-6 text-zinc-500" />
            <h3 className="text-lg font-bold uppercase tracking-tight">Pornography</h3>
          </div>
          <div className="text-right">
            <div className="text-3xl font-mono font-bold leading-none">{streaks.porn}</div>
            <div className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest">Days Clean</div>
          </div>
        </div>
        
        <div className="bg-black border border-zinc-900 p-4">
          <p className="text-xs text-zinc-500 leading-relaxed italic text-center">
            "Pornography is a parasite that consumes your drive, your confidence, and your soul."
          </p>
        </div>

        <button 
          onClick={() => {
            if (window.confirm("CONFIRM RELAPSE: This will reset your streak and mark your day RED.")) {
              relapsed('porn');
            }
          }}
          className="w-full bg-zinc-900 border border-zinc-800 text-zinc-400 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-red-950/20 hover:text-red-500 hover:border-red-900/50 transition-all"
        >
          I Relapsed
        </button>
      </section>

      {/* Gambling Section */}
      <section className="bg-zinc-950 border border-zinc-900 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-zinc-100">
            <Ban className="w-6 h-6 text-zinc-500" />
            <h3 className="text-lg font-bold uppercase tracking-tight">Gambling</h3>
          </div>
          <div className="text-right">
            <div className="text-3xl font-mono font-bold leading-none">{streaks.gambling}</div>
            <div className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest">Days Clean</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 bg-red-950/10 border border-red-900/30 p-4">
            <Ban className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-xs font-bold text-red-500 uppercase tracking-wider">Memecoins Permanently Banned</p>
              <p className="text-[10px] text-zinc-500">Any interaction with memecoins counts as a full gambling relapse.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-zinc-900/50 border border-zinc-800 p-4">
            <ShieldAlert className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-xs font-bold text-zinc-100 uppercase tracking-wider">Monthly Investment Rule</p>
              <p className="text-[10px] text-zinc-500">80€ max Solana long-term deposit. No trading. No leverage.</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => {
            if (window.confirm("CONFIRM RELAPSE: This will reset your streak and mark your day RED.")) {
              relapsed('gambling');
            }
          }}
          className="w-full bg-zinc-900 border border-zinc-800 text-zinc-400 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-red-950/20 hover:text-red-500 hover:border-red-900/50 transition-all"
        >
          I Relapsed
        </button>
      </section>

      <section className="pb-12 text-center">
        <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-[0.3em]">Execution over excuse</p>
      </section>
    </div>
  );
}
