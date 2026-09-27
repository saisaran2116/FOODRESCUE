import React, { useState, useMemo } from 'react';
import { useFoodRescue } from '../../context/FoodRescueContext';
import { Donation, FoodCategory, PriorityLevel } from '../../types';
import { PriorityBadge } from '../common/PriorityBadge';
import { StatusBadge } from '../common/StatusBadge';
import { MapView } from './MapView';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  ArrowUpDown, 
  CheckCircle, 
  SlidersHorizontal,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const FindFoodPage: React.FC = () => {
  const { 
    donations, 
    acceptDonation, 
    setActivePage, 
    highlightedDonationId, 
    setHighlightedDonationId,
    currentUser,
    setDemoStep 
  } = useFoodRescue();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [selectedDietary, setSelectedDietary] = useState<string>('All');
  const [maxDistance, setMaxDistance] = useState<number>(10);
  const [sortBy, setSortBy] = useState<'nearest' | 'urgent' | 'quantity' | 'recent'>('recent');

  // Currently inspected donation for Map synchronization
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(() => {
    if (highlightedDonationId) {
      return donations.find(d => d.id === highlightedDonationId) || donations[0];
    }
    return donations[0];
  });

  // Filtered & Sorted list
  const filteredDonations = useMemo(() => {
    let result = [...donations];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(d =>
        d.food_name.toLowerCase().includes(q) ||
        d.donor_name.toLowerCase().includes(q) ||
        d.pickup_location.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter(d => d.category === selectedCategory);
    }

    if (selectedPriority !== 'All') {
      result = result.filter(d => d.priority === selectedPriority);
    }

    if (selectedDietary !== 'All') {
      result = result.filter(d => d.dietary_type === selectedDietary);
    }

    if (maxDistance) {
      result = result.filter(d => (d.distance_km || 2.5) <= maxDistance);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'nearest') {
        return (a.distance_km || 2.5) - (b.distance_km || 2.5);
      }
      if (sortBy === 'urgent') {
        const pOrder: Record<PriorityLevel, number> = { URGENT: 1, SOON: 2, NORMAL: 3 };
        return pOrder[a.priority] - pOrder[b.priority];
      }
      if (sortBy === 'quantity') {
        return b.quantity - a.quantity;
      }
      // default: recent
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return result;
  }, [donations, searchTerm, selectedCategory, selectedPriority, selectedDietary, maxDistance, sortBy]);

  const handleAccept = (donation: Donation) => {
    acceptDonation(donation.id);
    setDemoStep(4);
    setActivePage('volunteer');
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Editorial Page Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <span className="text-xs font-bold tracking-widest text-[#2E8B57] uppercase block mb-1">
            Real-Time Community Discovery
          </span>
          <h1 className="text-editorial-section font-extrabold text-[#12372A] leading-tight">
            GOOD FOOD<br />
            <span className="text-[#2E8B57]">SHOULD NOT GO TO WASTE.</span>
          </h1>
        </div>
        <p className="text-sm text-[#6B6B63] max-w-md">
          Explore surplus meals posted by verified donors. Filter by proximity, urgency window, or dietary requirements to coordinate immediate pickup.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200/90 shadow-sm mb-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by food item, restaurant, or neighborhood..."
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-[#FFF9ED] border border-stone-200 focus:border-[#12372A] focus:bg-white text-xs sm:text-sm font-medium outline-none transition-all text-[#171717]"
            />
          </div>

          {/* Category Dropdown */}
          <div className="sm:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFF9ED] border border-stone-200 text-xs font-bold text-stone-800 outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Cooked Meal">Cooked Meal</option>
              <option value="Bakery">Bakery</option>
              <option value="Produce">Produce</option>
              <option value="Packaged Food">Packaged Food</option>
              <option value="Dairy">Dairy</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="sm:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFF9ED] border border-stone-200 text-xs font-bold text-[#12372A] outline-none"
            >
              <option value="recent">Sort: Recently Posted</option>
              <option value="nearest">Sort: Nearest Distance</option>
              <option value="urgent">Sort: Most Urgent</option>
              <option value="quantity">Sort: Largest Quantity</option>
            </select>
          </div>
        </div>

        {/* Secondary Filter Pills */}
        <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-stone-400 font-semibold text-[11px]">Priority:</span>
            {['All', 'URGENT', 'SOON', 'NORMAL'].map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPriority(p)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                  selectedPriority === p
                    ? 'bg-[#12372A] text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {p}
              </button>
            ))}

            <span className="text-stone-300 mx-1">|</span>

            <span className="text-stone-400 font-semibold text-[11px]">Dietary:</span>
            {['All', 'Vegetarian', 'Vegan'].map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDietary(d)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                  selectedDietary === d
                    ? 'bg-[#2E8B57] text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-stone-600 text-xs">
            <span>Radius: <strong>{maxDistance} km</strong></span>
            <input
              type="range"
              min="1"
              max="20"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="accent-[#12372A] w-24 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout: Results on Left (6 Cols) & Map on Right (6 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Donation Cards List */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-stone-500">
              Showing {filteredDonations.length} Active Donations
            </span>
            <span className="text-[11px] text-[#2E8B57] font-bold">
              Updated just now
            </span>
          </div>

          {filteredDonations.length === 0 ? (
            <div className="bg-white rounded-[2rem] p-12 text-center border border-stone-200 space-y-3">
              <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-[#12372A]">NO DONATIONS NEAR YOU</h3>
              <p className="text-xs text-[#6B6B63] max-w-xs mx-auto leading-relaxed">
                Try expanding your search radius or clearing category filters to view available surplus meals across the metro region.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedPriority('All');
                  setSelectedDietary('All');
                  setMaxDistance(15);
                  setSearchTerm('');
                }}
                className="mt-2 px-5 py-2 rounded-full bg-[#12372A] text-white text-xs font-bold hover:bg-[#1B4D3B]"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredDonations.map((item) => {
              const isSelected = selectedDonation?.id === item.id;
              const isAvailable = item.status === 'AVAILABLE';

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedDonation(item)}
                  className={`bg-white rounded-3xl p-5 border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-[#12372A] shadow-md ring-2 ring-[#12372A]/10'
                      : 'border-stone-200/90 hover:border-stone-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Rounded Image with Badges */}
                    <div className="relative w-full sm:w-36 h-36 rounded-2xl overflow-hidden bg-stone-100 flex-shrink-0">
                      <img
                        src={item.image_url}
                        alt={item.food_name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <PriorityBadge priority={item.priority} size="sm" />
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-extrabold uppercase text-[#2E8B57]">
                            {item.donor_name}
                          </span>
                          <StatusBadge status={item.status} size="sm" />
                        </div>

                        <h3 className="font-extrabold text-base text-[#12372A] leading-tight mt-1">
                          {item.food_name}
                        </h3>

                        <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Portions, Distance, Deadline info */}
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-100 text-center">
                        <div className="bg-[#FFF9ED] py-1.5 px-2 rounded-xl">
                          <span className="text-[10px] text-stone-400 block font-bold">QTY</span>
                          <span className="text-xs font-black text-[#12372A]">
                            {item.quantity} {item.unit}
                          </span>
                        </div>
                        <div className="bg-[#FFF9ED] py-1.5 px-2 rounded-xl">
                          <span className="text-[10px] text-stone-400 block font-bold">DIST</span>
                          <span className="text-xs font-black text-[#12372A]">
                            {item.distance_km || 2.4} km
                          </span>
                        </div>
                        <div className="bg-[#FFF9ED] py-1.5 px-2 rounded-xl">
                          <span className="text-[10px] text-stone-400 block font-bold">DEADLINE</span>
                          <span className="text-xs font-black text-[#FF9F43]">
                            {item.available_until}
                          </span>
                        </div>
                      </div>

                      {/* Card Action footer */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[11px] text-stone-500 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#2E8B57]" />
                          {item.pickup_location}
                        </span>

                        {isAvailable ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAccept(item);
                            }}
                            className="px-4 py-2 rounded-full bg-[#12372A] hover:bg-[#1B4D3B] text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                          >
                            Accept Donation
                          </button>
                        ) : (
                          <span className="text-[11px] font-bold text-stone-400 italic">
                            Claimed / In Transit
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Large Interactive Map (6 Cols Sticky) */}
        <div className="lg:col-span-6 sticky top-24">
          <MapView
            donations={filteredDonations}
            selectedDonation={selectedDonation}
            onSelectDonation={(d) => setSelectedDonation(d)}
          />
        </div>

      </div>
    </div>
  );
};
