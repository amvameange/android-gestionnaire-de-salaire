import React from 'react';
import {
  BookOpen,
  Sparkles,
  Compass,
  FileText,
  Calculator,
  GraduationCap,
} from 'lucide-react';

export type MainViewTab = 'cours' | 'generateur' | 'simulateurs';

interface MathHeaderProps {
  currentTab: MainViewTab;
  onChangeTab: (tab: MainViewTab) => void;
  onOpenMemo: () => void;
}

export const MathHeader: React.FC<MathHeaderProps> = ({
  currentTab,
  onChangeTab,
  onOpenMemo,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand Zone */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-amber-400 to-sky-500 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400 font-black">
              <GraduationCap className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-white tracking-tight">
                Maths 5ème Gabon
              </span>
              <span className="text-[10px] font-black text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-800/80 flex items-center gap-1">
                <span>🇬🇦</span>
                <span>CIAM</span>
              </span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <span>Programme Collège Gabon</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">120 exercices en F CFA</span>
              <span>•</span>
              <span className="text-amber-300 font-bold hidden sm:inline">📐 Formules Debout</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-2xl border border-slate-800">
          <button
            onClick={() => onChangeTab('cours')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              currentTab === 'cours'
                ? 'bg-sky-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Cours & Exercices</span>
          </button>

          <button
            onClick={() => onChangeTab('generateur')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              currentTab === 'generateur'
                ? 'bg-amber-400 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Générateur Infini</span>
          </button>

          <button
            onClick={() => onChangeTab('simulateurs')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              currentTab === 'simulateurs'
                ? 'bg-emerald-400 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Labo Visuel</span>
          </button>
        </nav>

        {/* Action Button: Fiche Mémo */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenMemo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer shadow active:scale-95"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Fiches Mémos (Formules Debout)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
