import React, { useState } from 'react';
import {
  Calculator,
  Compass,
  PieChart,
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';

export const MathVisualizers: React.FC = () => {
  const [activeVisualizer, setActiveVisualizer] = useState<'priority' | 'relatifs' | 'fractions' | 'triangle'>('priority');

  // --- PRIORITÉS STATE ---
  const [priorityPreset, setPriorityPreset] = useState<'ex1' | 'ex2' | 'ex3'>('ex1');

  // --- RELATIFS STATE ---
  const [relA, setRelA] = useState<number>(-4);
  const [relB, setRelB] = useState<number>(7);
  const relSum = relA + relB;

  // --- FRACTIONS STATE ---
  const [frac1Num, setFrac1Num] = useState<number>(1);
  const [frac1Den, setFrac1Den] = useState<number>(3);
  const [frac2Num, setFrac2Num] = useState<number>(5);
  const [frac2Den, setFrac2Den] = useState<number>(12);

  // Common denominator (in 5th grade, one is often multiple of the other: 12)
  const commonDen = 12;
  const factor1 = commonDen / frac1Den;
  const frac1NewNum = frac1Num * factor1;
  const sumNum = frac1NewNum + frac2Num;

  // --- TRIANGLE STATE ---
  const [angleA, setAngleA] = useState<number>(55);
  const [angleB, setAngleB] = useState<number>(65);
  const angleC = Math.max(1, 180 - angleA - angleB);

  return (
    <div className="space-y-4 pb-20">
      {/* Header and Visualizer Tabs */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-sky-400" />
              <span>Laboratoire Visuel de Mathématiques 5ème</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Expérimente et visualise les concepts clés pour mieux les comprendre
            </p>
          </div>
        </div>

        {/* Tab buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'priority', label: '1. Priorités opératoires', icon: Calculator },
            { id: 'relatifs', label: '2. Droite des relatifs', icon: ArrowRight },
            { id: 'fractions', label: '3. Parts de fractions', icon: PieChart },
            { id: 'triangle', label: '4. Triangle 180°', icon: Compass },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeVisualizer === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveVisualizer(tab.id as any)}
                className={`flex items-center gap-1.5 p-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-sky-500 text-slate-950 shadow-md font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. VISUALISEUR : PRIORITÉS OPÉRATOIRES PAS À PAS              */}
      {/* ============================================================== */}
      {activeVisualizer === 'priority' && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
              Décomposition automatique d’un calcul
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPriorityPreset('ex1')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                  priorityPreset === 'ex1' ? 'bg-sky-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Exemple A (Sans parenthèses)
              </button>
              <button
                onClick={() => setPriorityPreset('ex2')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                  priorityPreset === 'ex2' ? 'bg-sky-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Exemple B (Parenthèses)
              </button>
            </div>
          </div>

          {priorityPreset === 'ex1' ? (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <span className="text-xs text-slate-400">Expression initiale :</span>
                <div className="text-xl font-bold font-mono text-white mt-1">
                  E = 45 - 6 × 5 + 24 ÷ 4
                </div>
              </div>

              {/* Step Tree visual */}
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-amber-500/30">
                  <div className="font-bold text-amber-300 mb-1">
                    Étape 1 : On repère les multiplications et divisions prioritaires
                  </div>
                  <div className="font-mono text-slate-200">
                    E = 45 - <span className="bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">[6 × 5]</span> + <span className="bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">[24 ÷ 4]</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Calculs : 6 × 5 = 30  et  24 ÷ 4 = 6
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-cyan-500/30">
                  <div className="font-bold text-cyan-300 mb-1">
                    Étape 2 : On calcule de gauche à droite (+ et -)
                  </div>
                  <div className="font-mono text-slate-200">
                    E = <span className="bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-bold">[45 - 30]</span> + 6 = 15 + 6
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-bold font-mono text-center text-sm">
                  Résultat final : E = 21
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <span className="text-xs text-slate-400">Expression avec parenthèses :</span>
                <div className="text-xl font-bold font-mono text-white mt-1">
                  F = 8 × (17 - 3 × 4) + 10
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-amber-500/30">
                  <div className="font-bold text-amber-300 mb-1">
                    Étape 1 : Priorité absolue à la parenthèse (17 - 3 × 4)
                  </div>
                  <div className="font-mono text-slate-200">
                    Dans la parenthèse, 3 × 4 est prioritaire : 17 - 12 = 5
                  </div>
                  <div className="font-mono text-slate-300 mt-1">
                    F = 8 × <span className="text-emerald-400 font-bold">(5)</span> + 10
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-cyan-500/30">
                  <div className="font-bold text-cyan-300 mb-1">
                    Étape 2 : On effectue la multiplication
                  </div>
                  <div className="font-mono text-slate-200">
                    8 × 5 = 40, donc F = 40 + 10
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-bold font-mono text-center text-sm">
                  Résultat final : F = 50
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. VISUALISEUR : DROITE GRADUÉE DES RELATIFS                   */}
      {/* ============================================================== */}
      {activeVisualizer === 'relatifs' && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
          <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">
            Simulateur d’addition sur droite graduée
          </div>

          {/* Interactive controls */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-300 font-medium">
                Nombre de départ A : <strong className="text-white font-mono">{relA > 0 ? `+${relA}` : relA}</strong>
              </label>
              <input
                type="range"
                min="-8"
                max="8"
                value={relA}
                onChange={(e) => setRelA(parseInt(e.target.value, 10))}
                className="w-full accent-sky-400 mt-1 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium">
                Variation / Ajout B : <strong className="text-emerald-400 font-mono">{relB > 0 ? `+${relB}` : relB}</strong>
              </label>
              <input
                type="range"
                min="-8"
                max="8"
                value={relB}
                onChange={(e) => setRelB(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-400 mt-1 cursor-pointer"
              />
            </div>
          </div>

          {/* Result formula */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <div className="font-mono text-lg font-bold text-white">
              ({relA > 0 ? `+${relA}` : relA}) + ({relB > 0 ? `+${relB}` : relB}) ={' '}
              <span className={`px-2 py-0.5 rounded ${relSum >= 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                {relSum > 0 ? `+${relSum}` : relSum}
              </span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {relA * relB < 0
                ? 'Signes contraires : on prend le signe du plus grand en valeur absolue et on soustrait.'
                : 'Même signe : on conserve le signe et on additionne les distances.'}
            </div>
          </div>

          {/* SVG Number Line */}
          <div className="relative pt-6 pb-2 overflow-x-auto">
            <svg viewBox="-100 0 800 120" className="w-full h-24">
              {/* Axis Line */}
              <line x1="0" y1="60" x2="600" y2="60" stroke="#475569" strokeWidth="2" />
              {/* Arrow */}
              <polygon points="605,60 595,55 595,65" fill="#475569" />

              {/* Graduation marks from -8 to +8 */}
              {Array.from({ length: 17 }, (_, i) => {
                const val = i - 8;
                const x = 300 + val * 32;
                const isZero = val === 0;

                return (
                  <g key={val}>
                    <line
                      x1={x}
                      y1={isZero ? 45 : 53}
                      x2={x}
                      y2={isZero ? 75 : 67}
                      stroke={isZero ? '#38bdf8' : '#64748b'}
                      strokeWidth={isZero ? '3' : '1.5'}
                    />
                    <text
                      x={x}
                      y="92"
                      textAnchor="middle"
                      className={`text-[10px] font-mono select-none ${
                        isZero ? 'fill-sky-400 font-bold' : 'fill-slate-400'
                      }`}
                    >
                      {val > 0 ? `+${val}` : val}
                    </text>
                  </g>
                );
              })}

              {/* Start point marker (A) */}
              <circle cx={300 + relA * 32} cy="60" r="5" fill="#38bdf8" />

              {/* Arc arrow from A to Sum */}
              {relB !== 0 && (
                <path
                  d={`M ${300 + relA * 32} 50 Q ${300 + (relA + relB / 2) * 32} 15 ${300 + relSum * 32} 50`}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                />
              )}

              {/* Destination marker */}
              <circle cx={300 + relSum * 32} cy="60" r="6" fill="#10b981" />
            </svg>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. VISUALISEUR : FRACTIONS EN PARTS                           */}
      {/* ============================================================== */}
      {activeVisualizer === 'fractions' && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
          <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">
            Addition de fractions avec dénominateur commun
          </div>

          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
            <div className="font-mono text-base font-bold text-white flex items-center justify-center gap-3">
              <span className="text-sky-300">{frac1Num}/{frac1Den}</span>
              <span>+</span>
              <span className="text-amber-300">{frac2Num}/{frac2Den}</span>
              <span>=</span>
              <span className="text-emerald-400">{sumNum}/{commonDen}</span>
            </div>
            <div className="text-xs text-slate-400">
              Comme 12 = 3 × 4, on multiplie haut et bas de {frac1Num}/{frac1Den} par 4 : ({frac1Num} × 4) / ({frac1Den} × 4) = {frac1NewNum}/12.
            </div>
          </div>

          {/* Visual Fraction Bars */}
          <div className="space-y-3 pt-2">
            <div>
              <div className="text-xs text-slate-400 mb-1 flex justify-between">
                <span>Première fraction ({frac1Num}/{frac1Den} = {frac1NewNum}/12) :</span>
                <span className="font-mono text-sky-400">{frac1NewNum} parts sur 12</span>
              </div>
              <div className="grid grid-cols-12 gap-1 h-7 bg-slate-950 p-1 rounded-xl border border-slate-800">
                {Array.from({ length: 12 }, (_, i) => (
                  <div
                    key={i}
                    className={`rounded-md transition-colors ${
                      i < frac1NewNum ? 'bg-sky-500' : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-400 mb-1 flex justify-between">
                <span>Deuxième fraction ({frac2Num}/12) :</span>
                <span className="font-mono text-amber-400">{frac2Num} parts sur 12</span>
              </div>
              <div className="grid grid-cols-12 gap-1 h-7 bg-slate-950 p-1 rounded-xl border border-slate-800">
                {Array.from({ length: 12 }, (_, i) => (
                  <div
                    key={i}
                    className={`rounded-md transition-colors ${
                      i < frac2Num ? 'bg-amber-500' : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-400 mb-1 flex justify-between">
                <span>Somme totale ({sumNum}/12) :</span>
                <span className="font-mono text-emerald-400 font-bold">{sumNum} parts sur 12</span>
              </div>
              <div className="grid grid-cols-12 gap-1 h-8 bg-slate-950 p-1 rounded-xl border border-emerald-500/40">
                {Array.from({ length: 12 }, (_, i) => (
                  <div
                    key={i}
                    className={`rounded-md transition-colors ${
                      i < frac1NewNum
                        ? 'bg-sky-500'
                        : i < sumNum
                        ? 'bg-amber-500'
                        : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. VISUALISEUR : TRIANGLE & SOMME DES ANGLES = 180°           */}
      {/* ============================================================== */}
      {activeVisualizer === 'triangle' && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
              Théorème : Somme des angles d’un triangle = 180°
            </span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
              Toujours 180°
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-300 font-medium">
                Angle Â : <strong className="text-sky-400 font-mono">{angleA}°</strong>
              </label>
              <input
                type="range"
                min="20"
                max="120"
                value={angleA}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (val + angleB < 179) setAngleA(val);
                }}
                className="w-full accent-sky-400 mt-1 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium">
                Angle B̂ : <strong className="text-amber-400 font-mono">{angleB}°</strong>
              </label>
              <input
                type="range"
                min="20"
                max="120"
                value={angleB}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (val + angleA < 179) setAngleB(val);
                }}
                className="w-full accent-amber-400 mt-1 cursor-pointer"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <div className="font-mono text-base font-bold text-white flex items-center justify-center gap-2">
              <span className="text-sky-400">Â ({angleA}°)</span>
              <span>+</span>
              <span className="text-amber-400">B̂ ({angleB}°)</span>
              <span>+</span>
              <span className="text-violet-400 font-bold">Ĉ ({angleC}°)</span>
              <span>=</span>
              <span className="text-emerald-400 font-black">180°</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Calcul de Ĉ : 180° - ({angleA}° + {angleB}°) = 180° - {angleA + angleB}° = {angleC}°.
            </div>
          </div>

          {/* Dynamic SVG Triangle representation */}
          <div className="flex justify-center p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
            <svg viewBox="0 0 320 180" className="w-full max-w-xs h-40">
              {/* Dynamic coordinates based on angles */}
              <polygon
                points="40,150 280,150 140,30"
                fill="rgba(56, 189, 248, 0.08)"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {/* Vertex Labels */}
              <text x="30" y="170" fill="#38bdf8" className="text-xs font-bold">
                A ({angleA}°)
              </text>
              <text x="270" y="170" fill="#fbbf24" className="text-xs font-bold">
                B ({angleB}°)
              </text>
              <text x="135" y="20" fill="#a78bfa" className="text-xs font-bold">
                C ({angleC}°)
              </text>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
