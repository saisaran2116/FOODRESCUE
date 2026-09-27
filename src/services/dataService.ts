import { Donation, Pickup, ImpactMetrics, NotificationItem, User } from '../types';
import confetti from 'canvas-confetti';

const INITIAL_IMPACT: ImpactMetrics = {
  meals_rescued: 12840,
  donations_count: 426,
  successful_pickups: 391,
  active_volunteers: 74,
  co2_saved_kg: 5136,
  water_saved_liters: 96300,
  ngos_supported: 32
};

export const INITIAL_DONATIONS: Donation[] = [
  {
    id: 'don-001',
    donor_id: 'usr-donor-1',
    donor_name: 'Green Leaf Restaurant',
    food_name: 'Fresh Vegetarian Thali & Rice Meals',
    category: 'Cooked Meal',
    quantity: 40,
    unit: 'portions',
    description: 'Hot vegetarian meals freshly packed from lunch service in hygienic stainless containers. Includes steamed basmati rice, mixed vegetable curry, yellow dal, and whole wheat chapatis.',
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
    pickup_location: 'College Road, Near City Center',
    latitude: 17.3850,
    longitude: 78.4867,
    available_from: '1:30 PM',
    available_until: '9:00 PM',
    status: 'AVAILABLE',
    priority: 'SOON',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    dietary_type: 'Vegetarian',
    prep_time: '12:45 PM Today',
    distance_km: 2.5,
    matched_ngo: {
      id: 'ngo-001',
      name: 'Hope Community Kitchen & Shelter',
      match_score: 94,
      distance_km: 2.1,
      capacity_portions: 60
    }
  },
  {
    id: 'don-002',
    donor_id: 'usr-donor-2',
    donor_name: 'Grand Hyatt Banquet Hall',
    food_name: 'Artisan Bakery Breads & Croissants',
    category: 'Bakery',
    quantity: 65,
    unit: 'boxes',
    description: 'Fresh surplus sourdough loaves, whole wheat baguettes, and assorted breakfast dinner rolls.',
    image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80',
    pickup_location: 'Financial District, Tower B Dock 4',
    latitude: 17.4120,
    longitude: 78.3450,
    available_from: '11:00 AM',
    available_until: '7:30 PM',
    status: 'AVAILABLE',
    priority: 'NORMAL',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    dietary_type: 'Vegetarian',
    prep_time: '8:00 AM Today',
    distance_km: 4.8,
    matched_ngo: {
      id: 'ngo-002',
      name: 'Sunrise Children Haven',
      match_score: 88,
      distance_km: 3.9,
      capacity_portions: 80
    }
  },
  {
    id: 'don-003',
    donor_id: 'usr-donor-3',
    donor_name: 'Campus Canteen Central',
    food_name: 'Steamed Rice & Lentil Curry (Dal)',
    category: 'Cooked Meal',
    quantity: 80,
    unit: 'portions',
    description: 'Freshly prepared nutritious lentils and cumin rice. Kept under controlled warmers. Highly suitable for community shelters.',
    image_url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=80',
    pickup_location: 'Tech University Campus, Gate 3',
    latitude: 17.4450,
    longitude: 78.3800,
    available_from: '3:00 PM',
    available_until: '6:30 PM',
    status: 'AVAILABLE',
    priority: 'URGENT',
    created_at: new Date(Date.now() - 3600000 * 1).toISOString(),
    dietary_type: 'Vegetarian',
    prep_time: '2:15 PM Today',
    distance_km: 1.8,
    matched_ngo: {
      id: 'ngo-001',
      name: 'Hope Community Kitchen & Shelter',
      match_score: 96,
      distance_km: 1.5,
      capacity_portions: 100
    }
  },
  {
    id: 'don-004',
    donor_id: 'usr-donor-4',
    donor_name: 'Metro Organic Farms Market',
    food_name: 'Assorted Seasonal Fresh Produce & Greens',
    category: 'Produce',
    quantity: 50,
    unit: 'kg',
    description: 'Surplus farm-fresh carrots, bell peppers, spinach bundles, and tomatoes. Good for immediate cooking or food pantries.',
    image_url: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=1000&q=80',
    pickup_location: 'Kukatpally Wholesale Yard, Gate 2',
    latitude: 17.4850,
    longitude: 78.4100,
    available_from: '9:00 AM',
    available_until: '8:00 PM',
    status: 'AVAILABLE',
    priority: 'NORMAL',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    dietary_type: 'Vegan',
    prep_time: 'Harvested Yesterday',
    distance_km: 5.2,
    matched_ngo: {
      id: 'ngo-003',
      name: 'Care & Feed Community Trust',
      match_score: 85,
      distance_km: 4.1,
      capacity_portions: 90
    }
  }
];

