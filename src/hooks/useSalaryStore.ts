import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  SalaryProfile,
  WorkDayRecord,
  ExpenseItem,
  ActiveWorkSession,
  BudgetCategory,
} from '../types';
import { playBudgetAlarmSiren, playWarningBeep, playCashChime } from '../utils/audioAlarms';

const PROFILE_KEY = 'salairepro_profile_v2';
const WORKDAYS_KEY = 'salairepro_workdays_v2';
const EXPENSES_KEY = 'salairepro_expenses_v2';
const SESSION_KEY = 'salairepro_session_v2';

const DEFAULT_PROFILE: SalaryProfile = {
  monthlyBaseSalary: 2800,
  workingDaysPerMonth: 21,
  hoursPerDay: 7.5,
  overtimeMultiplier: 1.25,
  currency: 'EUR',
  budgetTotalLimit: 2000,
  budgetWarningPercent: 85,
  soundEnabled: true,
  vibrationEnabled: true,
  notificationsEnabled: true,
  jobTitle: 'Cadre / Développeur',
  companyName: 'Studio Tech',
};

// Seed realistic initial data for November 2026
function getInitialWorkDays(): Record<string, WorkDayRecord> {
  const records: Record<string, WorkDayRecord> = {};
  const year = 2026;
  const month = 11; // November

  // Days 1 through 6
  const data = [
    { day: 1, reg: 0, ot: 0, bonus: 0, off: true, note: 'Dimanche' },
    { day: 2, reg: 7.5, ot: 0, bonus: 0, off: false, note: 'Journée standard' },
    { day: 3, reg: 7.5, ot: 1.5, bonus: 0, off: false, note: 'Sprint release' },
    { day: 4, reg: 7.5, ot: 0, bonus: 50, off: false, note: 'Prime astreinte' },
    { day: 5, reg: 7.5, ot: 1.0, bonus: 0, off: false, note: 'Clôture projet' },
    { day: 6, reg: 4.5, ot: 0, bonus: 0, off: false, note: "Aujourd'hui en cours" },
  ];

  data.forEach((item) => {
    const dayStr = item.day.toString().padStart(2, '0');
    const dateStr = `${year}-${month.toString().padStart(2, '0')}-${dayStr}`;
    records[dateStr] = {
      date: dateStr,
      regularHours: item.reg,
      overtimeHours: item.ot,
      bonus: item.bonus,
      note: item.note,
      isOffDay: item.off,
    };
  });

  return records;
}

function getInitialExpenses(): ExpenseItem[] {
  return [
    {
      id: 'exp-1',
      title: 'Loyer & Charges appartement',
      amount: 850,
      category: 'logement',
      date: '2026-11-01',
      time: '08:30',
    },
    {
      id: 'exp-2',
      title: 'Courses supermarché bio',
      amount: 175.5,
      category: 'alimentation',
      date: '2026-11-02',
      time: '18:15',
    },
    {
      id: 'exp-3',
      title: 'Abonnement Navigo / Transport',
      amount: 84.1,
      category: 'transport',
      date: '2026-11-01',
      time: '10:00',
    },
    {
      id: 'exp-4',
      title: 'Internet Fibre & Téléphonie',
      amount: 49.99,
      category: 'factures',
      date: '2026-11-03',
      time: '12:00',
    },
    {
      id: 'exp-5',
      title: 'Restaurant avec collègues',
      amount: 62.4,
      category: 'loisirs',
      date: '2026-11-04',
      time: '20:30',
    },
    {
      id: 'exp-6',
      title: 'Pharmacie et vitamines',
      amount: 38.2,
      category: 'sante',
      date: '2026-11-05',
      time: '14:20',
    },
    {
      id: 'exp-7',
      title: 'Courses complémentaires',
      amount: 68.0,
      category: 'alimentation',
      date: '2026-11-05',
      time: '19:40',
    },
    {
      id: 'exp-8',
      title: 'Virement Livret A / Épargne',
      amount: 350.0,
      category: 'epargne',
      date: '2026-11-02',
      time: '09:00',
    },
    {
      id: 'exp-9',
      title: 'Carburant station',
      amount: 72.0,
      category: 'transport',
      date: '2026-11-06',
      time: '08:15',
    },
  ];
}

function getInitialSession(): ActiveWorkSession {
  return {
    isActive: true,
    isPaused: false,
    startTime: Date.now() - 3.5 * 3600 * 1000, // 3h30 in session
    lastPauseTime: null,
    accumulatedSeconds: 3.5 * 3600,
    overtimeMinutes: 0,
    sessionDate: '2026-11-06',
  };
}

