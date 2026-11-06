import React from 'react';

/**
 * Fun, colorful, high-clarity illustrations designed for Gabonese 5th graders (12-13 years old)
 * Incorporating Gabonese cultural context (Libreville, Mont-Bouët, fleuve Ogooué, F CFA, atangas, pirogues).
 */

// Mascot: Koko la mascotte des maths
export const MascotKoko: React.FC<{ expression?: 'happy' | 'thinking' | 'victory'; speech?: string }> = ({
  expression = 'happy',
  speech,
}) => {
  return (
    <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-emerald-500/10 to-sky-500/15 border border-amber-500/30">
      {/* Mascot SVG Avatar */}
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 p-1 flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
        <svg viewBox="0 0 64 64" className="w-10 h-10 select-none">
          {/* Friendly Panther / Leopard Head */}
          <circle cx="32" cy="34" r="22" fill="#f59e0b" />
          {/* Ears */}
          <circle cx="16" cy="18" r="8" fill="#d97706" />
          <circle cx="16" cy="18" r="4" fill="#fef3c7" />
          <circle cx="48" cy="18" r="8" fill="#d97706" />
          <circle cx="48" cy="18" r="4" fill="#fef3c7" />
          {/* Muzzle */}
          <ellipse cx="32" cy="40" rx="10" ry="7" fill="#fef3c7" />
          <polygon points="32,36 29,33 35,33" fill="#b45309" />
          {/* Whiskers */}
          <line x1="18" y1="40" x2="26" y2="39" stroke="#78350f" strokeWidth="1.5" />
          <line x1="18" y1="43" x2="26" y2="42" stroke="#78350f" strokeWidth="1.5" />
          <line x1="46" y1="40" x2="38" y2="39" stroke="#78350f" strokeWidth="1.5" />
          <line x1="46" y1="43" x2="38" y2="42" stroke="#78350f" strokeWidth="1.5" />
          {/* Eyes with Glasses */}
          <circle cx="24" cy="28" r="6" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
          <circle cx="24" cy="28" r="2.5" fill="#0f172a" />
          <circle cx="40" cy="28" r="6" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
          <circle cx="40" cy="28" r="2.5" fill="#0f172a" />
          <line x1="30" y1="28" x2="34" y2="28" stroke="#0f172a" strokeWidth="2" />
          {/* Smile */}
          <path d="M 28 42 Q 32 46 36 42" fill="none" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
          {/* Graduation Cap or Math Pencil */}
          <polygon points="32,6 18,14 32,18 46,14" fill="#0284c7" />
          <polygon points="30,17 34,17 32,22" fill="#0284c7" />
        </svg>
      </div>

      {/* Speech Bubble */}
      <div className="flex-1 text-xs">
        <div className="font-extrabold text-amber-400 flex items-center gap-1.5">
          <span>Koko le Matheux</span>
          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-800">
            Guide du Gabon
          </span>
        </div>
        <p className="text-slate-200 mt-1 leading-relaxed font-medium">
          {speech || "Mbolo ! Bienvenue dans tes cours de maths 5ème. Suis mes astuces pour tout comprendre facilement !"}
        </p>
      </div>
    </div>
  );
};

