import React from 'react';
import { DonationStatus } from '../../types';

interface StatusBadgeProps {
  status: DonationStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const isSm = size === 'sm';

  const map: Record<DonationStatus, { label: string; bg: string; dot: string }> = {
    AVAILABLE: {
      label: 'Available',
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      dot: 'bg-emerald-500'
    },
    PICKUP: {
      label: 'Pickup in Progress',
      bg: 'bg-amber-50 border-amber-200 text-amber-900',
      dot: 'bg-amber-500 animate-pulse'
    },
    COLLECTED: {
      label: 'Food Collected',
      bg: 'bg-sky-50 border-sky-200 text-sky-900',
      dot: 'bg-sky-500'
    },
    DELIVERED: {
      label: 'Delivered ✓',
      bg: 'bg-[#DFF5E1] border-[#BCE8C1] text-[#12372A]',
      dot: 'bg-[#2E8B57]'
    },
    EXPIRED: {
      label: 'Expired',
      bg: 'bg-stone-100 border-stone-200 text-stone-600',
      dot: 'bg-stone-400'
    }
  };

  const item = map[status] || map.AVAILABLE;

  return (
    <span className={`inline-flex items-center gap-1.5 font-semibold tracking-wide uppercase rounded-full border ${item.bg} ${isSm ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`}></span>
      {item.label}
    </span>
  );
};
