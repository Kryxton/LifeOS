import { useState } from 'react';
import { supabase } from '../utils/supabase';
import { Lock, Mail, Zap } from 'lucide-react';

export default function Auth({ onAuth }: { onAuth: () => void }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const [attempts, setAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (lockoutUntil && Date.now() < lockoutUntil) {
      const remaining = Math.ceil((lockoutUntil - Date.now()) / 1000);
      alert(`System locked. Try again in ${remaining} seconds.`);
      return;
    }

    setLoading(true);

    const { error } = isSignUp 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        // Exponential backoff: 30s, 60s, 120s...
        const backoff = Math.pow(2, newAttempts - 3) * 30 * 1000;
        setLockoutUntil(Date.now() + backoff);
        alert(`Too many attempts. System locked for ${backoff / 1000} seconds.`);
      } else {
        alert(error.message);
      }
    } else {
      setAttempts(0);
      setLockoutUntil(null);
      onAuth();
    }
    setLoading(false);
  };

  const handleResetPassword = async () => {
    if (!email) {
      alert("Enter your email first.");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });
    if (error) alert(error.message);
    else alert("Password reset link sent to your email.");
  };

  const configMissing = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <Zap className="w-10 h-10 text-zinc-100" />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tighter text-zinc-100">Life OS Access</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Secure Personal Command Center</p>
          {configMissing && (
            <div className="mt-4 p-2 bg-red-950/20 border border-red-900 text-[10px] text-red-500 font-bold uppercase">
              System Error: Configuration Missing in Vercel
            </div>
          )}
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[9px] uppercase font-bold text-zinc-600 tracking-widest flex items-center gap-2">
              <Mail className="w-3 h-3" /> Email Address
            </label>
            <input 
              type="email" 
              required
              className="w-full bg-zinc-950 border border-zinc-900 p-3 text-sm text-zinc-100 focus:border-zinc-100 outline-none transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] uppercase font-bold text-zinc-600 tracking-widest flex items-center gap-2">
              <Lock className="w-3 h-3" /> Password
            </label>
            <input 
              type="password" 
              required
              className="w-full bg-zinc-950 border border-zinc-900 p-3 text-sm text-zinc-100 focus:border-zinc-100 outline-none transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-zinc-100 text-black py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : isSignUp ? 'Create System Account' : 'Initialize Session'}
          </button>
        </form>

        <div className="text-center flex flex-col gap-4">
          <button 
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[9px] uppercase font-bold text-zinc-600 tracking-widest hover:text-zinc-400"
          >
            {isSignUp ? 'Already have access? Log in' : 'First time? Request enrollment'}
          </button>
          {!isSignUp && (
            <button 
              type="button"
              onClick={handleResetPassword}
              className="text-[9px] uppercase font-bold text-zinc-700 tracking-widest hover:text-zinc-500"
            >
              Forgot Password?
            </button>
          )}
        </div>

        <div className="pt-8 text-center opacity-20">
          <p className="text-[8px] uppercase tracking-[0.5em]">Encryption Level: Military Grade</p>
        </div>
      </div>
    </div>
  );
}
