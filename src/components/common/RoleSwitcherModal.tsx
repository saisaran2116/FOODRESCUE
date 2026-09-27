import React from 'react';
import { useFoodRescue } from '../../context/FoodRescueContext';
import { UserRole } from '../../types';
import { USERS } from '../../services/dataService';
import { X, Check, Utensils, HeartHandshake, Truck, ShieldAlert } from 'lucide-react';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoleSwitcherModal: React.FC<RoleSwitcherModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, setUserRole, setActivePage } = useFoodRescue();

  if (!isOpen) return null;

  const roles: { role: UserRole; title: string; desc: string; icon: React.ReactNode; user: typeof USERS[UserRole] }[] = [
    {
      role: 'donor',
      title: 'Donor / Restaurant',
      desc: 'Post surplus food, see live donation previews, trigger AI matching.',
      icon: <Utensils className="w-5 h-5 text-amber-600" />,
      user: USERS.donor
    },
    {
      role: 'volunteer',
      title: 'Volunteer (Food Hero)',
      desc: 'Accept pickups, update status on route, track delivery milestones.',
      icon: <Truck className="w-5 h-5 text-[#2E8B57]" />,
      user: USERS.volunteer
    },
    {
      role: 'ngo',
      title: 'Community NGO',
      desc: 'Browse surplus food by distance, claim meals for community shelters.',
      icon: <HeartHandshake className="w-5 h-5 text-rose-600" />,
      user: USERS.ngo
    },
    {
      role: 'admin',
      title: 'Operations Admin',
      desc: 'View comprehensive impact center, dispatch logs, platform analytics.',
      icon: <ShieldAlert className="w-5 h-5 text-[#12372A]" />,
      user: USERS.admin
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
      <div className="bg-[#FFF9ED] rounded-[2rem] max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200/80">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-[#2E8B57] uppercase">Interactive Testing</span>
            <h3 className="text-xl font-extrabold text-[#171717] mt-0.5">Switch Active Role</h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#6B6B63] my-4 leading-relaxed">
          Switch persona anytime to experience FoodRescue from the perspective of a restaurant donor, volunteer, receiving NGO, or operations lead.
        </p>

        <div className="space-y-3">
          {roles.map((item) => {
            const isSelected = currentUser.role === item.role;
            return (
              <button
                key={item.role}
                onClick={() => {
                  setUserRole(item.role);
                  if (item.role === 'donor') setActivePage('donate');
                  else if (item.role === 'volunteer') setActivePage('volunteer');
                  else if (item.role === 'ngo') setActivePage('find');
                  else if (item.role === 'admin') setActivePage('dashboard');
                  onClose();
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                  isSelected
                    ? 'bg-white border-[#12372A] shadow-md ring-2 ring-[#12372A]/10'
                    : 'bg-white/60 border-stone-200 hover:bg-white hover:border-stone-300'
                }`}
              >
                <div className="w-10 h-10 rounded-2xl bg-[#FFF9ED] border border-stone-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-[#171717]">{item.title}</h4>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#12372A] bg-[#DFF5E1] px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3 text-[#2E8B57]" /> Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#6B6B63] mt-0.5">{item.desc}</p>
                  <p className="text-[11px] text-[#2E8B57] font-semibold mt-1">
                    Logged in as: {item.user.name}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-stone-200/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#12372A] text-white text-xs font-bold hover:bg-[#1B4D3B] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
