import React from 'react';
import { useFoodRescue } from '../../context/FoodRescueContext';
import { ArrowRight, MapPin, CheckCircle, Sparkles, Heart } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActivePage } = useFoodRescue();

  return (
    <section className="px-4 sm:px-8 pt-4 pb-12 max-w-7xl mx-auto">
      {/* Outer rounded hero container with dark forest green background */}
      <div className="relative rounded-[2.5rem] bg-[#12372A] text-white overflow-hidden p-8 sm:p-14 lg:p-16 shadow-2xl shadow-[#12372A]/15 border border-emerald-900/40">
        
        {/* Subtle background ambient patterns */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2E8B57]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF9F43]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4D3B] border border-[#2E8B57]/40 text-[#DFF5E1] text-[11px] sm:text-xs font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FF9F43] animate-pulse"></span>
              FOODRESCUE • COMMUNITY IMPACT
            </div>

            {/* Dominant Editorial Heading */}
            <h1 className="text-editorial-hero font-extrabold tracking-tight text-white leading-[0.98]">
              SAVE FOOD.<br />
              <span className="text-[#DFF5E1]">SHARE HOPE.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-stone-300 max-w-xl font-normal leading-relaxed">
              Turn surplus food into meaningful community impact by connecting food donors with NGOs and volunteers before good food goes to waste.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActivePage('donate')}
                className="px-8 py-4 rounded-full bg-[#FF9F43] hover:bg-[#F38E2C] text-stone-950 font-extrabold text-sm sm:text-base transition-all transform hover:-translate-y-0.5 shadow-lg shadow-orange-950/20 flex items-center gap-2 group"
              >
                <span>Donate Food</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setActivePage('find')}
                className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 backdrop-blur-sm transition-all"
              >
                Find Food
              </button>
            </div>

            {/* Quick Stakeholder Pills */}
            <div className="pt-4 flex flex-wrap items-center gap-2 text-xs text-stone-400 font-medium">
              <span className="text-stone-400">Connecting:</span>
              <span className="px-2.5 py-1 rounded-full bg-[#1B4D3B]/70 text-[#DFF5E1] border border-emerald-800/40">Restaurants</span>
              <span className="px-2.5 py-1 rounded-full bg-[#1B4D3B]/70 text-[#DFF5E1] border border-emerald-800/40">Hotels</span>
              <span className="px-2.5 py-1 rounded-full bg-[#1B4D3B]/70 text-[#DFF5E1] border border-emerald-800/40">Canteens</span>
              <span className="px-2.5 py-1 rounded-full bg-[#1B4D3B]/70 text-[#DFF5E1] border border-emerald-800/40">NGOs</span>
              <span className="px-2.5 py-1 rounded-full bg-[#1B4D3B]/70 text-[#DFF5E1] border border-emerald-800/40">Volunteers</span>
            </div>
          </div>

          {/* Right Column: Hero Visual with Overlaid Floating UI Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 aspect-[4/4.5] sm:aspect-[4/3.8] lg:aspect-[4/4.8]">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=85"
                alt="Volunteers organizing and distributing fresh meals to community members"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12372A]/70 via-transparent to-black/10"></div>
            </div>

            {/* Floating Card 1: +50 meals rescued */}
            <div className="absolute -top-4 -left-4 sm:-left-6 bg-white text-stone-900 px-4 py-2.5 rounded-2xl shadow-xl border border-stone-100 flex items-center gap-3 animate-bounce [animation-duration:4s]">
              <div className="w-8 h-8 rounded-xl bg-[#DFF5E1] text-[#12372A] flex items-center justify-center font-extrabold text-sm">
                +50
              </div>
              <div>
                <span className="block text-xs font-extrabold text-[#12372A] leading-tight">Meals Rescued</span>
                <span className="block text-[10px] text-stone-500 font-medium">Just 4 mins ago</span>
              </div>
            </div>

            {/* Floating Card 2: 2.1 km Pickup nearby */}
            <div className="absolute top-1/2 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md text-stone-900 px-4 py-3 rounded-2xl shadow-xl border border-stone-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-[#FF9F43]" />
              </div>
              <div>
                <span className="block text-xs font-extrabold text-[#171717] leading-tight">2.1 km away</span>
                <span className="block text-[10px] text-emerald-700 font-bold">Pickup nearby</span>
              </div>
            </div>

            {/* Floating Card 3: Donation matched ✓ */}
            <div className="absolute -bottom-5 left-6 right-6 sm:left-10 sm:right-10 bg-[#12372A]/90 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-xl border border-emerald-700/50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#2E8B57] flex items-center justify-center">
                  <CheckCircle className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white leading-tight">Donation Matched ✓</span>
                  <span className="block text-[10px] text-[#DFF5E1]">Assigned to Hope Community Shelter</span>
                </div>
              </div>
              <span className="text-[11px] font-extrabold text-[#FF9F43] bg-black/20 px-2 py-0.5 rounded-md">94%</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
