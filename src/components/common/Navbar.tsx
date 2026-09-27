import React, { useState, useEffect } from 'react';
import { useFoodRescue, ActivePage } from '../../context/FoodRescueContext';
import { Bell, Menu, X, ArrowUpRight, UserCircle, Sparkles, HeartHandshake } from 'lucide-react';
import { RoleSwitcherModal } from './RoleSwitcherModal';

export const Navbar: React.FC = () => {
  const { 
    activePage, 
    setActivePage, 
    unreadNotifsCount, 
    setIsNotifOpen, 
    currentUser,
    isAuthenticated,
    logoutUser 
  } = useFoodRescue();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: ActivePage; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'donate', label: 'Donate' },
    { id: 'find', label: 'Find Food' },
    { id: 'volunteer', label: 'Volunteer' },
    { id: 'impact', label: 'Impact' },
    { id: 'dashboard', label: 'Dashboard' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 py-3 sm:py-4 px-4 sm:px-8 ${
          isScrolled 
            ? 'bg-[#FFF9ED]/90 backdrop-blur-md shadow-sm border-b border-stone-200/50' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => setActivePage('home')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#12372A] text-white flex items-center justify-center font-extrabold shadow-sm shadow-[#12372A]/20 transition-transform group-hover:scale-105">
              <span className="text-xl tracking-tighter text-[#DFF5E1]">FR</span>
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#12372A] block leading-none">
                FOODRESCUE
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#2E8B57] block mt-0.5">
                Surplus To Hope
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/70 p-1.5 rounded-full border border-stone-200/80 shadow-sm backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActivePage(link.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#12372A] text-white shadow-sm'
                      : 'text-[#6B6B63] hover:text-[#171717] hover:bg-stone-100/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Section Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Notification Bell */}
            <button
              onClick={() => setIsNotifOpen(true)}
              className="relative w-10 h-10 rounded-full bg-white/80 border border-stone-200/80 flex items-center justify-center text-stone-700 hover:text-[#12372A] hover:bg-white transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FF9F43] text-stone-950 text-[10px] font-extrabold flex items-center justify-center border-2 border-[#FFF9ED]">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* Auth State & Profile */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {/* Profile & Role Switcher Pill */}
                <button
                  onClick={() => setIsRoleModalOpen(true)}
                  className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-white/90 border border-stone-200/80 hover:border-stone-300 shadow-sm transition-all"
                  title="Switch user role"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-stone-200"
                  />
                  <div className="text-left">
                    <span className="block text-[11px] font-bold text-[#171717] leading-tight truncate max-w-[90px]">
                      {currentUser.name}
                    </span>
                    <span className="block text-[9px] uppercase font-bold tracking-wider text-[#2E8B57]">
                      {currentUser.role}
                    </span>
                  </div>
                </button>

                {/* Profile Page Link */}
                <button
                  onClick={() => setActivePage('profile')}
                  className={`p-2 rounded-full border border-stone-200/80 transition-colors ${
                    activePage === 'profile' ? 'bg-[#12372A] text-white' : 'bg-white/80 text-stone-700 hover:bg-white'
                  }`}
                  title="View Profile"
                >
                  <UserCircle className="w-5 h-5" />
                </button>

                {/* Logout Button */}
                <button
                  onClick={() => {
                    logoutUser();
                    setActivePage('login');
                  }}
                  className="hidden xl:inline-flex text-xs font-semibold text-stone-500 hover:text-stone-900 px-3 py-1.5 rounded-full hover:bg-stone-100 transition-colors"
                  title="Sign Out"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActivePage('login')}
                className="px-5 py-2 rounded-full bg-white border border-stone-200/90 text-xs font-extrabold text-[#12372A] hover:bg-[#FFF9ED] transition-colors shadow-sm"
              >
                Sign In
              </button>
            )}

            {/* Primary Action Button */}
            <button
              onClick={() => setActivePage('donate')}
              className="hidden lg:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#12372A] text-white text-xs font-extrabold hover:bg-[#1B4D3B] transition-all shadow-sm active:scale-95"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#DFF5E1]" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-2xl bg-white border border-stone-200 flex items-center justify-center text-stone-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-white/95 backdrop-blur-xl rounded-3xl border border-stone-200 shadow-xl space-y-2">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs font-bold text-stone-900">{currentUser.name}</p>
                  <p className="text-[10px] font-semibold text-[#2E8B57] uppercase">{currentUser.role}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsRoleModalOpen(true);
                }}
                className="text-[11px] font-bold text-[#12372A] bg-[#DFF5E1] px-2.5 py-1 rounded-full"
              >
                Switch Role
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5 pt-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActivePage(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2.5 rounded-2xl text-xs font-bold text-left transition-colors ${
                    activePage === link.id
                      ? 'bg-[#12372A] text-white'
                      : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between gap-2">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logoutUser();
                    setActivePage('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-1/2 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => {
                    setActivePage('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-1/2 py-2.5 rounded-2xl bg-[#12372A] text-white text-xs font-bold transition-colors"
                >
                  Sign In
                </button>
              )}

              <button
                onClick={() => {
                  setActivePage('donate');
                  setMobileMenuOpen(false);
                }}
                className="w-1/2 py-2.5 rounded-2xl bg-[#FF9F43] text-stone-950 font-extrabold text-xs flex items-center justify-center gap-1.5"
              >
                Post Surplus <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Role Switcher Modal */}
      <RoleSwitcherModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
      />
    </>
  );
};