export function useSalaryStore() {
  const [profile, setProfileState] = useState<SalaryProfile>(() => {
    try {
      const stored = localStorage.getItem(PROFILE_KEY);
      return stored ? { ...DEFAULT_PROFILE, ...JSON.parse(stored) } : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [workDays, setWorkDays] = useState<Record<string, WorkDayRecord>>(() => {
    try {
      const stored = localStorage.getItem(WORKDAYS_KEY);
      return stored ? JSON.parse(stored) : getInitialWorkDays();
    } catch {
      return getInitialWorkDays();
    }
  });

  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => {
    try {
      const stored = localStorage.getItem(EXPENSES_KEY);
      return stored ? JSON.parse(stored) : getInitialExpenses();
    } catch {
      return getInitialExpenses();
    }
  });

  const [session, setSession] = useState<ActiveWorkSession>(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      return stored ? JSON.parse(stored) : getInitialSession();
    } catch {
      return getInitialSession();
    }
  });

  // Critical Overrun Modal state
  const [showOverrunAlertModal, setShowOverrunAlertModal] = useState(false);
  const [lastOverrunTriggerAmount, setLastOverrunTriggerAmount] = useState<number | null>(null);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(WORKDAYS_KEY, JSON.stringify(workDays));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [workDays]);

  useEffect(() => {
    try {
      localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [expenses]);

  useEffect(() => {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [session]);

  // Rates calculation
  const dailyRate = useMemo(() => {
    const days = profile.workingDaysPerMonth > 0 ? profile.workingDaysPerMonth : 21;
    return profile.monthlyBaseSalary / days;
  }, [profile.monthlyBaseSalary, profile.workingDaysPerMonth]);

  const hourlyRate = useMemo(() => {
    const hours = profile.hoursPerDay > 0 ? profile.hoursPerDay : 7.5;
    return dailyRate / hours;
  }, [dailyRate, profile.hoursPerDay]);

  const secondRate = useMemo(() => {
    return hourlyRate / 3600;
  }, [hourlyRate]);

  // Budget calculations
  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, item) => sum + item.amount, 0);
  }, [expenses]);

  const remainingBudget = useMemo(() => {
    return profile.budgetTotalLimit - totalExpenses;
  }, [profile.budgetTotalLimit, totalExpenses]);

  const budgetPercentSpent = useMemo(() => {
    if (profile.budgetTotalLimit <= 0) return 0;
    return (totalExpenses / profile.budgetTotalLimit) * 100;
  }, [totalExpenses, profile.budgetTotalLimit]);

  const isBudgetOverrun = useMemo(() => {
    return totalExpenses > profile.budgetTotalLimit;
  }, [totalExpenses, profile.budgetTotalLimit]);

  const isBudgetWarning = useMemo(() => {
    return budgetPercentSpent >= profile.budgetWarningPercent && !isBudgetOverrun;
  }, [budgetPercentSpent, profile.budgetWarningPercent, isBudgetOverrun]);

  // Live timer tick for active session
  useEffect(() => {
    if (!session.isActive || session.isPaused) return;

    const interval = setInterval(() => {
      setSession((prev) => {
        if (!prev.isActive || prev.isPaused) return prev;
        return {
          ...prev,
          accumulatedSeconds: prev.accumulatedSeconds + 1,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [session.isActive, session.isPaused]);

  // Work session controls
  const startWorkSession = useCallback(() => {
    const now = Date.now();
    const today = new Date().toISOString().split('T')[0];
    setSession({
      isActive: true,
      isPaused: false,
      startTime: now,
      lastPauseTime: null,
      accumulatedSeconds: 0,
      overtimeMinutes: 0,
      sessionDate: today,
    });
    if (profile.soundEnabled) {
      playCashChime();
    }
  }, [profile.soundEnabled]);

  const pauseWorkSession = useCallback(() => {
    setSession((prev) => ({
      ...prev,
      isPaused: true,
      lastPauseTime: Date.now(),
    }));
  }, []);

  const resumeWorkSession = useCallback(() => {
    setSession((prev) => ({
      ...prev,
      isPaused: false,
      lastPauseTime: null,
    }));
    if (profile.soundEnabled) {
      playCashChime();
    }
  }, [profile.soundEnabled]);

  const stopAndSaveWorkSession = useCallback(() => {
    const sessionHours = session.accumulatedSeconds / 3600;
    const standardHours = profile.hoursPerDay;
    const regular = Math.min(sessionHours, standardHours);
    const overtime = Math.max(0, sessionHours - standardHours) + (session.overtimeMinutes / 60);

    const today = session.sessionDate || new Date().toISOString().split('T')[0];

    setWorkDays((prev) => ({
      ...prev,
      [today]: {
        date: today,
        regularHours: Number(regular.toFixed(2)),
        overtimeHours: Number(overtime.toFixed(2)),
        bonus: prev[today]?.bonus || 0,
        note: `Session enregistrée: ${sessionHours.toFixed(1)}h`,
        isOffDay: false,
      },
    }));

    setSession({
      isActive: false,
      isPaused: false,
      startTime: null,
      lastPauseTime: null,
      accumulatedSeconds: 0,
      overtimeMinutes: 0,
      sessionDate: today,
    });

    if (profile.soundEnabled) {
      playCashChime();
    }
  }, [session, profile.hoursPerDay, profile.soundEnabled]);

  const addSessionOvertime = useCallback((minutes: number) => {
    setSession((prev) => ({
      ...prev,
      overtimeMinutes: Math.max(0, prev.overtimeMinutes + minutes),
    }));
  }, []);

  // Expenses management & alarm triggering
  const addExpense = useCallback(
    (expense: Omit<ExpenseItem, 'id'>) => {
      const newId = `exp-${Date.now()}`;
      const item: ExpenseItem = { ...expense, id: newId };
      const newTotal = totalExpenses + item.amount;

      setExpenses((prev) => [item, ...prev]);

      // Check for alarm conditions
      if (newTotal > profile.budgetTotalLimit) {
        if (profile.soundEnabled) {
          playBudgetAlarmSiren(3.0);
        }
        setLastOverrunTriggerAmount(newTotal - profile.budgetTotalLimit);
        setShowOverrunAlertModal(true);
      } else if (
        (newTotal / profile.budgetTotalLimit) * 100 >= profile.budgetWarningPercent &&
        profile.soundEnabled
      ) {
        playWarningBeep();
      }
    },
    [totalExpenses, profile.budgetTotalLimit, profile.budgetWarningPercent, profile.soundEnabled]
  );

  const deleteExpense = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateWorkDay = useCallback((date: string, partial: Partial<WorkDayRecord>) => {
    setWorkDays((prev) => {
      const existing = prev[date] || {
        date,
        regularHours: 0,
        overtimeHours: 0,
        bonus: 0,
        isOffDay: false,
      };
      return {
        ...prev,
        [date]: { ...existing, ...partial },
      };
    });
  }, []);

  const updateProfile = useCallback((partial: Partial<SalaryProfile>) => {
    setProfileState((prev) => ({ ...prev, ...partial }));
  }, []);

  // Trigger test alarms
  const testAlarm = useCallback(() => {
    playBudgetAlarmSiren(2.5);
    setLastOverrunTriggerAmount(Math.max(120, totalExpenses - profile.budgetTotalLimit));
    setShowOverrunAlertModal(true);
  }, [totalExpenses, profile.budgetTotalLimit]);

  const testWarning = useCallback(() => {
    playWarningBeep();
  }, []);

  // Monthly aggregated totals
  const monthlyEarnings = useMemo(() => {
    let regularEarnings = 0;
    let overtimeEarnings = 0;
    let totalBonuses = 0;
    let totalDaysWorked = 0;
    let totalHoursLogged = 0;

    Object.values(workDays).forEach((day) => {
      if (!day.isOffDay && (day.regularHours > 0 || day.overtimeHours > 0)) {
        totalDaysWorked += 1;
        totalHoursLogged += day.regularHours + day.overtimeHours;
        regularEarnings += day.regularHours * hourlyRate;
        overtimeEarnings += day.overtimeHours * hourlyRate * profile.overtimeMultiplier;
        totalBonuses += day.bonus || 0;
      }
    });

    // Also include live session progress today if active
    if (session.isActive) {
      const liveHours = session.accumulatedSeconds / 3600;
      const liveOvertimeHours = session.overtimeMinutes / 60;
      const liveEarned =
        liveHours * hourlyRate + liveOvertimeHours * hourlyRate * profile.overtimeMultiplier;
      regularEarnings += liveEarned;
      totalHoursLogged += liveHours + liveOvertimeHours;
    }

    const totalEarned = regularEarnings + overtimeEarnings + totalBonuses;
    const projectedMonthTotal = Math.max(
      totalEarned,
      profile.monthlyBaseSalary + overtimeEarnings + totalBonuses
    );

    return {
      totalEarned,
      regularEarnings,
      overtimeEarnings,
      totalBonuses,
      totalDaysWorked,
      totalHoursLogged,
      projectedMonthTotal,
      netBalance: totalEarned - totalExpenses,
    };
  }, [
    workDays,
    session,
    hourlyRate,
    profile.overtimeMultiplier,
    profile.monthlyBaseSalary,
    totalExpenses,
  ]);

  return {
    profile,
    updateProfile,
    workDays,
    updateWorkDay,
    expenses,
    addExpense,
    deleteExpense,
    session,
    startWorkSession,
    pauseWorkSession,
    resumeWorkSession,
    stopAndSaveWorkSession,
    addSessionOvertime,
    dailyRate,
    hourlyRate,
    secondRate,
    totalExpenses,
    remainingBudget,
    budgetPercentSpent,
    isBudgetOverrun,
    isBudgetWarning,
    monthlyEarnings,
    showOverrunAlertModal,
    setShowOverrunAlertModal,
    lastOverrunTriggerAmount,
    testAlarm,
    testWarning,
  };
}
