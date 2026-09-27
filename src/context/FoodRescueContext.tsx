import React, { createContext, useContext, useState, useEffect } from 'react';
import { Donation, Pickup, ImpactMetrics, NotificationItem, User, UserRole, PriorityLevel, FoodCategory } from '../types';
import { INITIAL_DONATIONS, INITIAL_PICKUPS, INITIAL_NOTIFICATIONS, USERS, triggerConfetti } from '../services/dataService';

export type ActivePage = 'home' | 'donate' | 'find' | 'volunteer' | 'dashboard' | 'profile' | 'impact';

interface FoodRescueContextType {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  currentUser: User;
  setUserRole: (role: UserRole) => void;
  donations: Donation[];
  pickups: Pickup[];
  impact: ImpactMetrics;
  notifications: NotificationItem[];
  unreadNotifsCount: number;
  isNotifOpen: boolean;
  setIsNotifOpen: (open: boolean) => void;
  markNotifAsRead: (id: string) => void;
  markAllNotifsAsRead: () => void;
  createDonation: (formData: Partial<Donation>) => Donation;
  acceptDonation: (donationId: string, volunteerName?: string) => Pickup | null;
  updatePickupStep: (pickupId: string, step: number) => void;
  classifyFoodAI: (foodName: string, description: string) => {
    category: FoodCategory;
    confidence: number;
    priority: PriorityLevel;
    storage_tip: string;
  };
  highlightedDonationId: string | null;
  setHighlightedDonationId: (id: string | null) => void;
  demoStep: number;
  setDemoStep: (step: number) => void;
  runDemoStep: (step: number) => void;
  resetDemoData: () => void;
}

const FoodRescueContext = createContext<FoodRescueContextType | undefined>(undefined);

