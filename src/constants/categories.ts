import { CategoryMeta } from '../types';

export const BUDGET_CATEGORIES: CategoryMeta[] = [
  {
    id: 'logement',
    label: 'Logement & Loyer',
    iconName: 'Home',
    color: '#3b82f6', // blue
    defaultAllocationPercent: 35,
  },
  {
    id: 'alimentation',
    label: 'Alimentation & Courses',
    iconName: 'ShoppingBag',
    color: '#10b981', // emerald
    defaultAllocationPercent: 20,
  },
  {
    id: 'transport',
    label: 'Transports & Carburant',
    iconName: 'Car',
    color: '#f59e0b', // amber
    defaultAllocationPercent: 10,
  },
  {
    id: 'factures',
    label: 'Factures & Abonnements',
    iconName: 'Receipt',
    color: '#8b5cf6', // purple
    defaultAllocationPercent: 12,
  },
  {
    id: 'loisirs',
    label: 'Loisirs & Sorties',
    iconName: 'Sparkles',
    color: '#ec4899', // pink
    defaultAllocationPercent: 10,
  },
  {
    id: 'sante',
    label: 'Santé & Bien-être',
    iconName: 'HeartPulse',
    color: '#06b6d4', // cyan
    defaultAllocationPercent: 5,
  },
  {
    id: 'epargne',
    label: 'Épargne & Investissement',
    iconName: 'TrendingUp',
    color: '#14b8a6', // teal
    defaultAllocationPercent: 5,
  },
  {
    id: 'autre',
    label: 'Divers & Imprévus',
    iconName: 'MoreHorizontal',
    color: '#64748b', // slate
    defaultAllocationPercent: 3,
  },
];
