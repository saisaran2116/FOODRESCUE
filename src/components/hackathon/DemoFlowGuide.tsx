import React, { useState } from 'react';
import { useFoodRescue } from '../../context/FoodRescueContext';
import { Sparkles, CheckCircle2, ChevronRight, RotateCcw, Play, Check, ChevronDown, ChevronUp } from 'lucide-react';

export const DemoFlowGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { 
    demoStep, 
    runDemoStep, 
    createDonation, 
    acceptDonation, 
    updatePickupStep, 
    pickups, 
    donations,
    resetDemoData 
  } = useFoodRescue();

  const steps = [
    {
      num: 1,
      title: 'Restaurant Posts Donation',
      desc: 'Green Leaf Restaurant posts "50 Vegetarian Meals", available until 8:30 PM.',
      actionLabel: 'Go to Donate',
      execute: () => {
        runDemoStep(1);
      }
    },
    {
      num: 2,
      title: 'Appears in Find Food',
      desc: 'Donation lists in real-time with portions, countdown, and map coordinates.',
      actionLabel: 'View in Find Food',
      execute: () => {
        runDemoStep(2);
      }
    },
    {
      num: 3,
      title: 'AI Smart Matching',
      desc: 'AI engine calculates top match: Hope Community Kitchen (94% compatibility).',
      actionLabel: 'Inspect AI Match',
      execute: () => {
        runDemoStep(3);
      }
    },
    {
      num: 4,
      title: 'Volunteer Accepts Pickup',
      desc: 'Volunteer Mahesh claims pickup from College Road hub.',
      actionLabel: 'Accept as Volunteer',
      execute: () => {
        // If there's an available donation, auto accept it or guide
        const avail = donations.find(d => d.status === 'AVAILABLE');
        if (avail) {
          acceptDonation(avail.id, 'Mahesh (Food Hero)');
        }
        runDemoStep(4);
      }
    },
    {
      num: 5,
      title: 'Progressive Status Tracking',
      desc: 'Accepted → Going to Pickup → Food Collected → Delivered.',
      actionLabel: 'Advance to Delivered',
      execute: () => {
        const activePickup = pickups[0];
        if (activePickup) {
          updatePickupStep(activePickup.id, 4);
        }
        runDemoStep(5);
      }
    },
    {
      num: 6,
      title: 'Dashboard Real-Time Update',
      desc: 'Impact Center jumps from 12,840 to 12,890 Meals Rescued.',
      actionLabel: 'Open Dashboard',
      execute: () => {
        runDemoStep(6);
      }
    },
    {
      num: 7,
      title: 'Impact Page Reflection',
      desc: 'Environmental CO2 & water metrics update with community milestones.',
      actionLabel: 'View Impact Page',
      execute: () => {
        runDemoStep(7);
      }
    }
  ];

  return (
    <aside 
      aria-label="Hackathon Demo Walkthrough Guide"
      className="fixed bottom-4 right-4 z-40 max-w-sm w-full bg-[#12372A] text-white rounded-3xl shadow-2xl border border-emerald-900/60 overflow-hidden font-sans"
    >
      {/* Header */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="p-3.5 px-5 flex items-center justify-between cursor-pointer bg-[#0E2C22] hover:bg-[#164333] transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF9F43] animate-ping"></span>
          <span className="text-xs font-extrabold tracking-wider uppercase text-[#DFF5E1]">
            Hackathon Demo Guide
          </span>
          <span className="text-[10px] bg-[#2E8B57] text-white px-2 py-0.5 rounded-full font-bold">
            7 Steps
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-stone-300">
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </div>
      </div>

      {isOpen && (
        <div className="p-4 bg-[#12372A]/95 text-stone-200">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-800/60 text-xs">
            <span className="text-stone-300">
              Interactive end-to-end workflow verification
            </span>
            <button
              onClick={resetDemoData}
              title="Reset initial state"
              className="flex items-center gap-1 text-[11px] text-[#FF9F43] hover:text-white transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Steps List */}
          <div className="mt-3 space-y-2 max-h-72 overflow-y-auto pr-1">
            {steps.map((st) => {
              const isCurrent = demoStep === st.num;
              const isCompleted = demoStep > st.num;
              return (
                <div
                  key={st.num}
                  className={`p-2.5 rounded-2xl border transition-all text-xs ${
                    isCurrent
                      ? 'bg-[#1B4D3B] border-[#2E8B57] text-white shadow-md'
                      : isCompleted
                      ? 'bg-[#0E2C22]/80 border-emerald-900/60 text-emerald-300'
                      : 'bg-[#0E2C22]/40 border-emerald-950 text-stone-400'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isCompleted ? 'bg-[#2E8B57] text-white' : isCurrent ? 'bg-[#FF9F43] text-stone-900' : 'bg-emerald-900 text-stone-300'
                      }`}>
                        {isCompleted ? <Check className="w-3 h-3" /> : st.num}
                      </span>
                      <span className="font-bold text-white text-[12px]">{st.title}</span>
                    </div>

                    <button
                      onClick={st.execute}
                      className="px-2.5 py-1 rounded-full bg-[#2E8B57] hover:bg-[#3CA368] text-white text-[10px] font-bold transition-transform active:scale-95 flex items-center gap-1 flex-shrink-0"
                    >
                      {st.actionLabel}
                      <ChevronRight className="w-2.5 h-2.5" />
                    </button>
                  </div>
                  <p className="text-[11px] text-stone-300 mt-1 pl-7 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-3 pt-2.5 border-t border-emerald-800/60 flex items-center justify-between text-[11px]">
            <span className="text-emerald-300/80">Step {demoStep} of 7</span>
            <button
              onClick={() => {
                const next = demoStep >= 7 ? 1 : demoStep + 1;
                steps[next - 1].execute();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF9F43] hover:bg-[#F38E2C] text-stone-950 font-extrabold text-[11px] transition-colors"
            >
              <Play className="w-3 h-3 fill-current" />
              {demoStep === 0 ? 'Start Walkthrough' : demoStep === 7 ? 'Replay Walkthrough' : `Next: Step ${demoStep + 1}`}
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
