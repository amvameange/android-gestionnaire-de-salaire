export type DomainId = 
  | 'nombres-calculs'
  | 'donnees-fonctions'
  | 'geometrie'
  | 'mesures';

export interface DomainMeta {
  id: DomainId;
  title: string;
  shortTitle: string;
  description: string;
  iconName: string;
  color: string;
  badgeBg: string;
}

export interface CorrectionStep {
  stepNumber: number;
  title: string;
  explanation: string;
  mathExpression: string;
  highlightedPart?: string;
  ruleApplied?: string;
  subResult?: string;
}

export type ExerciseDifficulty = 1 | 2 | 3 | 4; // 1: Échauffement, 2: Entraînement, 3: Approfondissement, 4: Défis & Problèmes

export interface Exercise {
  id: string;
  chapterId: string;
  title: string;
  difficulty: ExerciseDifficulty;
  difficultyLabel: 'Fondamental' | 'Entraînement' | 'Approfondissement' | 'Problème de synthèse';
  prompt: string;
  hint: string;
  questionType: 'qcm' | 'numeric' | 'text';
  options?: string[]; // For QCM
  correctAnswer: string;
  unit?: string;
  visualBadge?: string; // Emoji / visual badge icon
  explanationFinal: string;
  steps: CorrectionStep[];
}

export interface LessonSection {
  title: string;
  explanation: string[];
  rules?: {
    name: string;
    description: string;
    example: string;
    tip?: string;
  }[];
  examples?: {
    statement: string;
    solution: string;
    method: string;
  }[];
  commonMistakes?: string[];
}

export interface VerticalFormula {
  name: string;
  badge?: string;
  ruleTitle?: string;
  steps: string[]; // Vertically stacked lines
  resultHighlight?: string;
  explanation: string;
  tip?: string;
}

export interface ChapterMemo {
  title: string;
  slogan: string;
  summaryBulletPoints: string[];
  verticalFormulas: VerticalFormula[];
  kokoTip: string;
  pitfallToAvoid: string;
}

export interface Chapter {
  id: string;
  domainId: DomainId;
  order: number;
  title: string;
  badge: string;
  shortDesc: string;
  themeColor: string; // Vibrant color for youth appeal
  themeGradient: string;
  readingTimeMinutes: number;
  sections: LessonSection[];
  keyFormulas: string[];
  memoSheet?: ChapterMemo;
  exercises: Exercise[];
  visualizerType?: 'priority' | 'relatifs' | 'fractions' | 'triangle' | 'proportion';
}

export interface UserProgress {
  completedChapters: string[];
  solvedExercises: Record<string, { solvedAt: number; attempts: number; score: number }>;
  totalXp: number;
  streakDays: number;
  notes: Record<string, string>;
}
