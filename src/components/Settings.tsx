import { useState } from 'react';
import { AppState } from '../types';
import { Settings as SettingsIcon, Trash2, Plus, RefreshCw, User } from 'lucide-react';

interface SettingsProps {
  state: AppState;
  setIdentity: (identity: string) => void;
  addChore: (title: string, frequency: 'daily' | 'weekly') => void;
}

export default function Settings({ state, setIdentity, addChore }: SettingsProps) {
  const [newIdentity, setNewIdentity] = useState(state.identity);
  const [newChoreTitle, setNewChoreTitle] = useState('');

  const handleIdentitySave = () => {
    setIdentity(newIdentity);
    alert('Identity updated.');
  };

  const handleAddChore = (e: React.FormEvent) => {
    e.preventDefault();
    if (newChoreTitle.trim()) {
      addChore(newChoreTitle, 'daily');
      setNewChoreTitle('');
    }
  };

  return (
    <div className="space-y-12 pb-12">
      <header className="space-y-1">
        <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">System Configuration</h2>
        <p className="text-xl font-bold tracking-tight uppercase">Settings</p>
      </header>

      {/* Identity Configuration */}
      <section className="bg-zinc-950 border border-zinc-900 p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-zinc-900 pb-3">
          <User className="w-5 h-5 text-zinc-500" />
          <h3 className="text-[10px] uppercase font-bold text-zinc-100 tracking-[0.2em]">Core Identity</h3>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs text-zinc-500">I am building...</label>
            <textarea 
              className="w-full bg-black border border-zinc-900 p-4 text-sm focus:border-zinc-100 min-h-[80px]"
              value={newIdentity}
              onChange={(e) => setNewIdentity(e.target.value)}
            />
          </div>
          <button 
            onClick={handleIdentitySave}
            className="w-full bg-zinc-100 text-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-white"
          >
            Save Identity
          </button>
        </div>
      </section>

      {/* Chore Management */}
      <section className="bg-zinc-950 border border-zinc-900 p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-zinc-900 pb-3">
          <RefreshCw className="w-5 h-5 text-zinc-500" />
          <h3 className="text-[10px] uppercase font-bold text-zinc-100 tracking-[0.2em]">Chore Management</h3>
        </div>
        
        <form onSubmit={handleAddChore} className="flex gap-2">
          <input 
            type="text" 
            placeholder="New chore title..."
            className="flex-1 bg-black border border-zinc-900 p-3 text-sm focus:border-zinc-100"
            value={newChoreTitle}
            onChange={(e) => setNewChoreTitle(e.target.value)}
          />
          <button 
            type="submit"
            className="p-3 bg-zinc-900 border border-zinc-800 text-zinc-100 hover:bg-zinc-800"
          >
            <Plus className="w-5 h-5" />
          </button>
        </form>

        <div className="space-y-2">
          {state.chores.map((chore) => (
            <div key={chore.id} className="flex items-center justify-between p-3 border border-zinc-900 bg-black">
              <span className="text-sm">{chore.title}</span>
              <button className="text-zinc-700 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Data Security */}
      <section className="bg-zinc-950 border border-zinc-900 p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-zinc-900 pb-3 text-red-500">
          <SettingsIcon className="w-5 h-5" />
          <h3 className="text-[10px] uppercase font-bold tracking-[0.2em]">Danger Zone</h3>
        </div>
        <div className="space-y-4">
          <p className="text-[10px] text-zinc-500 leading-relaxed">
            Resetting the system will permanently delete all logs, streaks, and training data. This action cannot be undone.
          </p>
          <button 
            onClick={() => {
              if (window.confirm("ARE YOU SURE? This will wipe all progress. Permanent destruction.")) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="w-full bg-red-950/20 border border-red-900/50 text-red-500 py-3 text-xs font-bold uppercase tracking-widest hover:bg-red-950/40"
          >
            Wipe All Data
          </button>
        </div>
      </section>

      <footer className="text-center space-y-2">
        <p className="text-[8px] text-zinc-700 uppercase font-bold tracking-[0.5em]">Life OS v3.0 // Zero Compromise</p>
      </footer>
    </div>
  );
}
