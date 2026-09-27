import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initial Seed Data aligned with Hackathon Demo & Metrics
let impactMetrics = {
  meals_rescued: 12840,
  donations_count: 426,
  successful_pickups: 391,
  active_volunteers: 74,
  co2_saved_kg: 5136,
  water_saved_liters: 96300,
  ngos_supported: 32
};

let donations = [
  {
    id: 'don-001',
    donor_id: 'usr-donor-1',
    donor_name: 'Green Leaf Restaurant',
    food_name: 'Fresh Vegetarian Thali & Rice Meals',
    category: 'Cooked Meal',
    quantity: 40,
    unit: 'portions',
    description: 'Hot vegetarian meals freshly packed from lunch service in hygienic stainless containers. Includes steamed rice, mixed vegetable curry, dal, and chapatis.',
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
    description: 'Fresh surplus sourdough loaves, whole wheat baguettes, and assorted dinner rolls from breakfast buffet.',
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

let pickups = [
  {
    id: 'pck-101',
    donation_id: 'don-001',
    donation: donations[0],
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

let notifications = [
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

// Helper: Calculate AI Match
function calculateSmartMatches(donation) {
  const ngos = [
    { id: 'ngo-001', name: 'Hope Community Kitchen & Shelter', capacity: 100, lat: 17.390, lng: 78.480 },
    { id: 'ngo-002', name: 'Sunrise Children Haven', capacity: 60, lat: 17.420, lng: 78.350 },
    { id: 'ngo-003', name: 'Care & Feed Community Trust', capacity: 80, lat: 17.470, lng: 78.420 }
  ];

  return ngos.map(ngo => {
    // Distance heuristic
    const dist = Math.sqrt(Math.pow((donation.latitude || 17.385) - ngo.lat, 2) + Math.pow((donation.longitude || 78.486) - ngo.lng, 2)) * 111;
    let score = 95 - Math.min(25, Math.round(dist * 3));
    if (donation.quantity <= ngo.capacity) score += 4;
    if (donation.priority === 'URGENT') score += 2;
    score = Math.min(99, Math.max(70, score));
    return {
      id: ngo.id,
      name: ngo.name,
      match_score: score,
      distance_km: parseFloat(dist.toFixed(1)),
      capacity_portions: ngo.capacity
    };
  }).sort((a, b) => b.match_score - a.match_score);
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'FoodRescue API Engine', timestamp: new Date().toISOString() });
});

// Impact
app.get('/api/impact', (req, res) => {
  res.json(impactMetrics);
});

// Donations
app.get('/api/donations', (req, res) => {
  const { category, priority, status, search } = req.query;
  let results = [...donations];

  if (category && category !== 'All') {
    results = results.filter(d => d.category.toLowerCase() === category.toLowerCase());
  }
  if (priority && priority !== 'All') {
    results = results.filter(d => d.priority.toLowerCase() === priority.toLowerCase());
  }
  if (status && status !== 'All') {
    results = results.filter(d => d.status.toLowerCase() === status.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(d => 
      d.food_name.toLowerCase().includes(q) || 
      d.pickup_location.toLowerCase().includes(q) ||
      d.donor_name.toLowerCase().includes(q)
    );
  }

  res.json(results);
});

app.get('/api/donations/:id', (req, res) => {
  const item = donations.find(d => d.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Donation not found' });
  res.json(item);
});

app.post('/api/donations', (req, res) => {
  const body = req.body;
  if (!body.food_name || !body.quantity) {
    return res.status(400).json({ error: 'Food name and quantity are required.' });
  }

  const matches = calculateSmartMatches(body);
  const bestMatch = matches[0];

  const newDonation = {
    id: `don-${Date.now().toString().slice(-4)}`,
    donor_id: body.donor_id || 'usr-donor-1',
    donor_name: body.donor_name || 'Green Leaf Restaurant',
    food_name: body.food_name,
    category: body.category || 'Cooked Meal',
    quantity: Number(body.quantity) || 50,
    unit: body.unit || 'portions',
    description: body.description || 'Nutritious surplus meal packed hygienically for community distribution.',
    image_url: body.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
    pickup_location: body.pickup_location || 'Main Street Restaurant Hub',
    latitude: body.latitude || 17.3850,
    longitude: body.longitude || 78.4867,
    available_from: body.available_from || 'Current',
    available_until: body.available_until || '8:30 PM',
    status: 'AVAILABLE',
    priority: body.priority || 'SOON',
    created_at: new Date().toISOString(),
    dietary_type: body.dietary_type || 'Vegetarian',
    prep_time: body.prep_time || 'Just now',
    distance_km: body.distance_km || 1.8,
    matched_ngo: bestMatch
  };

  donations.unshift(newDonation);
  impactMetrics.donations_count += 1;

  // Add system notification
  notifications.unshift({
    id: `notif-${Date.now()}`,
    title: 'New Donation Posted',
    message: `${newDonation.donor_name} posted ${newDonation.quantity} ${newDonation.unit} of "${newDonation.food_name}".`,
    type: 'donation',
    timestamp: 'Just now',
    read: false,
    action_label: 'View in Find Food',
    action_path: '/find',
    donation_id: newDonation.id
  });

  res.status(201).json({
    success: true,
    donation: newDonation,
    matches
  });
});

// Accept Donation
app.post('/api/donations/:id/accept', (req, res) => {
  const donation = donations.find(d => d.id === req.params.id);
  if (!donation) return res.status(404).json({ error: 'Donation not found' });

  if (donation.status !== 'AVAILABLE') {
    return res.status(400).json({ error: 'Donation has already been accepted or is no longer available.' });
  }

  const { volunteer_name = 'Mahesh (Food Hero)', volunteer_id = 'usr-vol-1', ngo_name } = req.body;

  donation.status = 'PICKUP';
  donation.assigned_volunteer = {
    id: volunteer_id,
    name: volunteer_name,
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  };

  const newPickup = {
    id: `pck-${Date.now().toString().slice(-4)}`,
    donation_id: donation.id,
    donation,
    volunteer_id,
    volunteer_name,
    pickup_time: `Before ${donation.available_until}`,
    status: 'ACCEPTED',
    current_step: 1,
    pickup_location: donation.pickup_location,
    delivery_location: donation.matched_ngo ? `${donation.matched_ngo.name}, Sector 3` : 'Hope Shelter Central',
    ngo_name: ngo_name || (donation.matched_ngo ? donation.matched_ngo.name : 'Hope Community Kitchen')
  };

  pickups.unshift(newPickup);

  notifications.unshift({
    id: `notif-${Date.now()}`,
    title: 'Donation Accepted ✓',
    message: `${volunteer_name} accepted pickup for ${donation.quantity} ${donation.unit} from ${donation.donor_name}.`,
    type: 'pickup',
    timestamp: 'Just now',
    read: false,
    action_label: 'Open Volunteer Tracker',
    action_path: '/volunteer',
    donation_id: donation.id
  });

  res.json({ success: true, donation, pickup: newPickup });
});

// Pickups
app.get('/api/pickups', (req, res) => {
  res.json(pickups);
});

// Update Pickup Status
app.post('/api/pickups/:id/status', (req, res) => {
  const pickup = pickups.find(p => p.id === req.params.id);
  if (!pickup) return res.status(404).json({ error: 'Pickup not found' });

  const { step, status } = req.body;
  
  if (step !== undefined) {
    pickup.current_step = step;
  }
  if (status) {
    pickup.status = status;
  }

  // Map step to donation status and impact metrics
  const donation = donations.find(d => d.id === pickup.donation_id);

  if (pickup.current_step === 2) {
    pickup.status = 'GOING_TO_PICKUP';
    if (donation) donation.status = 'PICKUP';
  } else if (pickup.current_step === 3) {
    pickup.status = 'FOOD_COLLECTED';
    if (donation) donation.status = 'COLLECTED';
  } else if (pickup.current_step === 4 || pickup.status === 'DELIVERED') {
    pickup.status = 'DELIVERED';
    pickup.completed_at = new Date().toISOString();
    if (donation) donation.status = 'DELIVERED';

    // Auto update metrics: add the exact meals/portions
    const addedMeals = donation ? Number(donation.quantity) : 50;
    impactMetrics.meals_rescued += addedMeals;
    impactMetrics.successful_pickups += 1;
    impactMetrics.co2_saved_kg += Math.round(addedMeals * 0.4);
    impactMetrics.water_saved_liters += Math.round(addedMeals * 7.5);

    notifications.unshift({
      id: `notif-${Date.now()}`,
      title: 'Food Delivered Successfully! 🎉',
      message: `${pickup.volunteer_name} delivered ${donation ? donation.food_name : 'meals'} to ${pickup.ngo_name}.`,
      type: 'delivery',
      timestamp: 'Just now',
      read: false,
      action_label: 'View Impact',
      action_path: '/impact'
    });
  }

  res.json({ success: true, pickup, impact: impactMetrics });
});

// AI Food Assistant Endpoint
app.post('/api/ai/classify-food', (req, res) => {
  const { food_name = '', description = '' } = req.body;
  const lower = (food_name + ' ' + description).toLowerCase();

  let category = 'Cooked Meal';
  let confidence = 0.94;
  let priority = 'SOON';
  let storage_tip = 'Keep covered in heat-insulated transport containers.';

  if (lower.includes('bread') || lower.includes('croissant') || lower.includes('pastry') || lower.includes('cake') || lower.includes('bake')) {
    category = 'Bakery';
    confidence = 0.98;
    priority = 'NORMAL';
    storage_tip = 'Store in dry moisture-proof packaging.';
  } else if (lower.includes('fruit') || lower.includes('vegetable') || lower.includes('spinach') || lower.includes('tomato') || lower.includes('greens') || lower.includes('produce')) {
    category = 'Produce';
    confidence = 0.96;
    priority = 'NORMAL';
    storage_tip = 'Refrigerate or keep in well-ventilated crates.';
  } else if (lower.includes('milk') || lower.includes('curd') || lower.includes('paneer') || lower.includes('cheese') || lower.includes('dairy')) {
    category = 'Dairy';
    confidence = 0.95;
    priority = 'URGENT';
    storage_tip = 'Requires immediate cold chain transport (below 4°C).';
  } else if (lower.includes('juice') || lower.includes('tea') || lower.includes('drink') || lower.includes('beverage')) {
    category = 'Beverages';
    confidence = 0.92;
    priority = 'NORMAL';
    storage_tip = 'Seal tightly to avoid spillage.';
  } else if (lower.includes('packet') || lower.includes('can') || lower.includes('biscuit') || lower.includes('grain') || lower.includes('packaged')) {
    category = 'Packaged Food';
    confidence = 0.97;
    priority = 'NORMAL';
    storage_tip = 'Inspect tamper-evident seal before transit.';
  }

  res.json({
    category,
    confidence,
    priority,
    storage_tip,
    disclaimer: 'AI classification is an assistance tool only. Donor must verify hygiene and food safety guidelines.'
  });
});

// Notifications
app.get('/api/notifications', (req, res) => {
  res.json(notifications);
});

app.post('/api/notifications/:id/read', (req, res) => {
  const n = notifications.find(item => item.id === req.params.id);
  if (n) n.read = true;
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`FoodRescue API Backend running on http://localhost:${PORT}`);
});
