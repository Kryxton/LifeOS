import { useState } from 'react';
import { AppState, WeeklyReview } from '../types';
import { ClipboardList, Plus, ChevronRight, MessageSquare } from 'lucide-react';
import { format, startOfWeek } from 'date-fns';

interface ReviewsProps {
  state: AppState;
  addWeeklyReview: (review: Omit<WeeklyReview, 'id'>) => void;
}

export default function Reviews({ state, addWeeklyReview }: ReviewsProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    improved: '',
    relapseRisk: '',
    distractions: '',
    trainingProgress: '',
    nextWeekFocus: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWeeklyReview({
      ...formData,
      weekStarting: startOfWeek(new Date()).toISOString()
    });
    setFormData({ improved: '', relapseRisk: '', distractions: '', trainingProgress: '', nextWeekFocus: '' });
    setShowForm(false);
  };

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-start">
        <div className="space-y-1">
          <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">System Optimization</h2>
          <p className="text-xl font-bold tracking-tight uppercase">Weekly Reviews</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="p-3 bg-zinc-100 text-black hover:bg-white transition-colors"
        >
          {showForm ? 'Cancel' : <Plus className="w-5 h-5" />}
        </button>
      </header>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-zinc-950 border border-zinc-900 p-6 space-y-6">
          {[
            { id: 'improved', label: 'What improved this week?' },
            { id: 'relapseRisk', label: 'Where did I relapse or almost relapse?' },
            { id: 'distractions', label: 'What distracted me?' },
            { id: 'trainingProgress', label: 'Training progress?' },
            { id: 'nextWeekFocus', label: 'Focus for next week?' },
          ].map((field) => (
            <div key={field.id} className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">{field.label}</label>
              <textarea 
                required
                className="w-full bg-black border border-zinc-900 p-3 text-sm focus:border-zinc-100 min-h-[100px]"
                value={(formData as any)[field.id]}
                onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
              />
            </div>
          ))}
          <button 
            type="submit"
            className="w-full bg-zinc-100 text-black py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white"
          >
            Submit Weekly Review
          </button>
        </form>
      )}

      <div className="space-y-4">
        <h3 className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest border-b border-zinc-900 pb-2">Review Archive</h3>
        <div className="space-y-3">
          {(state.weeklyReviews || []).map((review) => (
            <details key={review.id} className="group bg-zinc-950 border border-zinc-900">
              <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                <div className="flex items-center gap-3">
                  <ClipboardList className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm font-bold font-mono">
                    WEEK OF {format(new Date(review.weekStarting), 'MMM d, yyyy')}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-600 transition-transform group-open:rotate-90" />
              </summary>
              <div className="p-4 pt-0 space-y-4 border-t border-zinc-900/50 mt-2">
                {[
                  { label: 'Improvements', value: review.improved },
                  { label: 'Relapse Risks', value: review.relapseRisk },
                  { label: 'Distractions', value: review.distractions },
                  { label: 'Training', value: review.trainingProgress },
                  { label: 'Next Week', value: review.nextWeekFocus },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-[9px] uppercase font-bold text-zinc-600">{item.label}</p>
                    <p className="text-sm text-zinc-300 leading-relaxed">{item.value}</p>
                  </div>
                ))}
              </div>
            </details>
          ))}

          {state.weeklyReviews.length === 0 && !showForm && (
            <div className="text-center py-12 border border-dashed border-zinc-900">
              <MessageSquare className="w-8 h-8 text-zinc-800 mx-auto mb-3" />
              <p className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest">No reviews yet</p>
            </div>
          )}
        </div>
      </div>

      <div className="pb-12" />
    </div>
  );
}
