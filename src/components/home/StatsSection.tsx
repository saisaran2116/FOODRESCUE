import React from 'react';
import { useFoodRescue } from '../../context/FoodRescueContext';
import { TrendingUp, Users, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const { impact } = useFoodRescue();

  const stats = [
    {
      value: `${impact.meals_rescued.toLocaleString()}+`,
      label: 'Meals Rescued',
      sub: 'Nutritious portions distributed to community members',
      icon: <HeartHandshake className="w-5 h-5 text-[#2E8B57]" />
    },
    {
      value: impact.donations_count.toString(),
      label: 'Donations Posted',
      sub: 'From restaurants, event banquets & college canteens',
      icon: <TrendingUp className="w-5 h-5 text-[#FF9F43]" />
    },
    {
      value: impact.successful_pickups.toString(),
      label: 'Successful Pickups',
      sub: 'Completed safely with zero food wastage in transit',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-700" />
    },
    {
      value: impact.active_volunteers.toString(),
      label: 'Active Volunteers',
      sub: 'Verified Food Heroes on local rescue routes',
      icon: <Users className="w-5 h-5 text-[#12372A]" />
    }
  ];

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto border-b border-stone-200/70">
      <div className="mb-8">
        <span className="text-xs font-bold tracking-widest text-[#2E8B57] uppercase block mb-1">
          Measurable Change In Real-Time
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#171717] tracking-tight">
          Food that reaches people, not landfills.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="space-y-3 relative group"
          >
            {/* Subtle separator on desktop between columns */}
            {idx !== 0 && (
              <div className="hidden lg:block absolute -left-6 top-4 bottom-4 w-px bg-stone-200/60"></div>
            )}

            <div className="flex items-center gap-2">
              {stat.icon}
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#6B6B63]">
                {stat.label}
              </span>
            </div>

            <div className="text-stat-number text-[#12372A] font-extrabold tracking-tight transition-transform duration-300 group-hover:translate-x-1">
              {stat.value}
            </div>

            <p className="text-xs sm:text-sm text-[#6B6B63] font-normal leading-relaxed pr-2">
              {stat.sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
