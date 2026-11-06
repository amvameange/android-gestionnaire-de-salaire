import React from 'react';

/**
 * Visual illustrations inspired by French school textbook "Le Déclic"
 * High-clarity vector diagrams with didactic annotations for 5th graders (12-13 years old).
 */

// 1. Pyramid of Priorities (Enchaînement d'opérations)
export const PriorityPyramidIllustration: React.FC = () => {
  return (
    <div className="rounded-2xl bg-slate-900 border border-sky-500/30 p-4 space-y-3">
      <div className="flex items-center justify-between text-xs font-bold text-sky-400">
        <span>📐 Le Déclic : La Pyramide des Priorités</span>
        <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
          De haut en bas !
        </span>
      </div>

      <div className="flex justify-center py-2">
        <svg viewBox="0 0 380 200" className="w-full max-w-sm h-auto select-none">
          {/* Level 1: Parentheses (Top) */}
          <polygon
            points="190,20 135,75 245,75"
            fill="#38bdf8"
            fillOpacity="0.25"
            stroke="#38bdf8"
            strokeWidth="2.5"
          />
          <text x="190" y="52" textAnchor="middle" className="text-xs font-black fill-white">
            1. ( ) PARENTHÈSES
          </text>
          <text x="190" y="66" textAnchor="middle" className="text-[9px] fill-sky-200">
            Les plus intérieures d’abord
          </text>

          {/* Level 2: Multiplication & Division (Middle) */}
          <polygon
            points="135,78 245,78 290,135 90,135"
            fill="#fbbf24"
            fillOpacity="0.2"
            stroke="#fbbf24"
            strokeWidth="2.5"
          />
          <text x="190" y="105" textAnchor="middle" className="text-xs font-black fill-white">
            2. MULTIPLICATIONS & DIVISIONS
          </text>
          <text x="190" y="122" textAnchor="middle" className="text-[9px] fill-amber-200 font-mono">
            × et ÷ (de gauche à droite)
          </text>

          {/* Level 3: Addition & Subtraction (Base) */}
          <polygon
            points="90,138 290,138 340,195 40,195"
            fill="#34d399"
            fillOpacity="0.2"
            stroke="#34d399"
            strokeWidth="2.5"
          />
          <text x="190" y="165" textAnchor="middle" className="text-xs font-black fill-white">
            3. ADDITIONS & SOUSTRACTIONS
          </text>
          <text x="190" y="182" textAnchor="middle" className="text-[9px] fill-emerald-200 font-mono">
            + et - (dans l’ordre de lecture)
          </text>
        </svg>
      </div>

      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
        <span className="text-base">💡</span>
        <span>
          <strong>L’astuce du Déclic :</strong> Imagine que le signe × et le signe ÷ sont faits de super-glue. Ils collent les nombres ensemble avant que les signes + ou - ne puissent les séparer !
        </span>
      </div>
    </div>
  );
};

// 2. Elevator & Thermometer Illustration (Nombres Relatifs)
export const RelatifsElevatorIllustration: React.FC = () => {
  return (
    <div className="rounded-2xl bg-slate-900 border border-emerald-500/30 p-4 space-y-3">
      <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
        <span>🏢 Le Déclic : L’Ascenseur & Le Thermomètre</span>
        <span className="text-[10px] text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/60">
          Positifs vs Négatifs
        </span>
      </div>

      <div className="flex justify-center py-2">
        <svg viewBox="0 0 380 220" className="w-full max-w-sm h-auto select-none">
          {/* Building frame */}
          <rect x="60" y="15" width="110" height="190" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          
          {/* Ground line */}
          <line x1="20" y1="120" x2="360" y2="120" stroke="#10b981" strokeWidth="2.5" strokeDasharray="4 3" />
          <text x="310" y="115" className="text-[10px] fill-emerald-400 font-bold">Rez-de-chaussée (0)</text>

          {/* Floors */}
          {/* +3 */}
          <rect x="70" y="25" width="90" height="25" rx="4" fill="#0284c7" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="1" />
          <text x="115" y="42" textAnchor="middle" className="text-xs font-bold fill-sky-300 font-mono">+3 (3ème étage)</text>
          
          {/* +1 */}
          <rect x="70" y="85" width="90" height="25" rx="4" fill="#0284c7" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1" />
          <text x="115" y="102" textAnchor="middle" className="text-xs font-bold fill-sky-300 font-mono">+1 (1er étage)</text>

          {/* 0 */}
          <rect x="70" y="115" width="90" height="12" fill="#10b981" fillOpacity="0.3" />

          {/* -2 */}
          <rect x="70" y="155" width="90" height="25" rx="4" fill="#ef4444" fillOpacity="0.25" stroke="#f87171" strokeWidth="1" />
          <text x="115" y="172" textAnchor="middle" className="text-xs font-bold fill-red-300 font-mono">-2 (Sous-sol)</text>

          {/* Thermometer on the right */}
          <rect x="230" y="25" width="16" height="155" rx="8" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
          <circle cx="238" cy="188" r="14" fill="#ef4444" />
          {/* Mercury level */}
          <rect x="233" y="100" width="10" height="85" rx="5" fill="#ef4444" />

          {/* Annotations */}
          <text x="255" y="38" className="text-[10px] fill-sky-300 font-bold">+15°C (Chaleur)</text>
          <text x="255" y="118" className="text-[10px] fill-emerald-300 font-bold">0°C (Glace)</text>
          <text x="255" y="170" className="text-[10px] fill-red-300 font-bold">-10°C (Gel)</text>

          {/* Operation arrow: Start at -2, go up by 5 -> arrives at +3 */}
          <path d="M 45 167 C 25 120, 25 70, 45 38" fill="none" stroke="#fbbf24" strokeWidth="2.5" markerEnd="url(#arrow)" />
          <text x="12" y="100" className="text-[10px] fill-amber-300 font-bold">-2 + 5 = +3</text>
        </svg>
      </div>

      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
        <span className="text-base">💡</span>
        <span>
          <strong>L’astuce du Déclic :</strong> Si tu es au sous-sol -2 et que tu montes de 5 étages, tu passes par 0 et tu arrives au 3ème étage (+3) !
        </span>
      </div>
    </div>
  );
};

