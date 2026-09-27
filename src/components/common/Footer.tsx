import React from 'react';
import { useFoodRescue } from '../../context/FoodRescueContext';
import { Heart, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, impact } = useFoodRescue();

  return (
    <footer className="mt-20 border-t border-stone-200/80 bg-[#12372A] text-white pt-16 pb-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-emerald-900/60">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#DFF5E1] text-[#12372A] flex items-center justify-center font-extrabold text-xl">
                FR
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">FOODRESCUE</span>
            </div>
            <p className="text-stone-300 text-sm max-w-sm leading-relaxed">
              Connect surplus food with people who can use it before it goes to waste. Powered by real-time community coordination and intelligent matching.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1B4D3B] text-[#DFF5E1] text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E8B57]" />
                Food Safety Verified Workflow
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF9F43]">Platform</h4>
            <ul className="space-y-2 text-xs text-stone-300 font-medium">
              <li>
                <button onClick={() => setActivePage('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('donate')} className="hover:text-white transition-colors">
                  Donate Food
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('find')} className="hover:text-white transition-colors">
                  Find Food Map
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('volunteer')} className="hover:text-white transition-colors">
                  Volunteer Portal
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('dashboard')} className="hover:text-white transition-colors">
                  Impact Center
                </button>
              </li>
            </ul>
          </div>

          {/* Communities Served */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#DFF5E1]">Stakeholders</h4>
            <ul className="space-y-1.5 text-xs text-stone-300">
              <li>Restaurants & Cafes</li>
              <li>Hotels & Banquets</li>
              <li>College Canteens & Hostels</li>
              <li>Event Organizers</li>
              <li>Shelters & Community NGOs</li>
              <li>Certified Volunteers</li>
            </ul>
          </div>

          {/* Live Impact Counters */}
          <div className="md:col-span-3 space-y-3 bg-[#0E2C22] p-5 rounded-3xl border border-emerald-900/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Total Community Impact</h4>
            <div className="space-y-2">
              <div>
                <span className="text-2xl font-extrabold text-white block">
                  {impact.meals_rescued.toLocaleString()}+
                </span>
                <span className="text-[11px] text-stone-400 uppercase tracking-wider">Meals Rescued</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-900/60">
                <div>
                  <span className="text-sm font-bold text-[#DFF5E1] block">{impact.successful_pickups}</span>
                  <span className="text-[10px] text-stone-400">Pickups</span>
                </div>
                <div>
                  <span className="text-sm font-bold text-[#FF9F43] block">{impact.active_volunteers}</span>
                  <span className="text-[10px] text-stone-400">Volunteers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© 2026 FoodRescue Initiative. Social impact technology for zero hunger.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-stone-300">
              Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> for community impact
            </span>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white flex items-center gap-1">
              Back to top <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
