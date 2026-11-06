import React, { useState } from 'react';
import {
  AlertTriangle,
  Volume2,
  BellRing,
  Plus,
  Trash2,
  TrendingDown,
  ShieldAlert,
  Sparkles,
  PieChart,
  HelpCircle,
  Vibrate,
} from 'lucide-react';
import { formatMoney } from '../utils/formatters';
import { ExpenseItem, SalaryProfile, BudgetCategory } from '../types';
import { BUDGET_CATEGORIES } from '../constants/categories';

interface BudgetAlarmViewProps {
  profile: SalaryProfile;
  expenses: ExpenseItem[];
  totalExpenses: number;
  remainingBudget: number;
  budgetPercentSpent: number;
  isBudgetOverrun: boolean;
  isBudgetWarning: boolean;
  onAddExpense: (expense: Omit<ExpenseItem, 'id'>) => void;
  onDeleteExpense: (id: string) => void;
  onTestAlarm: () => void;
  onTestWarning: () => void;
}

export const BudgetAlarmView: React.FC<BudgetAlarmViewProps> = ({
  profile,
  expenses,
  totalExpenses,
  remainingBudget,
  budgetPercentSpent,
  isBudgetOverrun,
  isBudgetWarning,
  onAddExpense,
  onDeleteExpense,
  onTestAlarm,
  onTestWarning,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState<BudgetCategory>('alimentation');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountVal = parseFloat(newAmount);
    if (!newTitle.trim() || isNaN(amountVal) || amountVal <= 0) return;

    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    onAddExpense({
      title: newTitle.trim(),
      amount: amountVal,
      category: newCategory,
      date: dateStr,
      time: timeStr,
    });

    setNewTitle('');
    setNewAmount('');
    setShowAddForm(false);
  };

  // Quick simulation helper
  const handleSimulateOverrun = () => {
    const overrunAmount = Math.max(150, Math.round(profile.budgetTotalLimit - totalExpenses + 120));
    onAddExpense({
      title: 'Facture imprévue / Dépassement simulé',
      amount: overrunAmount > 0 ? overrunAmount : 250,
      category: 'autre',
      date: new Date().toISOString().split('T')[0],
      time: '12:00',
    });
  };

  // Group expenses by category
  const categoryTotals = React.useMemo(() => {
    const totals: Record<BudgetCategory, number> = {
      logement: 0,
      alimentation: 0,
      transport: 0,
      loisirs: 0,
      sante: 0,
      factures: 0,
      epargne: 0,
      autre: 0,
    };
    expenses.forEach((item) => {
      totals[item.category] = (totals[item.category] || 0) + item.amount;
    });
    return totals;
  }, [expenses]);

  return (
    <div className="space-y-4 pb-20">
      {/* 🚨 CRITICAL ALARM STATUS BANNER */}
      {isBudgetOverrun ? (
        <div className="rounded-3xl bg-red-950/90 border-2 border-red-500 p-5 shadow-2xl animate-alarm-pulse">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-red-500/20 text-red-400 shrink-0">
              <ShieldAlert className="w-8 h-8 animate-bounce" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-red-400 bg-red-900/60 px-2 py-0.5 rounded-md border border-red-700/80">
                  Alarme Critique Activée
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-white mt-1">
                Dépassement de Budget Détecté !
              </h3>
              <p className="text-xs text-red-200 mt-1 leading-relaxed">
                Vos dépenses actuelles ({formatMoney(totalExpenses, profile.currency)}) excèdent votre
                plafond fixé ({formatMoney(profile.budgetTotalLimit, profile.currency)}) de{' '}
                <strong className="text-red-300 font-bold font-mono-numbers">
                  +{formatMoney(Math.abs(remainingBudget), profile.currency)}
                </strong>
                .
              </p>

              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={onTestAlarm}
                  className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer active:scale-95 transition"
                >
                  <BellRing className="w-4 h-4 animate-spin" />
                  <span>Sonner l&apos;Alarme</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : isBudgetWarning ? (
        <div className="rounded-3xl bg-amber-950/80 border border-amber-500/60 p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                Avertissement Seuil Budget
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">
                {budgetPercentSpent.toFixed(0)}% du budget consommé
              </h3>
              <p className="text-xs text-amber-200/90 mt-0.5">
                Il vous reste {formatMoney(remainingBudget, profile.currency)} avant dépassement du
                plafond mensuel ({formatMoney(profile.budgetTotalLimit, profile.currency)}).
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl bg-emerald-950/40 border border-emerald-500/30 p-4 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                Budget sous contrôle
              </div>
              <div className="text-sm font-bold text-white">
                Reste disponible: {formatMoney(remainingBudget, profile.currency)}
              </div>
            </div>
          </div>
          <span className="text-xs font-mono-numbers text-emerald-400 font-semibold">
            {budgetPercentSpent.toFixed(0)}%
          </span>
        </div>
      )}

      {/* Main Budget Progress Card */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>Consommation du Budget Mensuel</span>
          <span className="font-semibold text-slate-200 font-mono-numbers">
            {formatMoney(totalExpenses, profile.currency)} / {formatMoney(profile.budgetTotalLimit, profile.currency)}
          </span>
        </div>

        {/* Progress bar with warning markers */}
        <div className="relative h-4 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isBudgetOverrun
                ? 'bg-gradient-to-r from-red-600 to-rose-400'
                : isBudgetWarning
                ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                : 'bg-gradient-to-r from-emerald-500 to-teal-400'
            }`}
            style={{ width: `${Math.min(100, budgetPercentSpent)}%` }}
          />
        </div>

        <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500">
          <span>0 €</span>
          <span className="text-amber-400/80">Seuil d&apos;alerte ({profile.budgetWarningPercent}%)</span>
          <span>Max ({formatMoney(profile.budgetTotalLimit, profile.currency)})</span>
        </div>

        {/* Alarm Testing & Quick Simulation Action Bar */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <button
              onClick={onTestAlarm}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-red-400 hover:text-red-300 text-xs font-medium border border-red-500/20 flex items-center gap-1 transition cursor-pointer active:scale-95"
              title="Tester le son de la sirène et la vibration Android"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Tester Sirène</span>
            </button>
            <button
              onClick={onTestWarning}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 text-xs font-medium border border-amber-500/20 flex items-center gap-1 transition cursor-pointer active:scale-95"
              title="Tester le bip d'avertissement"
            >
              <BellRing className="w-3.5 h-3.5" />
              <span>Bip 85%</span>
            </button>
          </div>

          <button
            onClick={handleSimulateOverrun}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 flex items-center gap-1 transition cursor-pointer active:scale-95"
            title="Ajouter une dépense test pour dépasser le budget"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
            <span>Simuler Dépassement</span>
          </button>
        </div>
      </div>

      {/* Add Expense Form or Trigger Button */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <TrendingDown className="w-4 h-4 text-emerald-400" />
            <span>Gestion des Dépenses Réelles</span>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition cursor-pointer active:scale-95 shadow"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Nouvelle Dépense</span>
          </button>
        </div>

        {/* Add Form Accordion */}
        {showAddForm && (
          <form onSubmit={handleAddSubmit} className="mt-4 pt-3 border-t border-slate-800 space-y-3">
            <div>
              <label className="text-[10px] text-slate-400">Intitulé de la dépense</label>
              <input
                type="text"
                required
                placeholder="Ex: Courses Carrefour, Plein essence..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400">Montant ({profile.currency})</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  min="0.01"
                  placeholder="0.00"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono-numbers focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400">Catégorie</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as BudgetCategory)}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                >
                  {BUDGET_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 cursor-pointer shadow"
              >
                Valider & Déduire
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Breakdown by Category */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 shadow-md">
        <div className="text-xs font-semibold text-slate-200 mb-3 flex items-center justify-between">
          <span>Répartition par Poste de Dépense</span>
          <span className="text-[11px] text-slate-500">{expenses.length} dépenses</span>
        </div>

        <div className="space-y-3">
          {BUDGET_CATEGORIES.map((cat) => {
            const spent = categoryTotals[cat.id] || 0;
            if (spent === 0) return null;
            const pctOfTotal = totalExpenses > 0 ? (spent / totalExpenses) * 100 : 0;

            return (
              <div key={cat.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-slate-300 font-medium">{cat.label}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono-numbers text-xs">
                    <span className="font-bold text-white">
                      {formatMoney(spent, profile.currency)}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      ({pctOfTotal.toFixed(0)}%)
                    </span>
                  </div>
                </div>

                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pctOfTotal}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expenses History List */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 shadow-md">
        <div className="text-xs font-semibold text-slate-200 mb-3">
          Historique des Dépenses Récentes
        </div>

        <div className="divide-y divide-slate-800/80 max-h-80 overflow-y-auto pr-1">
          {expenses.map((item) => {
            const cat = BUDGET_CATEGORIES.find((c) => c.id === item.category);

            return (
              <div
                key={item.id}
                className="py-2.5 flex items-center justify-between text-xs hover:bg-slate-800/30 px-2 rounded-xl transition"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: cat?.color || '#94a3b8' }}
                  />
                  <div className="truncate">
                    <div className="font-medium text-slate-200 truncate">{item.title}</div>
                    <div className="text-[10px] text-slate-500">
                      {cat?.label} · {item.date} {item.time}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-bold text-slate-200 font-mono-numbers">
                    -{formatMoney(item.amount, profile.currency)}
                  </span>
                  <button
                    onClick={() => onDeleteExpense(item.id)}
                    className="p-1.5 text-slate-500 hover:text-red-400 cursor-pointer rounded-lg hover:bg-slate-800 transition"
                    title="Supprimer la dépense"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
