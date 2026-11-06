import React from 'react';
import { Timer, Calendar, AlertTriangle, PieChart, Settings } from 'lucide-react';

export type TabType = 'ticker' | 'monthly' | 'budget' | 'analytics' | 'settings';

interface AndroidNavBarProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  isBudgetOverrun?: boolean;
  isBudgetWarning?: boolean;
}

export const AndroidNavBar: React.FC<AndroidNavBarProps> = ({
  activeTab,
  onChangeTab,
  isBudgetOverrun = false,
  isBudgetWarning = false,
}) => {
  const tabs = [
    {
      id: 'ticker' as TabType,
      label: 'Temps Réel',
      icon: Timer,
      badge: null,
    },
    {
      id: 'monthly' as TabType,
      label: 'Gains Mois',
      icon: Calendar,
      badge: null,
    },
    {
      id: 'budget' as TabType,
      label: 'Budget & Alerte',
      icon: AlertTriangle,
      badge: isBudgetOverrun ? '!' : isBudgetWarning ? '•' : null,
      badgeColor: isBudgetOverrun ? 'bg-red-500 text-white' : 'bg-amber-400 text-slate-900',
    },
    {
      id: 'analytics' as TabType,
      label: 'Analytiques',
      icon: PieChart,
      badge: null,
    },
    {
      id: 'settings' as TabType,
      label: 'Réglages',
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 pb-[env(safe-area-inset-bottom)] max-w-md mx-auto sm:max-w-none">
      <div className="grid grid-cols-5 items-center h-16 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex flex-col items-center justify-center h-full min-h-[48px] py-1 transition-all active-press cursor-pointer select-none ${
                isActive ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {/* Material You active pill indicator */}
              <div
                className={`relative flex items-center justify-center px-4 py-1 rounded-full transition-all duration-200 ${
                  isActive ? 'bg-emerald-500/15' : 'bg-transparent'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.8]'
                  }`}
                />
                {tab.badge && (
                  <span
                    className={`absolute -top-1 -right-1 flex items-center justify-center text-[10px] font-bold w-4 h-4 rounded-full ${tab.badgeColor} ${
                      isBudgetOverrun ? 'animate-bounce' : ''
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap transition-colors ${
                  isActive ? 'font-semibold text-emerald-400' : 'font-normal text-slate-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
