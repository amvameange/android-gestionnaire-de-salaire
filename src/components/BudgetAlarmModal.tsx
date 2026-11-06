import React from 'react';
import { ShieldAlert, BellOff, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { formatMoney } from '../utils/formatters';
import { CurrencyCode } from '../types';

interface BudgetAlarmModalProps {
  isOpen: boolean;
  onClose: () => void;
  overrunAmount: number;
  totalExpenses: number;
  budgetLimit: number;
  currency: CurrencyCode;
  onGoToSettings: () => void;
}

export const BudgetAlarmModal: React.FC<BudgetAlarmModalProps> = ({
  isOpen,
  onClose,
  overrunAmount,
  totalExpenses,
  budgetLimit,
  currency,
  onGoToSettings,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-sm rounded-3xl bg-slate-900 border-2 border-red-500 shadow-2xl p-6 relative overflow-hidden animate-alarm-pulse">
        {/* Glow backdrop */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />

        {/* Icon Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-3xl bg-red-500/20 text-red-500 border border-red-500/40 flex items-center justify-center mb-3">
            <ShieldAlert className="w-10 h-10 animate-bounce" />
          </div>

          <span className="text-[10px] font-black uppercase tracking-widest text-red-400 bg-red-950/80 px-2.5 py-0.5 rounded-full border border-red-800">
            Alerte Dépassement de Budget
          </span>

          <h2 className="text-xl font-extrabold text-white mt-2">
            Plafond Budgétaire Franchi !
          </h2>

          <div className="my-3 p-3 rounded-2xl bg-red-950/40 border border-red-500/30 w-full text-center">
            <div className="text-xs text-red-300">Montant du dépassement :</div>
            <div className="text-2xl font-black text-red-400 font-mono-numbers mt-0.5">
              +{formatMoney(overrunAmount, currency)}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Dépenses : {formatMoney(totalExpenses, currency)} / Limite : {formatMoney(budgetLimit, currency)}
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed text-left mb-4">
            ⚠️ <strong>Action recommandée :</strong> Vous avez atteint la limite de dépenses autorisée pour ce mois. Pour rétablir l&apos;équilibre financier :
          </p>

          <ul className="text-[11px] text-slate-400 space-y-1.5 text-left w-full mb-5">
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              <span>Geler les dépenses de loisirs et sorties superflues</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
              <span>Effectuer des heures supplémentaires rémunérées</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
              <span>Réajuster votre plafond budgétaire dans les paramètres</span>
            </li>
          </ul>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2.5 w-full">
            <button
              onClick={onClose}
              className="py-3 px-3 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <BellOff className="w-4 h-4" />
              <span>Couper l&apos;Alarme</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onGoToSettings();
              }}
              className="py-3 px-3 rounded-2xl bg-red-600 hover:bg-red-500 active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-lg shadow-red-600/30"
            >
              <span>Ajuster Plafond</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
