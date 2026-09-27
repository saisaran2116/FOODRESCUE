import React from 'react';
import { useFoodRescue } from '../../context/FoodRescueContext';
import { PriorityBadge } from '../common/PriorityBadge';
import { StatusBadge } from '../common/StatusBadge';
import { MapPin, Clock, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';

export const FeaturedDonations: React.FC = () => {
  const { donations, setActivePage, setHighlightedDonationId, acceptDonation } = useFoodRescue();

  const featureDonation = donations[0] || null;
  const sideDonations = donations.slice(1, 4);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-xs font-bold tracking-widest text-[#2E8B57] uppercase block mb-1">
            Real-Time Community Listings
          </span>
          <h2 className="text-editorial-section font-extrabold text-[#12372A] leading-tight">
            FOOD THAT NEEDS<br />
            A HOME.
          </h2>
        </div>

        <button
          onClick={() => setActivePage('find')}
          className="inline-flex items-center gap-2 text-sm font-extrabold text-[#12372A] hover:text-[#2E8B57] transition-colors self-start sm:self-end pb-2 group"
        >
          <span>Explore All Donations on Map</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Editorial Grid: 1 Large Feature Block + Side Content Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Large Feature Donation (Left 7 Cols) */}
        {featureDonation && (
          <div className="lg:col-span-7 bg-white rounded-[2.5rem] border border-stone-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
              <img
                src={featureDonation.image_url}
                alt={featureDonation.food_name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Top Badges */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#12372A] text-xs font-extrabold uppercase tracking-wider">
                  Featured Surplus
                </span>
                <PriorityBadge priority={featureDonation.priority} />
              </div>

              {/* Bottom Overlay Info on Image */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-xs uppercase font-bold tracking-wider text-[#FF9F43] block">
                  {featureDonation.donor_name}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
                  {featureDonation.food_name}
                </h3>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <p className="text-sm text-[#6B6B63] leading-relaxed">
                {featureDonation.description}
              </p>

              <div className="grid grid-cols-3 gap-3 py-4 border-y border-stone-100 text-center">
                <div className="p-2.5 rounded-2xl bg-[#FFF9ED]">
                  <span className="text-xs text-stone-500 font-medium block">Quantity</span>
                  <span className="text-base font-extrabold text-[#12372A]">
                    {featureDonation.quantity} {featureDonation.unit}
                  </span>
                </div>
                <div className="p-2.5 rounded-2xl bg-[#FFF9ED]">
                  <span className="text-xs text-stone-500 font-medium block">Distance</span>
                  <span className="text-base font-extrabold text-[#12372A]">
                    {featureDonation.distance_km || 2.5} km away
                  </span>
                </div>
                <div className="p-2.5 rounded-2xl bg-[#FFF9ED]">
                  <span className="text-xs text-stone-500 font-medium block">Pickup Before</span>
                  <span className="text-base font-extrabold text-[#FF9F43]">
                    {featureDonation.available_until}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <div className="flex items-center gap-2 text-xs text-[#6B6B63]">
                  <MapPin className="w-4 h-4 text-[#2E8B57]" />
                  <span>{featureDonation.pickup_location}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setHighlightedDonationId(featureDonation.id);
                      setActivePage('find');
                    }}
                    className="px-6 py-3 rounded-full bg-[#12372A] hover:bg-[#1B4D3B] text-white text-xs font-extrabold transition-all flex items-center gap-2"
                  >
                    <span>View Donation</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  {featureDonation.status === 'AVAILABLE' && (
                    <button
                      onClick={() => {
                        acceptDonation(featureDonation.id);
                        setActivePage('volunteer');
                      }}
                      className="px-5 py-3 rounded-full bg-[#DFF5E1] hover:bg-[#c9efcd] text-[#12372A] text-xs font-bold transition-all"
                    >
                      Accept Pickup
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Smaller Side Content Blocks (Right 5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {sideDonations.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4 group"
            >
              {/* Rounded image */}
              <div className="w-24 sm:w-28 h-24 sm:h-28 rounded-2xl overflow-hidden flex-shrink-0 bg-stone-100">
                <img
                  src={item.image_url}
                  alt={item.food_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-bold text-[#2E8B57] uppercase tracking-wide">
                    {item.category}
                  </span>
                  <PriorityBadge priority={item.priority} size="sm" />
                </div>

                <h4 className="font-extrabold text-sm sm:text-base text-[#12372A] truncate leading-tight">
                  {item.food_name}
                </h4>

                <p className="text-xs text-stone-500 font-medium mt-0.5">
                  {item.quantity} {item.unit} • {item.distance_km || 3.2} km away
                </p>

                <div className="mt-2.5 flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1 text-[11px] text-stone-500">
                    <Clock className="w-3 h-3 text-[#FF9F43]" />
                    By {item.available_until}
                  </span>

                  <button
                    onClick={() => {
                      setHighlightedDonationId(item.id);
                      setActivePage('find');
                    }}
                    className="text-xs font-bold text-[#12372A] hover:text-[#2E8B57] flex items-center gap-0.5"
                  >
                    View <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Quick CTA Card */}
          <div className="bg-[#FFF9ED] border-2 border-dashed border-[#2E8B57]/40 rounded-3xl p-6 text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E8B57]">
              Have edible surplus at your venue?
            </span>
            <p className="text-xs text-[#6B6B63]">
              Post it in 60 seconds and let verified volunteers handle safe dispatch.
            </p>
            <button
              onClick={() => setActivePage('donate')}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#FF9F43] hover:bg-[#F38E2C] text-stone-950 font-bold text-xs shadow-sm transition-all"
            >
              <span>Post A Donation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
