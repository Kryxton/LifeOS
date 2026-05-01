import { AppState } from '../types';
import { Wallet, TrendingUp, ShieldCheck, Plus } from 'lucide-react';
import { useMemo } from 'react';
import { cn } from '../utils/cn';

interface CapitalProps {
  state: AppState;
  streaks: { gambling: number };
  addFinancialLog: (type: 'SAVINGS' | 'INVESTMENT', amount: number) => void;
}

export default function Capital({ state, streaks, addFinancialLog }: CapitalProps) {
  const totals = useMemo(() => {
    return state.financialLogs.reduce((acc, log) => {
      if (log.type === 'SAVINGS') acc.saved += log.amount;
      if (log.type === 'INVESTMENT') acc.invested += log.amount;
      return acc;
    }, { saved: 0, invested: 0 });
  }, [state.financialLogs]);

  const handleAdd = (type: 'SAVINGS' | 'INVESTMENT') => {
    const amount = window.prompt(`Enter ${type.toLowerCase()} amount:`);
    if (amount && !isNaN(Number(amount))) {
      addFinancialLog(type, Number(amount));
    }
  };

  return (
    <div className="space-y-12">
      <header className="space-y-1">
        <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">Resource Management</h2>
        <p className="text-xl font-bold tracking-tight uppercase">Capital & Wealth</p>
      </header>

      {/* Main Stats */}
      <section className="grid grid-cols-1 gap-4">
        <div className="bg-zinc-950 border border-zinc-900 p-6 flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest flex items-center gap-2">
              <Wallet className="w-3 h-3" /> Total Saved
            </span>
            <div className="text-3xl font-mono font-bold">€{totals.saved.toLocaleString()}</div>
          </div>
          <button 
            onClick={() => handleAdd('SAVINGS')}
            className="p-3 bg-zinc-900 border border-zinc-800 text-zinc-100 hover:bg-zinc-800 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-zinc-950 border border-zinc-900 p-6 flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest flex items-center gap-2">
              <TrendingUp className="w-3 h-3" /> Total Invested
            </span>
            <div className="text-3xl font-mono font-bold">€{totals.invested.toLocaleString()}</div>
          </div>
          <button 
            onClick={() => handleAdd('INVESTMENT')}
            className="p-3 bg-zinc-900 border border-zinc-800 text-zinc-100 hover:bg-zinc-800 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Constraints & Indicators */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-950 border border-zinc-900 p-4 space-y-1">
          <span className="text-[9px] uppercase font-bold text-zinc-600">Gambling Free</span>
          <div className="text-xl font-mono font-bold text-zinc-100">{streaks.gambling}d</div>
        </div>
        <div className="bg-zinc-950 border border-zinc-900 p-4 space-y-1">
          <span className="text-[9px] uppercase font-bold text-zinc-600">Status</span>
          <div className="text-xl font-mono font-bold text-green-500">GROWING</div>
        </div>
      </section>

      <section className="bg-zinc-950 border border-zinc-900 p-6 space-y-4">
        <div className="flex items-center gap-3 border-b border-zinc-900 pb-3">
          <ShieldCheck className="w-5 h-5 text-blue-500" />
          <h3 className="text-[10px] uppercase font-bold text-zinc-100 tracking-[0.2em]">Investment Standards</h3>
        </div>
        <div className="space-y-3">
          <p className="text-xs text-zinc-400 leading-relaxed">
            - Goal: Invest at least 50€ every month.
            <br />
            - Maximum 80€ per month limit.
            <br />
            - No leverage. No trading. No memecoins.
          </p>
          <div className="pt-2">
            <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full w-[62%]" />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[9px] uppercase font-bold text-zinc-600">Goal Progress</span>
              <span className="text-[9px] font-mono text-zinc-500">Min. €50</span>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="space-y-4">
        <h3 className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest border-b border-zinc-900 pb-2">Recent Logs</h3>
        <div className="space-y-1">
          {state.financialLogs.slice(-5).reverse().map((log) => (
            <div key={log.id} className="flex justify-between items-center p-3 border border-zinc-900 text-xs">
              <span className={cn("font-bold", log.type === 'SAVINGS' ? "text-zinc-100" : "text-blue-500")}>
                {log.type}
              </span>
              <div className="flex items-center gap-4">
                <span className="font-mono">+€{log.amount}</span>
                <span className="text-zinc-600">{new Date(log.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
          {state.financialLogs.length === 0 && (
            <div className="text-center py-8 text-zinc-600 text-[10px] uppercase font-bold italic">No financial data recorded</div>
          )}
        </div>
      </section>

      <div className="pb-12" />
    </div>
  );
}
