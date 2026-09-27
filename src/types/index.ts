export type FoodCategory = 
  | 'Cooked Meal' 
  | 'Bakery' 
  | 'Produce' 
  | 'Packaged Food' 
  | 'Dairy' 
  | 'Beverages';

export type DonationStatus = 
  | 'AVAILABLE' 
  | 'PICKUP' 
  | 'COLLECTED' 
  | 'DELIVERED' 
  | 'EXPIRED';

export type PriorityLevel = 'NORMAL' | 'SOON' | 'URGENT';

export interface Donation {
  id: string;
  donor_id: string;
  donor_name: string;
  food_name: string;
  category: FoodCategory;
  quantity: number;
  unit: string;
  description: string;
  image_url: string;
  pickup_location: string;
  latitude: number;
  longitude: number;
  available_from: string;
  available_until: string;
  status: DonationStatus;
  priority: PriorityLevel;
  created_at: string;
  dietary_type?: 'Vegetarian' | 'Vegan' | 'Non-Veg';
  prep_time?: string;
  distance_km?: number;
  matched_ngo?: {
    id: string;
    name: string;
    match_score: number;
    distance_km: number;
    capacity_portions: number;
  };
  assigned_volunteer?: {
    id: string;
    name: string;
    phone: string;
    avatar: string;
  };
}

export type PickupStatus = 
  | 'ACCEPTED' 
  | 'GOING_TO_PICKUP' 
  | 'FOOD_COLLECTED' 
  | 'DELIVERED';

export interface Pickup {
  id: string;
  donation_id: string;
  donation?: Donation;
  volunteer_id: string;
  volunteer_name: string;
  pickup_time: string;
  status: PickupStatus;
  pickup_location: string;
  delivery_location: string;
  ngo_name: string;
  completed_at?: string;
  current_step: number; // 1: ACCEPTED, 2: GOING_TO_PICKUP, 3: FOOD_COLLECTED, 4: DELIVERED
}

export type UserRole = 'donor' | 'ngo' | 'volunteer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  organization?: string;
  phone?: string;
  impact_stats?: {
    donations_count?: number;
    meals_rescued?: number;
    pickups_completed?: number;
    km_covered?: number;
    impact_level?: number;
    badge?: string;
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'donation' | 'match' | 'pickup' | 'delivery' | 'urgent' | 'system';
  timestamp: string;
  read: boolean;
  action_label?: string;
  action_path?: string;
  donation_id?: string;
}

export interface ImpactMetrics {
  meals_rescued: number;
  donations_count: number;
  successful_pickups: number;
  active_volunteers: number;
  co2_saved_kg: number;
  water_saved_liters: number;
  ngos_supported: number;
}
