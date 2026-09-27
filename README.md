# FoodRescue (Surplus To Hope)

> **“Connect surplus food with people who can use it before it goes to waste.”**

FoodRescue is a premium, real-time social-impact technology platform that bridges the gap between commercial surplus food donors (restaurants, hotels, college canteens, hostels, banquet event organizers) and verified community shelters, NGOs, and certified volunteer couriers.

---

## 🎨 Visual Identity & Design Language

FoodRescue is crafted with an editorial, human, and modern social-impact design aesthetic inspired by world-class non-profit technology leaders:
- **Palette**:
  - Cream Background: `#FFF9ED`
  - Deep Forest Green: `#12372A`
  - Accent Leaf Green: `#2E8B57`
  - Mint Tint: `#DFF5E1`
  - Warm Highlight Orange: `#FF9F43`
  - Charcoal Typography: `#171717` / Muted `#6B6B63`
- **Typography**: Editorial typography hierarchy with *Plus Jakarta Sans* and *Manrope* (700–900 font weights for dominant hero headings).
- **Composition**: Large rounded containers (`rounded-[2.5rem]`), generous whitespace, floating interactive cards, asymmetric layout grids, and clean cartographic maps.

---

## 🚀 Core Features

1. **Editorial Landing Page**:
   - Large hero section with dominant heading `SAVE FOOD. SHARE HOPE.`
   - Overlaid interactive cards: `+50 meals rescued`, `2.1 km Pickup nearby`, `Donation matched ✓`
   - Editorial statistics section (12,840+ Meals Rescued, 426 Donations, 391 Pickups, 74 Volunteers)
   - 5-stage lifecycle: `01 DONATE` → `02 MATCH` → `03 PICKUP` → `04 DELIVER` → `05 IMPACT`
   - Editorial grid for `FOOD THAT NEEDS A HOME`
   - Interactive Smart AI Matching Engine (`Donor` → `AI Algorithm` → `Top NGOs` + `Volunteer`)
   - Human impact storytelling

2. **Donate Food Portal**:
   - Two-column responsive layout with **Live Dynamic Preview** that updates in real-time as donors fill out portions, location, and deadlines
   - Built-in **AI Auto-Classification Assistant** for suggesting category, shelf-life, and handling tips
   - Polished success state with milestone celebration and confetti

3. **Find Food & Interactive Cartography**:
   - Live discovery feed with filtering by Category, Distance, Dietary type, and Priority (`NORMAL`, `SOON`, `URGENT`)
   - Sorting by proximity, urgency, quantity, and recency
   - **Custom Stylized MapView** featuring custom markers for Donor, Volunteer, and Receiving NGO, complete with transit routes and distance badges

4. **Volunteer Dispatch & 4-Stage Progress Tracker**:
   - Available pickup acceptance flow
   - Large visual 4-step progress tracker:
     - `01 ACCEPTED`
     - `02 GOING TO PICKUP`
     - `03 FOOD COLLECTED`
     - `04 DELIVERED`
   - Real-time milestone trigger updating platform-wide impact statistics upon completion

5. **FoodRescue Impact Center (Dashboard)**:
   - Non-conventional editorial dashboard with huge primary counter (`12,840+ Meals Rescued`)
   - Asymmetric cards featuring weekly velocity charts and nutrition category breakdowns
   - Live ledger table tracking real-time status: `AVAILABLE`, `PICKUP`, `COLLECTED`, `DELIVERED`

6. **Impact & Community Identity**:
   - Environmental metric counters (CO₂ avoided, water footprint saved)
   - Verified Donor and Volunteer profile personas (`FOOD HERO` badge, lifetime statistics)
   - Role switcher modal (`Donor`, `NGO`, `Volunteer`, `Admin`)
   - Real-time Notifications drawer

7. **Hackathon Guided Walkthrough Drawer**:
   - Persistent bottom-right interactive assistant providing 1-click execution for all 7 Hackathon demo steps.

---

## 🏆 End-to-End Hackathon Demo Flow

The application natively supports and verifies the exact 7-step Hackathon demo:

| Step | Action | Platform Behavior |
|---|---|---|
| **1** | Restaurant posts donation | Restaurant fills `50 Vegetarian Meals`, Pickup by `8:30 PM`. Live preview updates dynamically. |
| **2** | Listing in Find Food | Instantly appears in Find Food feed with portions, priority, and map coordinates. |
| **3** | AI Matching Engine | Matches with `Hope Community Kitchen & Shelter` (94% compatibility). |
| **4** | Volunteer accepts pickup | Volunteer Mahesh claims dispatch request; donor receives acceptance notification. |
| **5** | Progressive status updates | Advances through: `Accepted` → `Going to Pickup` → `Food Collected` → `Delivered`. |
| **6** | Dashboard counter increments | Meals Rescued jumps automatically from **12,840 → 12,890** (+50 meals). |
| **7** | Impact page reflection | Environmental metrics and milestone ledger update with confetti celebration! |

---

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide React, Canvas-Confetti
- **Backend**: Node.js, Express.js (REST API on port `5002` with Vite proxy)
- **Database Architecture**: Firebase Firestore ready schemas (`users`, `donations`, `pickups`, `notifications`, `impact`) with reactive local cache fallback.

---

## 🏃‍♂️ Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the application
Run the frontend and backend together:
```bash
npm run dev:all
```
Or separately:
```bash
# Terminal 1: Backend API
npm run server

# Terminal 2: Frontend
npm run dev
```

Frontend will be available at: **http://localhost:5180/**
Backend API will be available at: **http://localhost:5002/api**
