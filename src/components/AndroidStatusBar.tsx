import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Smartphone, Monitor } from 'lucide-react';

interface AndroidStatusBarProps {
  isPhoneFrame: boolean;
  onToggleFrame: () => void;
  isOverrun?: boolean;
}

export const AndroidStatusBar: React.FC<AndroidStatusBarProps> = ({
  isPhoneFrame,
  onToggleFrame,
  isOverrun = false,
}) => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-slate-900/95 text-slate-300 px-4 py-2 flex items-center justify-between text-xs select-none border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-40">
      {/* Time & Android Status */}
      <div className="flex items-center gap-2">
        <span className="font-semibold text-white tracking-wide">{timeStr || '12:30'}</span>
        {isOverrun && (
          <span className="flex items-center gap-1 text-[10px] font-semibold text-red-400 bg-red-950/80 px-1.5 py-0.5 rounded border border-red-800/60 animate-pulse">
            Budget dépassé
          </span>
        )}
      </div>

      {/* Frame Switcher & System Icons */}
      <div className="flex items-center gap-3">
        {/* Toggle between Android Phone Mockup & Wide Tablet view on desktop */}
        <button
          onClick={onToggleFrame}
          className="hidden md:flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          title={isPhoneFrame ? 'Passer en vue large tablette / bureau' : 'Passer en vue mobile Android'}
        >
          {isPhoneFrame ? (
            <>
              <Monitor className="w-3 h-3 text-cyan-400" />
              <span>Vue Large</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3 h-3 text-emerald-400" />
              <span>Vue Mobile Android</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="text-[10px] font-bold text-slate-400">5G</span>
          <Wifi className="w-3.5 h-3.5" />
          <div className="flex items-center gap-0.5">
            <span className="text-[10px] font-mono">94%</span>
            <BatteryMedium className="w-4 h-4 text-emerald-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
