import { Clock, Zap, CheckCircle2 } from 'lucide-react';

export default function Looks() {
  const sections = [
    {
      title: "MORNING (Upon Waking) – ~5 Min",
      items: [
        {
          label: "LYMPHATIC DRAINAGE (2 Min)",
          details: [
            "Flat hand, gentle strokes from center of face outward towards ears",
            "Then gently down the neck",
            "Ring finger under eyes from inside to outside",
            "Always use with moisturizer/oil"
          ]
        },
        {
          label: "JAWLINE MASSAGE (2 Min)",
          details: [
            "Pull knuckles along jawline upwards",
            "Massage masseter (in front of ear) in circles",
            "Firm but not painful pressure"
          ]
        },
        {
          label: "CHEEK MASSAGE (1 Min)",
          details: [
            "Heel of hand flat on cheek",
            "Circular movements upward and outward",
            "Never pull downwards"
          ]
        }
      ]
    },
    {
      title: "DAILY (Morning or Evening) – ~15 Min",
      items: [
        {
          label: "CHIN TUCKS",
          details: [
            "Push chin straight back (no nodding, just back)",
            "A double chin will form briefly – this is correct",
            "3x10 repetitions, hold for 2 sec"
          ]
        },
        {
          label: "NECK CURL (Lying)",
          details: [
            "Lie flat",
            "Lift chin to chest using only neck muscles",
            "No momentum",
            "3x15 repetitions"
          ]
        },
        {
          label: "NECK EXTENSION",
          details: [
            "Slowly move head backward",
            "Hand provides light counter-pressure",
            "3x10, hold for 10 sec each"
          ]
        },
        {
          label: "ISOMETRIC RESISTANCE (4 Directions)",
          details: [
            "Hand against forehead/back of head/temples – press against it",
            "Do not move, only tension",
            "Hold for 10 sec, 3x per direction"
          ]
        },
        {
          label: "CHIN-STRETCH EXERCISE",
          details: [
            "Stretch chin upwards",
            "Slide lower lip over upper lip",
            "10x, hold for 10 sec each"
          ]
        },
        {
          label: "CHEEKBONE RESISTANCE",
          details: [
            "Wide smile",
            "Fingers lightly on cheeks, provide resistance",
            "3x30 sec"
          ]
        },
        {
          label: "BROWBONE RESISTANCE",
          details: [
            "Press eyebrows down with fingers",
            "Pull them up against the resistance",
            "3x10 sec hold"
          ]
        }
      ]
    },
    {
      title: "ALL DAY – 0 Min extra",
      items: [
        {
          label: "MEWING (Always, everywhere)",
          details: [
            "Press entire tongue flat against roof of mouth",
            "The back part of the tongue must be up too",
            "Mouth closed, teeth touching lightly",
            "Becomes habit after 2-3 weeks"
          ]
        },
        {
          label: "MASTIC GUM CHEWING",
          details: [
            "20-30 min daily",
            "Chew both sides evenly"
          ]
        },
        {
          label: "POSTURE",
          details: [
            "Shoulders back",
            "Ears over shoulders, head straight"
          ]
        }
      ]
    }
  ];

  return (
    <div className="space-y-12 pb-20">
      <header className="space-y-1">
        <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">Physical Appearance</h2>
        <p className="text-xl font-bold tracking-tight uppercase underline decoration-zinc-800 underline-offset-8">Face & Neck Plan</p>
      </header>

      {/* Summary Stats */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-950 border border-zinc-900 p-4 space-y-1">
          <div className="flex items-center gap-2 text-zinc-600">
            <Clock className="w-3 h-3" />
            <span className="text-[9px] uppercase font-bold tracking-widest">Daily Effort</span>
          </div>
          <div className="text-xl font-mono font-bold">~30 MIN</div>
        </div>
        <div className="bg-zinc-950 border border-zinc-900 p-4 space-y-1">
          <div className="flex items-center gap-2 text-zinc-600">
            <Zap className="w-3 h-3" />
            <span className="text-[9px] uppercase font-bold tracking-widest">Status</span>
          </div>
          <div className="text-xl font-mono font-bold text-zinc-100 italic">ASCENDING</div>
        </div>
      </section>

      <div className="space-y-10">
        {sections.map((section, sIdx) => (
          <section key={sIdx} className="space-y-4">
            <h3 className="text-[10px] uppercase font-black text-zinc-500 border-b border-zinc-900 pb-2 tracking-[0.3em]">
              {section.title}
            </h3>
            <div className="space-y-6">
              {section.items.map((item, iIdx) => (
                <div key={iIdx} className="space-y-2 group">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-zinc-700" />
                    <h4 className="text-xs font-bold uppercase tracking-tight text-zinc-200">
                      {item.label}
                    </h4>
                  </div>
                  <ul className="space-y-1.5 pl-5">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="text-[11px] text-zinc-500 leading-relaxed list-none border-l border-zinc-900 pl-3">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="pt-8 border-t border-zinc-900 text-center">
        <p className="text-[9px] text-zinc-700 uppercase font-black tracking-[0.5em]">Be ruthless with your potential</p>
      </section>
    </div>
  );
}
