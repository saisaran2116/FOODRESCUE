import React from 'react';
import { Quote, Sparkles } from 'lucide-react';

export const CommunityStories: React.FC = () => {
  const stories = [
    {
      name: 'Chef Rajesh Sharma',
      role: 'Executive Chef, Green Leaf Restaurant',
      quote: 'Before FoodRescue, disposing of 40–50 premium dinner portions after evening banquets broke our hearts. Today, knowing clean meals reach hungry families within an hour gives our entire kitchen deep purpose.',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80',
      stat: '1,420 Meals Rescued'
    },
    {
      name: 'Sister Mary Grace',
      role: 'Director, Hope Community Kitchen',
      quote: 'We host over 120 individuals each evening. FoodRescue notifications provide reliable, high-grade balanced meals that immediately ease our grocery budget and nourish our residents with dignity.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      stat: '3,890 Meals Received'
    },
    {
      name: 'Mahesh Kumar',
      role: 'Certified Volunteer & Food Hero',
      quote: 'Being able to accept a pickup on my scooter on my way back from campus and drop it at the shelter takes 20 minutes. It is the most direct, tangible way to make a difference in our city.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      stat: '26 Pickups Completed'
    }
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-bold tracking-widest text-[#2E8B57] uppercase block mb-2">
          Voices From The Field
        </span>
        <h2 className="text-editorial-section font-extrabold text-[#12372A] leading-tight">
          STORIES BEHIND<br />
          EVERY MEAL.
        </h2>
        <p className="text-xs sm:text-sm text-[#6B6B63] mt-3">
          Behind every data metric is a restaurant team, a volunteer on the road, and a person receiving fresh food.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stories.map((s, idx) => (
          <div
            key={idx}
            className="bg-white rounded-[2rem] p-7 border border-stone-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <Quote className="w-8 h-8 text-[#DFF5E1] fill-current" />
              <p className="text-xs sm:text-sm text-[#171717] leading-relaxed italic">
                "{s.quote}"
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-100 flex items-center gap-3.5">
              <img
                src={s.image}
                alt={s.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#DFF5E1]"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-[#12372A] truncate">
                  {s.name}
                </h4>
                <p className="text-[11px] text-stone-500 truncate">{s.role}</p>
                <span className="inline-block text-[10px] font-extrabold text-[#2E8B57] bg-[#DFF5E1]/70 px-2 py-0.5 rounded-full mt-1">
                  {s.stat}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
