import React from 'react';
import { PriorityLevel } from '../../types';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface PriorityBadgeProps {
  priority: PriorityLevel;
  size?: 'sm' | 'md';
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, size = 'md' }) => {
  const isSm = size === 'sm';
  
  if (priority === 'URGENT') {
    return (
      <span className={`inline-flex items-center gap-1.5 font-semibold tracking-wide uppercase rounded-full bg-rose-50 text-rose-700 border border-rose-200/80 ${isSm ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
        <AlertTriangle className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        Urgent
      </span>
    );
  }

  if (priority === 'SOON') {
    return (
      <span className={`inline-flex items-center gap-1.5 font-semibold tracking-wide uppercase rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 ${isSm ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'}`}>
        <Clock className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5 text-amber-600'} />
        Soon
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium tracking-wide uppercase rounded-full bg-[#DFF5E1] text-[#12372A] border border-[#BCE8C1]/60 ${isSm ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'}`}>
      <CheckCircle className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5 text-[#2E8B57]'} />
      Normal
    </span>
  );
};
