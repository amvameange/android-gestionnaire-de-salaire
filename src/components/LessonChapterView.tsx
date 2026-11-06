import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Award,
  Layers,
  Star,
  Check,
  FileText,
  ArrowDown,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Chapter, Exercise, ExerciseDifficulty } from '../types/math';
import { StepByStepCorrection } from './StepByStepCorrection';
import { ChapterMemoView } from './ChapterMemoView';
import {
  MascotKoko,
  FunPriorityPyramid,
  GabonRelatifsIllustration,
  GabonFractionsIllustration,
  GabonProportionnaliteIllustration,
  GabonTriangleIllustration,
} from './illustrations/GabonMathIllustrations';
import {
  KokoSuccessCelebration,
  KokoEncouragingFeedback,
} from './illustrations/FunFeedbackIllustrations';
import { StandingMathRenderer } from './StandingMathRenderer';

interface LessonChapterViewProps {
  chapter: Chapter;
  onNextChapter?: () => void;
  onPrevChapter?: () => void;
}

export const LessonChapterView: React.FC<LessonChapterViewProps> = ({
  chapter,
  onNextChapter,
  onPrevChapter,
}) => {
  const [activeTab, setActiveTab] = useState<'cours' | 'memo' | 'exercices'>('cours');
  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(0);
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState<number | 'all'>('all');

  // Exercise interaction state
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [checkedState, setCheckedState] = useState<
    Record<string, { answered: boolean; correct: boolean }>
  >({});
  const [shownHints, setShownHints] = useState<Record<string, boolean>>({});
  const [shownCorrections, setShownCorrections] = useState<Record<string, boolean>>({});

  const allExercises = chapter.exercises || [];

  // Filtered exercises for difficulty selector
  const filteredExercises = allExercises
    .map((exo, idx) => ({ exo, originalIndex: idx }))
    .filter(
      ({ exo }) =>
        selectedDifficultyFilter === 'all' || exo.difficulty === selectedDifficultyFilter
    );

  const currentExercise: Exercise | undefined = allExercises[activeExerciseIndex] || allExercises[0];

  // Count solved exercises
  const solvedCount = Object.keys(checkedState).filter(
    (id) => allExercises.some((e) => e.id === id) && checkedState[id]?.correct
  ).length;

  const handleSelectAnswer = (exo: Exercise, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [exo.id]: answer }));
    handleCheckAnswer(exo, answer);
  };

  const handleCheckAnswer = (exo: Exercise, manualVal?: string) => {
    const val = (manualVal !== undefined ? manualVal : userAnswers[exo.id])?.trim() || '';
    if (!val) return;

    const cleanUser = val.replace(/\s+/g, '').replace(',', '.').toLowerCase();
    const cleanCorrect = exo.correctAnswer.replace(/\s+/g, '').replace(',', '.').toLowerCase();

    const isMatch = cleanUser === cleanCorrect;
    setCheckedState((prev) => ({
      ...prev,
      [exo.id]: { answered: true, correct: isMatch },
    }));

    if (isMatch) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.65 },
        });

        // Cheerful math bell chime
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.08); // A5
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      } catch {}
    }
  };

  const goToNextExercise = () => {
    if (activeExerciseIndex < allExercises.length - 1) {
      setActiveExerciseIndex((prev) => prev + 1);
    }
  };

  const goToPrevExercise = () => {
    if (activeExerciseIndex > 0) {
      setActiveExerciseIndex((prev) => prev - 1);
    }
  };

  const getKokoSpeechForChapter = (chapId: string): string => {
    switch (chapId) {
      case 'chap-1-priorites':
        return "Mbolo ! N'oublie jamais la règle d'or de la fusée : les multiplications et divisions sont toujours calculées avant les additions et soustractions !";
      case 'chap-2-relatifs':
        return "Pense au Mont Bengoué (+1 070 m) pour les hauteurs positives, et aux profondeurs marines de l'Atlantique (-80 m) pour les négatifs !";
      case 'chap-3-fractions':
        return "Pour partager des atangas ou du manioc équitablement, mets d'abord tes fractions au même dénominateur !";
      case 'chap-4-proportionnalite':
        return "Au grand marché Mont-Bouët à Libreville, le produit en croix est ton super-pouvoir pour calculer tous les prix en Franc CFA !";
      case 'chap-5-triangles':
        return "Dans tout triangle au monde, la somme des trois angles vaut TOUJOURS 180° ! Ni plus, ni moins !";
      case 'chap-6-aires':
        return "Pour l'aire d'un triangle, n'oublie jamais : base × hauteur ÷ 2 ! Diviser par 2 est le réflexe des champions !";
      default:
        return "Mbolo ! Suis les étapes pas à pas et les mathématiques n'auront plus de secrets pour toi !";
    }
  };

  return (
    <div className="space-y-5 pb-20">
      {/* Chapter Title & Hero Card */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl relative overflow-hidden">
        {/* Ambient Chapter Color Gradient */}
        <div
          className={`absolute top-0 right-0 w-80 h-40 bg-gradient-to-bl ${chapter.themeGradient || 'from-sky-500/10 to-transparent'} opacity-30 blur-2xl pointer-events-none`}
        />

        <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2 mb-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-md border border-amber-800/80 flex items-center gap-1.5">
              <span>🇬🇦</span>
              <span>{chapter.badge}</span>
            </span>
            <span className="text-slate-400 font-semibold text-[11px]">
              Collection CIAM 5ème
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/60 flex items-center gap-1">
              <span>🌟</span>
              <span>{solvedCount} / {allExercises.length} réussis</span>
            </span>
            <span className="text-slate-400">~{chapter.readingTimeMinutes} min de cours</span>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white relative z-10">
          {chapter.title}
        </h2>
        <p className="text-xs text-slate-300 mt-1.5 leading-relaxed relative z-10">
          {chapter.shortDesc}
        </p>

        {/* View Mode Toggle: 1. Cours & Dessins | 2. Mémo DS (Formules Verticales) | 3. 20 Exercices corrigés */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800 relative z-10">
          <button
            onClick={() => setActiveTab('cours')}
            className={`py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTab === 'cours'
                ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-400/40'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. Cours & Dessins</span>
          </button>

          <button
            onClick={() => setActiveTab('memo')}
            className={`py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTab === 'memo'
                ? 'bg-sky-400 text-slate-950 shadow-md ring-2 ring-sky-400/40'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>2. Mémo DS (Formules Verticales)</span>
          </button>

          <button
            onClick={() => setActiveTab('exercices')}
            className={`py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTab === 'exercices'
                ? 'bg-emerald-500 text-slate-950 shadow-md ring-2 ring-emerald-500/40'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>3. 20 Exercices Corrigés</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1 : LE COURS ILLUSTRÉ AVEC KOKO & DESSINS GABON       */}
      {/* ========================================================= */}
      {activeTab === 'cours' && (
        <div className="space-y-5 animate-fade-in">
          {/* Mascot Koko Speech Box */}
          <MascotKoko speech={getKokoSpeechForChapter(chapter.id)} />

          {/* Key formulas banner with VERTICAL FORMULAS PREVIEW */}
          <div className="rounded-3xl bg-slate-900 border-2 border-sky-500/40 p-4 sm:p-5 space-y-3 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
              <div className="text-xs font-black text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Formules Clés du Cours (En Colonne Verticale)</span>
              </div>
              <button
                onClick={() => setActiveTab('memo')}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition cursor-pointer"
              >
                <span>Fiche Mémo Complète</span>
                <span>➔</span>
              </button>
            </div>

            {/* Vertical formulas cards (Debout & Non Couché) */}
            {chapter.memoSheet?.verticalFormulas && chapter.memoSheet.verticalFormulas.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                {chapter.memoSheet.verticalFormulas.slice(0, 3).map((vf, idx) => (
                  <StandingMathRenderer
                    key={idx}
                    expression={vf.steps.join('\n')}
                    subResult={vf.resultHighlight}
                    title={`Formule Debout : ${vf.name}`}
                    showColumnOp={false}
                  />
                ))}
              </div>
            ) : (
              <ul className="space-y-1.5 text-xs text-slate-200">
                {chapter.keyFormulas.map((form, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span className="font-mono font-semibold">{form}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* DÉCLIC & GABON VECTOR ILLUSTRATIONS EMBEDDED IN COURSE */}
          {chapter.id === 'chap-1-priorites' && <FunPriorityPyramid />}
          {chapter.id === 'chap-2-relatifs' && <GabonRelatifsIllustration />}
          {chapter.id === 'chap-3-fractions' && <GabonFractionsIllustration />}
          {chapter.id === 'chap-4-proportionnalite' && <GabonProportionnaliteIllustration />}
          {chapter.id === 'chap-5-triangles' && <GabonTriangleIllustration />}

          {/* Structured Sections */}
          {chapter.sections.map((sec, secIdx) => (
            <div
              key={secIdx}
              className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-lg space-y-3"
            >
              <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
                {sec.title}
              </h3>

              {/* Explanatory text */}
              <div className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
                {sec.explanation.map((line, lIdx) => (
                  <p key={lIdx}>{line}</p>
                ))}
              </div>

              {/* Rules and Examples */}
              {sec.rules && (
                <div className="space-y-2.5 pt-2">
                  {sec.rules.map((rule, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5"
                    >
                      <div className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                        <span>{rule.name}</span>
                      </div>
                      <p className="text-xs text-slate-200">{rule.description}</p>
                      <StandingMathRenderer
                        expression={rule.example}
                        title={`Exemple Modèle Debout : ${rule.name}`}
                        showColumnOp={true}
                      />
                      {rule.tip && (
                        <div className="text-[11px] text-amber-300/90 italic pt-0.5">
                          💡 Le Déclic CIAM : {rule.tip}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Common mistakes */}
              {sec.commonMistakes && sec.commonMistakes.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-1.5">
                  <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Pièges fréquents à éviter en devoir surveillé (DS)</span>
                  </div>
                  <ul className="text-xs text-rose-200/90 space-y-1 list-disc list-inside">
                    {sec.commonMistakes.map((mis, mIdx) => (
                      <li key={mIdx}>{mis}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {/* CTA to exercises */}
          <div className="p-4 rounded-3xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-bold text-emerald-400">
                Passe à la pratique avec Koko !
              </div>
              <div className="text-xs text-slate-300">
                {allExercises.length} exercices d’application progressifs t’attendent avec les calculs en Franc CFA et des corrections détaillées.
              </div>
            </div>
            <button
              onClick={() => setActiveTab('exercices')}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition cursor-pointer shadow shrink-0"
            >
              Faire les 20 exercices ➔
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2 : FICHE MÉMO DS DU CHAPITRE (FORMULES VERTICALES)   */}
      {/* ========================================================= */}
      {activeTab === 'memo' && (
        <ChapterMemoView
          chapter={chapter}
          onGoToExercises={() => setActiveTab('exercices')}
        />
      )}

      {/* ========================================================= */}
      {/* TAB 3 : LES 20 EXERCICES CORRIGÉS ÉTAPE PAR ÉTAPE         */}
      {/* ========================================================= */}
      {activeTab === 'exercices' && currentExercise && (
        <div className="space-y-4 animate-fade-in">
          {/* Difficulty Level Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-2 rounded-2xl border border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 px-2">Niveau :</span>
            {[
              { id: 'all', label: `Tous (${allExercises.length})` },
              { id: 1, label: '🟢 Niveau 1 : Fondamental (1-5)' },
              { id: 2, label: '🟡 Niveau 2 : Entraînement (6-10)' },
              { id: 3, label: '🟠 Niveau 3 : Approfondissement (11-15)' },
              { id: 4, label: '🟣 Niveau 4 : Défis & Problèmes Gabon (16-20)' },
            ].map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setSelectedDifficultyFilter(lvl.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                  selectedDifficultyFilter === lvl.id
                    ? 'bg-amber-400 text-slate-950 font-bold shadow'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>

          {/* 1-20 Numbered Buttons Carousel */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {allExercises.map((exo, idx) => {
              const isCurrent = idx === activeExerciseIndex;
              const isCorrect = checkedState[exo.id]?.correct;

              return (
                <button
                  key={exo.id}
                  onClick={() => setActiveExerciseIndex(idx)}
                  className={`min-w-[44px] h-11 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer shrink-0 border ${
                    isCurrent
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md ring-2 ring-amber-400/40'
                      : isCorrect
                      ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/50'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }`}
                  title={exo.title}
                >
                  {exo.visualBadge ? (
                    <span className="text-xs">{exo.visualBadge}</span>
                  ) : null}
                  <span>{idx + 1}</span>
                  {isCorrect && <Check className="w-3 h-3 stroke-[3] text-emerald-400" />}
                </button>
              );
            })}
          </div>

          {/* ACTIVE EXERCISE CARD */}
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {currentExercise.visualBadge && (
                  <span className="text-xl select-none" role="img" aria-label="badge">
                    {currentExercise.visualBadge}
                  </span>
                )}
                <span className="font-extrabold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-md border border-amber-800/60">
                  Exercice {activeExerciseIndex + 1} / {allExercises.length} · {currentExercise.difficultyLabel}
                </span>
              </div>

              <span className="text-slate-400 font-medium">
                {currentExercise.steps.length} étapes de correction
              </span>
            </div>

            <h3 className="text-base font-bold text-white">
              {currentExercise.title}
            </h3>

            {/* Prompt Statement */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-sm font-medium text-slate-100 whitespace-pre-line leading-relaxed shadow-inner">
              {currentExercise.prompt}
            </div>

            {/* Standing calculation reminder */}
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-amber-500/25 text-xs flex items-center justify-between gap-2 shadow-xs">
              <span className="text-amber-300 font-bold flex items-center gap-1.5">
                <span>📐</span>
                <span>Conseil CIAM : Écris chaque calcul posé debout ligne par ligne avec les = bien alignés !</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 font-bold hidden sm:inline">
                Debout (non couché)
              </span>
            </div>

            {/* Hint toggler */}
            <div>
              {!shownHints[currentExercise.id] ? (
                <button
                  onClick={() =>
                    setShownHints((prev) => ({ ...prev, [currentExercise.id]: true }))
                  }
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 font-medium cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>💡 Le Coup de Pouce de Koko (Indice)</span>
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2 animate-fade-in">
                  <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold text-amber-300">Indice :</strong>{' '}
                    {currentExercise.hint}
                  </div>
                </div>
              )}
            </div>

            {/* Input area: QCM or numeric input */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="text-xs text-slate-400 font-medium">
                À toi de jouer :
              </label>

              {currentExercise.options && currentExercise.options.length > 0 ? (
                // Multiple choice buttons (super friendly for 12yo students)
                <div className="grid sm:grid-cols-2 gap-2">
                  {currentExercise.options.map((opt, optIdx) => {
                    const isSelected = userAnswers[currentExercise.id] === opt;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectAnswer(currentExercise, opt)}
                        className={`p-3 rounded-xl text-xs font-semibold text-left transition cursor-pointer border ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow'
                            : 'bg-slate-950 text-slate-200 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              ) : (
                // Direct text / number input
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={
                      currentExercise.unit
                        ? `Ex: 24 (en ${currentExercise.unit})`
                        : 'Tape ta réponse ici...'
                    }
                    value={userAnswers[currentExercise.id] || ''}
                    onChange={(e) =>
                      setUserAnswers((prev) => ({
                        ...prev,
                        [currentExercise.id]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => e.key === 'Enter' && handleCheckAnswer(currentExercise)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                  <button
                    onClick={() => handleCheckAnswer(currentExercise)}
                    disabled={!userAnswers[currentExercise.id]?.trim()}
                    className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow active:scale-95 shrink-0"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Valider</span>
                  </button>
                </div>
              )}
            </div>

            {/* Answer feedback with fun cartoon drawings */}
            {checkedState[currentExercise.id]?.answered && (
              <div className="pt-2 animate-fade-in">
                {checkedState[currentExercise.id].correct ? (
                  <KokoSuccessCelebration
                    message="Akiba ! Réponse exacte !"
                    subMessage={`Tu as réussi l’exercice ${activeExerciseIndex + 1} du programme gabonais ! Consulte la rédaction modèle ci-dessous pour être le roi ou la reine du prochain contrôle.`}
                  />
                ) : (
                  <KokoEncouragingFeedback
                    title="Pas tout à fait, mais tu y es presque !"
                    message="L'erreur en maths est normale pour progresser. Clique sur le bouton ci-dessous pour découvrir la super astuce de Koko et la solution pas à pas !"
                    onShowSolution={() =>
                      setShownCorrections((prev) => ({
                        ...prev,
                        [currentExercise.id]: true,
                      }))
                    }
                  />
                )}
              </div>
            )}

            {/* Step-by-step correction toggle button */}
            {!shownCorrections[currentExercise.id] ? (
              <div className="pt-2">
                <button
                  onClick={() =>
                    setShownCorrections((prev) => ({
                      ...prev,
                      [currentExercise.id]: true,
                    }))
                  }
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Afficher la Correction Détaillée Étape par Étape</span>
                </button>
              </div>
            ) : (
              <div className="pt-2 animate-fade-in">
                <StepByStepCorrection
                  steps={currentExercise.steps}
                  finalResult={currentExercise.explanationFinal}
                  initialShowAll={false}
                />
              </div>
            )}

            {/* Exercise Carousel Navigation Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <button
                onClick={goToPrevExercise}
                disabled={activeExerciseIndex === 0}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 flex items-center gap-1 transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Ex. précédent</span>
              </button>

              <span className="text-xs font-mono font-bold text-slate-400">
                {activeExerciseIndex + 1} / {allExercises.length}
              </span>

              <button
                onClick={goToNextExercise}
                disabled={activeExerciseIndex === allExercises.length - 1}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 flex items-center gap-1 transition cursor-pointer shadow"
              >
                <span>Ex. suivant</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chapter Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        {onPrevChapter ? (
          <button
            onClick={onPrevChapter}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Chapitre précédent</span>
          </button>
        ) : (
          <div />
        )}

        {onNextChapter && (
          <button
            onClick={onNextChapter}
            className="flex items-center gap-1 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition cursor-pointer shadow"
          >
            <span>Chapitre suivant</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
