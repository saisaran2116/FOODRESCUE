import React from 'react';
import { useFoodRescue } from '../../context/FoodRescueContext';
import { X, Bell, Check, ArrowRight, ShieldCheck, Truck, Sparkles, HeartHandshake } from 'lucide-react';

export const NotificationDrawer: React.FC = () => {
  const { 
    isNotifOpen, 
    setIsNotifOpen, 
    notifications, 
    unreadNotifsCount, 
    markNotifAsRead, 
    markAllNotifsAsRead,
    setActivePage
  } = useFoodRescue();

  if (!isNotifOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'donation':
        return <Sparkles className="w-4 h-4 text-emerald-600" />;
      case 'match':
        return <HeartHandshake className="w-4 h-4 text-[#2E8B57]" />;
      case 'pickup':
        return <Truck className="w-4 h-4 text-[#FF9F43]" />;
      case 'delivery':
        return <ShieldCheck className="w-4 h-4 text-emerald-700" />;
      default:
        return <Bell className="w-4 h-4 text-[#12372A]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm transition-opacity"
        onClick={() => setIsNotifOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF9ED] border-l border-stone-200/80 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-stone-200/70 flex items-center justify-between bg-white/70">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#DFF5E1] text-[#12372A] flex items-center justify-center font-bold">
                <Bell className="w-5 h-5 text-[#2E8B57]" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#171717]">Notifications</h3>
                <p className="text-xs text-[#6B6B63]">
                  {unreadNotifsCount > 0 ? `${unreadNotifsCount} unread updates` : 'All caught up'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {unreadNotifsCount > 0 && (
                <button
                  onClick={markAllNotifsAsRead}
                  className="text-xs font-semibold text-[#2E8B57] hover:text-[#12372A] px-2.5 py-1 rounded-full bg-[#DFF5E1]/60 hover:bg-[#DFF5E1] transition-colors"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setIsNotifOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-16 px-4">
                <Bell className="w-12 h-12 mx-auto text-stone-300 mb-3" />
                <p className="font-semibold text-stone-700">No notifications yet</p>
                <p className="text-xs text-stone-500 mt-1">Actions on donations and pickups will appear here.</p>
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => markNotifAsRead(item.id)}
                  className={`p-4 rounded-2xl transition-all border ${
                    item.read
                      ? 'bg-white/50 border-stone-200/60 text-[#6B6B63]'
                      : 'bg-white border-[#2E8B57]/30 shadow-sm shadow-[#12372A]/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#FFF9ED] border border-stone-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {getIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className={`text-sm font-bold ${item.read ? 'text-stone-800' : 'text-[#12372A]'}`}>
                          {item.title}
                        </h4>
                        {!item.read && (
                          <span className="w-2 h-2 rounded-full bg-[#FF9F43] flex-shrink-0"></span>
                        )}
                      </div>
                      <p className="text-xs text-[#6B6B63] mt-1 leading-relaxed">
                        {item.message}
                      </p>
                      <div className="mt-2.5 flex items-center justify-between">
                        <span className="text-[11px] text-stone-400 font-medium">
                          {item.timestamp}
                        </span>
                        {item.action_label && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markNotifAsRead(item.id);
                              setIsNotifOpen(false);
                              if (item.action_path?.includes('find')) setActivePage('find');
                              else if (item.action_path?.includes('volunteer')) setActivePage('volunteer');
                              else if (item.action_path?.includes('impact')) setActivePage('impact');
                              else if (item.action_path?.includes('donate')) setActivePage('donate');
                            }}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#12372A] hover:text-[#2E8B57]"
                          >
                            {item.action_label}
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-white/70 border-t border-stone-200/70 text-center">
            <span className="text-[11px] text-stone-400 font-medium">
              Real-time FoodRescue Notification Service
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
