import React from 'react';
import { Utensils, Cpu, Bike, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react';
import { useFoodRescue } from '../../context/FoodRescueContext';

export const HowItWorks: React.FC = () => {
  const { setActivePage } = useFoodRescue();

  const steps = [
    {
      step: '01',
      title: 'DONATE',
      desc: 'Restaurants and event banquets post surplus edible meals with portions and pickup deadlines.',
      icon: <Utensils className="w-5 h-5 text-[#2E8B57]" />
    },
    {
      step: '02',
      title: 'MATCH',
      desc: 'Our AI matching engine pairs the donation with the nearest verified NGO based on capacity & urgency.',
      icon: <Cpu className="w-5 h-5 text-[#FF9F43]" />
    },
    {
      step: '03',
      title: 'PICKUP',
      desc: 'Nearby Food Hero volunteer claims the task and heads to the food donor location with insulated boxes.',
      icon: <Bike className="w-5 h-5 text-emerald-700" />
    },
    {
      step: '04',
      title: 'DELIVER',
      desc: 'Meals are verified, transported hygienically, and delivered to community kitchens and shelters.',
      icon: <HeartHandshake className="w-5 h-5 text-amber-700" />
    },
    {
      step: '05',
      title: 'IMPACT',
      desc: 'Real-time counters track meals rescued, CO2 avoided, and families nourished with full audit trail.',
      icon: <Sparkles className="w-5 h-5 text-[#12372A]" />
    }
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div>
          <span className="text-xs font-bold tracking-widest text-[#2E8B57] uppercase block mb-2">
            The FoodRescue Lifecycle
          </span>
          <h2 className="text-editorial-section font-extrabold text-[#12372A] leading-tight">
            FROM SURPLUS<br />
            TO IMPACT.
          </h2>
        </div>
        <p className="text-sm sm:text-base text-[#6B6B63] max-w-md leading-relaxed">
          A seamless 5-stage coordination system turning what would be food waste into fresh meals for vulnerable communities within hours.
        </p>
      </div>

      {/* Horizontal Layout on Desktop / Vertical Timeline on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
        {/* Subtle connecting line for desktop */}
        <div className="hidden md:block absolute top-10 left-8 right-8 h-0.5 bg-stone-200 -z-0"></div>

        {steps.map((st, idx) => (
          <div 
            key={idx} 
            className="relative z-10 bg-white/70 hover:bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between group"
          >
            <div>
              {/* Step Number & Icon */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black tracking-widest text-stone-400 group-hover:text-[#2E8B57] transition-colors">
                  {st.step}
                </span>
                <div className="w-10 h-10 rounded-2xl bg-[#FFF9ED] border border-stone-200 flex items-center justify-center">
                  {st.icon}
                </div>
              </div>

              <h3 className="font-extrabold text-base text-[#12372A] tracking-tight mb-2">
                {st.title}
              </h3>

              <p className="text-xs text-[#6B6B63] leading-relaxed">
                {st.desc}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-bold text-stone-400 group-hover:text-[#12372A] transition-colors">
              <span>Stage {idx + 1}</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Callout */}
      <div className="mt-12 p-6 rounded-3xl bg-[#DFF5E1]/60 border border-[#BCE8C1] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#12372A] text-white flex items-center justify-center font-bold">
            ⚡
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#12372A]">Average rescue turnaround is under 45 minutes</h4>
            <p className="text-xs text-stone-600">Local volunteers receive dispatch notices instantly upon donation verification.</p>
          </div>
        </div>
        <button
          onClick={() => setActivePage('volunteer')}
          className="px-6 py-2.5 rounded-full bg-[#12372A] text-white text-xs font-bold hover:bg-[#1B4D3B] transition-colors flex-shrink-0"
        >
          Join As A Volunteer
        </button>
      </div>
    </section>
  );
};
