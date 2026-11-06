import React, { useMemo } from 'react';
import {
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
  ShieldCheck,
  AlertCircle,
  PiggyBank,
  ArrowUpRight,
  Wallet,
} from 'lucide-react';
import { formatMoney } from '../utils/formatters';
import { SalaryProfile, WorkDayRecord, ExpenseItem } from '../types';

interface AnalyticsViewProps {
  profile: SalaryProfile;
  workDays: Record<string, WorkDayRecord>;
  expenses: ExpenseItem[];
  dailyRate: number;
  hourlyRate: number;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  profile,
  workDays,
  expenses,
  dailyRate,
  hourlyRate,
}) => {
  const currentMonthPrefix = '2026-11';

  // Compute daily series for November 1..30
  const dailySeries = useMemo(() => {
    const daysInMonth = 30;
    const series: { day: number; dateStr: string; amount: number; isOff: boolean }[] = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const dayStr = d.toString().padStart(2, '0');
      const dateStr = `${currentMonthPrefix}-${dayStr}`;
      const rec = workDays[dateStr];

      let amount = 0;
      let isOff = false;

      if (rec) {
        isOff = !!rec.isOffDay;
        if (!isOff) {
          amount =
            rec.regularHours * hourlyRate +
            rec.overtimeHours * hourlyRate * profile.overtimeMultiplier +
            (rec.bonus || 0);
        }
      } else {
        // weekend check
        const dayOfWeek = new Date(2026, 10, d).getDay();
        isOff = dayOfWeek === 0 || dayOfWeek === 6;
      }

      series.push({
        day: d,
        dateStr,
        amount,
        isOff,
      });
    }

    return series;
  }, [workDays, hourlyRate, profile.overtimeMultiplier]);

  const maxDailyGain = useMemo(() => {
    const max = Math.max(...dailySeries.map((d) => d.amount), dailyRate);
    return max > 0 ? max : 150;
  }, [dailySeries, dailyRate]);

  // Totals
  const totalEarnedSoFar = useMemo(() => {
    return dailySeries.reduce((acc, d) => acc + d.amount, 0);
  }, [dailySeries]);

  const totalSpent = useMemo(() => {
    return expenses.reduce((acc, e) => acc + e.amount, 0);
  }, [expenses]);

  const savingsRate = useMemo(() => {
    if (totalEarnedSoFar <= 0) return 0;
    const remaining = totalEarnedSoFar - totalSpent;
    return (remaining / totalEarnedSoFar) * 100;
  }, [totalEarnedSoFar, totalSpent]);

  // Days left in month
  const todayNum = 6;
  const daysLeft = 30 - todayNum;
  const remainingBudget = profile.budgetTotalLimit - totalSpent;
  const dailyAllowanceRemaining = daysLeft > 0 ? Math.max(0, remainingBudget / daysLeft) : 0;

  return (
    <div className="space-y-4 pb-20">
      {/* Header Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 shadow-md">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <PiggyBank className="w-4 h-4 text-emerald-400" />
            <span>Taux d&apos;Épargne Restant</span>
          </div>
          <div
            className={`text-2xl font-bold font-mono-numbers mt-1.5 ${
              savingsRate >= 20 ? 'text-emerald-400' : savingsRate >= 0 ? 'text-amber-400' : 'text-red-400'
            }`}
          >
            {savingsRate.toFixed(1)}%
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Solde net : {formatMoney(totalEarnedSoFar - totalSpent, profile.currency)}
          </div>
        </div>

        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 shadow-md">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Wallet className="w-4 h-4 text-cyan-400" />
            <span>Reste à Vivre / Jour</span>
          </div>
          <div className="text-2xl font-bold font-mono-numbers text-white mt-1.5">
            {formatMoney(dailyAllowanceRemaining, profile.currency)}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Sur les {daysLeft} jours restants
          </div>
        </div>
      </div>

      {/* Daily Earnings Bar Chart */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>Gains Journaliers (Novembre 2026)</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono-numbers">
            Taux standard: {formatMoney(dailyRate, profile.currency, 0)}/j
          </span>
        </div>

        {/* Bar Chart Container */}
        <div className="h-44 w-full flex items-end gap-1.5 pt-4 pb-2 px-1 overflow-x-auto">
          {dailySeries.map((item) => {
            const heightPercent = maxDailyGain > 0 ? (item.amount / maxDailyGain) * 100 : 0;
            const isToday = item.day === todayNum;
            const hasOvertime = item.amount > dailyRate + 5;

            return (
              <div
                key={item.day}
                className="flex-1 min-w-[14px] flex flex-col items-center justify-end h-full group relative cursor-pointer"
              >
                {/* Tooltip on hover/tap */}
                <div className="absolute -top-10 hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                  <div className="bg-slate-950 border border-slate-700 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap font-mono-numbers">
                    J{item.day}: {formatMoney(item.amount, profile.currency, 0)}
                  </div>
                  <div className="w-1.5 h-1.5 bg-slate-950 border-r border-b border-slate-700 rotate-45 -mt-0.5" />
                </div>

                {/* Bar */}
                <div
                  className={`w-full rounded-t-md transition-all duration-300 ${
                    isToday
                      ? 'bg-cyan-400'
                      : hasOvertime
                      ? 'bg-amber-400'
                      : item.amount > 0
                      ? 'bg-emerald-500 hover:bg-emerald-400'
                      : item.isOff
                      ? 'bg-slate-800/40'
                      : 'bg-slate-800'
                  }`}
                  style={{
                    height: `${Math.max(4, heightPercent)}%`,
                  }}
                />

                {/* Day label */}
                <span
                  className={`text-[8px] mt-1 font-mono-numbers ${
                    isToday ? 'font-bold text-cyan-400' : 'text-slate-500'
                  }`}
                >
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-2 text-[10px] text-slate-400 border-t border-slate-800 pt-2">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded bg-emerald-500" />
            <span>Normal</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded bg-amber-400" />
            <span>Heures Sup</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded bg-cyan-400" />
            <span>Aujourd&apos;hui</span>
          </div>
        </div>
      </div>

      {/* Salary vs Expenses Comparison Meter */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl">
        <div className="text-xs font-semibold text-slate-200 mb-3 flex items-center justify-between">
          <span>Équilibre Gains vs Dépenses</span>
          <span className="text-[11px] text-slate-400">Ce mois</span>
        </div>

        <div className="space-y-3">
          {/* Gains */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-emerald-400 font-medium">Revenus Cumulés</span>
              <span className="font-bold text-white font-mono-numbers">
                {formatMoney(totalEarnedSoFar, profile.currency)}
              </span>
            </div>
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{
                  width: `${Math.min(100, (totalEarnedSoFar / profile.monthlyBaseSalary) * 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Dépenses */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-rose-400 font-medium">Dépenses Réalisées</span>
              <span className="font-bold text-white font-mono-numbers">
                {formatMoney(totalSpent, profile.currency)}
              </span>
            </div>
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-rose-500 rounded-full"
                style={{
                  width: `${Math.min(100, (totalSpent / profile.budgetTotalLimit) * 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
