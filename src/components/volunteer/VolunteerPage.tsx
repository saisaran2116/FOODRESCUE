import React from 'react';
import { useFoodRescue } from '../../context/FoodRescueContext';
import { Pickup, PickupStatus } from '../../types';
import { PriorityBadge } from '../common/PriorityBadge';
import { 
  Bike, 
  MapPin, 
  CheckCircle, 
  ArrowRight, 
  Clock, 
  Navigation, 
  ShieldCheck, 
  Check, 
  Building2,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import { triggerConfetti } from '../../services/dataService';

export const VolunteerPage: React.FC = () => {
  const { 
    pickups, 
    donations, 
    updatePickupStep, 
    acceptDonation, 
    currentUser, 
    setActivePage,
    setDemoStep 
  } = useFoodRescue();

  const availableDonations = donations.filter(d => d.status === 'AVAILABLE');
  const activePickups = pickups.filter(p => p.status !== 'DELIVERED');
  const completedPickups = pickups.filter(p => p.status === 'DELIVERED');

  const trackerSteps = [
    { num: 1, key: 'ACCEPTED', title: '01 ACCEPTED', label: 'Accepted by Volunteer', desc: 'Dispatch confirmed. Route assigned.' },
    { num: 2, key: 'GOING_TO_PICKUP', title: '02 GOING TO PICKUP', label: 'En Route to Donor', desc: 'Heading to restaurant / canteen kitchen.' },
    { num: 3, key: 'FOOD_COLLECTED', title: '03 FOOD COLLECTED', label: 'Food Collected', desc: 'Hygienic thermal trays loaded into courier box.' },
    { num: 4, key: 'DELIVERED', title: '04 DELIVERED', label: 'Delivered to Shelter', desc: 'Safe handover signed off at destination.' },
  ];

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-bold tracking-widest text-[#2E8B57] uppercase block mb-1">
            Food Hero Dispatch Network
          </span>
          <h1 className="text-editorial-section font-extrabold text-[#12372A] leading-tight">
            MOVE FOOD.<br />
            <span className="text-[#FF9F43]">MOVE IMPACT.</span>
          </h1>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-stone-200/90 shadow-sm flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            alt="Volunteer Avatar"
            className="w-12 h-12 rounded-2xl object-cover border border-stone-200"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-[#12372A]">Mahesh</span>
              <span className="text-[10px] font-bold bg-[#FF9F43] text-stone-950 px-2 py-0.5 rounded-full">
                FOOD HERO
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">26 Completed Pickups • 48 km Covered</p>
          </div>
        </div>
      </div>

      {/* SECTION 1: ACTIVE PICKUP PROGRESS TRACKER */}
      {activePickups.length > 0 ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-[#12372A] tracking-tight">
              Active Rescue In Progress
            </h2>
            <span className="text-xs font-bold text-[#2E8B57] bg-[#DFF5E1] px-3 py-1 rounded-full">
              Live Transit Tracking
            </span>
          </div>

          {activePickups.map((pickup) => {
            const relDonation = donations.find(d => d.id === pickup.donation_id) || pickup.donation;
            const currentStep = pickup.current_step || 1;

            return (
              <div 
                key={pickup.id}
                className="bg-white rounded-[2.5rem] p-6 sm:p-10 border border-stone-200 shadow-xl space-y-8"
              >
                {/* Header Summary */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-100">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-3xl bg-[#FFF9ED] border border-stone-200 overflow-hidden flex-shrink-0">
                      <img
                        src={relDonation?.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80'}
                        alt="Pickup food"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF9F43]">
                        Active Dispatch ID #{pickup.id}
                      </span>
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#12372A]">
                        {relDonation?.food_name || '50 Vegetarian Meals'}
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {relDonation?.quantity || 50} portions • Pickup {pickup.pickup_time}
                      </p>
                    </div>
                  </div>

                  {/* Route locations */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs bg-[#FFF9ED] p-4 rounded-2xl border border-stone-200">
                    <div>
                      <span className="text-[10px] text-stone-400 font-bold block">FROM (DONOR)</span>
                      <span className="font-extrabold text-[#12372A]">{pickup.pickup_location}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 hidden sm:block" />
                    <div>
                      <span className="text-[10px] text-stone-400 font-bold block">TO (NGO)</span>
                      <span className="font-extrabold text-[#2E8B57]">{pickup.ngo_name}</span>
                    </div>
                  </div>
                </div>

                {/* LARGE VISUAL PROGRESS TRACKER */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-stone-400 block mb-6">
                    Multi-Stage Status Tracker
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
                    {trackerSteps.map((st) => {
                      const isCompleted = currentStep > st.num;
                      const isCurrent = currentStep === st.num;

                      return (
                        <div
                          key={st.num}
                          className={`p-5 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                            isCurrent
                              ? 'bg-[#12372A] text-white border-[#12372A] shadow-xl ring-4 ring-[#12372A]/10 scale-102'
                              : isCompleted
                              ? 'bg-[#DFF5E1]/70 border-[#BCE8C1] text-[#12372A]'
                              : 'bg-stone-50 border-stone-200 text-stone-400'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className={`text-xs font-black tracking-widest ${
                                isCurrent ? 'text-[#FF9F43]' : isCompleted ? 'text-[#2E8B57]' : 'text-stone-400'
                              }`}>
                                {st.title}
                              </span>
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                                isCurrent ? 'bg-[#FF9F43] text-stone-950' : isCompleted ? 'bg-[#2E8B57] text-white' : 'bg-stone-200 text-stone-500'
                              }`}>
                                {isCompleted ? <Check className="w-4 h-4" /> : st.num}
                              </div>
                            </div>

                            <h4 className="font-extrabold text-sm mb-1">
                              {st.label}
                            </h4>
                            <p className={`text-xs leading-relaxed ${
                              isCurrent ? 'text-stone-200' : isCompleted ? 'text-stone-700' : 'text-stone-400'
                            }`}>
                              {st.desc}
                            </p>
                          </div>

                          <div className="mt-4 pt-2">
                            {isCurrent && (
                              <span className="inline-block text-[10px] uppercase font-bold tracking-wider bg-white/20 text-[#DFF5E1] px-2.5 py-0.5 rounded-full">
                                Active Step
                              </span>
                            )}
                            {isCompleted && (
                              <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-[#2E8B57]">
                                Completed ✓
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Status Update Action Controls */}
                <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <Navigation className="w-4 h-4 text-[#2E8B57]" />
                    <span>Advance progress status to dispatch notifications to the donor & shelter.</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {currentStep < 4 ? (
                      <button
                        onClick={() => {
                          const nextStep = currentStep + 1;
                          updatePickupStep(pickup.id, nextStep);
                          if (nextStep === 4) {
                            setDemoStep(6); // Step 6 of demo
                          }
                        }}
                        className="px-8 py-3.5 rounded-full bg-[#12372A] hover:bg-[#1B4D3B] text-white font-extrabold text-xs transition-all shadow-md flex items-center gap-2"
                      >
                        <span>Update Status To: {trackerSteps[currentStep].label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 text-xs font-bold text-[#2E8B57] bg-[#DFF5E1] px-4 py-2 rounded-full">
                        <CheckCircle className="w-4 h-4" />
                        <span>All Stages Successfully Completed!</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 border border-stone-200 text-center space-y-2">
          <Bike className="w-10 h-10 mx-auto text-[#2E8B57]" />
          <h3 className="font-extrabold text-base text-[#12372A]">No active pickups assigned to you</h3>
          <p className="text-xs text-[#6B6B63] max-w-sm mx-auto">
            Browse available food donations below and accept a pickup to initiate the 4-stage tracking flow.
          </p>
        </div>
      )}

      {/* SECTION 2: AVAILABLE PICKUPS TO CLAIM */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-[#12372A] tracking-tight">
              Available Pickups Nearby
            </h2>
            <p className="text-xs text-[#6B6B63]">Donations awaiting local volunteer pickup</p>
          </div>
          <span className="text-xs font-bold text-stone-500">
            {availableDonations.length} Open Requests
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableDonations.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold text-[#2E8B57] uppercase bg-[#DFF5E1] px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <PriorityBadge priority={item.priority} size="sm" />
                </div>

                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-3 bg-stone-100">
                  <img
                    src={item.image_url}
                    alt={item.food_name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-xl text-xs font-extrabold">
                    {item.quantity} {item.unit}
                  </div>
                </div>

                <h3 className="font-extrabold text-base text-[#12372A] leading-tight">
                  {item.food_name}
                </h3>
                <p className="text-xs text-stone-500 font-medium mt-1">
                  From: {item.donor_name}
                </p>

                <div className="mt-3 space-y-1 text-xs text-stone-600">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#2E8B57]" />
                    <span>{item.pickup_location} ({item.distance_km || 2.1} km)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#FF9F43]" />
                    <span>Pickup by <strong>{item.available_until}</strong></span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100">
                <button
                  onClick={() => {
                    acceptDonation(item.id, 'Mahesh (Food Hero)');
                    setDemoStep(5);
                  }}
                  className="w-full py-3 rounded-full bg-[#12372A] hover:bg-[#1B4D3B] text-white font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                >
                  <span>Accept Pickup</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