export const FoodRescueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [currentUser, setCurrentUser] = useState<User>(USERS.donor);
  const [donations, setDonations] = useState<Donation[]>(() => {
    const saved = localStorage.getItem('foodrescue_donations');
    return saved ? JSON.parse(saved) : INITIAL_DONATIONS;
  });
  const [pickups, setPickups] = useState<Pickup[]>(() => {
    const saved = localStorage.getItem('foodrescue_pickups');
    return saved ? JSON.parse(saved) : INITIAL_PICKUPS;
  });
  const [impact, setImpact] = useState<ImpactMetrics>(() => {
    const saved = localStorage.getItem('foodrescue_impact');
    return saved ? JSON.parse(saved) : {
      meals_rescued: 12840,
      donations_count: 426,
      successful_pickups: 391,
      active_volunteers: 74,
      co2_saved_kg: 5136,
      water_saved_liters: 96300,
      ngos_supported: 32
    };
  });
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('foodrescue_notifs');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [highlightedDonationId, setHighlightedDonationId] = useState<string | null>(null);
  const [demoStep, setDemoStep] = useState<number>(0);

  // Persistence
  useEffect(() => {
    localStorage.setItem('foodrescue_donations', JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem('foodrescue_pickups', JSON.stringify(pickups));
  }, [pickups]);

  useEffect(() => {
    localStorage.setItem('foodrescue_impact', JSON.stringify(impact));
  }, [impact]);

  useEffect(() => {
    localStorage.setItem('foodrescue_notifs', JSON.stringify(notifications));
  }, [notifications]);

  const setUserRole = (role: UserRole) => {
    if (USERS[role]) {
      setCurrentUser(USERS[role]);
    }
  };

  const markNotifAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotifsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const classifyFoodAI = (foodName: string, description: string) => {
    const combined = (foodName + ' ' + description).toLowerCase();
    let category: FoodCategory = 'Cooked Meal';
    let confidence = 0.94;
    let priority: PriorityLevel = 'SOON';
    let storage_tip = 'Keep warm in food-grade insulated thermal containers.';

    if (combined.includes('bread') || combined.includes('croissant') || combined.includes('loaf') || combined.includes('pastry') || combined.includes('bakery')) {
      category = 'Bakery';
      confidence = 0.98;
      priority = 'NORMAL';
      storage_tip = 'Keep at room temperature away from moisture.';
    } else if (combined.includes('veg') && (combined.includes('raw') || combined.includes('fruit') || combined.includes('produce') || combined.includes('tomato') || combined.includes('greens'))) {
      category = 'Produce';
      confidence = 0.96;
      priority = 'NORMAL';
      storage_tip = 'Keep chilled or well aerated in plastic crates.';
    } else if (combined.includes('milk') || combined.includes('curd') || combined.includes('paneer') || combined.includes('cheese') || combined.includes('dairy')) {
      category = 'Dairy';
      confidence = 0.95;
      priority = 'URGENT';
      storage_tip = 'Cold-chain transport needed (< 4°C). Consume within 4 hours.';
    } else if (combined.includes('juice') || combined.includes('drink') || combined.includes('beverage')) {
      category = 'Beverages';
      confidence = 0.92;
      priority = 'NORMAL';
      storage_tip = 'Transport in spill-proof dispensers.';
    } else if (combined.includes('packet') || combined.includes('box') || combined.includes('can') || combined.includes('biscuit')) {
      category = 'Packaged Food';
      confidence = 0.97;
      priority = 'NORMAL';
      storage_tip = 'Verify seal integrity before distribution.';
    }

    return { category, confidence, priority, storage_tip };
  };

  const createDonation = (formData: Partial<Donation>): Donation => {
    const ngos = [
      { id: 'ngo-001', name: 'Hope Community Kitchen & Shelter', match_score: 94, distance_km: 2.1, capacity_portions: 60 },
      { id: 'ngo-002', name: 'Sunrise Children Haven', match_score: 88, distance_km: 3.9, capacity_portions: 80 },
      { id: 'ngo-003', name: 'Care & Feed Community Trust', match_score: 85, distance_km: 4.1, capacity_portions: 90 }
    ];

    const newDonation: Donation = {
      id: `don-${Date.now().toString().slice(-4)}`,
      donor_id: currentUser.id,
      donor_name: formData.donor_name || currentUser.name,
      food_name: formData.food_name || '50 Vegetarian Meals',
      category: formData.category || 'Cooked Meal',
      quantity: Number(formData.quantity) || 50,
      unit: formData.unit || 'portions',
      description: formData.description || 'Nutritious meals prepared hygienically. Ready for immediate pickup.',
      image_url: formData.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
      pickup_location: formData.pickup_location || 'College Road Restaurant Hub',
      latitude: formData.latitude || 17.3850,
      longitude: formData.longitude || 78.4867,
      available_from: formData.available_from || 'Current',
      available_until: formData.available_until || '8:30 PM',
      status: 'AVAILABLE',
      priority: formData.priority || 'SOON',
      created_at: new Date().toISOString(),
      dietary_type: formData.dietary_type || 'Vegetarian',
      prep_time: formData.prep_time || 'Just now',
      distance_km: formData.distance_km || 1.8,
      matched_ngo: ngos[0]
    };

    setDonations(prev => [newDonation, ...prev]);
    setImpact(prev => ({
      ...prev,
      donations_count: prev.donations_count + 1
    }));

    // Trigger Notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'New Donation Available',
      message: `${newDonation.donor_name} posted ${newDonation.quantity} ${newDonation.unit} of "${newDonation.food_name}".`,
      type: 'donation',
      timestamp: 'Just now',
      read: false,
      action_label: 'View in Find Food',
      action_path: '/find',
      donation_id: newDonation.id
    };

    setNotifications(prev => [newNotif, ...prev]);
    setHighlightedDonationId(newDonation.id);
    return newDonation;
  };

  const acceptDonation = (donationId: string, volunteerName: string = 'Mahesh (Food Hero)'): Pickup | null => {
    const donation = donations.find(d => d.id === donationId);
    if (!donation || donation.status !== 'AVAILABLE') return null;

    // Update donation status
    setDonations(prev => prev.map(d => {
      if (d.id === donationId) {
        return {
          ...d,
          status: 'PICKUP',
          assigned_volunteer: {
            id: 'usr-vol-1',
            name: volunteerName,
            phone: '+91 98765 43210',
            avatar: USERS.volunteer.avatar
          }
        };
      }
      return d;
    }));

    const newPickup: Pickup = {
      id: `pck-${Date.now().toString().slice(-4)}`,
      donation_id: donation.id,
      donation: { ...donation, status: 'PICKUP' },
      volunteer_id: 'usr-vol-1',
      volunteer_name: volunteerName,
      pickup_time: `Before ${donation.available_until}`,
      status: 'ACCEPTED',
      current_step: 1,
      pickup_location: donation.pickup_location,
      delivery_location: donation.matched_ngo ? `${donation.matched_ngo.name}, Sector 3` : 'Hope Shelter Central',
      ngo_name: donation.matched_ngo ? donation.matched_ngo.name : 'Hope Community Kitchen'
    };

    setPickups(prev => [newPickup, ...prev]);

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Donation Accepted ✓',
        message: `${volunteerName} accepted pickup for ${donation.quantity} ${donation.unit} from ${donation.donor_name}.`,
        type: 'pickup',
        timestamp: 'Just now',
        read: false,
        action_label: 'Open Tracker',
        action_path: '/volunteer',
        donation_id: donation.id
      },
      ...prev
    ]);

    return newPickup;
  };

  const updatePickupStep = (pickupId: string, step: number) => {
    let completedDonation: Donation | undefined;

    setPickups(prev => prev.map(p => {
      if (p.id === pickupId) {
        const stepStatusMap: Record<number, Pickup['status']> = {
          1: 'ACCEPTED',
          2: 'GOING_TO_PICKUP',
          3: 'FOOD_COLLECTED',
          4: 'DELIVERED'
        };
        const newStatus = stepStatusMap[step] || p.status;
        return {
          ...p,
          current_step: step,
          status: newStatus,
          completed_at: step === 4 ? new Date().toISOString() : p.completed_at
        };
      }
      return p;
    }));

    // Update related donation
    const targetPickup = pickups.find(p => p.id === pickupId);
    if (targetPickup) {
      setDonations(prev => prev.map(d => {
        if (d.id === targetPickup.donation_id) {
          if (step === 2) return { ...d, status: 'PICKUP' };
          if (step === 3) return { ...d, status: 'COLLECTED' };
          if (step === 4) {
            completedDonation = d;
            return { ...d, status: 'DELIVERED' };
          }
        }
        return d;
      }));
    }

    if (step === 4) {
      const addedQuantity = completedDonation ? Number(completedDonation.quantity) : 50;
      setImpact(prev => ({
        ...prev,
        meals_rescued: prev.meals_rescued + addedQuantity,
        successful_pickups: prev.successful_pickups + 1,
        co2_saved_kg: prev.co2_saved_kg + Math.round(addedQuantity * 0.4),
        water_saved_liters: prev.water_saved_liters + Math.round(addedQuantity * 7.5)
      }));

      triggerConfetti();

      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          title: 'Food Delivered Successfully! 🎉',
          message: `Meals successfully delivered to community shelter. Meals Rescued +${addedQuantity}!`,
          type: 'delivery',
          timestamp: 'Just now',
          read: false,
          action_label: 'View Impact',
          action_path: '/impact'
        },
        ...prev
      ]);
    }
  };

  const resetDemoData = () => {
    setDonations(INITIAL_DONATIONS);
    setPickups(INITIAL_PICKUPS);
    setImpact({
      meals_rescued: 12840,
      donations_count: 426,
      successful_pickups: 391,
      active_volunteers: 74,
      co2_saved_kg: 5136,
      water_saved_liters: 96300,
      ngos_supported: 32
    });
    setNotifications(INITIAL_NOTIFICATIONS);
    setDemoStep(0);
    setHighlightedDonationId(null);
    localStorage.clear();
  };

  // Hackathon guided runner
  const runDemoStep = (stepNumber: number) => {
    setDemoStep(stepNumber);
    if (stepNumber === 1) {
      // Step 1: Donor posts 50 Vegetarian Meals at 8:30 PM
      setUserRole('donor');
      setActivePage('donate');
    } else if (stepNumber === 2) {
      // Step 2: Donation appears in Find Food
      setActivePage('find');
    } else if (stepNumber === 3) {
      // Step 3: AI Matching identifies suitable NGO
      setActivePage('home');
      setTimeout(() => {
        const el = document.getElementById('smart-matching-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (stepNumber === 4) {
      // Step 4: Volunteer accepts pickup
      setUserRole('volunteer');
      setActivePage('volunteer');
    } else if (stepNumber === 5) {
      // Step 5: Volunteer updates Accepted -> Going to Pickup -> Food Collected -> Delivered
      setUserRole('volunteer');
      setActivePage('volunteer');
    } else if (stepNumber === 6) {
      // Step 6: Dashboard automatically updates (12,840 -> 12,890)
      setActivePage('dashboard');
    } else if (stepNumber === 7) {
      // Step 7: Impact page reflects the new donation
      setActivePage('impact');
      triggerConfetti();
    }
  };

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  return (
    <FoodRescueContext.Provider
      value={{
        activePage,
        setActivePage,
        currentUser,
        setUserRole,
        donations,
        pickups,
        impact,
        notifications,
        unreadNotifsCount,
        isNotifOpen,
        setIsNotifOpen,
        markNotifAsRead,
        markAllNotifsAsRead,
        createDonation,
        acceptDonation,
        updatePickupStep,
        classifyFoodAI,
        highlightedDonationId,
        setHighlightedDonationId,
        demoStep,
        setDemoStep,
        runDemoStep,
        resetDemoData
      }}
    >
      {children}
    </FoodRescueContext.Provider>
  );
};

export const useFoodRescue = () => {
  const context = useContext(FoodRescueContext);
  if (!context) throw new Error('useFoodRescue must be used within FoodRescueProvider');
  return context;
};
