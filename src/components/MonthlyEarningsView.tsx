import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  Zap,
  Gift,
  Download,
  Edit2,
  Check,
  X,
  TrendingUp,
} from 'lucide-react';
import { formatMoney, formatMonthYear } from '../utils/formatters';
import { SalaryProfile, WorkDayRecord } from '../types';

interface MonthlyEarningsViewProps {
  profile: SalaryProfile;
  workDays: Record<string, WorkDayRecord>;
  onUpdateWorkDay: (date: string, partial: Partial<WorkDayRecord>) => void;
  dailyRate: number;
  hourlyRate: number;
}

export const MonthlyEarningsView: React.FC<MonthlyEarningsViewProps> = ({
  profile,
  workDays,
  onUpdateWorkDay,
  dailyRate,
  hourlyRate,
}) => {
  // Current calendar view (default November 2026)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(11);
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-06');
  const [isEditingDay, setIsEditingDay] = useState(false);

  // Day editor state
  const [editRegularHours, setEditRegularHours] = useState<number>(7.5);
  const [editOvertimeHours, setEditOvertimeHours] = useState<number>(0);
  const [editBonus, setEditBonus] = useState<number>(0);
  const [editNote, setEditNote] = useState<string>('');
  const [editIsOff, setEditIsOff] = useState<boolean>(false);

  // Month navigation
  const prevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Calendar days generation
  const calendarDays = useMemo(() => {
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const firstDayIndex = new Date(currentYear, currentMonth - 1, 1).getDay();
    // In Europe/France, Monday is index 0
    const startOffset = (firstDayIndex + 6) % 7;

    const list: { dayNum: number; dateStr: string; isCurrentMonth: boolean }[] = [];

    // Empty offset slots
    for (let i = 0; i < startOffset; i++) {
      list.push({ dayNum: 0, dateStr: '', isCurrentMonth: false });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayStr = day.toString().padStart(2, '0');
      const monthStr = currentMonth.toString().padStart(2, '0');
      const dateStr = `${currentYear}-${monthStr}-${dayStr}`;
      list.push({ dayNum: day, dateStr, isCurrentMonth: true });
    }

    return list;
  }, [currentYear, currentMonth]);

  // Aggregate stats for current month
  const monthStats = useMemo(() => {
    let daysWorkedCount = 0;
    let totalRegularHours = 0;
    let totalOvertimeHours = 0;
    let totalBonuses = 0;

    Object.values(workDays).forEach((day) => {
      if (day.date.startsWith(`${currentYear}-${currentMonth.toString().padStart(2, '0')}`)) {
        if (!day.isOffDay && (day.regularHours > 0 || day.overtimeHours > 0)) {
          daysWorkedCount += 1;
          totalRegularHours += day.regularHours;
          totalOvertimeHours += day.overtimeHours;
          totalBonuses += day.bonus || 0;
        }
      }
    });

    const regularGains = totalRegularHours * hourlyRate;
    const overtimeGains = totalOvertimeHours * hourlyRate * profile.overtimeMultiplier;
    const totalGains = regularGains + overtimeGains + totalBonuses;

    // Projected total: if working scheduled days
    const projectedGains = Math.max(
      totalGains,
      profile.monthlyBaseSalary + overtimeGains + totalBonuses
    );

    return {
      daysWorkedCount,
      totalRegularHours,
      totalOvertimeHours,
      totalBonuses,
      regularGains,
      overtimeGains,
      totalGains,
      projectedGains,
    };
  }, [workDays, currentYear, currentMonth, hourlyRate, profile.overtimeMultiplier, profile.monthlyBaseSalary]);

  // Open day editor
  const handleSelectDay = (dateStr: string) => {
    setSelectedDate(dateStr);
    const day = workDays[dateStr];
    if (day) {
      setEditRegularHours(day.regularHours);
      setEditOvertimeHours(day.overtimeHours);
      setEditBonus(day.bonus || 0);
      setEditNote(day.note || '');
      setEditIsOff(!!day.isOffDay);
    } else {
      setEditRegularHours(profile.hoursPerDay);
      setEditOvertimeHours(0);
      setEditBonus(0);
      setEditNote('');
      setEditIsOff(false);
    }
    setIsEditingDay(true);
  };

  const handleSaveDay = () => {
    onUpdateWorkDay(selectedDate, {
      date: selectedDate,
      regularHours: editIsOff ? 0 : Number(editRegularHours),
      overtimeHours: editIsOff ? 0 : Number(editOvertimeHours),
      bonus: editIsOff ? 0 : Number(editBonus),
      note: editNote,
      isOffDay: editIsOff,
    });
    setIsEditingDay(false);
  };

  // Export to CSV
  const handleExportCSV = () => {
    const rows = [
      ['Date', 'Heures Normales', 'Heures Sup', 'Taux Horaire', 'Gain Jour (€)', 'Prime (€)', 'Note'],
    ];

    Object.values(workDays)
      .filter((d) => d.date.startsWith(`${currentYear}-${currentMonth.toString().padStart(2, '0')}`))
      .sort((a, b) => a.date.localeCompare(b.date))
      .forEach((d) => {
        const dayGain =
          d.regularHours * hourlyRate +
          d.overtimeHours * hourlyRate * profile.overtimeMultiplier +
          (d.bonus || 0);
        rows.push([
          d.date,
          d.regularHours.toString(),
          d.overtimeHours.toString(),
          hourlyRate.toFixed(2),
          dayGain.toFixed(2),
          (d.bonus || 0).toString(),
          d.note || '',
        ]);
      });

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(';')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SalairePro_${currentYear}_${currentMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Month Header & Navigator */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-md">
        <button
          onClick={prevMonth}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Mois précédent"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="text-base font-bold text-white capitalize">
            {formatMonthYear(currentYear, currentMonth)}
          </div>
          <div className="text-[11px] text-slate-400">
            {monthStats.daysWorkedCount} / {profile.workingDaysPerMonth} jours travaillés
          </div>
        </div>

        <button
          onClick={nextMonth}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Mois suivant"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Big KPI Overview Cards */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-5 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span>Gains cumulés ce mois</span>
          <span className="text-emerald-400 font-semibold">
            {((monthStats.totalGains / profile.monthlyBaseSalary) * 100).toFixed(0)}% de la base
          </span>
        </div>

        <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono-numbers">
          {formatMoney(monthStats.totalGains, profile.currency)}
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-xs">
          <div>
            <div className="text-[10px] text-slate-500">Heures Normales</div>
            <div className="font-semibold text-slate-200 mt-0.5 font-mono-numbers">
              {formatMoney(monthStats.regularGains, profile.currency)}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500">Heures Sup ({profile.overtimeMultiplier}x)</div>
            <div className="font-semibold text-amber-400 mt-0.5 font-mono-numbers">
              +{formatMoney(monthStats.overtimeGains, profile.currency)}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500">Primes & Bonus</div>
            <div className="font-semibold text-cyan-400 mt-0.5 font-mono-numbers">
              +{formatMoney(monthStats.totalBonuses, profile.currency)}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Calendar Card */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
            <CalendarIcon className="w-4 h-4 text-emerald-400" />
            <span>Calendrier des Gains Quotidiens</span>
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-slate-500 mb-2">
          <span>LUN</span>
          <span>MAR</span>
          <span>MER</span>
          <span>JEU</span>
          <span>VEN</span>
          <span>SAM</span>
          <span>DIM</span>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1.5">
          {calendarDays.map((item, idx) => {
            if (!item.isCurrentMonth) {
              return <div key={idx} className="h-12 rounded-xl bg-slate-950/30" />;
            }

            const record = workDays[item.dateStr];
            const isWorked = record && !record.isOffDay && (record.regularHours > 0 || record.overtimeHours > 0);
            const isToday = item.dateStr === '2026-11-06';
            const isSelected = item.dateStr === selectedDate;

            const dayEarned = record
              ? record.regularHours * hourlyRate +
                record.overtimeHours * hourlyRate * profile.overtimeMultiplier +
                (record.bonus || 0)
              : 0;

            return (
              <button
                key={idx}
                onClick={() => handleSelectDay(item.dateStr)}
                className={`h-13 rounded-xl p-1 flex flex-col justify-between items-center transition-all cursor-pointer relative ${
                  isSelected
                    ? 'ring-2 ring-emerald-400 bg-slate-800'
                    : isToday
                    ? 'border border-cyan-500/60 bg-cyan-950/20'
                    : isWorked
                    ? 'bg-slate-800/80 hover:bg-slate-700'
                    : 'bg-slate-950/40 hover:bg-slate-800/40 text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between w-full text-[10px] font-bold px-0.5">
                  <span className={isToday ? 'text-cyan-400' : isWorked ? 'text-white' : 'text-slate-500'}>
                    {item.dayNum}
                  </span>
                  {record?.bonus && record.bonus > 0 ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" title="Prime reçue" />
                  ) : record?.overtimeHours && record.overtimeHours > 0 ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" title="Heures sup" />
                  ) : isWorked ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  ) : null}
                </div>

                <div className="w-full text-center">
                  {isWorked ? (
                    <div className="text-[9px] font-bold text-emerald-400 font-mono-numbers truncate">
                      {Math.round(dayEarned)}€
                    </div>
                  ) : record?.isOffDay ? (
                    <div className="text-[8px] text-slate-600">Repos</div>
                  ) : (
                    <div className="text-[8px] text-slate-700">-</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-400">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Travaillé</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Heures Sup</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Prime</span>
          </div>
        </div>
      </div>

      {/* Selected Day Details & Edit Sheet */}
      {isEditingDay && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              <Edit2 className="w-4 h-4 text-emerald-400" />
              <span>Détails & Modification du {selectedDate}</span>
            </div>
            <button
              onClick={() => setIsEditingDay(false)}
              className="p-1 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={editIsOff}
                onChange={(e) => setEditIsOff(e.target.checked)}
                className="rounded accent-emerald-500 w-4 h-4"
              />
              <span>Jour de repos / Congé</span>
            </label>
          </div>

          {!editIsOff && (
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-slate-400">Heures Normales</label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="24"
                  value={editRegularHours}
                  onChange={(e) => setEditRegularHours(parseFloat(e.target.value) || 0)}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono-numbers focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400">Heures Sup</label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="24"
                  value={editOvertimeHours}
                  onChange={(e) => setEditOvertimeHours(parseFloat(e.target.value) || 0)}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono-numbers focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400">Prime (€)</label>
                <input
                  type="number"
                  step="10"
                  min="0"
                  value={editBonus}
                  onChange={(e) => setEditBonus(parseFloat(e.target.value) || 0)}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono-numbers focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[10px] text-slate-400">Note ou description</label>
            <input
              type="text"
              placeholder="Ex: Astreinte week-end, Réunion client..."
              value={editNote}
              onChange={(e) => setEditNote(e.target.value)}
              className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              onClick={() => setIsEditingDay(false)}
              className="px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              Annuler
            </button>
            <button
              onClick={handleSaveDay}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Enregistrer la Journée</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
