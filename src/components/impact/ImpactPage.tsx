import React from 'react';
import { useFoodRescue } from '../../context/FoodRescueContext';
import { 
  HeartHandshake, 
  Droplet, 
  Leaf, 
  Users, 
  ShieldCheck, 
  Award, 
  ArrowRight,
  Sparkles,
  Building,
  CheckCircle2
} from 'lucide-react';

export const ImpactPage: React.FC = () => {
  const { impact, setActivePage } = useFoodRescue();

  const impactMetrics = [
    {
      value: `${impact.meals_rescued.toLocaleString()}+`,
      title: 'Meals Rescued',
      desc: 'Fresh edible portions spared from incineration and landfill decomposition.',
      icon: <HeartHandshake className="w-6 h-6 text-[#2E8B57]" />
    },
    {
      value: `${(impact.meals_rescued * 0.92).toFixed(0)}+`,
      title: 'People Nourished',
      desc: 'Nutritious hot meals served to community shelter residents & children.',
      icon: <Users className="w-6 h-6 text-[#FF9F43]" />
    },
    {
      value: `${impact.co2_saved_kg.toLocaleString()} kg`,
      title: 'CO₂ Emissions Prevented',
      desc: 'Methane and greenhouse gases curtailed by preventing organic decomposition.',
      icon: <Leaf className="w-6 h-6 text-emerald-700" />
    },
    {
      value: `${impact.water_saved_liters.toLocaleString()} L`,
      title: 'Water Footprint Conserved',
      desc: 'Embedded agricultural water saved by keeping food in the human consumption cycle.',
      icon: <Droplet className="w-6 h-6 text-sky-600" />
    }
  ];

  const milestones = [
    { month: 'Month 1', title: 'Network Foundation', desc: '12 Pioneer restaurants in the tech corridor join zero-waste pledge.' },
    { month: 'Month 3', title: '5,000 Meal Threshold', desc: 'Average pickup transit time drops below 35 minutes across 8 shelter hubs.' },
    { month: 'Month 6', title: 'AI Matching Engine Deployed', desc: 'Compatibility routing matches dietary surplus with specific dietary needs.' },
    { month: 'Current', title: '12,800+ Rescues & Expanding', desc: 'Expanding coverage across university canteens and large event banquets.' },
  ];

  return (
    <div className="py-8 sm:py-14 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Editorial Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4D3B] text-[#DFF5E1] text-[11px] font-bold tracking-widest uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#FF9F43]" />
          ECOLOGICAL & SOCIAL ACCOUNTABILITY
        </div>
        <h1 className="text-editorial-section font-extrabold text-[#12372A] leading-tight">
          EVERY MEAL<br />
          <span className="text-[#2E8B57]">COUNTS.</span>
        </h1>
        <p className="text-base sm:text-lg text-[#6B6B63] mt-4 leading-relaxed font-normal">
          Food is not merely nutrition; it is energy, water, human labor, and community care. We measure success by the smiles created at community tables and greenhouse gas tons eliminated.
        </p>
      </div>

      {/* OVERSIZED METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {impactMetrics.map((m, idx) => (
          <div
            key={idx}
            className="bg-white rounded-[2rem] p-7 border border-stone-200/90 shadow-sm space-y-4 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9ED] border border-stone-200 flex items-center justify-center">
              {m.icon}
            </div>

            <div>
              <div className="text-stat-number text-[#12372A] font-black tracking-tight leading-none">
                {m.value}
              </div>
              <h3 className="text-sm font-extrabold text-[#171717] mt-2">
                {m.title}
              </h3>
            </div>

            <p className="text-xs text-[#6B6B63] leading-relaxed">
              {m.desc}
            </p>
          </div>
        ))}
      </div>

      {/* STORYTELLING SECTION: FOOD SAVED & COMMUNITY REACHED */}
      <div className="rounded-[2.5rem] bg-[#12372A] text-white p-8 sm:p-14 lg:p-16 overflow-hidden relative shadow-2xl border border-emerald-900/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold tracking-widest text-[#FF9F43] uppercase block">
              Human Impact Narrative
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight text-white">
              Turning evening banquet surplus into morning dignity.
            </h2>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
              At 8:30 PM, commercial kitchens often face the heartbreaking reality of surplus trays. Through FoodRescue, those same trays become balanced, hot dinners for shelter residents and children's homes before midnight.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-[#1B4D3B]/80 p-4 rounded-2xl border border-emerald-800">
                <span className="text-2xl font-black text-[#DFF5E1] block">32</span>
                <span className="text-xs text-stone-300 font-semibold">Partner Shelters Supported</span>
              </div>
              <div className="bg-[#1B4D3B]/80 p-4 rounded-2xl border border-emerald-800">
                <span className="text-2xl font-black text-[#FF9F43] block">100%</span>
                <span className="text-xs text-stone-300 font-semibold">Verified Safe Handover</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 aspect-[4/4.5]">
              <img
                src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1000&q=80"
                alt="Community members sharing a warm dinner"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>

      {/* MILESTONE TIMELINE */}
      <div className="space-y-8">
        <div>
          <span className="text-xs font-bold tracking-widest text-[#2E8B57] uppercase block mb-1">
            Chronicle of Growth
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12372A]">
            Milestones On The Road To Zero Waste
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm space-y-3"
            >
              <span className="text-xs font-black uppercase tracking-wider text-[#FF9F43] block">
                {m.month}
              </span>
              <h3 className="font-extrabold text-base text-[#12372A]">
                {m.title}
              </h3>
              <p className="text-xs text-[#6B6B63] leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA BANNER */}
      <div className="bg-[#FFF9ED] border-2 border-[#12372A] rounded-[2.5rem] p-8 sm:p-12 text-center space-y-4 max-w-3xl mx-auto">
        <h3 className="text-2xl font-extrabold text-[#12372A]">Be Part Of The Next 10,000 Rescues</h3>
        <p className="text-xs sm:text-sm text-[#6B6B63] max-w-md mx-auto">
          Whether you manage a restaurant kitchen or have a scooter and 30 spare minutes, you can make a direct difference today.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setActivePage('donate')}
            className="px-8 py-3.5 rounded-full bg-[#12372A] text-white font-extrabold text-xs hover:bg-[#1B4D3B] transition-colors"
          >
            Post Surplus Meal
          </button>
          <button
            onClick={() => setActivePage('volunteer')}
            className="px-8 py-3.5 rounded-full bg-[#FF9F43] text-stone-950 font-extrabold text-xs hover:bg-[#F38E2C] transition-colors"
          >
            Become A Volunteer
          </button>
        </div>
      </div>

    </div>
  );
};
