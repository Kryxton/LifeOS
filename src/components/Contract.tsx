import { FileText } from 'lucide-react';
import { AppState } from '../types';

interface ContractProps {
  state: AppState;
  updateContract: (fields: Partial<AppState['contract']>) => void;
}

export default function Contract({ state, updateContract }: ContractProps) {
  const { contract } = state;

  return (
    <div className="space-y-12 pb-20 max-w-xl mx-auto text-zinc-300">
      <header className="space-y-1 border-b border-zinc-900 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-4 h-4 text-zinc-500" />
          <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">Legal Foundation</h2>
        </div>
        <h1 className="text-3xl font-bold tracking-tighter text-zinc-100 uppercase">Life OS Personal Contract</h1>
        <p className="text-[10px] text-zinc-500 font-mono">VERSION 1.0</p>
      </header>

      <section className="grid grid-cols-1 gap-6 pt-4">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest">Name</label>
          <input 
            type="text" 
            value={contract.name}
            onChange={(e) => updateContract({ name: e.target.value })}
            className="bg-transparent border-b border-zinc-800 py-1 focus:outline-none focus:border-zinc-100 transition-colors text-zinc-100"
            placeholder="Enter full name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest">Date</label>
          <input 
            type="text" 
            value={contract.date}
            onChange={(e) => updateContract({ date: e.target.value })}
            className="bg-transparent border-b border-zinc-800 py-1 focus:outline-none focus:border-zinc-100 transition-colors text-zinc-100"
            placeholder="Enter date"
          />
        </div>
      </section>

      <section className="space-y-6">
        <p className="text-lg italic font-medium text-zinc-100 leading-snug">
          I am 16 years old. <br />
          This is the age where most people waste their potential. <br />
          I choose not to.
        </p>
        <p className="text-sm">This contract defines the standards I will live by.</p>
      </section>

      <section className="space-y-4">
        <h3 className="font-black text-zinc-100 uppercase tracking-widest border-l-2 border-zinc-100 pl-4 py-1">SECTION 1 — CORE IDENTITY</h3>
        <div className="space-y-4 text-sm leading-relaxed">
          <p className="font-bold text-zinc-100 underline decoration-zinc-800 underline-offset-4">I am building:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>An athletic body.</li>
            <li>A disciplined mind.</li>
            <li>A life free from addiction.</li>
          </ul>
          <p className="font-bold text-zinc-100 underline decoration-zinc-800 underline-offset-4">I accept that:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Discipline is more important than comfort.</li>
            <li>Long-term growth is more important than short-term dopamine.</li>
            <li>My future self depends on my daily actions.</li>
          </ul>
          <p className="pt-2 italic">From today forward, I act like the person I want to become.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-black text-zinc-100 uppercase tracking-widest border-l-2 border-zinc-100 pl-4 py-1">SECTION 2 — NON-NEGOTIABLE RULES</h3>
        <div className="space-y-6 text-sm">
          <div>
            <p className="font-black text-zinc-100 uppercase mb-1">1. Porn is permanently banned.</p>
            <p>Not reduced. Not controlled. Eliminated.</p>
          </div>
          <div>
            <p className="font-black text-zinc-100 uppercase mb-1">2. Gambling is permanently banned.</p>
            <p>Memecoins are permanently banned. There is no “just this once”.</p>
          </div>
          <div>
            <p className="font-black text-zinc-100 uppercase mb-1">3. Investment rule:</p>
            <p>Maximum 80€ per month into long-term Solana only. No trading. No emotional moves.</p>
          </div>
          <div>
            <p className="font-black text-zinc-100 uppercase mb-1">4. Netflix:</p>
            <ul className="list-disc pl-5 mt-1">
              <li>Weekdays: banned.</li>
              <li>Weekends: max 2 hours evening.</li>
            </ul>
          </div>
          <div>
            <p className="font-black text-zinc-100 uppercase mb-1">5. Phone:</p>
            <p>No phone before learning is completed.</p>
          </div>
          <div>
            <p className="font-black text-zinc-100 uppercase mb-1">6. I log my days honestly.</p>
            <p>No lying to the system. No editing past failures.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-black text-zinc-100 uppercase tracking-widest border-l-2 border-zinc-100 pl-4 py-1">SECTION 3 — RELAPSE CLAUSE</h3>
        <div className="space-y-4 text-sm leading-relaxed">
          <p>If I relapse (porn or gambling):</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>I reset the streak immediately.</li>
            <li>I log it honestly.</li>
            <li>I write what triggered it.</li>
            <li>I do not spiral.</li>
            <li>I return to the rules the same day.</li>
          </ul>
          <p className="italic pt-2">A relapse is a mistake. Quitting the system would be weakness.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-black text-zinc-100 uppercase tracking-widest border-l-2 border-zinc-100 pl-4 py-1">SECTION 4 — EXECUTION STANDARD</h3>
        <div className="space-y-4 text-sm">
          <p className="font-bold text-zinc-100">Daily minimum standard:</p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400">
            <li>Train or move my body.</li>
            <li>Complete learning.</li>
            <li>Maintain hygiene and posture.</li>
            <li>Protect my dopamine system.</li>
            <li>Reflect honestly.</li>
          </ul>
          <p className="pt-2 font-bold text-zinc-100">I understand:</p>
          <p>Motivation will disappear. Boredom will appear. Urges will appear. That is expected.</p>
          <p className="font-black text-zinc-100 underline decoration-zinc-700 underline-offset-4">Discipline means acting correctly anyway.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-black text-zinc-100 uppercase tracking-widest border-l-2 border-zinc-100 pl-4 py-1">SECTION 5 — FUTURE VISION</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
          <div className="space-y-3">
            <p className="font-black text-green-500 uppercase tracking-tighter">IF I FOLLOW THIS SYSTEM (2–3 YEARS):</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>I will have an elite body.</li>
              <li>I will be mentally strong.</li>
              <li>I will not be controlled by addiction.</li>
              <li>I will be ahead of most people my age.</li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="font-black text-red-500 uppercase tracking-tighter">IF I IGNORE THIS:</p>
            <ul className="list-disc pl-5 space-y-1 opacity-60">
              <li>I will stay average.</li>
              <li>I will stay distracted.</li>
              <li>I will regret it later.</li>
            </ul>
          </div>
        </div>
        <p className="pt-4 text-center text-zinc-100 font-bold uppercase tracking-widest">Today I choose growth.</p>
      </section>

      <section className="space-y-6 pt-12 border-t border-zinc-900">
        <h3 className="font-black text-zinc-100 uppercase tracking-widest text-center">FINAL DECLARATION</h3>
        <div className="space-y-2 text-center text-sm uppercase tracking-tighter font-bold">
          <p>I do not negotiate with weakness.</p>
          <p>I do not rationalize addiction.</p>
          <p>I do not lie to myself.</p>
          <p className="text-lg text-zinc-100 pt-2">I am responsible for my future.</p>
        </div>

        <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest">Signed</label>
            <input 
              type="text" 
              value={contract.signature}
              onChange={(e) => updateContract({ signature: e.target.value })}
              className="w-full bg-transparent border-b border-zinc-800 py-4 focus:outline-none focus:border-zinc-100 font-serif italic text-2xl"
              placeholder="Your Signature"
            />
            <p className="text-[9px] text-zinc-700 italic font-mono">(Electronic Signature Verification)</p>
          </div>
          <div className="space-y-2 flex flex-col justify-end">
            <div className="border-b border-zinc-800 py-4 text-zinc-100 text-sm">
              {contract.date || "_______________________"}
            </div>
            <label className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest">Date</label>
          </div>
        </div>
      </section>

      <footer className="pt-20 text-center opacity-20">
        <p className="text-[10px] uppercase tracking-[0.8em]">End of Life OS Contract v1.0</p>
      </footer>
    </div>
  );
}