// 3. Fraction Pizza & Chocolate Bar Illustration (Fractions)
export const FractionPizzaIllustration: React.FC = () => {
  return (
    <div className="rounded-2xl bg-slate-900 border border-amber-500/30 p-4 space-y-3">
      <div className="flex items-center justify-between text-xs font-bold text-amber-400">
        <span>🍕 Le Déclic : Partage de Pizza & Tablettes</span>
        <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
          Même dénominateur
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 py-1">
        {/* Pizza 1: 3/4 */}
        <div className="flex flex-col items-center bg-slate-950/70 p-3 rounded-xl border border-slate-800">
          <svg viewBox="0 0 100 100" className="w-24 h-24">
            <circle cx="50" cy="50" r="42" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
            {/* Slice 1 */}
            <path d="M50 50 L50 8 A42 42 0 0 1 92 50 Z" fill="#f59e0b" fillOpacity="0.8" stroke="#0f172a" strokeWidth="1" />
            {/* Slice 2 */}
            <path d="M50 50 L92 50 A42 42 0 0 1 50 92 Z" fill="#f59e0b" fillOpacity="0.8" stroke="#0f172a" strokeWidth="1" />
            {/* Slice 3 */}
            <path d="M50 50 L50 92 A42 42 0 0 1 8 50 Z" fill="#f59e0b" fillOpacity="0.8" stroke="#0f172a" strokeWidth="1" />
            {/* Slice 4 (empty) */}
            <path d="M50 50 L8 50 A42 42 0 0 1 50 8 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
          </svg>
          <div className="font-mono text-xs font-bold text-amber-400 mt-2">
            3 parts sur 4 = 3/4
          </div>
          <div className="text-[10px] text-slate-400">Numérateur (3) / Dénominateur (4)</div>
        </div>

        {/* Chocolate bar: 6/8 */}
        <div className="flex flex-col items-center bg-slate-950/70 p-3 rounded-xl border border-slate-800">
          <div className="grid grid-cols-4 gap-1 w-28 h-20 p-1 bg-slate-800 rounded-lg border border-slate-700">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className={`rounded flex items-center justify-center text-[10px] font-bold ${
                  i < 6 ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-600'
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="font-mono text-xs font-bold text-emerald-400 mt-3">
            6 parts sur 8 = 6/8 = 3/4 !
          </div>
          <div className="text-[10px] text-slate-400">Même quantité, découpée plus fin !</div>
        </div>
      </div>

      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
        <span className="text-base">💡</span>
        <span>
          <strong>L’astuce du Déclic :</strong> Le <em>dénominateur</em> donne la taille des parts (comme la taille des morceaux de pizza). Le <em>numérateur</em> compte combien de parts tu manges !
        </span>
      </div>
    </div>
  );
};

// 4. Triangle 180° Origami Tear-off Illustration (Triangles)
export const TriangleAnglesIllustration: React.FC = () => {
  return (
    <div className="rounded-2xl bg-slate-900 border border-violet-500/30 p-4 space-y-3">
      <div className="flex items-center justify-between text-xs font-bold text-violet-400">
        <span>📐 Le Déclic : Le Découpage Magique des 180°</span>
        <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
          Angle plat
        </span>
      </div>

      <div className="flex justify-center py-1">
        <svg viewBox="0 0 380 180" className="w-full max-w-sm h-auto select-none">
          {/* Main triangle */}
          <polygon
            points="60,120 180,30 240,120"
            fill="#3b82f6"
            fillOpacity="0.15"
            stroke="#60a5fa"
            strokeWidth="2"
          />

          {/* Angle A (Blue) */}
          <path d="M 60 120 L 85 120 A 25 25 0 0 0 74 100 Z" fill="#38bdf8" />
          <text x="45" y="135" className="text-xs font-bold fill-sky-400">Â</text>

          {/* Angle B (Orange) */}
          <path d="M 180 30 L 165 45 A 25 25 0 0 0 195 45 Z" fill="#f59e0b" />
          <text x="180" y="20" textAnchor="middle" className="text-xs font-bold fill-amber-400">B̂</text>

          {/* Angle C (Violet) */}
          <path d="M 240 120 L 215 120 A 25 25 0 0 1 228 100 Z" fill="#a855f7" />
          <text x="250" y="135" className="text-xs font-bold fill-purple-400">Ĉ</text>

          {/* Assembled on a flat line on the right */}
          <line x1="280" y1="140" x2="370" y2="140" stroke="#94a3b8" strokeWidth="2" />
          
          {/* Semi-circle of 180 */}
          <path d="M 295 140 A 30 30 0 0 1 355 140 Z" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="2" />
          <text x="325" y="125" textAnchor="middle" className="text-xs font-extrabold fill-emerald-300 font-mono">
            180°
          </text>
          <text x="325" y="158" textAnchor="middle" className="text-[9px] fill-slate-400 font-bold">
            Â + B̂ + Ĉ = 180°
          </text>
        </svg>
      </div>

      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
        <span className="text-base">💡</span>
        <span>
          <strong>L’expérience du Déclic :</strong> Découpe les 3 coins d’une feuille triangulaire et place-les bord à bord : ils forment toujours une ligne droite parfaite (un angle plat de 180°) !
        </span>
      </div>
    </div>
  );
};
