import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  RefreshCw,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { StepByStepCorrection } from './StepByStepCorrection';
import { CorrectionStep } from '../types/math';
import {
  KokoSuccessCelebration,
  KokoEncouragingFeedback,
} from './illustrations/FunFeedbackIllustrations';

type ExerciseTheme = 'priorites' | 'relatifs' | 'fractions' | 'pourcentages' | 'angles';

interface GeneratedExercise {
  theme: ExerciseTheme;
  title: string;
  prompt: string;
  hint: string;
  correctAnswer: string;
  unit?: string;
  steps: CorrectionStep[];
  explanationFinal: string;
}

export const InfiniteExerciseGenerator: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<ExerciseTheme>('priorites');
  const [exercise, setExercise] = useState<GeneratedExercise | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showCorrection, setShowCorrection] = useState<boolean>(false);

  // Generator function
  const generateNewExercise = (theme: ExerciseTheme): GeneratedExercise => {
    setIsAnswered(false);
    setUserAnswer('');
    setShowHint(false);
    setShowCorrection(false);

    if (theme === 'priorites') {
      // Expression: a + b * c - d
      const a = Math.floor(Math.random() * 20) + 10; // 10..29
      const b = Math.floor(Math.random() * 6) + 2; // 2..7
      const c = Math.floor(Math.random() * 8) + 3; // 3..10
      const prod = b * c;
      const sum = a + prod;
      const d = Math.floor(Math.random() * 10) + 2; // 2..11
      const res = sum - d;

      return {
        theme: 'priorites',
        title: 'Priorités opératoires sans parenthèses',
        prompt: `Calculer l’expression suivante en détaillant les étapes :\nE = ${a} + ${b} × ${c} - ${d}`,
        hint: `Rappelle-toi la règle d'or : la multiplication (${b} × ${c}) est strictement prioritaire sur l'addition et la soustraction !`,
        correctAnswer: res.toString(),
        explanationFinal: `Le résultat est E = ${res}.`,
        steps: [
          {
            stepNumber: 1,
            title: 'Identifier la multiplication prioritaire',
            explanation: `Dans l'expression, la multiplication ${b} × ${c} doit être calculée en premier.`,
            mathExpression: `E = ${a} + [${b} × ${c}] - ${d}`,
            highlightedPart: `${b} × ${c}`,
            ruleApplied: 'La multiplication est prioritaire sur l’addition et la soustraction.',
            subResult: `${b} × ${c} = ${prod}`,
          },
          {
            stepNumber: 2,
            title: 'Remplacer le résultat intermédiaire',
            explanation: `On remplace ${b} × ${c} par ${prod}.`,
            mathExpression: `E = ${a} + ${prod} - ${d}`,
          },
          {
            stepNumber: 3,
            title: 'Calculer de gauche à droite',
            explanation: `Il ne reste que des additions et des soustractions. On calcule dans l'ordre de lecture : ${a} + ${prod} = ${sum}.`,
            mathExpression: `E = ${sum} - ${d}`,
            subResult: `${a} + ${prod} = ${sum}`,
          },
          {
            stepNumber: 4,
            title: 'Calcul final',
            explanation: `On effectue la dernière soustraction : ${sum} - ${d} = ${res}.`,
            mathExpression: `E = ${res}`,
            subResult: `${sum} - ${d} = ${res}`,
          },
        ],
      };
    } else if (theme === 'relatifs') {
      // Expression: (+a) - (-b) + (-c)
      const a = Math.floor(Math.random() * 12) + 4;
      const b = Math.floor(Math.random() * 9) + 2;
      const c = Math.floor(Math.random() * 15) + 5;
      const res = a + b - c;

      return {
        theme: 'relatifs',
        title: 'Enchaînement d’opérations avec nombres relatifs',
        prompt: `Calculer l'expression suivante :\nR = (+${a}) - (-${b}) + (-${c})`,
        hint: 'Rappel : Soustraire un nombre relatif revient à ajouter son opposé : - (-b) devient + (+b).',
        correctAnswer: res.toString(),
        explanationFinal: `Le résultat est R = ${res > 0 ? `+${res}` : res}.`,
        steps: [
          {
            stepNumber: 1,
            title: 'Transformer la soustraction en addition de l’opposé',
            explanation: `Soustraire (-${b}) revient à ajouter (+${b}).`,
            mathExpression: `R = (+${a}) + (+${b}) + (-${c})`,
            ruleApplied: 'Règle : a - (-b) = a + (+b)',
            subResult: `- (-${b}) → + (+${b})`,
          },
          {
            stepNumber: 2,
            title: 'Additionner les nombres positifs',
            explanation: `On additionne les deux nombres positifs : (+${a}) + (+${b}) = +${a + b}.`,
            mathExpression: `R = (+${a + b}) + (-${c})`,
            subResult: `${a} + ${b} = ${a + b}`,
          },
          {
            stepNumber: 3,
            title: 'Additionner deux relatifs de signes contraires',
            explanation: `On compare les distances à zéro ${a + b} et ${c}. Comme ${a + b >= c ? `${a + b} ≥ ${c}` : `${c} > ${a + b}`}, le signe est ${res >= 0 ? '+' : '-'} et la différence vaut ${Math.abs(res)}.`,
            mathExpression: `R = ${res > 0 ? `+${res}` : res}`,
            subResult: `Résultat = ${res}`,
          },
        ],
      };
    } else if (theme === 'fractions') {
      // Fraction addition: a/b + c/(k*b)
      const b = 4;
      const k = 3;
      const den2 = b * k; // 12
      const a = Math.floor(Math.random() * 3) + 1; // 1..3
      const c = Math.floor(Math.random() * 5) + 1; // 1..5
      const newNum1 = a * k;
      const sumNum = newNum1 + c;

      return {
        theme: 'fractions',
        title: 'Addition de fractions avec dénominateurs multiples',
        prompt: `Calculer la somme suivante :\nS = ${a}/${b} + ${c}/${den2} (écrire le numérateur final sur ${den2})`,
        hint: `Remarque que ${den2} est un multiple de ${b} (${b} × ${k} = ${den2}). Mets la première fraction sur ${den2} !`,
        correctAnswer: `${sumNum}/${den2}`,
        explanationFinal: `Le résultat est S = ${sumNum}/${den2}.`,
        steps: [
          {
            stepNumber: 1,
            title: `Identifier le dénominateur commun (${den2})`,
            explanation: `Le dénominateur ${den2} est dans la table de ${b} car ${b} × ${k} = ${den2}. Le dénominateur commun est donc ${den2}.`,
            mathExpression: `Dénominateur commun = ${den2}`,
          },
          {
            stepNumber: 2,
            title: `Mettre la fraction ${a}/${b} sur ${den2}`,
            explanation: `On multiplie le numérateur et le dénominateur par ${k}.`,
            mathExpression: `${a}/${b} = (${a} × ${k}) / (${b} × ${k}) = ${newNum1}/${den2}`,
            subResult: `${a} × ${k} = ${newNum1}`,
          },
          {
            stepNumber: 3,
            title: `Additionner les deux fractions sur ${den2}`,
            explanation: `On additionne les numérateurs (${newNum1} + ${c}) et on CONSERVE le dénominateur ${den2}.`,
            mathExpression: `S = ${newNum1}/${den2} + ${c}/${den2} = (${newNum1} + ${c}) / ${den2} = ${sumNum}/${den2}`,
            subResult: `${newNum1} + ${c} = ${sumNum}`,
          },
        ],
      };
    } else if (theme === 'pourcentages') {
      // Pourcentage en F CFA: t% of N
      const rates = [10, 20, 25, 50];
      const t = rates[Math.floor(Math.random() * rates.length)];
      const n = (Math.floor(Math.random() * 10) + 4) * 1000; // 4000, 5000, 6000...
      const res = (n * t) / 100;

      return {
        theme: 'pourcentages',
        title: 'Calcul de pourcentage en Franc CFA',
        prompt: `Calculer ${t}% d'une somme de ${n.toLocaleString('fr-FR')} F CFA au marché.`,
        hint: `Pour calculer ${t}% d'une valeur, on multiplie cette valeur par ${t} puis on divise par 100.`,
        correctAnswer: res.toString(),
        unit: 'F CFA',
        explanationFinal: `${t}% de ${n.toLocaleString('fr-FR')} F CFA vaut ${res.toLocaleString('fr-FR')} F CFA.`,
        steps: [
          {
            stepNumber: 1,
            title: 'Écrire la formule du pourcentage',
            explanation: `Prendre ${t}% d'une quantité, c'est multiplier cette quantité par ${t}/100.`,
            mathExpression: `Valeur = ${n} × (${t} / 100)`,
            ruleApplied: 'Règle : t% de N = (N × t) ÷ 100',
          },
          {
            stepNumber: 2,
            title: 'Effectuer la multiplication',
            explanation: `${n} × ${t} = ${n * t}.`,
            mathExpression: `Valeur = ${n * t} / 100`,
            subResult: `${n} × ${t} = ${n * t}`,
          },
          {
            stepNumber: 3,
            title: 'Diviser par 100',
            explanation: `${n * t} ÷ 100 = ${res} F CFA.`,
            mathExpression: `Valeur = ${res} F CFA`,
            subResult: `${n * t} ÷ 100 = ${res}`,
          },
        ],
      };
    } else {
      // Angles in a triangle: Â + B̂ + Ĉ = 180
      const a = Math.floor(Math.random() * 30) + 40; // 40..69
      const b = Math.floor(Math.random() * 30) + 40; // 40..69
      const c = 180 - a - b;

      return {
        theme: 'angles',
        title: 'Calcul d’angle manquant dans un triangle',
        prompt: `Dans un triangle ABC, on donne l'angle Â = ${a}° et l'angle B̂ = ${b}°. Calculer la mesure de l'angle Ĉ en degrés.`,
        hint: 'Rappel de cours : La somme des angles d’un triangle vaut TOUJOURS 180° !',
        correctAnswer: c.toString(),
        unit: '°',
        explanationFinal: `L'angle Ĉ mesure ${c}°.`,
        steps: [
          {
            stepNumber: 1,
            title: 'Écrire la propriété de la somme des angles',
            explanation: 'Dans tout triangle ABC, la somme des trois angles vaut 180°.',
            mathExpression: 'Â + B̂ + Ĉ = 180°',
            ruleApplied: 'Propriété : Â + B̂ + Ĉ = 180°',
          },
          {
            stepNumber: 2,
            title: 'Calculer la somme des deux angles connus',
            explanation: `Â + B̂ = ${a}° + ${b}° = ${a + b}°.`,
            mathExpression: `${a}° + ${b}° = ${a + b}°`,
            subResult: `${a} + ${b} = ${a + b}°`,
          },
          {
            stepNumber: 3,
            title: 'Soustraire à 180° pour trouver Ĉ',
            explanation: `Ĉ = 180° - ${a + b}° = ${c}°.`,
            mathExpression: `Ĉ = 180° - ${a + b}° = ${c}°`,
            subResult: `180 - ${a + b} = ${c}°`,
          },
        ],
      };
    }
  };

  useEffect(() => {
    setExercise(generateNewExercise(selectedTheme));
  }, [selectedTheme]);

  const handleCheckAnswer = () => {
    if (!exercise || !userAnswer.trim()) return;

    const cleanUser = userAnswer.trim().replace(/\s+/g, '').replace(',', '.');
    const cleanCorrect = exercise.correctAnswer.replace(/\s+/g, '').replace(',', '.');

    const isMatch = cleanUser === cleanCorrect;
    setIsCorrect(isMatch);
    setIsAnswered(true);

    if (isMatch) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.65 },
        });

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

  return (
    <div className="space-y-4 pb-20">
      {/* Header card with theme selector */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Générateur d’Exercices à l’Infini</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Entraîne-toi à volonté avec des exercices corrigés étape par étape
            </p>
          </div>

          <button
            onClick={() => setExercise(generateNewExercise(selectedTheme))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition cursor-pointer active:scale-95 shadow"
          >
            <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
            <span>Nouvel exercice</span>
          </button>
        </div>

        {/* Theme pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {[
            { id: 'priorites', label: 'Priorités opératoires' },
            { id: 'relatifs', label: 'Nombres relatifs' },
            { id: 'fractions', label: 'Fractions' },
            { id: 'pourcentages', label: 'Pourcentages' },
            { id: 'angles', label: 'Angles d’un triangle' },
          ].map((th) => (
            <button
              key={th.id}
              onClick={() => setSelectedTheme(th.id as ExerciseTheme)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                selectedTheme === th.id
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {th.label}
            </button>
          ))}
        </div>
      </div>

      {/* Exercise card */}
      {exercise && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-sky-400 bg-sky-950/80 px-2.5 py-0.5 rounded-md border border-sky-800/60">
              {exercise.title}
            </span>
            <span className="text-[11px] text-slate-500">Niveau 5ème</span>
          </div>

          {/* Statement box */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 text-sm font-medium text-slate-100 whitespace-pre-line leading-relaxed shadow-inner">
            {exercise.prompt}
          </div>

          {/* Standing calculation reminder */}
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-amber-500/20 text-xs flex items-center justify-between gap-2">
            <span className="text-amber-300 font-bold flex items-center gap-1.5">
              <span>📐</span>
              <span>Rappel CIAM : Pose ce calcul debout ligne par ligne (= bien alignés) !</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              Debout en colonne
            </span>
          </div>

          {/* Hint button & callout */}
          <div>
            {!showHint ? (
              <button
                onClick={() => setShowHint(true)}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 font-medium cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Besoin d’un indice ?</span>
              </button>
            ) : (
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2 animate-fade-in">
                <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold text-amber-300">Indice :</strong> {exercise.hint}
                </div>
              </div>
            )}
          </div>

          {/* User input area */}
          <div className="space-y-2 pt-1 border-t border-slate-800">
            <label className="text-xs text-slate-400 font-medium">Ta réponse :</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder={exercise.unit ? `Ex: 24 (en ${exercise.unit})` : 'Ex: 42'}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCheckAnswer()}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:border-sky-500 focus:outline-none"
              />
              <button
                onClick={handleCheckAnswer}
                disabled={!userAnswer.trim()}
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Vérifier</span>
              </button>
            </div>
          </div>

          {/* Feedback banner with fun cartoon drawings */}
          {isAnswered && (
            <div className="pt-2 animate-fade-in">
              {isCorrect ? (
                <KokoSuccessCelebration
                  message="Akiba ! Tu as trouvé !"
                  subMessage="Formidable ! Tu maîtrises parfaitement cette notion de 5ème. Consulte la méthode ci-dessous pour perfectionner ta rédaction !"
                />
              ) : (
                <KokoEncouragingFeedback
                  title="Ce n’est pas grave, Koko t’explique !"
                  message="En mathématiques, chaque erreur est une occasion de devenir plus fort. Regarde la méthode détaillée pas à pas ci-dessous !"
                  onShowSolution={() => setShowCorrection(true)}
                />
              )}
            </div>
          )}

          {/* Button to show correction if not yet answered or wanting direct study */}
          {!isAnswered && !showCorrection && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowCorrection(true)}
                className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1.5 font-semibold cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Afficher directement la correction pas à pas</span>
              </button>
            </div>
          )}

          {/* Step-by-Step Correction Component */}
          {showCorrection && (
            <div className="pt-3 border-t border-slate-800 animate-fade-in">
              <StepByStepCorrection
                steps={exercise.steps}
                finalResult={exercise.explanationFinal}
                initialShowAll={false}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
