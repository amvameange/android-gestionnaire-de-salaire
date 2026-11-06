export type CurrencyCode = 'EUR' | 'USD' | 'FCFA' | 'CAD' | 'GBP' | 'CHF' | 'MAD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  locale: string;
}

export interface SalaryProfile {
  monthlyBaseSalary: number; // e.g. 2600 €
  workingDaysPerMonth: number; // e.g. 21 days
  hoursPerDay: number; // e.g. 7.5 or 8 hours
  overtimeMultiplier: number; // e.g. 1.25x
  currency: CurrencyCode;
  budgetTotalLimit: number; // e.g. 2100 €
  budgetWarningPercent: number; // e.g. 80%
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  notificationsEnabled: boolean;
  jobTitle: string;
  companyName: string;
}

export interface WorkDayRecord {
  date: string; // YYYY-MM-DD
  regularHours: number;
  overtimeHours: number;
  bonus: number;
  note?: string;
  isOffDay?: boolean;
}

export type BudgetCategory = 
  | 'logement'
  | 'alimentation'
  | 'transport'
  | 'loisirs'
  | 'sante'
  | 'factures'
  | 'epargne'
  | 'autre';

export interface CategoryMeta {
  id: BudgetCategory;
  label: string;
  iconName: string;
  color: string;
  defaultAllocationPercent: number; // percentage of budget
}

export interface ExpenseItem {
  id: string;
  title: string;
  amount: number;
  category: BudgetCategory;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
}

export interface ActiveWorkSession {
  isActive: boolean;
  isPaused: boolean;
  startTime: number | null; // timestamp ms
  lastPauseTime: number | null;
  accumulatedSeconds: number;
  overtimeMinutes: number;
  sessionDate: string; // YYYY-MM-DD
}

export interface Milestone {
  id: string;
  amount: number;
  label: string;
  icon: string;
  reached: boolean;
}
