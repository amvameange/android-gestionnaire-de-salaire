import React from 'react';
import {
  FileText,
  Sparkles,
  Printer,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  ArrowDown,
  Layers,
  Award,
} from 'lucide-react';
import { Chapter, ChapterMemo, VerticalFormula } from '../types/math';
import { GabonBadgeStamp } from './illustrations/FunFeedbackIllustrations';
import { StandingMathRenderer } from './StandingMathRenderer';

interface ChapterMemoViewProps {
  chapter: Chapter;
  onGoToExercises?: () => void;
}

export const ChapterMemoView: React.FC<ChapterMemoViewProps> = ({
  chapter,
  onGoToExercises,
}) => {
  const memo: ChapterMemo | undefined = chapter.memoSheet;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Memo Header Card */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border-2 border-amber-500/40 p-5 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/20 shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400 font-black">
                <FileText className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xs text-amber-300 bg-amber-950 px-2 py-0.5 rounded-full border border-amber-800">
                  {chapter.badge}
                </span>
                <span className="text-[11px] font-bold text-emerald-400">
                  🇬🇦 Programme CIAM 5ème
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                Fiche Mémo DS : {chapter.title}
              </h3>
              <p className="text-xs text-slate-300">
                {memo?.slogan || 'Toutes les formules du cours écrites en colonne verticale pour réussir tes devoirs !'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer shadow"
              title="Imprimer cette fiche mémo"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Imprimer la fiche</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. Points Clés à Retenir (Summary bullet points) */}
      {memo?.summaryBulletPoints && memo.summaryBulletPoints.length > 0 && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-black text-amber-300 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>L’Essentiel du Cours en un Coup d’Œil</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-2.5">
            {memo.summaryBulletPoints.map((point, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-200"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{point}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Formules du Cours en Colonne Verticale (Vertical Formula Cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-white uppercase tracking-wider">
              📐 Les Formules du Cours en Colonne Verticale
            </span>
          </div>
          <span className="text-xs text-slate-400">
            Écris ligne par ligne comme ceci sur ta copie !
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {memo?.verticalFormulas.map((vf, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-slate-900 border-2 border-slate-800 hover:border-amber-500/40 transition-all p-5 shadow-xl flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Title & Badge */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {vf.badge && (
                      <span className="text-lg select-none">{vf.badge}</span>
                    )}
                    <span className="font-bold text-white text-sm">
                      {vf.name}
                    </span>
                  </div>
                  {vf.ruleTitle && (
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-800">
                      {vf.ruleTitle}
                    </span>
                  )}
                </div>

                {/* Explanation text */}
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {vf.explanation}
                </p>

                {/* VERTICAL FORMULA BOX (Ligne par ligne avec flèche et fractions verticales) */}
                <StandingMathRenderer
                  expression={vf.steps.join('\n')}
                  subResult={vf.resultHighlight}
                  title={`Formule Debout : ${vf.name}`}
                  showColumnOp={true}
                />
              </div>

              {/* Koko's advice for this formula */}
              {vf.tip && (
                <div className="p-3 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-indigo-300">Astuce de Koko :</strong>{' '}
                    {vf.tip}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Koko's Advice & Classic Pitfall Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Koko Tip */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border-2 border-amber-500/40 shadow-xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-black text-amber-300 uppercase tracking-wider">
            <span className="text-lg">🐆</span>
            <span>Le Super Conseil de Koko pour le Devoir (DS)</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            {memo?.kokoTip || 'Prends ton temps, écris toujours une étape par ligne et encadre ta réponse finale à la règle pour faire plaisir au professeur !'}
          </p>
        </div>

        {/* Pitfall to avoid */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-900 border-2 border-rose-500/40 shadow-xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-black text-rose-300 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Le Gros Piège à Éviter Absolument</span>
          </div>
          <p className="text-xs text-rose-100 leading-relaxed font-medium">
            {memo?.pitfallToAvoid || 'Ne calcule jamais tout d’un coup sur une seule ligne avec des signes égal partout. Aligne toujours les égalités vers le bas.'}
          </p>
        </div>
      </div>

      {/* Official Stamp */}
      <GabonBadgeStamp />

      {/* CTA to practice exercises */}
      {onGoToExercises && (
        <div className="p-4 rounded-3xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between gap-3 shadow-lg">
          <div>
            <div className="text-sm font-bold text-emerald-400">
              Prêt(e) à tester ta mémoire ?
            </div>
            <div className="text-xs text-slate-300">
              Mets en pratique ces formules avec les 20 exercices corrigés étape par étape du chapitre !
            </div>
          </div>
          <button
            onClick={onGoToExercises}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition cursor-pointer shadow shrink-0 active:scale-95"
          >
            S’entraîner sur les 20 exercices ➔
          </button>
        </div>
      )}
    </div>
  );
};
