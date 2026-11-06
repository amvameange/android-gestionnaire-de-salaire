import React from 'react';
import {
  Settings,
  DollarSign,
  Clock,
  Bell,
  Volume2,
  Vibrate,
  Briefcase,
  RotateCcw,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { SalaryProfile, CurrencyCode } from '../types';
import { CURRENCIES } from '../utils/formatters';

interface SettingsViewProps {
  profile: SalaryProfile;
  onUpdateProfile: (partial: Partial<SalaryProfile>) => void;
  onTestAlarm: () => void;
  onTestWarning: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  profile,
  onUpdateProfile,
  onTestAlarm,
  onTestWarning,
}) => {
  return (
    <div className="space-y-4 pb-20">
      {/* Profile Card */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 shadow-md space-y-3">
        <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
          <Briefcase className="w-4 h-4 text-emerald-400" />
          <span>Poste & Entreprise</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-slate-400">Métier / Fonction</label>
            <input
              type="text"
              value={profile.jobTitle}
              onChange={(e) => onUpdateProfile({ jobTitle: e.target.value })}
              className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400">Entreprise</label>
            <input
              type="text"
              value={profile.companyName}
              onChange={(e) => onUpdateProfile({ companyName: e.target.value })}
              className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Salary Configuration */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 shadow-md space-y-3">
        <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <span>Paramètres du Salaire & Temps de Travail</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] text-slate-400">Salaire Brut / Net Mensuel</label>
            <div className="relative mt-1">
              <input
                type="number"
                step="50"
                min="100"
                value={profile.monthlyBaseSalary}
                onChange={(e) =>
                  onUpdateProfile({ monthlyBaseSalary: parseFloat(e.target.value) || 0 })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono-numbers focus:border-emerald-500 focus:outline-none"
              />
              <span className="absolute right-3 top-2 text-xs text-slate-400 pointer-events-none">
                {profile.currency}
              </span>
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-400">Devise Principale</label>
            <select
              value={profile.currency}
              onChange={(e) => onUpdateProfile({ currency: e.target.value as CurrencyCode })}
              className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
            >
              {Object.values(CURRENCIES).map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} ({c.symbol}) - {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] text-slate-400">Jours travaillés / mois</label>
            <input
              type="number"
              step="1"
              min="1"
              max="31"
              value={profile.workingDaysPerMonth}
              onChange={(e) =>
                onUpdateProfile({ workingDaysPerMonth: parseFloat(e.target.value) || 21 })
              }
              className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono-numbers focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400">Heures par jour</label>
            <input
              type="number"
              step="0.5"
              min="1"
              max="16"
              value={profile.hoursPerDay}
              onChange={(e) =>
                onUpdateProfile({ hoursPerDay: parseFloat(e.target.value) || 7.5 })
              }
              className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono-numbers focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="col-span-2">
            <label className="text-[10px] text-slate-400">
              Majoration Heures Supplémentaires
            </label>
            <div className="grid grid-cols-4 gap-2 mt-1">
              {[1.1, 1.25, 1.5, 2.0].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => onUpdateProfile({ overtimeMultiplier: rate })}
                  className={`py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    profile.overtimeMultiplier === rate
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Budget & Alarm Settings */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 shadow-md space-y-3">
        <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
          <Bell className="w-4 h-4 text-red-400" />
          <span>Plafond Budgétaire & Alarmes de Dépassement</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] text-slate-400">Plafond Budget Mensuel</label>
            <input
              type="number"
              step="50"
              min="100"
              value={profile.budgetTotalLimit}
              onChange={(e) =>
                onUpdateProfile({ budgetTotalLimit: parseFloat(e.target.value) || 0 })
              }
              className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono-numbers focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400">Seuil d&apos;alerte préventif</label>
            <select
              value={profile.budgetWarningPercent}
              onChange={(e) =>
                onUpdateProfile({ budgetWarningPercent: parseInt(e.target.value, 10) || 85 })
              }
              className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
            >
              <option value={70}>70% du budget</option>
              <option value={80}>80% du budget</option>
              <option value={85}>85% du budget (Recommandé)</option>
              <option value={90}>90% du budget</option>
              <option value={95}>95% du budget</option>
            </select>
          </div>
        </div>

        {/* Audio & Vibration Toggles */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>Effets Sonores & Sirène d&apos;alarme</span>
            </div>
            <input
              type="checkbox"
              checked={profile.soundEnabled}
              onChange={(e) => onUpdateProfile({ soundEnabled: e.target.checked })}
              className="rounded accent-emerald-500 w-4 h-4 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
            <div className="flex items-center gap-2">
              <Vibrate className="w-4 h-4 text-cyan-400" />
              <span>Vibration Tactile Android (Haptique)</span>
            </div>
            <input
              type="checkbox"
              checked={profile.vibrationEnabled}
              onChange={(e) => onUpdateProfile({ vibrationEnabled: e.target.checked })}
              className="rounded accent-cyan-500 w-4 h-4 cursor-pointer"
            />
          </label>
        </div>

        {/* Alarm Testing Buttons */}
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={onTestAlarm}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-red-400 text-xs font-semibold border border-red-500/30 flex items-center justify-center gap-1.5 transition cursor-pointer active:scale-95"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Tester la Sirène</span>
          </button>
          <button
            onClick={onTestWarning}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold border border-amber-500/30 flex items-center justify-center gap-1.5 transition cursor-pointer active:scale-95"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Tester Bip 85%</span>
          </button>
        </div>
      </div>
    </div>
  );
};