// 1. Pyramide des Priorités Amusante (Chapitre 1)
export const FunPriorityPyramid: React.FC = () => {
  return (
    <div className="rounded-3xl bg-slate-900 border-2 border-indigo-500/40 p-4 shadow-xl space-y-3">
      <div className="flex items-center justify-between text-xs font-black text-indigo-400">
        <span className="flex items-center gap-2">
          <span>🚀 La Fusée des Priorités Opératoires</span>
        </span>
        <span className="text-[10px] text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-800">
          Programme 5e Gabon
        </span>
      </div>

      <div className="flex justify-center py-2">
        <svg viewBox="0 0 380 220" className="w-full max-w-sm h-auto select-none">
          {/* Stage 1: Le Cockpit (Parenthèses) */}
          <path
            d="M 190 15 L 130 75 L 250 75 Z"
            fill="#6366f1"
            fillOpacity="0.35"
            stroke="#818cf8"
            strokeWidth="3"
          />
          <text x="190" y="48" textAnchor="middle" className="text-xs font-black fill-white">
            1. ( ) LES PARENTHÈSES
          </text>
          <text x="190" y="64" textAnchor="middle" className="text-[10px] font-bold fill-indigo-200">
            Les plus au fond d&apos;abord !
          </text>

          {/* Stage 2: Les Moteurs (Multiplication et Division) */}
          <polygon
            points="125 80, 255 80, 295 145, 85 145"
            fill="#06b6d4"
            fillOpacity="0.3"
            stroke="#22d3ee"
            strokeWidth="3"
          />
          <text x="190" y="112" textAnchor="middle" className="text-xs font-black fill-white">
            2. MULTIPLICATIONS (×) & DIVISIONS (÷)
          </text>
          <text x="190" y="130" textAnchor="middle" className="text-[10px] font-bold fill-cyan-200">
            Collées ensemble avec de la colle forte !
          </text>

          {/* Stage 3: La Base de Lancement (Additions et Soustractions) */}
          <polygon
            points="80 150, 300 150, 345 210, 35 210"
            fill="#10b981"
            fillOpacity="0.3"
            stroke="#34d399"
            strokeWidth="3"
          />
          <text x="190" y="180" textAnchor="middle" className="text-xs font-black fill-white">
            3. ADDITIONS (+) & SOUSTRACTIONS (-)
          </text>
          <text x="190" y="198" textAnchor="middle" className="text-[10px] font-bold fill-emerald-200">
            De gauche à droite, comme la lecture !
          </text>
        </svg>
      </div>

      <div className="p-3 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 flex items-center gap-2.5">
        <span className="text-xl">💡</span>
        <span>
          <strong>L&apos;astuce gabonaise :</strong> Si tu as <code>1 500 F + 500 F × 3</code>, tu ne peux pas faire 1 500 + 500 ! Le 500 F est collé au 3 par la multiplication. C&apos;est donc <code>1 500 + 1 500 = 3 000 F CFA</code> !
        </span>
      </div>
    </div>
  );
};

// 2. Thermomètre & Altitude au Gabon (Chapitre 2 : Relatifs)
export const GabonRelatifsIllustration: React.FC = () => {
  return (
    <div className="rounded-3xl bg-slate-900 border-2 border-emerald-500/40 p-4 shadow-xl space-y-3">
      <div className="flex items-center justify-between text-xs font-black text-emerald-400">
        <span>🌡️ L&apos;Échelle des Altitudes & Températures au Gabon</span>
        <span className="text-[10px] text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded-full border border-sky-800">
          Nombres Relatifs
        </span>
      </div>

      <div className="flex justify-center py-1">
        <svg viewBox="0 0 380 200" className="w-full max-w-sm h-auto select-none">
          {/* Mont Bengoué (Sommet du Gabon +1 070 m) */}
          <polygon points="50,140 120,40 190,140" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
          <text x="120" y="32" textAnchor="middle" className="text-[10px] font-black fill-emerald-300">
            +1 070 m (Mont Bengoué)
          </text>

          {/* Océan Atlantique / Niveau 0 */}
          <line x1="20" y1="140" x2="360" y2="140" stroke="#0ea5e9" strokeWidth="3" />
          <text x="310" y="132" className="text-[10px] font-black fill-sky-400">
            Niveau 0 (Mer)
          </text>

          {/* Pirogue sur l'océan */}
          <path d="M 170 138 C 175 145, 215 145, 220 138 Z" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
          <line x1="195" y1="125" x2="195" y2="138" stroke="#ffffff" strokeWidth="1.5" />
          <polygon points="195,126 195,134 205,130" fill="#f59e0b" />

          {/* Plongeur / Fond sous-marin (-80 m) */}
          <rect x="230" y="145" width="120" height="45" fill="#0369a1" fillOpacity="0.2" rx="6" />
          <text x="290" y="172" textAnchor="middle" className="text-[10px] font-black fill-red-300 font-mono">
            -80 m (Sous-marin)
          </text>

          {/* Graduation thermomètre tropical */}
          <line x1="40" y1="30" x2="40" y2="180" stroke="#94a3b8" strokeWidth="3" />
          <circle cx="40" cy="180" r="10" fill="#ef4444" />
          <rect x="37" y="70" width="6" height="110" fill="#ef4444" />
          <text x="25" y="75" className="text-[9px] font-bold fill-sky-300">+30°C</text>
          <text x="25" y="140" className="text-[9px] font-bold fill-emerald-300">0°C</text>
          <text x="25" y="170" className="text-[9px] font-bold fill-red-300">-10°C</text>
        </svg>
      </div>

      <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 flex items-center gap-2.5">
        <span className="text-xl">💡</span>
        <span>
          <strong>Règle du Déclic :</strong> Les nombres positifs (+) sont au-dessus de zéro (gains d&apos;argent, altitude). Les nombres négatifs (-) sont en-dessous de zéro (dettes, profondeurs marines, températures de gelée).
        </span>
      </div>
    </div>
  );
};

