import React from 'react';

/**
 * Fun, playful cartoon illustrations of Koko the Gabonese Panther
 * Displayed dynamically when answering exercises and showing corrections.
 */

// 1. Festive celebration when the student answers correctly
export const KokoSuccessCelebration: React.FC<{ message?: string; subMessage?: string }> = ({
  message = "Akiba ! C'est la bonne réponse !",
  subMessage = "Tu as assuré comme un vrai champion des maths au Gabon !",
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-amber-950/70 border-2 border-emerald-500/60 p-4 shadow-2xl animate-fade-in">
      {/* Background festive sparkles */}
      <div className="absolute top-2 right-4 text-2xl animate-pulse select-none">✨</div>
      <div className="absolute bottom-2 right-24 text-xl select-none">🎉</div>
      <div className="absolute top-3 left-1/3 text-lg select-none">⭐</div>

      <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
        {/* Animated Koko Victory SVG */}
        <div className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-emerald-400 p-1 shadow-lg shadow-emerald-500/30 flex items-center justify-center transform hover:scale-105 transition-transform">
          <svg viewBox="0 0 100 100" className="w-full h-full select-none">
            {/* Confetti pieces around */}
            <circle cx="15" cy="18" r="3" fill="#10b981" />
            <polygon points="85,15 88,22 82,20" fill="#f59e0b" />
            <rect x="12" y="75" width="5" height="5" fill="#0284c7" transform="rotate(30 14 77)" />
            <polygon points="86,72 90,78 84,80" fill="#ec4899" />

            {/* Panther Body */}
            <ellipse cx="50" cy="88" rx="26" ry="16" fill="#f59e0b" />
            {/* Green-Yellow-Blue Gabonese Scarf */}
            <path d="M 32 75 Q 50 82 68 75 Q 68 82 50 88 Q 32 82 32 75 Z" fill="#10b981" />
            <path d="M 34 78 Q 50 84 66 78" stroke="#facc15" strokeWidth="3" fill="none" />
            <path d="M 36 81 Q 50 86 64 81" stroke="#0284c7" strokeWidth="2.5" fill="none" />

            {/* Ears */}
            <circle cx="28" cy="30" r="12" fill="#d97706" />
            <circle cx="28" cy="30" r="6" fill="#fef3c7" />
            <circle cx="72" cy="30" r="12" fill="#d97706" />
            <circle cx="72" cy="30" r="6" fill="#fef3c7" />

            {/* Head */}
            <circle cx="50" cy="50" r="28" fill="#f59e0b" />

            {/* Sunglasses for Cool Look */}
            <rect x="26" y="42" width="20" height="13" rx="4" fill="#0f172a" />
            <rect x="54" y="42" width="20" height="13" rx="4" fill="#0f172a" />
            <line x1="45" y1="48" x2="55" y2="48" stroke="#0f172a" strokeWidth="3" />
            {/* Sunglasses shine reflection */}
            <line x1="29" y1="45" x2="35" y2="45" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="57" y1="45" x2="63" y2="45" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />

            {/* Muzzle */}
            <ellipse cx="50" cy="62" rx="13" ry="8" fill="#fef3c7" />
            <polygon points="50,56 46,52 54,52" fill="#b45309" />
            {/* Big Victory Smile */}
            <path d="M 42 63 Q 50 72 58 63" fill="none" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
            {/* Open happy mouth */}
            <path d="M 45 64 Q 50 71 55 64 Z" fill="#ef4444" />

            {/* Whiskers */}
            <line x1="32" y1="61" x2="22" y2="60" stroke="#78350f" strokeWidth="1.5" />
            <line x1="32" y1="65" x2="23" y2="67" stroke="#78350f" strokeWidth="1.5" />
            <line x1="68" y1="61" x2="78" y2="60" stroke="#78350f" strokeWidth="1.5" />
            <line x1="68" y1="65" x2="77" y2="67" stroke="#78350f" strokeWidth="1.5" />

            {/* Golden Trophy held by Koko on the side */}
            <g transform="translate(68, 55) scale(0.65)">
              <polygon points="12,12 28,12 25,26 15,26" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
              <line x1="20" y1="26" x2="20" y2="33" stroke="#ca8a04" strokeWidth="3" />
              <rect x="13" y="33" width="14" height="4" rx="1" fill="#ca8a04" />
              <path d="M 12 15 C 8 15 8 22 13 22" fill="none" stroke="#ca8a04" strokeWidth="1.5" />
              <path d="M 28 15 C 32 15 32 22 27 22" fill="none" stroke="#ca8a04" strokeWidth="1.5" />
              <text x="20" y="21" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#713f12">★</text>
            </g>
          </svg>
        </div>

        {/* Celebratory Message & Sticker Badge */}
        <div className="flex-1 text-center sm:text-left space-y-1.5">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-300 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-500/50 flex items-center gap-1.5">
              <span>🏆</span>
              <span>RÉPONSE PARFAITE</span>
            </span>
            <span className="text-xs font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-800 flex items-center gap-1">
              <span>🇬🇦</span>
              <span>100% CIAM 5ème</span>
            </span>
          </div>

          <h4 className="text-base sm:text-lg font-black text-white flex items-center justify-center sm:justify-start gap-2">
            <span>{message}</span>
            <span className="text-xl">🎉</span>
          </h4>

          <p className="text-xs text-slate-200 font-medium leading-relaxed">
            {subMessage}
          </p>

          <div className="pt-1 flex items-center justify-center sm:justify-start gap-2 text-[11px] text-emerald-400 font-semibold">
            <span>⚡ +20 XP de Matheux</span>
            <span>•</span>
            <span>Regarde la rédaction modèle ci-dessous pour le prochain devoir !</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Encouraging friendly feedback when answer needs review or before showing correction
export const KokoEncouragingFeedback: React.FC<{
  title?: string;
  message?: string;
  onShowSolution?: () => void;
}> = ({
  title = "Pas de panique, Koko t'explique tout !",
  message = "En maths, faire une erreur est le meilleur moyen d'apprendre. Suis la méthode ci-dessous étape par étape pour débloquer le calcul !",
  onShowSolution,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-sky-950/70 border-2 border-amber-500/50 p-4 shadow-xl animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
        {/* Animated Koko Detective / Teacher SVG */}
        <div className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-400 to-sky-500 p-1 shadow-lg shadow-amber-500/20 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full select-none">
            {/* Slate Background */}
            <rect x="6" y="8" width="88" height="84" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />
            <text x="50" y="24" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#38bdf8">
              ASTUCE DU DÉCLIC
            </text>

            {/* Panther Head with Thinking Glasses */}
            <circle cx="50" cy="54" r="22" fill="#f59e0b" />
            {/* Ears */}
            <circle cx="32" cy="38" r="8" fill="#d97706" />
            <circle cx="32" cy="38" r="4" fill="#fef3c7" />
            <circle cx="68" cy="38" r="8" fill="#d97706" />
            <circle cx="68" cy="38" r="4" fill="#fef3c7" />

            {/* Glasses */}
            <circle cx="43" cy="50" r="6" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <circle cx="43" cy="50" r="2.5" fill="#0f172a" />
            <circle cx="57" cy="50" r="6" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <circle cx="57" cy="50" r="2.5" fill="#0f172a" />
            <line x1="49" y1="50" x2="51" y2="50" stroke="#0f172a" strokeWidth="2" />

            {/* Pencil tucked in ear */}
            <line x1="24" y1="34" x2="16" y2="28" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
            <polygon points="15,27 13,25 17,25" fill="#facc15" />

            {/* Muzzle */}
            <ellipse cx="50" cy="62" rx="10" ry="6" fill="#fef3c7" />
            <polygon points="50,58 47,55 53,55" fill="#b45309" />
            {/* Encouraging smile */}
            <path d="M 45 64 Q 50 68 55 64" fill="none" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />

            {/* Magnifying Glass held in hand */}
            <g transform="translate(18, 62)">
              <circle cx="10" cy="10" r="8" fill="rgba(56, 189, 248, 0.3)" stroke="#38bdf8" strokeWidth="2" />
              <line x1="16" y1="16" x2="24" y2="24" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
              <text x="10" y="13" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#ffffff">?</text>
            </g>
          </svg>
        </div>

        {/* Message zone */}
        <div className="flex-1 text-center sm:text-left space-y-1.5">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-500/50 flex items-center gap-1.5">
              <span>💡</span>
              <span>COUP DE POUCE PÉDAGOGIQUE</span>
            </span>
            <span className="text-xs font-bold text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded-full border border-sky-800">
              Méthode CIAM
            </span>
          </div>

          <h4 className="text-base sm:text-lg font-black text-white">
            {title}
          </h4>

          <p className="text-xs text-slate-200 font-medium leading-relaxed">
            {message}
          </p>

          {onShowSolution && (
            <div className="pt-2">
              <button
                onClick={onShowSolution}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center sm:justify-start gap-2 shadow-md transition cursor-pointer active:scale-95"
              >
                <span>🔍 Découvrir la solution détaillée pas à pas</span>
                <span>➔</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 3. Fun Step Detective Banner for each step of the correction
export const KokoStepDetective: React.FC<{
  stepNumber: number;
  totalSteps: number;
  title: string;
}> = ({ stepNumber, totalSteps, title }) => {
  const getStepEmoji = (step: number, total: number) => {
    if (step === 1) return '🚀';
    if (step === total) return '🏆';
    if (step === 2) return '🪄';
    return '🔍';
  };

  const getStepSubtitle = (step: number, total: number) => {
    if (step === 1) return "Repérage & Décollage : on isole ce qui est prioritaire !";
    if (step === total) return "La conclusion : le résultat propre et validé !";
    return "Le calcul intermédiaire : simplifie et remplace pas à pas !";
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
      {/* Cartoon Step Badge */}
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-emerald-400 p-0.5 shadow-md flex items-center justify-center shrink-0">
        <div className="w-full h-full bg-slate-950 rounded-[14px] flex flex-col items-center justify-center">
          <span className="text-base select-none leading-none">{getStepEmoji(stepNumber, totalSteps)}</span>
          <span className="text-[10px] font-black text-amber-300 font-mono mt-0.5">
            {stepNumber}/{totalSteps}
          </span>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
          <span>Étape {stepNumber} sur {totalSteps}</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400 font-medium truncate">{getStepSubtitle(stepNumber, totalSteps)}</span>
        </div>
        <h5 className="text-xs sm:text-sm font-bold text-white truncate mt-0.5">
          {title}
        </h5>
      </div>
    </div>
  );
};

// 4. Official Gabon Math Seal / Stamp for completed exercises
export const GabonBadgeStamp: React.FC<{ chapterTitle?: string }> = ({
  chapterTitle,
}) => {
  return (
    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-amber-950/30 to-sky-950/40 border-2 border-dashed border-emerald-500/40 flex items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-lg shrink-0">
          🇬🇦
        </div>
        <div>
          <div className="font-extrabold text-emerald-300 flex items-center gap-1.5">
            <span>RÉDACTION MODÈLE CIAM 5ème</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-bold">
              CONTRÔLE VALIDÉ
            </span>
          </div>
          <div className="text-[11px] text-slate-300">
            Écris exactement comme ceci sur ta copie de devoir surveillé pour avoir 20/20 !
          </div>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-1 font-mono text-[10px] text-amber-300 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800 shrink-0">
        <span>⭐ 20/20</span>
      </div>
    </div>
  );
};
