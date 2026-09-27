import React, { useState } from 'react';
import { Donation } from '../../types';
import { MapPin, Navigation, Compass, Layers, ShieldCheck, UserCheck, Building2, Store } from 'lucide-react';

interface MapViewProps {
  donations: Donation[];
  selectedDonation: Donation | null;
  onSelectDonation: (donation: Donation) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  donations,
  selectedDonation,
  onSelectDonation
}) => {
  const [mapMode, setMapMode] = useState<'clean' | 'detailed'>('clean');
  const [zoom, setZoom] = useState(13);

  // Focus on selected donation or default
  const activeItem = selectedDonation || donations[0];

  return (
    <div className="relative w-full h-[620px] rounded-[2.5rem] bg-[#E9E5DC] border border-stone-300/80 overflow-hidden shadow-inner flex flex-col justify-between p-4 sm:p-6 select-none">
      
      {/* SVG Stylized Cartographic Background */}
      <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D3CCC0" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        {/* River curve */}
        <path d="M -50 450 Q 200 480 350 320 T 800 200" fill="none" stroke="#CFE4DC" strokeWidth="24" strokeLinecap="round" />
        {/* Road networks */}
        <path d="M 50 -50 L 250 650" fill="none" stroke="#FFFFFF" strokeWidth="8" />
        <path d="M -50 200 L 750 350" fill="none" stroke="#FFFFFF" strokeWidth="10" />
        <path d="M 120 100 Q 400 220 500 550" fill="none" stroke="#FAF7F0" strokeWidth="6" />
        <path d="M 300 0 L 300 650" fill="none" stroke="#FFFFFF" strokeWidth="6" />
        <circle cx="280" cy="270" r="140" fill="#E2EBE5" opacity="0.4" />
      </svg>

      {/* Top Map Controls Header */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-stone-200 flex items-center gap-2.5">
          <Navigation className="w-4 h-4 text-[#2E8B57]" />
          <div>
            <span className="text-xs font-extrabold text-[#12372A] block leading-none">Metro Rescue Grid</span>
            <span className="text-[10px] text-stone-500 font-semibold">City Center Radius: 5.0 km</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Legend */}
          <div className="hidden sm:flex items-center gap-3 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-200 text-[11px] font-semibold text-stone-700">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#12372A]"></span> Donor
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E8B57]"></span> NGO
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF9F43]"></span> Volunteer
            </span>
          </div>

          {/* Zoom controls */}
          <div className="bg-white/95 rounded-2xl border border-stone-200 shadow-sm flex flex-col overflow-hidden">
            <button
              onClick={() => setZoom(z => Math.min(16, z + 1))}
              className="w-8 h-8 flex items-center justify-center text-stone-700 hover:bg-stone-100 font-bold text-sm"
              title="Zoom In"
            >
              +
            </button>
            <div className="h-px bg-stone-200"></div>
            <button
              onClick={() => setZoom(z => Math.max(10, z - 1))}
              className="w-8 h-8 flex items-center justify-center text-stone-700 hover:bg-stone-100 font-bold text-sm"
              title="Zoom Out"
            >
              -
            </button>
          </div>
        </div>
      </div>

      {/* Central Map Canvas Area with Interactive Markers and Active Route */}
      <div className="relative z-10 w-full flex-1 my-4">
        
        {/* Route Line SVG between Donor → Volunteer → NGO */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Animated Route Line */}
          <path
            d="M 220 200 Q 340 180 430 260 T 520 380"
            fill="none"
            stroke="#2E8B57"
            strokeWidth="3.5"
            strokeDasharray="6,6"
            className="animate-[dash_20s_linear_infinite]"
          />
          {/* Transit Badge */}
          <rect x="330" y="195" width="85" height="22" rx="11" fill="#12372A" />
          <text x="372" y="210" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
            12 MIN ROUTE
          </text>
        </svg>

        {/* Marker 1: Donor (College Road) */}
        <div 
          onClick={() => donations[0] && onSelectDonation(donations[0])}
          className="absolute top-[28%] left-[26%] sm:left-[30%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
        >
          <div className="relative flex flex-col items-center">
            {/* Popover Bubble */}
            <div className="bg-[#12372A] text-white px-3 py-1.5 rounded-xl shadow-xl text-[10px] font-extrabold whitespace-nowrap mb-1 flex items-center gap-1.5 border border-emerald-700/60 transform group-hover:scale-105 transition-transform">
              <Store className="w-3 h-3 text-[#DFF5E1]" />
              <span>Green Leaf Restaurant</span>
              <span className="text-[#FF9F43]">(Donor)</span>
            </div>
            {/* Pin Head */}
            <div className="w-10 h-10 rounded-2xl bg-[#12372A] text-white flex items-center justify-center shadow-lg border-2 border-white ring-4 ring-[#12372A]/20">
              <MapPin className="w-5 h-5 text-[#DFF5E1]" />
            </div>
            {/* Pulse */}
            <div className="w-4 h-1.5 rounded-full bg-stone-900/30 blur-[1px] mt-1"></div>
          </div>
        </div>

        {/* Marker 2: Volunteer Mahesh (On Transit Route) */}
        <div className="absolute top-[40%] left-[58%] sm:left-[60%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
          <div className="relative flex flex-col items-center">
            <div className="bg-[#FF9F43] text-stone-950 px-3 py-1 rounded-xl shadow-lg text-[10px] font-black whitespace-nowrap mb-1 flex items-center gap-1 border border-amber-300">
              <UserCheck className="w-3 h-3 text-stone-900" />
              <span>Mahesh (Volunteer) • 1.2 km</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#FF9F43] text-stone-950 flex items-center justify-center shadow-lg border-2 border-white animate-bounce [animation-duration:2.5s]">
              🛵
            </div>
          </div>
        </div>

        {/* Marker 3: NGO Destination (Hope Community Kitchen) */}
        <div className="absolute top-[68%] left-[72%] sm:left-[75%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
          <div className="relative flex flex-col items-center">
            <div className="bg-[#2E8B57] text-white px-3 py-1.5 rounded-xl shadow-xl text-[10px] font-extrabold whitespace-nowrap mb-1 flex items-center gap-1.5 border border-emerald-400/40">
              <Building2 className="w-3 h-3 text-emerald-200" />
              <span>Hope Community Kitchen (NGO)</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-[#2E8B57] text-white flex items-center justify-center shadow-lg border-2 border-white ring-4 ring-[#2E8B57]/20">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div className="w-4 h-1.5 rounded-full bg-stone-900/30 blur-[1px] mt-1"></div>
          </div>
        </div>

        {/* Marker 4: Secondary Canteen Donation */}
        <div 
          onClick={() => donations[2] && onSelectDonation(donations[2])}
          className="absolute top-[52%] left-[16%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
        >
          <div className="relative flex flex-col items-center">
            <div className="bg-white text-stone-900 px-2.5 py-1 rounded-xl shadow-md text-[10px] font-bold whitespace-nowrap mb-1 border border-stone-200 opacity-90 group-hover:opacity-100">
              <span>Campus Canteen (80 portions)</span>
            </div>
            <div className="w-8 h-8 rounded-xl bg-white text-[#12372A] flex items-center justify-center shadow border-2 border-[#12372A]">
              <MapPin className="w-4 h-4 text-rose-600" />
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Floating Info Card for the Selected Donation */}
      {activeItem && (
        <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-stone-200 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            <img
              src={activeItem.image_url}
              alt={activeItem.food_name}
              className="w-14 h-14 rounded-2xl object-cover border border-stone-200 flex-shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase text-[#2E8B57] bg-[#DFF5E1] px-2 py-0.5 rounded-md">
                  {activeItem.category}
                </span>
                <span className="text-xs font-bold text-stone-500">
                  {activeItem.distance_km || 2.4} km away
                </span>
              </div>
              <h4 className="font-extrabold text-sm text-[#12372A] truncate mt-0.5">
                {activeItem.food_name}
              </h4>
              <p className="text-xs text-stone-600 truncate">
                {activeItem.quantity} {activeItem.unit} • Available until {activeItem.available_until}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] font-bold text-stone-400 uppercase block">Matched NGO</span>
              <span className="text-xs font-extrabold text-[#12372A]">Hope Community Shelter</span>
            </div>
            <button
              onClick={() => onSelectDonation(activeItem)}
              className="px-5 py-2.5 rounded-full bg-[#12372A] text-white text-xs font-extrabold hover:bg-[#1B4D3B] transition-colors whitespace-nowrap"
            >
              Select Listing
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
