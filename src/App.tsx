import { useState, useMemo } from 'react';
import { useAppState } from './utils/useAppState';
import { getDailyLog, getStreak } from './utils/storage';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Dumbbell, 
  BookOpen, 
  Wallet, 
  ClipboardList, 
  Settings as SettingsIcon,
  Zap,
  FileText
} from 'lucide-react';
import { cn } from './utils/cn';

// Pages
import Dashboard from './components/Dashboard';
import Discipline from './components/Discipline';
import Training from './components/Training';
import Growth from './components/Growth';
import Capital from './components/Capital';
import Reviews from './components/Reviews';
import Settings from './components/Settings';
import Contract from './components/Contract';
import Looks from './components/Looks';
import Auth from './components/Auth';
import { supabase, isSupabaseConfigured } from './utils/supabase';
import { useEffect } from 'react';

type Page = 'dashboard' | 'discipline' | 'training' | 'growth' | 'capital' | 'reviews' | 'settings' | 'contract' | 'looks';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const appProps = useAppState();
  const { state, isCloudLoaded } = appProps;

  useEffect(() => {
    let mounted = true;
    
    if (isSupabaseConfigured()) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (mounted) setSession(session);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (mounted) setSession(session);
      });

      return () => {
        mounted = false;
        subscription.unsubscribe();
      };
    }
  }, []);

  const streaks = useMemo(() => {
    if (!state) return { porn: 0, gambling: 0, training: 0 };
    return {
      porn: getStreak(state, 'porn'),
      gambling: getStreak(state, 'gambling'),
      training: getStreak(state, 'training')
    };
  }, [state]);

  const activeLog = useMemo(() => {
    try {
      if (!state) return null;
      return getDailyLog(state, new Date());
    } catch (e) {
      console.error("activeLog error", e);
      return null;
    }
  }, [state]);

  // If Supabase is configured but no session, show Auth
  if (isSupabaseConfigured() && !session) {
    return <Auth onAuth={() => {}} />;
  }

  if (!state || !activeLog || !isCloudLoaded) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center text-zinc-500">
        <div className="animate-pulse font-mono text-[10px] uppercase tracking-[0.2em] mb-4 text-zinc-100">Synchronizing with Cloud...</div>
        <p className="text-[8px] uppercase tracking-widest opacity-30 mt-4">Establishing Secure Connection</p>
      </div>
    );
  }

  if (!session) {
    return <Auth onAuth={() => {}} />;
  }

  if (!state || !activeLog) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <div className="animate-pulse text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-4">Initializing Life OS...</div>
        <button 
          onClick={() => { localStorage.clear(); supabase.auth.signOut(); window.location.reload(); }}
          className="text-[10px] text-zinc-800 border border-zinc-900 px-4 py-2 uppercase font-bold hover:bg-zinc-900 transition-colors"
        >
          Force Reset
        </button>
      </div>
    );
  }

  const mainNavItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'discipline', label: 'Core', icon: ShieldAlert },
    { id: 'training', label: 'Body', icon: Dumbbell },
    { id: 'looks', label: 'Looks', icon: Zap },
    { id: 'growth', label: 'Mind', icon: BookOpen },
  ];

  const secondaryNavItems = [
    { id: 'capital', label: 'Capital', icon: Wallet },
    { id: 'reviews', label: 'Reviews', icon: ClipboardList },
    { id: 'contract', label: 'Contract', icon: FileText },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard {...appProps} log={activeLog} streaks={streaks} toggleChore={appProps.toggleChore} setCurrentVersion={appProps.setCurrentVersion} setEarningFor={appProps.setEarningFor} />;
      case 'discipline': return <Discipline streaks={streaks} relapsed={appProps.relapsed} />;
      case 'training': return <Training state={state} updateTrainingPhase={appProps.updateTrainingPhase} addSkillMetrics={appProps.addSkillMetrics} />;
      case 'growth': return <Growth {...appProps} log={activeLog} />;
      case 'capital': return <Capital {...appProps} streaks={streaks} />;
      case 'reviews': return <Reviews {...appProps} />;
      case 'settings': return <Settings {...appProps} />;
      case 'contract': return <Contract state={state} updateContract={appProps.updateContract} />;
      case 'looks': return <Looks />;
      default: return <Dashboard {...appProps} log={activeLog} streaks={streaks} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-zinc-800">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-black border-b border-zinc-900 z-50 flex items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-zinc-100" />
          <h1 className="text-sm font-bold tracking-tighter uppercase">Life OS</h1>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-zinc-500" />
            <span className="text-xs font-mono">{streaks.porn}d</span>
          </div>
          <div className="flex items-center gap-1.5 border border-zinc-800 bg-zinc-950 px-2 py-0.5">
            <span className="text-xs font-bold font-mono">{activeLog.score}%</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-24 px-4 max-w-2xl mx-auto w-full">
        {renderPage()}
      </main>

      {/* More Menu Overlay */}
      {showMoreMenu && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex flex-col justify-end p-6 animate-in fade-in duration-200">
          <div className="space-y-4 mb-12">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-600 mb-6">System Access</h3>
            {secondaryNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id as Page);
                    setShowMoreMenu(false);
                  }}
                  className="w-full flex items-center gap-4 p-4 bg-zinc-950 border border-zinc-900 text-zinc-100"
                >
                  <Icon className="w-5 h-5 text-zinc-500" />
                  <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
                </button>
              );
            })}
          </div>
          <button 
            onClick={() => setShowMoreMenu(false)}
            className="w-full py-4 bg-zinc-100 text-black text-xs font-bold uppercase tracking-widest"
          >
            Close Menu
          </button>
        </div>
      )}

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-900 z-50 px-2">
        <div className="max-w-2xl mx-auto flex items-center justify-between h-16">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id as Page);
                  setShowMoreMenu(false);
                }}
                className={cn(
                  "flex-1 flex flex-col items-center justify-center gap-1 transition-colors",
                  active ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[9px] uppercase tracking-tighter font-bold">{item.label}</span>
              </button>
            );
          })}
          
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-1 transition-colors",
              showMoreMenu ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            <div className="flex gap-0.5">
              <div className="w-1 h-1 bg-current rounded-full" />
              <div className="w-1 h-1 bg-current rounded-full" />
              <div className="w-1 h-1 bg-current rounded-full" />
            </div>
            <span className="text-[9px] uppercase tracking-tighter font-bold">More</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