// 3. Partage des Atangas & Gâteaux (Chapitre 3 : Fractions)
export const GabonFractionsIllustration: React.FC = () => {
  return (
    <div className="rounded-3xl bg-slate-900 border-2 border-amber-500/40 p-4 shadow-xl space-y-3">
      <div className="flex items-center justify-between text-xs font-black text-amber-400">
        <span>🥑 Le Partage des Atangas & du Gâteau de Manioc</span>
        <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
          Fractions égales
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 py-1">
        {/* Atangas basket: 6 sur 8 */}
        <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 flex flex-col items-center">
          <div className="grid grid-cols-4 gap-1.5 w-32 py-2">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className={`h-7 rounded-full flex items-center justify-center text-[10px] font-black border transition-transform hover:scale-105 ${
                  i < 6
                    ? 'bg-gradient-to-br from-violet-600 to-purple-800 text-white border-violet-400'
                    : 'bg-slate-800 text-slate-500 border-slate-700'
                }`}
                title={i < 6 ? 'Atanga violet mûr' : 'Part vide'}
              >
                {i < 6 ? '🥑' : '○'}
              </div>
            ))}
          </div>
          <div className="font-mono text-xs font-black text-amber-300 mt-2">
            6 atangas sur 8 = 6/8
          </div>
          <div className="text-[10px] text-slate-400">6 parts prises sur 8 au total</div>
        </div>

        {/* Simplification: 3 sur 4 paquets */}
        <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
          <div className="grid grid-cols-2 gap-2 w-32 py-1">
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className={`p-1.5 rounded-xl text-center text-xs font-black border ${
                  i < 3
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                    : 'bg-slate-800/40 text-slate-600 border-slate-800'
                }`}
              >
                Paquet {i + 1}
              </div>
            ))}
          </div>
          <div className="font-mono text-xs font-black text-emerald-400 mt-2">
            6/8 = 3/4 (Fraction simplifiée !)
          </div>
          <div className="text-[10px] text-slate-400">On a divisé haut et bas par 2 !</div>
        </div>
      </div>

      <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 flex items-center gap-2.5">
        <span className="text-xl">💡</span>
        <span>
          <strong>Méthode CIAM :</strong> Pour additionner deux fractions comme <code>3/4 + 1/8</code>, on ne peut pas additionner directement ! On coupe d&apos;abord les quarts en huitièmes : <code>3/4 = 6/8</code>, puis <code>6/8 + 1/8 = 7/8</code>.
        </span>
      </div>
    </div>
  );
};

