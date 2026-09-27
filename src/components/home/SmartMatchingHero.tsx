import React, { useState } from 'react';
import { Cpu, ArrowDown, CheckCircle, Sparkles, MapPin, Building, ShieldCheck, HeartHandshake, UserCheck } from 'lucide-react';
import { useFoodRescue } from '../../context/FoodRescueContext';

export const SmartMatchingHero: React.FC = () => {
  const { setActivePage, runDemoStep } = useFoodRescue();
  const [activeTab, setActiveTab] = useState<'live' | 'params'>('live');

  return (
    <section id="smart-matching-section" className="px-4 sm:px-8 py-16 sm:py-24 max-w-7xl mx-auto">
      {/* Dark Forest Green Visual Container */}
      <div className="relative rounded-[2.5rem] bg-[#12372A] text-white p-8 sm:p-14 lg:p-16 shadow-2xl overflow-hidden border border-emerald-900/60">
        
        {/* Glow ambient spots */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#2E8B57]/25 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4D3B] text-[#DFF5E1] text-[11px] font-bold tracking-widest uppercase mb-4 border border-[#2E8B57]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#FF9F43]" />
            INTELLIGENT ROUTING & ALLOCATION
          </div>
          <h2 className="text-editorial-section font-extrabold text-white leading-tight">
            THE RIGHT FOOD.<br />
            THE RIGHT PLACE.<br />
            <span className="text-[#DFF5E1]">AT THE RIGHT TIME.</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl font-normal">
            Surplus food degrades by the hour. FoodRescue's smart algorithmic engine evaluates distance, food categorization, perishability window, and real-time shelter capacity to connect donations with the optimal recipient instantly.
          </p>
        </div>

        {/* Visual Matching Interface */}
        <div className="relative z-10 bg-[#0E2C22] p-6 sm:p-10 rounded-[2rem] border border-emerald-900/80 shadow-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* 1. DONOR BLOCK (Left 4 cols) */}
            <div className="lg:col-span-4 bg-white text-stone-900 p-6 rounded-3xl shadow-xl space-y-4 border border-stone-200">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold tracking-widest text-[#2E8B57] uppercase bg-[#DFF5E1] px-2.5 py-0.5 rounded-full">
                  SURPLUS DONOR
                </span>
                <span className="text-xs text-stone-400 font-bold">Origin Node</span>
              </div>

              <div>
                <h4 className="text-lg font-extrabold text-[#12372A]">Green Leaf Restaurant</h4>
                <p className="text-xs text-stone-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#2E8B57]" /> College Road, City Hub (2.4 km)
                </p>
              </div>

              <div className="p-3.5 bg-[#FFF9ED] rounded-2xl border border-stone-200/80 space-y-1">
                <span className="text-xs font-bold text-[#171717] block">50 Vegetarian Meals</span>
                <div className="flex items-center justify-between text-[11px] text-stone-600">
                  <span>Portions: 50 Boxes</span>
                  <span className="text-[#FF9F43] font-bold">Expires: 8:30 PM</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                <span className="font-medium">Quality Check: Verified ✓</span>
                <span className="text-emerald-700 font-bold">Priority: Soon</span>
              </div>
            </div>

            {/* 2. AI MATCHING ENGINE (Center 4 cols) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center px-2 py-4">
              <div className="w-16 h-16 rounded-3xl bg-[#2E8B57] text-white flex items-center justify-center shadow-lg shadow-emerald-950/40 mb-3 border-2 border-emerald-300/30">
                <Cpu className="w-8 h-8 text-[#DFF5E1] animate-pulse" />
              </div>

              <span className="text-xs font-extrabold tracking-wider uppercase text-[#DFF5E1]">
                AI MATCHING ENGINE
              </span>
              <p className="text-[11px] text-stone-300 mt-1 max-w-xs">
                Computing multi-variable compatibility: Distance • Dietary Type • Capacity • Transit Window
              </p>

              {/* Dynamic Arrow Indicator */}
              <div className="mt-4 flex items-center gap-2 text-[#FF9F43] font-mono text-xs">
                <span className="animate-pulse">●</span>
                <span>Optimizing match vectors...</span>
              </div>
            </div>

            {/* 3. MATCHED RECIPIENTS & VOLUNTEER (Right 4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#DFF5E1] block mb-1">
                Target Matches Computed
              </span>

              {/* Match 1: Top NGO */}
              <div className="bg-white text-stone-900 p-4 rounded-2xl shadow-lg border-2 border-[#2E8B57] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-[#2E8B57]" />
                    <h5 className="font-extrabold text-sm text-[#12372A]">Hope Community Kitchen</h5>
                  </div>
                  <span className="text-[11px] text-stone-500 block mt-0.5">
                    2.1 km away • Capacity: 60/100 meals
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-[#2E8B57] block">94%</span>
                  <span className="text-[9px] font-bold text-stone-400 uppercase">Match Score</span>
                </div>
              </div>

              {/* Match 2: Secondary NGO */}
              <div className="bg-white/90 text-stone-900 p-3.5 rounded-2xl shadow-sm border border-stone-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-stone-600" />
                    <h5 className="font-bold text-xs text-stone-800">Sunrise Children Haven</h5>
                  </div>
                  <span className="text-[10px] text-stone-500 block">
                    3.9 km away • Capacity: 80 meals
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-stone-700 block">84%</span>
                  <span className="text-[9px] text-stone-400">Match</span>
                </div>
              </div>

              {/* Volunteer Courier Dispatch */}
              <div className="bg-[#FFF9ED] text-stone-900 p-3.5 rounded-2xl shadow-sm border border-amber-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#12372A] text-white flex items-center justify-center font-bold text-xs">
                    M
                  </div>
                  <div>
                    <h6 className="font-bold text-xs text-[#12372A]">Volunteer Mahesh</h6>
                    <span className="text-[10px] text-[#2E8B57] font-semibold">1.2 km from donor • Ready</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-[#DFF5E1] text-[#12372A] px-2 py-0.5 rounded-full">
                  Auto-Dispatched
                </span>
              </div>
            </div>

          </div>

          {/* Verification Footnote */}
          <div className="mt-8 pt-6 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2E8B57]" />
              <span>Assistance matching algorithm balances equitable distribution across local shelters.</span>
            </div>
            <button
              onClick={() => {
                setActivePage('volunteer');
                runDemoStep(4);
              }}
              className="px-4 py-2 rounded-full bg-[#FF9F43] hover:bg-[#F38E2C] text-stone-950 font-bold transition-colors"
            >
              Test Dispatch Acceptance →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
