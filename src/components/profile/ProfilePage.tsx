import React, { useState } from 'react';
import { useFoodRescue } from '../../context/FoodRescueContext';
import { USERS } from '../../services/dataService';
import { UserRole } from '../../types';
import { 
  Award, 
  MapPin, 
  CheckCircle, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight,
  Heart
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentUser, setUserRole, setActivePage } = useFoodRescue();
  const [profileTab, setProfileTab] = useState<UserRole>(currentUser.role);

  const activeProfile = USERS[profileTab] || currentUser;

  return (
    <div className="py-8 sm:py-14 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
      {/* Switch profile view for interactive review */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/80">
        <div>
          <span className="text-xs font-bold tracking-widest text-[#2E8B57] uppercase block mb-1">
            Community Identity & Badges
          </span>
          <h1 className="text-editorial-section font-extrabold text-[#12372A] leading-tight">
            IMPACT PROFILE.
          </h1>
        </div>

        {/* Tab pills to preview Donor vs Volunteer profile */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white border border-stone-200/90 shadow-sm self-start sm:self-auto">
          <button
            onClick={() => {
              setProfileTab('donor');
              setUserRole('donor');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              profileTab === 'donor'
                ? 'bg-[#12372A] text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Donor Profile
          </button>
          <button
            onClick={() => {
              setProfileTab('volunteer');
              setUserRole('volunteer');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              profileTab === 'volunteer'
                ? 'bg-[#12372A] text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Volunteer Profile
          </button>
          <button
            onClick={() => {
              setProfileTab('ngo');
              setUserRole('ngo');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              profileTab === 'ngo'
                ? 'bg-[#12372A] text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            NGO Profile
          </button>
        </div>
      </div>

      {/* LARGE PROFILE HERO SECTION */}
      <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-stone-200/90 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-stone-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative">
              <img
                src={activeProfile.avatar}
                alt={activeProfile.name}
                className="w-24 sm:w-28 h-24 sm:h-28 rounded-3xl object-cover border-4 border-[#FFF9ED] shadow-md ring-2 ring-stone-200"
              />
              <span className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#2E8B57] text-white flex items-center justify-center font-bold text-xs shadow">
                ✓
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-[#12372A] text-white">
                  {activeProfile.role}
                </span>
                {activeProfile.impact_stats?.badge && (
                  <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#FF9F43] text-stone-950 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 fill-current" />
                    {activeProfile.impact_stats.badge}
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12372A] tracking-tight">
                {activeProfile.name}
              </h2>

              <p className="text-xs text-stone-500 font-medium">
                {activeProfile.organization || 'Independent Certified Community Responder'} • Member since Jan 2026
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActivePage(activeProfile.role === 'donor' ? 'donate' : 'volunteer')}
              className="px-6 py-3 rounded-full bg-[#12372A] hover:bg-[#1B4D3B] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
            >
              <span>{activeProfile.role === 'donor' ? 'Post New Donation' : 'Find Pickups'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ROLE SPECIFIC IMPACT METRICS */}
        <div className="pt-8">
          <span className="text-xs font-bold uppercase tracking-widest text-stone-400 block mb-6">
            Verified Lifetime Impact Record
          </span>

          {profileTab === 'donor' ? (
            /* DONOR STATS */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-[#FFF9ED] border border-stone-200/80 space-y-1">
                <span className="text-xs font-bold text-stone-500 uppercase">Total Donations</span>
                <span className="text-3xl font-black text-[#12372A] block">48</span>
                <span className="text-[11px] text-stone-500">Regular culinary donor</span>
              </div>
              <div className="p-6 rounded-3xl bg-[#FFF9ED] border border-stone-200/80 space-y-1">
                <span className="text-xs font-bold text-stone-500 uppercase">Meals Rescued</span>
                <span className="text-3xl font-black text-[#2E8B57] block">1,420</span>
                <span className="text-[11px] text-stone-500">Fed to local community</span>
              </div>
              <div className="p-6 rounded-3xl bg-[#FFF9ED] border border-stone-200/80 space-y-1">
                <span className="text-xs font-bold text-stone-500 uppercase">Successful Pickups</span>
                <span className="text-3xl font-black text-[#12372A] block">45</span>
                <span className="text-[11px] text-stone-500">Zero transit wastage</span>
              </div>
              <div className="p-6 rounded-3xl bg-[#DFF5E1] border border-[#BCE8C1] space-y-1">
                <span className="text-xs font-bold text-[#12372A] uppercase">Impact Level</span>
                <span className="text-3xl font-black text-[#12372A] block">85%</span>
                <span className="text-[11px] text-emerald-800 font-semibold">Tier 1 Certified Donor</span>
              </div>
            </div>
          ) : (
            /* VOLUNTEER STATS */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-[#FFF9ED] border border-stone-200/80 space-y-1">
                <span className="text-xs font-bold text-stone-500 uppercase">Pickups Completed</span>
                <span className="text-3xl font-black text-[#12372A] block">26</span>
                <span className="text-[11px] text-stone-500">100% on-time rating</span>
              </div>
              <div className="p-6 rounded-3xl bg-[#FFF9ED] border border-stone-200/80 space-y-1">
                <span className="text-xs font-bold text-stone-500 uppercase">Meals Delivered</span>
                <span className="text-3xl font-black text-[#2E8B57] block">740</span>
                <span className="text-[11px] text-stone-500">Handed to shelter staff</span>
              </div>
              <div className="p-6 rounded-3xl bg-[#FFF9ED] border border-stone-200/80 space-y-1">
                <span className="text-xs font-bold text-stone-500 uppercase">Distance Covered</span>
                <span className="text-3xl font-black text-[#FF9F43] block">48 km</span>
                <span className="text-[11px] text-stone-500">Eco scooter transit</span>
              </div>
              <div className="p-6 rounded-3xl bg-[#DFF5E1] border border-[#BCE8C1] space-y-1">
                <span className="text-xs font-bold text-[#12372A] uppercase">Volunteer Badge</span>
                <span className="text-2xl font-black text-[#12372A] block">FOOD HERO</span>
                <span className="text-[11px] text-emerald-800 font-semibold">Top 5% regional courier</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RECENT ACTIVITY TIMELINE */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-stone-200/90 shadow-sm space-y-6">
        <h3 className="font-extrabold text-lg text-[#12372A]">Recent Activity & Verified Dispatches</h3>
        
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#FFF9ED] border border-stone-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#DFF5E1] text-[#12372A] flex items-center justify-center font-bold text-xs">
                ✓
              </span>
              <div>
                <h4 className="font-bold text-sm text-[#12372A]">Vegetarian Thali Tray Dispatch</h4>
                <p className="text-xs text-stone-500">40 Portions delivered to Hope Shelter • 2 hours ago</p>
              </div>
            </div>
            <span className="text-xs font-extrabold text-[#2E8B57]">COMPLETED</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9ED] border border-stone-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#DFF5E1] text-[#12372A] flex items-center justify-center font-bold text-xs">
                ✓
              </span>
              <div>
                <h4 className="font-bold text-sm text-[#12372A]">Artisan Bakery Crates</h4>
                <p className="text-xs text-stone-500">65 Boxes delivered to Sunrise Haven • Yesterday</p>
              </div>
            </div>
            <span className="text-xs font-extrabold text-[#2E8B57]">COMPLETED</span>
          </div>
        </div>
      </div>
    </div>
  );
};