export const INITIAL_PICKUPS: Pickup[] = [
  {
    id: 'pck-101',
    donation_id: 'don-001',
    donation: INITIAL_DONATIONS[0],
    volunteer_id: 'usr-vol-1',
    volunteer_name: 'Mahesh (Food Hero)',
    pickup_time: 'By 8:00 PM',
    status: 'ACCEPTED',
    current_step: 1,
    pickup_location: 'College Road, Near City Center',
    delivery_location: 'Hope Community Kitchen, Sector 4',
    ngo_name: 'Hope Community Kitchen & Shelter'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Surplus Match Recommended',
    message: 'Campus Canteen Central posted 80 portions (1.8 km away). High priority match for Hope Shelter.',
    type: 'match',
    timestamp: '10 mins ago',
    read: false,
    action_label: 'View Donation',
    action_path: '/find'
  },
  {
    id: 'notif-2',
    title: 'Pickup Assigned to Volunteer',
    message: 'Volunteer Mahesh accepted pickup for 40 portions from Green Leaf Restaurant.',
    type: 'pickup',
    timestamp: '25 mins ago',
    read: false,
    action_label: 'Track Progress',
    action_path: '/volunteer'
  },
  {
    id: 'notif-3',
    title: 'Milestone Achieved 🎉',
    message: 'FoodRescue community has reached over 12,800 meals rescued this month!',
    type: 'system',
    timestamp: '2 hours ago',
    read: true,
    action_label: 'View Impact',
    action_path: '/impact'
  }
];

export const USERS: Record<string, User> = {
  donor: {
    id: 'usr-donor-1',
    name: 'Green Leaf Restaurant',
    email: 'contact@greenleaf.eco',
    role: 'donor',
    avatar: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=200&q=80',
    organization: 'Green Leaf Hospitality Group',
    phone: '+91 98765 12345',
    impact_stats: {
      donations_count: 48,
      meals_rescued: 1420,
      pickups_completed: 45,
      impact_level: 85,
      badge: 'GOLD SUSTAINABILITY CERTIFIED'
    }
  },
  volunteer: {
    id: 'usr-vol-1',
    name: 'Mahesh',
    email: 'mahesh.volunteer@foodrescue.org',
    role: 'volunteer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    phone: '+91 98765 43210',
    impact_stats: {
      pickups_completed: 26,
      meals_rescued: 740,
      km_covered: 48,
      impact_level: 92,
      badge: 'FOOD HERO'
    }
  },
  ngo: {
    id: 'usr-ngo-1',
    name: 'Hope Community Kitchen & Shelter',
    email: 'director@hopekitchen.org',
    role: 'ngo',
    avatar: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=200&q=80',
    organization: 'Hope Foundation Trust',
    phone: '+91 98765 88990',
    impact_stats: {
      donations_count: 112,
      meals_rescued: 3890,
      pickups_completed: 108,
      impact_level: 96,
      badge: 'ANCHOR COMMUNITY PARTNER'
    }
  },
  admin: {
    id: 'usr-admin-1',
    name: 'FoodRescue Operations Admin',
    email: 'admin@foodrescue.org',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    impact_stats: {
      meals_rescued: 12840,
      donations_count: 426,
      pickups_completed: 391,
      impact_level: 99
    }
  }
};

export const triggerConfetti = () => {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2E8B57', '#FF9F43', '#12372A', '#DFF5E1']
    });
  } catch (e) {
    // Ignore in SSR/non-browser
  }
};
