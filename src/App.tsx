import React from 'react';
import { FoodRescueProvider, useFoodRescue } from './context/FoodRescueContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { DemoFlowGuide } from './components/hackathon/DemoFlowGuide';

// Pages & Sections
import { Hero } from './components/home/Hero';
import { StatsSection } from './components/home/StatsSection';
import { HowItWorks } from './components/home/HowItWorks';
import { FeaturedDonations } from './components/home/FeaturedDonations';
import { SmartMatchingHero } from './components/home/SmartMatchingHero';
import { CommunityStories } from './components/home/CommunityStories';

import { DonatePage } from './components/donate/DonatePage';
import { FindFoodPage } from './components/find/FindFoodPage';
import { VolunteerPage } from './components/volunteer/VolunteerPage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { ProfilePage } from './components/profile/ProfilePage';
import { ImpactPage } from './components/impact/ImpactPage';

const MainContent: React.FC = () => {
  const { activePage } = useFoodRescue();

  return (
    <main className="min-h-screen">
      {activePage === 'home' && (
        <div className="space-y-4">
          <Hero />
          <StatsSection />
          <HowItWorks />
          <FeaturedDonations />
          <SmartMatchingHero />
          <CommunityStories />
        </div>
      )}

      {activePage === 'donate' && <DonatePage />}
      {activePage === 'find' && <FindFoodPage />}
      {activePage === 'volunteer' && <VolunteerPage />}
      {activePage === 'dashboard' && <DashboardPage />}
      {activePage === 'profile' && <ProfilePage />}
      {activePage === 'impact' && <ImpactPage />}
    </main>
  );
};

export function App() {
  return (
    <FoodRescueProvider>
      <div className="min-h-screen bg-[#FFF9ED] text-[#171717] font-sans flex flex-col justify-between selection:bg-[#DFF5E1] selection:text-[#12372A]">
        <div>
          <Navbar />
          <MainContent />
        </div>
        <Footer />
        <NotificationDrawer />
        <DemoFlowGuide />
      </div>
    </FoodRescueProvider>
  );
}

export default App;
