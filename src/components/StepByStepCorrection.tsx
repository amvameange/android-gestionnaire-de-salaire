import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Lightbulb,
  Award,
} from 'lucide-react';
import { CorrectionStep } from '../types/math';
import { KokoStepDetective, GabonBadgeStamp } from './illustrations/FunFeedbackIllustrations';
import { StandingMathRenderer } from './StandingMathRenderer';

interface StepByStepCorrectionProps {
  steps: CorrectionStep[];
  finalResult: string;
  initialShowAll?: boolean;
}

export const StepByStepCorrection: React.FC<StepByStepCorrectionProps> = ({
  steps,
  finalResult,
  initialShowAll = false,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showAllSteps, setShowAllSteps] = useState(initialShowAll);

  const totalSteps = steps.length;
  const currentStep = steps[currentStepIndex];

  const goNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="space-y-4 rounded-3xl bg-slate-900 border-2 border-sky-500/30 p-4 sm:p-5 shadow-2xl">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-400 text-slate-950 flex items-center justify-center font-black text-xs shadow-md">
            {showAllSteps ? totalSteps : currentStepIndex + 1}/{totalSteps}
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>Correction Détaillée & Méthode Pas à Pas</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </h4>
            <div className="text-[11px] text-slate-400">
              Décomposition claire conforme au programme officiel CIAM Gabon
            </div>
          </div>
        </div>

        {/* Toggle Mode: Pas à Pas vs Tout voir */}
        <button
          onClick={() => setShowAllSteps(!showAllSteps)}
          className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer flex items-center gap-1.5 shadow"
        >
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          <span>{showAllSteps ? 'Mode Pas à Pas' : 'Voir tout d’un coup'}</span>
        </button>
      </div>

      {/* Step Progress Dots (in Pas à Pas mode) */}
      {!showAllSteps && (
        <div className="flex items-center justify-between gap-1.5 px-1">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStepIndex(idx)}
              className={`h-2.5 flex-1 rounded-full transition-all cursor-pointer ${
                idx === currentStepIndex
                  ? 'bg-amber-400 ring-2 ring-amber-400/40 shadow'
                  : idx < currentStepIndex
                  ? 'bg-emerald-400'
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
              title={`Aller à l'étape ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* STEP CONTENT : Single Step (Guided Mode) */}
      {!showAllSteps && currentStep && (
        <div className="rounded-2xl bg-slate-950/90 border border-slate-800 p-4 space-y-3.5 animate-fade-in shadow-inner">
          {/* Fun Detective Cartoon Header for this step */}
          <KokoStepDetective
            stepNumber={currentStep.stepNumber}
            totalSteps={totalSteps}
            title={currentStep.title}
          />

          {/* Rule Applied Callout */}
          {currentStep.ruleApplied && (
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-amber-300">Règle appliquée :</strong> {currentStep.ruleApplied}
              </div>
            </div>
          )}

          {/* Math Expression Posé Debout (Cascade & Opération en colonne) */}
          <StandingMathRenderer
            expression={currentStep.mathExpression}
            subResult={currentStep.subResult}
            title={`Étape ${currentStep.stepNumber} : Calcul Posé Debout`}
          />

          {/* Detailed explanation */}
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pt-1 font-medium">
            {currentStep.explanation}
          </p>

          {/* If on final step, show the official Gabon stamp */}
          {currentStepIndex === totalSteps - 1 && (
            <div className="pt-2 animate-fade-in">
              <GabonBadgeStamp />
            </div>
          )}

          {/* Navigation Buttons for Step by Step */}
          <div className="pt-3 flex items-center justify-between border-t border-slate-800">
            <button
              onClick={goPrev}
              disabled={currentStepIndex === 0}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
                currentStepIndex === 0
                  ? 'opacity-30 cursor-not-allowed text-slate-600'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 shadow'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Étape précédente</span>
            </button>

            <span className="text-xs font-mono font-bold text-slate-400">
              {currentStepIndex + 1} / {totalSteps}
            </span>

            {currentStepIndex < totalSteps - 1 ? (
              <button
                onClick={goNext}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center gap-1 shadow-lg transition cursor-pointer active:scale-95"
              >
                <span>Étape suivante</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-black text-emerald-300 bg-emerald-950 px-3.5 py-2 rounded-xl border border-emerald-500/40 shadow">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Terminé avec succès !</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ALL STEPS (List Mode) */}
      {showAllSteps && (
        <div className="space-y-3.5">
          {steps.map((st) => (
            <div
              key={st.stepNumber}
              className="rounded-2xl bg-slate-950/80 border border-slate-800 p-4 space-y-2.5 shadow-sm"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-sky-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-mono text-[10px] font-black">
                    {st.stepNumber}
                  </span>
                  <span>{st.title}</span>
                </span>
                {st.subResult && (
                  <span className="font-mono text-[11px] text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {st.subResult}
                  </span>
                )}
              </div>

              <StandingMathRenderer
                expression={st.mathExpression}
                subResult={st.subResult}
                title={`Étape ${st.stepNumber} Debout : ${st.title}`}
              />

              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {st.explanation}
              </p>
            </div>
          ))}

          {/* Stamp and Final Result Card */}
          <GabonBadgeStamp />

          <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-200 text-xs font-semibold flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-sm font-bold text-white">{finalResult}</span>
            </div>
            <span className="font-black uppercase text-[10px] tracking-wider bg-emerald-500 text-slate-950 px-2.5 py-1 rounded-full shadow">
              Résultat Validé
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
