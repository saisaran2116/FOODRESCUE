import React, { useState } from 'react';
import { useFoodRescue } from '../../context/FoodRescueContext';
import { FoodCategory, PriorityLevel } from '../../types';
import { PriorityBadge } from '../common/PriorityBadge';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Upload, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle,
  Eye,
  Check
} from 'lucide-react';
import { triggerConfetti } from '../../services/dataService';

export const DonatePage: React.FC = () => {
  const { createDonation, currentUser, setActivePage, classifyFoodAI, setDemoStep } = useFoodRescue();

  // Form states with default hackathon demo values ready for step 1
  const [foodName, setFoodName] = useState('50 Vegetarian Meals');
  const [category, setCategory] = useState<FoodCategory>('Cooked Meal');
  const [quantity, setQuantity] = useState<number>(50);
  const [unit, setUnit] = useState('portions');
  const [prepTime, setPrepTime] = useState('Today 1:00 PM');
  const [pickupLocation, setPickupLocation] = useState('College Road, Near City Center');
  const [availableUntil, setAvailableUntil] = useState('8:30 PM');
  const [description, setDescription] = useState('Freshly prepared nutritious vegetarian lunch meals in insulated food-grade trays. Rice, mixed vegetable curry, and chapatis.');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80');
  const [priority, setPriority] = useState<PriorityLevel>('SOON');
  const [dietaryType, setDietaryType] = useState<'Vegetarian' | 'Vegan' | 'Non-Veg'>('Vegetarian');

  // AI Classification Assistant states
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<{
    category: FoodCategory;
    confidence: number;
    priority: PriorityLevel;
    storage_tip: string;
  } | null>(null);

  // Submission success state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedDonationId, setSubmittedDonationId] = useState<string | null>(null);

  const handleAiClassify = () => {
    setIsAiAnalyzing(true);
    setTimeout(() => {
      const res = classifyFoodAI(foodName, description);
      setAiResult(res);
      setCategory(res.category);
      setPriority(res.priority);
      setIsAiAnalyzing(false);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodName || !quantity) return;

    const newDonation = createDonation({
      donor_id: currentUser.id,
      donor_name: currentUser.name,
      food_name: foodName,
      category,
      quantity,
      unit,
      description,
      image_url: imageUrl,
      pickup_location: pickupLocation,
      available_until: availableUntil,
      available_from: prepTime,
      priority,
      dietary_type: dietaryType
    });

    setSubmittedDonationId(newDonation.id);
    setIsSubmitted(true);
    triggerConfetti();
    setDemoStep(2); // Progress to step 2 of hackathon demo
  };

  return (
    <div className="py-8 sm:py-14 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="max-w-3xl mb-10 sm:mb-12">
        <span className="text-xs font-bold tracking-widest text-[#2E8B57] uppercase block mb-2">
          Surplus Food Contribution Portal
        </span>
        <h1 className="text-editorial-section font-extrabold text-[#12372A] leading-tight">
          GIVE FOOD<br />
          <span className="text-[#2E8B57]">A SECOND LIFE.</span>
        </h1>
        <p className="text-sm sm:text-base text-[#6B6B63] mt-3 max-w-xl font-normal">
          Post surplus food and connect it with people who need it. Real-time smart matching notifies nearby verified community shelters instantly.
        </p>
      </div>

      {isSubmitted ? (
        /* Polished Success State */
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-14 border border-[#BCE8C1] shadow-xl text-center max-w-2xl mx-auto space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#DFF5E1] text-[#12372A] flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-[#2E8B57]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-extrabold tracking-widest uppercase text-[#2E8B57]">
              Submission Successful
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12372A]">
              DONATION POSTED ✓
            </h2>
            <p className="text-sm text-[#6B6B63] max-w-md mx-auto leading-relaxed">
              <strong className="text-[#171717]">{quantity} {unit}</strong> of <strong className="text-[#171717]">{foodName}</strong> are now available to nearby organizations.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9ED] border border-stone-200/80 max-w-md mx-auto text-left text-xs space-y-2">
            <div className="flex items-center justify-between text-stone-600">
              <span className="font-semibold">Top AI Match:</span>
              <span className="font-extrabold text-[#12372A]">Hope Community Kitchen & Shelter (94%)</span>
            </div>
            <div className="flex items-center justify-between text-stone-600">
              <span className="font-semibold">Pickup Deadline:</span>
              <span className="font-bold text-[#FF9F43]">{availableUntil}</span>
            </div>
            <div className="flex items-center justify-between text-stone-600">
              <span className="font-semibold">Status:</span>
              <StatusBadge status="AVAILABLE" size="sm" />
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setActivePage('find')}
              className="px-8 py-3.5 rounded-full bg-[#12372A] text-white font-extrabold text-xs hover:bg-[#1B4D3B] transition-all flex items-center gap-2"
            >
              <span>View in Find Food Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFoodName('');
              }}
              className="px-6 py-3.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors"
            >
              Post Another Donation
            </button>
          </div>
        </div>
      ) : (
        /* Large Two-Column Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Donation Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-6 sm:p-10 border border-stone-200/90 shadow-sm">
            
            {/* Header info */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-2xl object-cover border border-stone-200"
                />
                <div>
                  <span className="text-xs text-stone-500 font-medium block">Posting as Donor</span>
                  <span className="text-sm font-extrabold text-[#12372A]">{currentUser.name}</span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-[#2E8B57] bg-[#DFF5E1] px-3 py-1 rounded-full">
                Donor Verified
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Food Name & AI Assistance Button */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-extrabold text-[#171717] uppercase tracking-wider">
                    Food Name / Meal Title *
                  </label>
                  <button
                    type="button"
                    onClick={handleAiClassify}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#2E8B57] hover:text-[#12372A] bg-[#DFF5E1]/60 hover:bg-[#DFF5E1] px-3 py-1 rounded-full transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#FF9F43]" />
                    {isAiAnalyzing ? 'Analyzing...' : 'AI Auto-Classify'}
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  placeholder="e.g. 50 Vegetarian Meals or Bakery Loaves"
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#FFF9ED] border border-stone-200 focus:border-[#12372A] focus:bg-white text-sm font-medium outline-none transition-all text-[#171717]"
                />
              </div>

              {/* AI Classification Feedback Banner if Triggered */}
              {aiResult && (
                <div className="p-4 rounded-2xl bg-[#DFF5E1]/60 border border-[#BCE8C1] text-xs space-y-1.5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-[#12372A] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#2E8B57]" /> AI Category Suggestion: {aiResult.category}
                    </span>
                    <span className="text-[10px] font-bold text-[#2E8B57] bg-white px-2 py-0.5 rounded-full">
                      {(aiResult.confidence * 100).toFixed(0)}% Confidence
                    </span>
                  </div>
                  <p className="text-stone-700">{aiResult.storage_tip}</p>
                  <p className="text-[10px] text-stone-500 italic pt-1">
                    * AI classification is an assistance feature. Donor remains responsible for quality verification.
                  </p>
                </div>
              )}

              {/* Category & Dietary Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-extrabold text-[#171717] uppercase tracking-wider block mb-1.5">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as FoodCategory)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#FFF9ED] border border-stone-200 focus:border-[#12372A] focus:bg-white text-sm font-medium outline-none transition-all text-[#171717]"
                  >
                    <option value="Cooked Meal">Cooked Meal</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Produce">Produce / Fresh Farm</option>
                    <option value="Packaged Food">Packaged Food</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-extrabold text-[#171717] uppercase tracking-wider block mb-1.5">
                    Dietary Classification
                  </label>
                  <select
                    value={dietaryType}
                    onChange={(e) => setDietaryType(e.target.value as any)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#FFF9ED] border border-stone-200 focus:border-[#12372A] focus:bg-white text-sm font-medium outline-none transition-all text-[#171717]"
                  >
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Non-Veg">Non-Veg</option>
                  </select>
                </div>
              </div>

              {/* Quantity & Units */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-extrabold text-[#171717] uppercase tracking-wider block mb-1.5">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#FFF9ED] border border-stone-200 focus:border-[#12372A] focus:bg-white text-sm font-medium outline-none transition-all text-[#171717]"
                  />
                </div>

                <div>
                  <label className="text-xs font-extrabold text-[#171717] uppercase tracking-wider block mb-1.5">
                    Unit *
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#FFF9ED] border border-stone-200 focus:border-[#12372A] focus:bg-white text-sm font-medium outline-none transition-all text-[#171717]"
                  >
                    <option value="portions">portions</option>
                    <option value="boxes">boxes</option>
                    <option value="kg">kg</option>
                    <option value="meals">meals</option>
                    <option value="liters">liters</option>
                  </select>
                </div>
              </div>

              {/* Prep Time & Available Until Deadline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-extrabold text-[#171717] uppercase tracking-wider block mb-1.5">
                    Preparation Time
                  </label>
                  <input
                    type="text"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                    placeholder="e.g. Today 1:00 PM"
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#FFF9ED] border border-stone-200 focus:border-[#12372A] focus:bg-white text-sm font-medium outline-none transition-all text-[#171717]"
                  />
                </div>

                <div>
                  <label className="text-xs font-extrabold text-[#171717] uppercase tracking-wider block mb-1.5">
                    Available Until (Pickup Deadline) *
                  </label>
                  <input
                    type="text"
                    required
                    value={availableUntil}
                    onChange={(e) => setAvailableUntil(e.target.value)}
                    placeholder="e.g. 8:30 PM"
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#FFF9ED] border border-stone-200 focus:border-[#12372A] focus:bg-white text-sm font-medium outline-none transition-all text-[#171717]"
                  />
                </div>
              </div>

              {/* Pickup Location */}
              <div>
                <label className="text-xs font-extrabold text-[#171717] uppercase tracking-wider block mb-1.5">
                  Pickup Location & Landmark *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-4 top-4" />
                  <input
                    type="text"
                    required
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Street, Building, Dispatch Door"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#FFF9ED] border border-stone-200 focus:border-[#12372A] focus:bg-white text-sm font-medium outline-none transition-all text-[#171717]"
                  />
                </div>
              </div>

              {/* Priority Selection */}
              <div>
                <label className="text-xs font-extrabold text-[#171717] uppercase tracking-wider block mb-1.5">
                  Urgency / Priority
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['NORMAL', 'SOON', 'URGENT'] as PriorityLevel[]).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setPriority(lvl)}
                      className={`py-2.5 rounded-2xl border text-xs font-bold transition-all ${
                        priority === lvl
                          ? 'border-[#12372A] bg-[#12372A] text-white shadow-sm'
                          : 'border-stone-200 bg-[#FFF9ED] text-[#171717] hover:bg-stone-100'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-extrabold text-[#171717] uppercase tracking-wider block mb-1.5">
                  Packaging & Handling Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Specify packaging containers, warmth, allergen details..."
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#FFF9ED] border border-stone-200 focus:border-[#12372A] focus:bg-white text-sm font-medium outline-none transition-all text-[#171717]"
                />
              </div>

              {/* Food Image URL / Presets */}
              <div>
                <label className="text-xs font-extrabold text-[#171717] uppercase tracking-wider block mb-1.5">
                  Food Photography URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#FFF9ED] border border-stone-200 focus:border-[#12372A] focus:bg-white text-sm font-medium outline-none transition-all text-[#171717]"
                />
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] text-stone-500">Demo Presets:</span>
                  <button
                    type="button"
                    onClick={() => setImageUrl('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80')}
                    className="text-[11px] font-bold text-[#2E8B57] hover:underline"
                  >
                    Cooked Meals
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageUrl('https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80')}
                    className="text-[11px] font-bold text-[#2E8B57] hover:underline"
                  >
                    Bakery
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageUrl('https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=1000&q=80')}
                    className="text-[11px] font-bold text-[#2E8B57] hover:underline"
                  >
                    Produce
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-stone-500 text-xs">
                  <ShieldCheck className="w-4 h-4 text-[#2E8B57]" />
                  <span>Compliant with Good Samaritan Food Donation Standards</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#FF9F43] hover:bg-[#F38E2C] text-stone-950 font-extrabold text-sm tracking-wide transition-all transform hover:-translate-y-0.5 shadow-lg shadow-orange-950/10 flex items-center justify-center gap-2"
                >
                  <span>POST DONATION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>

          {/* Right Column: Live Donation Preview (5 Cols) */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2E8B57] flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> LIVE DONATION PREVIEW
              </span>
              <span className="text-[11px] text-stone-500 font-medium">Updates dynamically</span>
            </div>

            {/* Live Preview Card */}
            <div className="bg-white rounded-[2.5rem] border border-stone-200/90 shadow-xl overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80'}
                  alt={foodName || 'Donation preview'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#12372A]">
                    {category}
                  </span>
                  <PriorityBadge priority={priority} size="sm" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] uppercase font-bold text-[#FF9F43] block">
                    {currentUser.name}
                  </span>
                  <h3 className="text-lg font-black tracking-tight leading-tight">
                    {foodName || 'Surplus Meal Listing'}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-[#FFF9ED] rounded-2xl border border-stone-200/60">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Quantity</span>
                    <span className="text-lg font-black text-[#12372A]">
                      {quantity} {unit.toUpperCase()}
                    </span>
                  </div>
                  <div className="p-3 bg-[#FFF9ED] rounded-2xl border border-stone-200/60">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Available Until</span>
                    <span className="text-lg font-black text-[#FF9F43]">
                      {availableUntil || '8:30 PM'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 text-stone-700">
                    <MapPin className="w-4 h-4 text-[#2E8B57] flex-shrink-0 mt-0.5" />
                    <span className="font-semibold">{pickupLocation || 'Pickup location not specified'}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                    <span className="text-stone-500 font-medium">Status:</span>
                    <StatusBadge status="AVAILABLE" size="sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500 font-medium">Dietary Type:</span>
                    <span className="font-bold text-[#12372A]">{dietaryType}</span>
                  </div>
                </div>

                <p className="text-xs text-[#6B6B63] leading-relaxed italic border-t border-stone-100 pt-3">
                  "{description || 'Freshly prepared food ready for immediate distribution.'}"
                </p>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-[#DFF5E1]/60 border border-[#BCE8C1] text-xs text-stone-700 space-y-1">
              <span className="font-bold text-[#12372A] block">What happens when you post?</span>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                1. Instantly alerts top-matched local NGOs.<br />
                2. Dispatches notifications to certified volunteers.<br />
                3. Live route tracking enabled upon acceptance.
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