// 4. Marché Mont-Bouët & Proportionnalité (Chapitre 4)
export const GabonProportionnaliteIllustration: React.FC = () => {
  return (
    <div className="rounded-3xl bg-slate-900 border-2 border-pink-500/40 p-4 shadow-xl space-y-3">
      <div className="flex items-center justify-between text-xs font-black text-pink-400">
        <span>🧺 Le Marché de Mont-Bouët (Libreville)</span>
        <span className="text-[10px] text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-800">
          Proportionnalité en F CFA
        </span>
      </div>

      <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
        <div className="text-xs font-bold text-white mb-2 flex items-center justify-between">
          <span>Tableau des Régimes de Bananes :</span>
          <span className="text-emerald-400 font-mono">Prix = Nombre × 1 500 F CFA</span>
        </div>

        <div className="grid grid-cols-4 gap-1 text-center font-mono text-xs">
          <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] text-slate-400">Régimes</div>
            <div className="font-bold text-white mt-1">1</div>
            <div className="text-emerald-400 font-bold mt-1">1 500 F</div>
          </div>

          <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] text-slate-400">Régimes</div>
            <div className="font-bold text-white mt-1">2</div>
            <div className="text-emerald-400 font-bold mt-1">3 000 F</div>
          </div>

          <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] text-slate-400">Régimes</div>
            <div className="font-bold text-white mt-1">3</div>
            <div className="text-emerald-400 font-bold mt-1">4 500 F</div>
          </div>

          <div className="p-2 rounded-xl bg-pink-950/60 border border-pink-500/40">
            <div className="text-[10px] text-pink-300">5 régimes ?</div>
            <div className="font-bold text-white mt-1">5</div>
            <div className="text-pink-400 font-bold mt-1">7 500 F</div>
          </div>
        </div>
      </div>

      <div className="p-3 rounded-2xl bg-pink-950/40 border border-pink-500/30 text-xs text-pink-200 flex items-center gap-2.5">
        <span className="text-xl">💡</span>
        <span>
          <strong>Produit en croix du commerçant :</strong> Si 2 ananas coûtent 1 000 F CFA, alors 7 ananas coûtent <code>(7 × 1 000) ÷ 2 = 3 500 F CFA</code> !
        </span>
      </div>
    </div>
  );
};

// 5. Triangle & Somme 180° aux couleurs du Gabon (Chapitre 5)
export const GabonTriangleIllustration: React.FC = () => {
  return (
    <div className="rounded-3xl bg-slate-900 border-2 border-violet-500/40 p-4 shadow-xl space-y-3">
      <div className="flex items-center justify-between text-xs font-black text-violet-400">
        <span>📐 Le Triangle Magique des 180°</span>
        <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
          Toujours 180°
        </span>
      </div>

      <div className="flex justify-center py-2">
        <svg viewBox="0 0 380 170" className="w-full max-w-sm h-auto select-none">
          {/* Main Triangle */}
          <polygon
            points="60,130 180,30 250,130"
            fill="rgba(139, 92, 246, 0.15)"
            stroke="#a78bfa"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Angle A (Vert du Gabon) */}
          <path d="M 60 130 L 90 130 A 30 30 0 0 0 78 105 Z" fill="#10b981" />
          <text x="45" y="145" className="text-xs font-black fill-emerald-400">Â (50°)</text>

          {/* Angle B (Jaune du Gabon) */}
          <path d="M 180 30 L 160 50 A 28 28 0 0 0 198 46 Z" fill="#f59e0b" />
          <text x="180" y="20" textAnchor="middle" className="text-xs font-black fill-amber-400">B̂ (70°)</text>

          {/* Angle C (Bleu du Gabon) */}
          <path d="M 250 130 L 220 130 A 30 30 0 0 1 235 105 Z" fill="#0284c7" />
          <text x="260" y="145" className="text-xs font-black fill-sky-400">Ĉ (60°)</text>

          {/* Reconstitution de l'angle plat */}
          <line x1="285" y1="140" x2="375" y2="140" stroke="#94a3b8" strokeWidth="2" />
          <path d="M 300 140 A 30 30 0 0 1 360 140 Z" fill="#a78bfa" fillOpacity="0.3" stroke="#a78bfa" strokeWidth="2" />
          <text x="330" y="125" textAnchor="middle" className="text-xs font-black fill-white font-mono">180°</text>
          <text x="330" y="155" textAnchor="middle" className="text-[9px] font-bold fill-slate-300">50° + 70° + 60°</text>
        </svg>
      </div>

      <div className="p-3 rounded-2xl bg-violet-950/40 border border-violet-500/30 text-xs text-violet-200 flex items-center gap-2.5">
        <span className="text-xl">💡</span>
        <span>
          <strong>Théorème d&apos;or du collège gabonais :</strong> Dans N&apos;IMPORTE QUEL triangle, si tu connais deux angles (ex : 50° et 70°), le troisième vaut toujours <code>180° - (50° + 70°) = 60°</code> !
        </span>
      </div>
    </div>
  );
};
