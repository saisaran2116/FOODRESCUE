import React, { useState } from 'react';
import { useFoodRescue } from '../../context/FoodRescueContext';
import { StatusBadge } from '../common/StatusBadge';
import { PriorityBadge } from '../common/PriorityBadge';
import { 
  TrendingUp, 
  Search, 
  Filter, 
  BarChart3, 
  Sparkles, 
  Download, 
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Layers
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { impact, donations, pickups, setActivePage } = useFoodRescue();
  const [tableFilter, setTableFilter] = useState<string>('All');
  const [tableSearch, setTableSearch] = useState<string>('');

  // Weekly meals rescued trend data
  const weeklyData = [
    { day: 'Mon', meals: 1420, donations: 42 },
    { day: 'Tue', meals: 1680, donations: 48 },
    { day: 'Wed', meals: 1910, donations: 56 },
    { day: 'Thu', meals: 1840, donations: 50 },
    { day: 'Fri', meals: 2350, donations: 72 },
    { day: 'Sat', meals: 2890, donations: 88 },
    { day: 'Sun (Today)', meals: impact.meals_rescued % 1000 + 1750, donations: 70 },
  ];

  const maxMeals = Math.max(...weeklyData.map(d => d.meals));

  // Category distribution
  const categories = [
    { name: 'Cooked Meals', percent: 48, portions: '6,160', color: 'bg-[#12372A]' },
    { name: 'Bakery & Grains', percent: 24, portions: '3,080', color: 'bg-[#2E8B57]' },
    { name: 'Fresh Produce', percent: 18, portions: '2,310', color: 'bg-[#FF9F43]' },
    { name: 'Packaged & Dairy', percent: 10, portions: '1,290', color: 'bg-[#DFF5E1]' }
  ];

  // Filtered donation table rows
  const tableRows = donations.filter(d => {
    if (tableFilter !== 'All' && d.status !== tableFilter) return false;
    if (tableSearch.trim()) {
      const q = tableSearch.toLowerCase();
      return (
        d.food_name.toLowerCase().includes(q) ||
        d.donor_name.toLowerCase().includes(q) ||
        d.pickup_location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="py-8 sm:py-14 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
      {/* Top Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-stone-200/80">
        <div>
          <span className="text-xs font-bold tracking-widest text-[#2E8B57] uppercase block mb-1">
            Real-Time Operations & Audit Ledger
          </span>
          <h1 className="text-editorial-section font-extrabold text-[#12372A] leading-tight">
            FOODRESCUE<br />
            <span className="text-[#2E8B57]">IMPACT CENTER.</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-bold text-stone-700 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#2E8B57] animate-pulse"></span>
            Live Regional Feed
          </div>
          <button
            onClick={() => setActivePage('donate')}
            className="px-5 py-2 rounded-full bg-[#FF9F43] hover:bg-[#F38E2C] text-stone-950 font-extrabold text-xs transition-colors flex items-center gap-1"
          >
            Post Surplus <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* TOP SECTION: HUGE STATISTIC + SIDE STATS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Dominant Stat (Left 7 Cols) */}
        <div className="lg:col-span-7 bg-[#12372A] text-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl border border-emerald-900/60 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#2E8B57]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4D3B] text-[#DFF5E1] text-[11px] font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#FF9F43]" />
              PRIMARY DISPATCH BENCHMARK
            </div>

            <div className="text-stat-number font-extrabold text-white tracking-tighter">
              {impact.meals_rescued.toLocaleString()}
            </div>
            <span className="text-sm sm:text-base font-extrabold uppercase tracking-widest text-[#DFF5E1] block mt-1">
              MEALS RESCUED TO DATE
            </span>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-md leading-relaxed font-normal">
              Every portion is tracked from donor packaging to recipient shelter delivery via tamper-proof verification tokens.
            </p>
          </div>

          <div className="pt-8 mt-6 border-t border-emerald-900/80 flex items-center justify-between text-xs text-stone-300">
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#FF9F43]" />
              <strong>+18.4%</strong> rescue volume vs. previous week
            </span>
            <span className="text-[11px] text-emerald-400 font-mono">Updated just now</span>
          </div>
        </div>

        {/* 3 Companion Editorial Stats (Right 5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#6B6B63] block">
                Total Donations Posted
              </span>
              <span className="text-3xl font-black text-[#12372A] mt-1 block">
                {impact.donations_count}
              </span>
              <span className="text-[11px] text-stone-500 font-medium">From restaurants & banquets</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9ED] border border-stone-200 flex items-center justify-center font-bold text-xl text-[#2E8B57]">
              📦
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#6B6B63] block">
                Successful Pickups
              </span>
              <span className="text-3xl font-black text-[#2E8B57] mt-1 block">
                {impact.successful_pickups}
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold">99.4% On-time compliance</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#DFF5E1] flex items-center justify-center font-bold text-xl text-[#12372A]">
              ✓
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#6B6B63] block">
                Active Volunteers
              </span>
              <span className="text-3xl font-black text-[#171717] mt-1 block">
                {impact.active_volunteers}
              </span>
              <span className="text-[11px] text-amber-700 font-semibold">Certified Food Heroes</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center font-bold text-xl text-[#FF9F43]">
              🛵
            </div>
          </div>

        </div>

      </div>

      {/* ASYMMETRIC ANALYTICS CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Large Card: Meals Rescued Over Time (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2E8B57]">
                Weekly Dispatch Velocity
              </span>
              <h3 className="text-lg font-extrabold text-[#12372A] mt-0.5">
                Meals Rescued Over Time
              </h3>
            </div>
            <span className="text-xs font-bold text-stone-500 bg-[#FFF9ED] px-3 py-1 rounded-full border border-stone-200">
              Current Week
            </span>
          </div>

          {/* Minimal Elegant Bar Chart with FoodRescue Colors */}
          <div className="pt-4">
            <div className="h-56 flex items-end justify-between gap-3 sm:gap-6 px-2 border-b border-stone-200 pb-2">
              {weeklyData.map((d, i) => {
                const heightPct = Math.round((d.meals / maxMeals) * 100);
                const isToday = i === weeklyData.length - 1;

                return (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-white bg-[#12372A] px-2 py-1 rounded-md pointer-events-none mb-1 shadow whitespace-nowrap">
                      {d.meals.toLocaleString()} meals
                    </div>

                    {/* Bar */}
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-2xl transition-all duration-500 ${
                        isToday
                          ? 'bg-[#FF9F43] shadow-md shadow-orange-950/20'
                          : 'bg-[#12372A] hover:bg-[#2E8B57]'
                      }`}
                    ></div>

                    {/* Label */}
                    <span className={`text-[11px] font-bold mt-2 ${isToday ? 'text-[#12372A] font-black' : 'text-stone-400'}`}>
                      {d.day.slice(0, 3)}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between text-xs text-stone-500 pt-3">
              <span>Peak rescue volume on weekend evenings</span>
              <span className="font-bold text-[#12372A]">Avg: 1,834 meals / day</span>
            </div>
          </div>
        </div>

        {/* Right Card: Category Breakdown & Volunteer Activity (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-[2.5rem] p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2E8B57]">
              Nutrition Distribution
            </span>
            <h3 className="text-lg font-extrabold text-[#12372A] mt-0.5">
              Food Category Breakdown
            </h3>
          </div>

          <div className="space-y-4">
            {categories.map((c) => (
              <div key={c.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-800">{c.name}</span>
                  <span className="text-stone-500 font-semibold">{c.portions} meals ({c.percent}%)</span>
                </div>
                {/* Clean Progress bar */}
                <div className="w-full h-3 rounded-full bg-stone-100 overflow-hidden">
                  <div
                    style={{ width: `${c.percent}%` }}
                    className={`h-full rounded-full ${c.color}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9ED] border border-stone-200/80 text-xs text-stone-600 space-y-1">
            <span className="font-extrabold text-[#12372A] block">Zero Waste Policy</span>
            <p className="leading-relaxed">
              Uncooked raw perishables are routed immediately to community kitchen cold storage facilities.
            </p>
          </div>
        </div>

      </div>

      {/* BOTTOM SECTION: LARGE LIVE DONATION TABLE */}
      <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2E8B57]">
              Real-Time Ledger
            </span>
            <h3 className="text-xl font-extrabold text-[#12372A] mt-0.5">
              Live Donation & Pickup Dispatch Activity
            </h3>
          </div>

          {/* Table Search & Status Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Filter table..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-[#FFF9ED] border border-stone-200 outline-none w-40 sm:w-48 text-[#171717]"
              />
            </div>

            <select
              value={tableFilter}
              onChange={(e) => setTableFilter(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl bg-[#FFF9ED] border border-stone-200 font-bold text-stone-800 outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="AVAILABLE">AVAILABLE</option>
              <option value="PICKUP">PICKUP</option>
              <option value="COLLECTED">COLLECTED</option>
              <option value="DELIVERED">DELIVERED</option>
            </select>
          </div>
        </div>

        {/* Clean Spacious Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 font-extrabold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Donation Listing</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Assigned Volunteer</th>
                <th className="py-3 px-4">Pickup Deadline</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {tableRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-stone-400">
                    No matching records found.
                  </td>
                </tr>
              ) : (
                tableRows.map((row) => (
                  <tr key={row.id} className="hover:bg-[#FFF9ED]/60 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={row.image_url}
                          alt={row.food_name}
                          className="w-10 h-10 rounded-xl object-cover border border-stone-200 flex-shrink-0"
                        />
                        <div>
                          <span className="font-extrabold text-[#12372A] block text-xs">
                            {row.food_name}
                          </span>
                          <span className="text-[10px] text-stone-500 font-medium">
                            {row.donor_name} • {row.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-extrabold text-[#171717]">
                      {row.quantity} {row.unit}
                    </td>

                    <td className="py-4 px-4 text-stone-600 max-w-xs truncate">
                      {row.pickup_location}
                    </td>

                    <td className="py-4 px-4 font-semibold text-stone-700">
                      {row.assigned_volunteer?.name || (
                        <span className="text-stone-400 font-normal italic">Awaiting acceptance</span>
                      )}
                    </td>

                    <td className="py-4 px-4 text-[#FF9F43] font-bold">
                      {row.available_until}
                    </td>

                    <td className="py-4 px-4 text-right">
                      <StatusBadge status={row.status} size="sm" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
