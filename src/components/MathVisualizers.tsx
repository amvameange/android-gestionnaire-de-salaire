import React, { useState } from 'react';
import {
  Calculator,
  Compass,
  PieChart,
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileText,
  Ruler,
  Layers,
  Percent,
  MapPin,
  Scale,
  RefreshCw,
  HelpCircle,
  Eye,
  ArrowDown,
} from 'lucide-react';
import { CHAPTERS } from '../data/curriculumData';
import { StandingMathRenderer } from './StandingMathRenderer';

export const MathVisualizers: React.FC = () => {
  // Current active chapter in Labo (0 to 5)
  const [selectedChapIdx, setSelectedChapIdx] = useState<number>(0);
  // Current active concept within the chapter (1 to 5)
  const [selectedConceptIdx, setSelectedConceptIdx] = useState<number>(1);
  // Show chapter memo toggle
  const [showChapterMemo, setShowChapterMemo] = useState<boolean>(true);

  const currentChapter = CHAPTERS[selectedChapIdx] || CHAPTERS[0];

  // ----------------------------------------------------------------------
  // CHAPTER 1 INTERACTIVE STATES (Priorités)
  // ----------------------------------------------------------------------
  const [c1RocketLevel, setC1RocketLevel] = useState<number>(1);
  const [c1NumA, setC1NumA] = useState<number>(1500);
  const [c1NumB, setC1NumB] = useState<number>(500);
  const [c1NumC, setC1NumC] = useState<number>(3);
  const [c1FactorK, setC1FactorK] = useState<number>(7);
  const [c1DistA, setC1DistA] = useState<number>(1000);
  const [c1DistB, setC1DistB] = useState<number>(20);
  const [c1ShopItem1, setC1ShopItem1] = useState<number>(1200);
  const [c1ShopItem2, setC1ShopItem2] = useState<number>(2500);
  const [c1ShopItem3, setC1ShopItem3] = useState<number>(800);

  // ----------------------------------------------------------------------
  // CHAPTER 2 INTERACTIVE STATES (Relatifs)
  // ----------------------------------------------------------------------
  const [c2Altitude, setC2Altitude] = useState<number>(1070); // Bengoué: 1070, Ocean: -80
  const [c2RelA, setC2RelA] = useState<number>(-5);
  const [c2RelB, setC2RelB] = useState<number>(8);
  const [c2Dette1, setC2Dette1] = useState<number>(400);
  const [c2Dette2, setC2Dette2] = useState<number>(300);
  const [c2Gain, setC2Gain] = useState<number>(1500);
  const [c2Perte, setC2Perte] = useState<number>(900);
  const [c2SubA, setC2SubA] = useState<number>(12);
  const [c2SubB, setC2SubB] = useState<number>(-8);

  // ----------------------------------------------------------------------
  // CHAPTER 3 INTERACTIVE STATES (Fractions)
  // ----------------------------------------------------------------------
  const [c3NumParts, setC3NumParts] = useState<number>(3);
  const [c3DenParts, setC3DenParts] = useState<number>(8);
  const [c3EquivBaseNum, setC3EquivBaseNum] = useState<number>(2);
  const [c3EquivBaseDen, setC3EquivBaseDen] = useState<number>(3);
  const [c3EquivK, setC3EquivK] = useState<number>(4);
  const [c3SimpNum, setC3SimpNum] = useState<number>(15);
  const [c3SimpDen, setC3SimpDen] = useState<number>(20);
  const [c3AddFrac1Num, setC3AddFrac1Num] = useState<number>(1);
  const [c3AddFrac1Den, setC3AddFrac1Den] = useState<number>(2);
  const [c3AddFrac2Num, setC3AddFrac2Num] = useState<number>(3);
  const [c3AddFrac2Den, setC3AddFrac2Den] = useState<number>(4);
  const [c3BudgetTotal, setC3BudgetTotal] = useState<number>(40000);
  const [c3BudgetFracNum, setC3BudgetFracNum] = useState<number>(3);
  const [c3BudgetFracDen, setC3BudgetFracDen] = useState<number>(5);

  // ----------------------------------------------------------------------
  // CHAPTER 4 INTERACTIVE STATES (Proportionnalité)
  // ----------------------------------------------------------------------
  const [c4KgPrice, setC4KgPrice] = useState<number>(1500); // F CFA par kg
  const [c4CrossA, setC4CrossA] = useState<number>(3);
  const [c4CrossB, setC4CrossB] = useState<number>(1200);
  const [c4CrossC, setC4CrossC] = useState<number>(7);
  const [c4DiscountPrice, setC4DiscountPrice] = useState<number>(20000);
  const [c4DiscountPct, setC4DiscountPct] = useState<number>(20);
  const [c4TaxPrice, setC4TaxPrice] = useState<number>(15000);
  const [c4TaxPct, setC4TaxPct] = useState<number>(18); // TVA 18% Gabon
  const [c4MapCm, setC4MapCm] = useState<number>(5); // 5 cm
  const [c4MapScale, setC4MapScale] = useState<number>(1000000); // 1/1 000 000

  // ----------------------------------------------------------------------
  // CHAPTER 5 INTERACTIVE STATES (Triangles & Angles)
  // ----------------------------------------------------------------------
  const [c5AngleA, setC5AngleA] = useState<number>(50);
  const [c5AngleB, setC5AngleB] = useState<number>(70);
  const c5AngleC = Math.max(1, 180 - c5AngleA - c5AngleB);
  const [c5SideA, setC5SideA] = useState<number>(5);
  const [c5SideB, setC5SideB] = useState<number>(7);
  const [c5SideC, setC5SideC] = useState<number>(10);
  const [c5RectAngle1, setC5RectAngle1] = useState<number>(40);
  const [c5IsoAngleBase, setC5IsoAngleBase] = useState<number>(55);
  const [c5EquiSide, setC5EquiSide] = useState<number>(6);

  // ----------------------------------------------------------------------
  // CHAPTER 6 INTERACTIVE STATES (Aires & Périmètres)
  // ----------------------------------------------------------------------
  const [c6TriBase, setC6TriBase] = useState<number>(8);
  const [c6TriHeight, setC6TriHeight] = useState<number>(5);
  const [c6ParaBase, setC6ParaBase] = useState<number>(9);
  const [c6ParaHeight, setC6ParaHeight] = useState<number>(4);
  const [c6RecL, setC6RecL] = useState<number>(25);
  const [c6Recl, setC6Recl] = useState<number>(12);
  const [c6CircleR, setC6CircleR] = useState<number>(10);
  const [c6DiscR, setC6DiscR] = useState<number>(5);

  const getConceptNamesForChapter = (chapIndex: number) => {
    switch (chapIndex) {
      case 0: // Chap 1
        return [
          { id: 1, title: 'La Fusée des Priorités', icon: '🚀', desc: 'Hiérarchie absolue des opérations' },
          { id: 2, title: 'Calcul Sans Parenthèses', icon: '⚡', desc: 'Multiplication prioritaire en colonne' },
          { id: 3, title: 'Parenthèses Imbriquées', icon: '🎯', desc: 'Calcul de l’intérieur vers l’extérieur' },
          { id: 4, title: 'Distributivité au Marché', icon: '🧺', desc: 'Calcul mental rapide k × (a + b)' },
          { id: 5, title: 'Total d’Achats en F CFA', icon: '💰', desc: 'Opération posée debout' },
        ];
      case 1: // Chap 2
        return [
          { id: 1, title: 'L’Ascenseur des Altitudes', icon: '🏔️', desc: 'Du Mont Bengoué à l’Océan' },
          { id: 2, title: 'Comparaison de Relatifs', icon: '⚖️', desc: 'Distance à zéro et signes' },
          { id: 3, title: 'Addition Même Signe', icon: '📉', desc: 'Cumul de dettes en F CFA' },
          { id: 4, title: 'Bataille des Signes', icon: '⚔️', desc: 'Gains vs Pertes d’argent' },
          { id: 5, title: 'Soustraction : Ajouter l’opposé', icon: '🔄', desc: 'Règle d’or a - b = a + (-b)' },
        ];
      case 2: // Chap 3
        return [
          { id: 1, title: 'Le Découpeur d’Atangas', icon: '🥧', desc: 'Parts égales et fraction a/b' },
          { id: 2, title: 'Fractions Équivalentes', icon: '✨', desc: 'Multiplication haut & bas par k' },
          { id: 3, title: 'Simplificateur Pas à Pas', icon: '✂️', desc: 'Division par le diviseur commun' },
          { id: 4, title: 'Addition Dénominateur Multiple', icon: '➕', desc: 'Mise au même dénominateur' },
          { id: 5, title: 'Partage de Budget F CFA', icon: '💵', desc: 'Prendre une fraction d’une somme' },
        ];
      case 3: // Chap 4
        return [
          { id: 1, title: 'Tableau & Coefficient k', icon: '📊', desc: 'Prix au kilo au grand marché' },
          { id: 2, title: 'Le Produit en Croix', icon: '❌', desc: 'Règle de 3 infaillible' },
          { id: 3, title: 'Calculateur de Remise %', icon: '🏷️', desc: 'Économie et prix payé en F CFA' },
          { id: 4, title: 'TVA & Augmentation %', icon: '📈', desc: 'Calcul de taxe ou hausse' },
          { id: 5, title: 'Échelle Carte du Gabon', icon: '🗺️', desc: 'Distance carte (cm) vers réelle (km)' },
        ];
      case 4: // Chap 5
        return [
          { id: 1, title: 'Somme des Angles = 180°', icon: '📐', desc: 'Dans tout triangle au monde' },
          { id: 2, title: 'Inégalité Triangulaire', icon: '📏', desc: 'Le triangle peut-il se fermer ?' },
          { id: 3, title: 'Triangle Rectangle', icon: '📐', desc: 'Angle droit 90° et angles aigus' },
          { id: 4, title: 'Triangle Isocèle', icon: '⛺', desc: '2 côtés égaux et angles à la base' },
          { id: 5, title: 'Triangle Équilatéral', icon: '🔺', desc: '3 côtés égaux et 3 angles de 60°' },
        ];
      case 5: // Chap 6
        return [
          { id: 1, title: 'Aire du Triangle', icon: '🔺', desc: '(Base × Hauteur) ÷ 2' },
          { id: 2, title: 'Aire Parallélogramme', icon: '▱', desc: 'Base × Hauteur rectangulaire' },
          { id: 3, title: 'Terrain Rectangulaire', icon: '🏡', desc: 'Périmètre et Aire en m²' },
          { id: 4, title: 'Périmètre du Cercle', icon: '⭕', desc: 'La roue qui roule 2 × π × R' },
          { id: 5, title: 'Aire du Disque', icon: '🎯', desc: 'Surface en π × R²' },
        ];
      default:
        return [];
    }
  };

  const concepts = getConceptNamesForChapter(selectedChapIdx);
  const currentConcept = concepts.find((c) => c.id === selectedConceptIdx) || concepts[0];

  return (
    <div className="space-y-5 pb-20 animate-fade-in">
      {/* ============================================================== */}
      {/* 1. TOP HEADER DU LABO VISUEL                                   */}
      {/* ============================================================== */}
      <div className="rounded-3xl bg-slate-900 border-2 border-sky-500/30 p-5 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 p-0.5 shadow-lg shadow-sky-500/20 shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-sky-400 font-black">
                <Compass className="w-6 h-6 stroke-[2.5]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xs text-amber-300 bg-amber-950 px-2 py-0.5 rounded-full border border-amber-800">
                  🇬🇦 Collège CIAM 5ème
                </span>
                <span className="text-[11px] font-bold text-emerald-400">
                  30 Concepts Interactifs (5 par chapitre)
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white mt-1">
                Laboratoire Visuel & Simulateurs Interactifs
              </h2>
              <p className="text-xs text-slate-300">
                Choisis un chapitre et manipule les 5 curseurs interactifs avec toutes les formules posées debout !
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowChapterMemo(!showChapterMemo)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition cursor-pointer shadow"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>{showChapterMemo ? 'Masquer le Mémo' : 'Afficher le Mémo'}</span>
          </button>
        </div>

        {/* CHAPTER SELECTOR BAR (6 Chapitres) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-4 pt-3 border-t border-slate-800">
          {CHAPTERS.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => {
                setSelectedChapIdx(idx);
                setSelectedConceptIdx(1); // Reset to concept 1
              }}
              className={`p-2.5 rounded-2xl text-left transition cursor-pointer border flex flex-col justify-between ${
                selectedChapIdx === idx
                  ? 'bg-gradient-to-br from-sky-500/20 to-indigo-500/20 border-sky-400 text-white shadow-lg ring-2 ring-sky-400/30'
                  : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                Chapitre {idx + 1}
              </div>
              <div className="text-xs font-bold truncate mt-0.5 text-slate-100">
                {ch.title.split(':')[0]}
              </div>
              <div className="text-[10px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                <span>✦</span> 5 concepts
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. FICHE MÉMO DU CHAPITRE SÉLECTIONNÉ (FORMULES DEBOUT)       */}
      {/* ============================================================== */}
      {showChapterMemo && currentChapter.memoSheet && (
        <div className="rounded-3xl bg-slate-900 border-2 border-amber-500/40 p-4 sm:p-5 shadow-xl space-y-3 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                Fiche Mémo Rapide : {currentChapter.title}
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800">
              Formules 100% Debout
            </span>
          </div>

          {/* Points clés & Slogan */}
          <p className="text-xs text-slate-300 font-medium">
            💡 {currentChapter.memoSheet.slogan}
          </p>

          {/* Formules en colonne */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            {currentChapter.memoSheet.verticalFormulas.slice(0, 3).map((vf, vIdx) => (
              <StandingMathRenderer
                key={vIdx}
                expression={vf.steps.join('\n')}
                subResult={vf.resultHighlight}
                title={`Mémo Debout : ${vf.name}`}
                showColumnOp={false}
              />
            ))}
          </div>

          {/* Koko Tip */}
          <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2">
            <span className="text-base select-none">🐆</span>
            <div>
              <strong className="font-bold text-amber-300">Règle d'or de Koko :</strong>{' '}
              {currentChapter.memoSheet.kokoTip}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. SÉLECTION DES 5 CONCEPTS DU CHAPITRE                        */}
      {/* ============================================================== */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Les 5 Concepts Visuels du Chapitre {selectedChapIdx + 1} :</span>
          </span>
          <span className="text-[11px] text-slate-400">Clique pour changer de concept</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {concepts.map((conc) => {
            const isSelected = selectedConceptIdx === conc.id;
            return (
              <button
                key={conc.id}
                onClick={() => setSelectedConceptIdx(conc.id)}
                className={`p-3 rounded-2xl text-left transition cursor-pointer border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-lg ring-2 ring-amber-400/40'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-lg">{conc.icon}</span>
                  <span
                    className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    #{conc.id}
                  </span>
                </div>
                <div className="mt-2 text-xs font-extrabold leading-tight">
                  {conc.title}
                </div>
                <div
                  className={`text-[10px] mt-1 truncate ${
                    isSelected ? 'text-slate-800' : 'text-slate-500'
                  }`}
                >
                  {conc.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. ZONE INTERACTIVE DU CONCEPT EN COURS                        */}
      {/* ============================================================== */}

      {/* -------------------------------------------------------------- */}
      {/* CHAPITRE 1 : PRIORITÉS OPÉRATOIRES                             */}
      {/* -------------------------------------------------------------- */}
      {selectedChapIdx === 0 && (
        <div className="space-y-4">
          {/* Concept 1.1 : La Fusée des priorités */}
          {selectedConceptIdx === 1 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <span>🚀</span>
                  <span>Concept 1 : La Fusée des Priorités Opératoires</span>
                </h4>
                <span className="text-xs text-amber-300 font-mono">Niveau 1 à 3</span>
              </div>

              <p className="text-xs text-slate-300">
                Clique sur les étages de la fusée pour voir qui a la priorité absolue dans un calcul !
              </p>

              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { level: 1, title: 'Étage 1 : ( ) Les Parenthèses', sub: 'Reine suprême : toujours calculées d’abord !', color: 'from-amber-500 to-yellow-400', badge: 'Priorité 1' },
                  { level: 2, title: 'Étage 2 : × et ÷ Multiplications', sub: 'Colle forte : calculées avant les additions', color: 'from-sky-500 to-cyan-400', badge: 'Priorité 2' },
                  { level: 3, title: 'Étage 3 : + et - Additions', sub: 'De gauche à droite en dernier recours', color: 'from-emerald-500 to-teal-400', badge: 'Priorité 3' },
                ].map((st) => (
                  <button
                    key={st.level}
                    onClick={() => setC1RocketLevel(st.level)}
                    className={`p-4 rounded-2xl text-left border transition cursor-pointer flex flex-col justify-between ${
                      c1RocketLevel === st.level
                        ? 'bg-slate-950 border-amber-400 ring-2 ring-amber-400/40 shadow-xl'
                        : 'bg-slate-950/70 border-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                        {st.badge}
                      </span>
                      <h5 className="text-xs font-black text-white mt-2">{st.title}</h5>
                      <p className="text-[11px] text-slate-400 mt-1">{st.sub}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Exemple dynamique debout correspondant à l'étage */}
              <div className="pt-2">
                {c1RocketLevel === 1 && (
                  <StandingMathRenderer
                    expression="A = 4 × (1 200 - 500) | = 4 × 700 | = 2 800 F CFA"
                    subResult="Parenthèse prioritaire : 1 200 - 500 = 700"
                    title="Exemple Debout : Priorité aux parenthèses"
                  />
                )}
                {c1RocketLevel === 2 && (
                  <StandingMathRenderer
                    expression="B = 1 500 + 500 × 3 | = 1 500 + 1 500 | = 3 000 F CFA"
                    subResult="Multiplication prioritaire : 500 × 3 = 1 500"
                    title="Exemple Debout : Priorité à la multiplication"
                  />
                )}
                {c1RocketLevel === 3 && (
                  <StandingMathRenderer
                    expression="C = 25 - 7 + 4 | = 18 + 4 | = 22"
                    subResult="De gauche à droite : 25 - 7 = 18"
                    title="Exemple Debout : Ordre de lecture gauche à droite"
                  />
                )}
              </div>
            </div>
          )}

          {/* Concept 1.2 : Calcul sans parenthèses dynamique */}
          {selectedConceptIdx === 2 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>⚡</span>
                <span>Concept 2 : Calcul sans Parenthèses (A = a + b × c)</span>
              </h4>
              <p className="text-xs text-slate-300">
                Change les curseurs pour voir la multiplication se faire surligner et le calcul se poser debout !
              </p>

              <div className="grid sm:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1">Nombre a (Somme de base) : {c1NumA}</label>
                  <input
                    type="range"
                    min="500"
                    max="3000"
                    step="100"
                    value={c1NumA}
                    onChange={(e) => setC1NumA(Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1">Nombre b (Quantité) : {c1NumB}</label>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="50"
                    value={c1NumB}
                    onChange={(e) => setC1NumB(Number(e.target.value))}
                    className="w-full accent-sky-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1">Nombre c (Facteur) : {c1NumC}</label>
                  <input
                    type="range"
                    min="2"
                    max="8"
                    step="1"
                    value={c1NumC}
                    onChange={(e) => setC1NumC(Number(e.target.value))}
                    className="w-full accent-emerald-400"
                  />
                </div>
              </div>

              <StandingMathRenderer
                expression={`E = ${c1NumA} + ${c1NumB} × ${c1NumC} | = ${c1NumA} + ${c1NumB * c1NumC} | = ${c1NumA + c1NumB * c1NumC} F CFA`}
                subResult={`${c1NumB} × ${c1NumC} = ${c1NumB * c1NumC}`}
                title="Résolution Debout Pas à Pas"
                showColumnOp={true}
              />
            </div>
          )}

          {/* Concept 1.3 : Parenthèses imbriquées */}
          {selectedConceptIdx === 3 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>🎯</span>
                <span>Concept 3 : Crochets et Parenthèses Imbriquées [ ... ( ... ) ... ]</span>
              </h4>
              <p className="text-xs text-slate-300">
                La règle d'or : On calcule d'abord les parenthèses les plus intérieures, puis les crochets !
              </p>

              <StandingMathRenderer
                expression="M = 50 - [3 × (8 + 4)] | = 50 - [3 × 12] | = 50 - 36 | = 14"
                subResult="Parenthèse intérieure : 8 + 4 = 12"
                title="Décomposition Debout de l'intérieur vers l'extérieur"
                showColumnOp={true}
              />
            </div>
          )}

          {/* Concept 1.4 : Distributivité simple */}
          {selectedConceptIdx === 4 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>🧺</span>
                <span>Concept 4 : Distributivité Simple k × (a + b) au Marché Mont-Bouët</span>
              </h4>
              <p className="text-xs text-slate-300">
                Pour calculer de tête 7 paquets de manioc à 1 020 F CFA, on décompose : 7 × (1 000 + 20) !
              </p>

              <div className="grid sm:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1">Nombre d'articles k : {c1FactorK}</label>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    value={c1FactorK}
                    onChange={(e) => setC1FactorK(Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1">Gros paquet a : {c1DistA} F</label>
                  <input
                    type="range"
                    min="500"
                    max="2000"
                    step="100"
                    value={c1DistA}
                    onChange={(e) => setC1DistA(Number(e.target.value))}
                    className="w-full accent-sky-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1">Petite monnaie b : {c1DistB} F</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="10"
                    value={c1DistB}
                    onChange={(e) => setC1DistB(Number(e.target.value))}
                    className="w-full accent-emerald-400"
                  />
                </div>
              </div>

              <StandingMathRenderer
                expression={`Total = ${c1FactorK} × (${c1DistA} + ${c1DistB}) | = ${c1FactorK} × ${c1DistA} + ${c1FactorK} × ${c1DistB} | = ${c1FactorK * c1DistA} + ${c1FactorK * c1DistB} | = ${c1FactorK * (c1DistA + c1DistB)} F CFA`}
                subResult={`Calcul mental rapide : ${c1FactorK * c1DistA} + ${c1FactorK * c1DistB} = ${c1FactorK * (c1DistA + c1DistB)} F CFA`}
                title="Développement Distributif Debout"
                showColumnOp={false}
              />
            </div>
          )}

          {/* Concept 1.5 : Total posé debout en colonne */}
          {selectedConceptIdx === 5 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>💰</span>
                <span>Concept 5 : Addition de Plusieurs Achats Posée Debout en Colonne</span>
              </h4>
              <p className="text-xs text-slate-300">
                Au collège, l'addition de plusieurs montants se pose toujours debout en colonne avec les unités alignées !
              </p>

              <div className="grid sm:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1">Poisson frais : {c1ShopItem1} F</label>
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="100"
                    value={c1ShopItem1}
                    onChange={(e) => setC1ShopItem1(Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1">Régime de bananes : {c1ShopItem2} F</label>
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="100"
                    value={c1ShopItem2}
                    onChange={(e) => setC1ShopItem2(Number(e.target.value))}
                    className="w-full accent-sky-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1">Sac d'atangas : {c1ShopItem3} F</label>
                  <input
                    type="range"
                    min="200"
                    max="3000"
                    step="100"
                    value={c1ShopItem3}
                    onChange={(e) => setC1ShopItem3(Number(e.target.value))}
                    className="w-full accent-emerald-400"
                  />
                </div>
              </div>

              <StandingMathRenderer
                expression={`Total = ${c1ShopItem1} + ${c1ShopItem2} + ${c1ShopItem3} | = ${c1ShopItem1 + c1ShopItem2} + ${c1ShopItem3} | = ${c1ShopItem1 + c1ShopItem2 + c1ShopItem3} F CFA`}
                subResult={`${c1ShopItem1} + ${c1ShopItem2} = ${c1ShopItem1 + c1ShopItem2}`}
                title="Total Général Posé Debout"
                showColumnOp={true}
              />
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------- */}
      {/* CHAPITRE 2 : NOMBRES DÉCIMAUX RELATIFS                         */}
      {/* -------------------------------------------------------------- */}
      {selectedChapIdx === 1 && (
        <div className="space-y-4">
          {/* Concept 2.1 : L'ascenseur des altitudes */}
          {selectedConceptIdx === 1 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>🏔️</span>
                <span>Concept 1 : L'Ascenseur des Altitudes (Du Mont Bengoué à l'Océan)</span>
              </h4>
              <p className="text-xs text-slate-300">
                Fais glisser le curseur pour explorer les altitudes positives au Gabon et les profondeurs négatives !
              </p>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <span className="text-cyan-400">Fosse marine (-150 m)</span>
                  <span className="text-emerald-400 font-black text-base">
                    Altitude : {c2Altitude > 0 ? `+${c2Altitude}` : c2Altitude} m
                  </span>
                  <span className="text-amber-400">Mont Bengoué (+1 070 m)</span>
                </div>

                <input
                  type="range"
                  min="-150"
                  max="1070"
                  step="10"
                  value={c2Altitude}
                  onChange={(e) => setC2Altitude(Number(e.target.value))}
                  className="w-full accent-amber-400 h-3 bg-slate-800 rounded-lg"
                />

                <div className="p-3 rounded-xl bg-slate-900 text-xs text-slate-200 border border-slate-800 flex items-center justify-between">
                  <span>Signe : <strong className={c2Altitude >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{c2Altitude >= 0 ? 'Positif (+)' : 'Négatif (-)'}</strong></span>
                  <span>Distance à zéro : <strong className="font-mono text-amber-300 font-bold">{Math.abs(c2Altitude)} mètres</strong></span>
                </div>
              </div>

              <StandingMathRenderer
                expression={`Repère = ${c2Altitude > 0 ? `+${c2Altitude}` : c2Altitude} m | Signe = ${c2Altitude >= 0 ? '+' : '-'} | Distance à zéro = ${Math.abs(c2Altitude)}`}
                title="Analyse du Nombre Relatif Debout"
                showColumnOp={false}
              />
            </div>
          )}

          {/* Concept 2.2 : Comparaison de deux relatifs */}
          {selectedConceptIdx === 2 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>⚖️</span>
                <span>Concept 2 : Comparer Deux Nombres Relatifs</span>
              </h4>
              <p className="text-xs text-slate-300">
                Règle : Entre deux négatifs, le plus grand est le plus proche de 0 (la plus petite dette) !
              </p>

              <div className="grid sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1">Nombre A : {c2RelA > 0 ? `+${c2RelA}` : c2RelA}</label>
                  <input
                    type="range"
                    min="-20"
                    max="20"
                    value={c2RelA}
                    onChange={(e) => setC2RelA(Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1">Nombre B : {c2RelB > 0 ? `+${c2RelB}` : c2RelB}</label>
                  <input
                    type="range"
                    min="-20"
                    max="20"
                    value={c2RelB}
                    onChange={(e) => setC2RelB(Number(e.target.value))}
                    className="w-full accent-sky-400"
                  />
                </div>
              </div>

              <StandingMathRenderer
                expression={`Comparaison : ${c2RelA > 0 ? `+${c2RelA}` : c2RelA} ${c2RelA > c2RelB ? '>' : c2RelA < c2RelB ? '<' : '='} ${c2RelB > 0 ? `+${c2RelB}` : c2RelB} | Le plus grand est : ${Math.max(c2RelA, c2RelB) > 0 ? `+${Math.max(c2RelA, c2RelB)}` : Math.max(c2RelA, c2RelB)}`}
                subResult={`Écart : ${Math.abs(c2RelA - c2RelB)} unités`}
                title="Comparaison Debout"
                showColumnOp={false}
              />
            </div>
          )}

          {/* Concept 2.3 : Addition de même signe */}
          {selectedConceptIdx === 3 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>📉</span>
                <span>Concept 3 : Addition de Deux Nombres de Même Signe (Deux dettes)</span>
              </h4>
              <p className="text-xs text-slate-300">
                On garde le signe commun (-) et on additionne les valeurs !
              </p>

              <StandingMathRenderer
                expression={`Dette Totale = (-${c2Dette1} F) + (-${c2Dette2} F) | = -(${c2Dette1} + ${c2Dette2}) | = -${c2Dette1 + c2Dette2} F CFA`}
                subResult={`Somme des dettes : ${c2Dette1} + ${c2Dette2} = ${c2Dette1 + c2Dette2}`}
                title="Calcul de Dettes Debout"
                showColumnOp={true}
              />
            </div>
          )}

          {/* Concept 2.4 : Bataille des signes */}
          {selectedConceptIdx === 4 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>⚔️</span>
                <span>Concept 4 : Addition de Signes Contraires (Bataille des Signes)</span>
              </h4>
              <p className="text-xs text-slate-300">
                Le nombre qui a la plus grande distance à zéro donne son signe au résultat final !
              </p>

              <div className="grid sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <label className="text-[11px] text-emerald-400 font-bold block mb-1">Gain (+) : +{c2Gain} F</label>
                  <input
                    type="range"
                    min="500"
                    max="3000"
                    step="100"
                    value={c2Gain}
                    onChange={(e) => setC2Gain(Number(e.target.value))}
                    className="w-full accent-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-rose-400 font-bold block mb-1">Perte (-) : -{c2Perte} F</label>
                  <input
                    type="range"
                    min="500"
                    max="3000"
                    step="100"
                    value={c2Perte}
                    onChange={(e) => setC2Perte(Number(e.target.value))}
                    className="w-full accent-rose-400"
                  />
                </div>
              </div>

              <StandingMathRenderer
                expression={`Bilan = (+${c2Gain} F) + (-${c2Perte} F) | = ${c2Gain >= c2Perte ? `+(${c2Gain} - ${c2Perte})` : `-(${c2Perte} - ${c2Gain})`} | = ${c2Gain - c2Perte > 0 ? `+${c2Gain - c2Perte}` : c2Gain - c2Perte} F CFA`}
                subResult={`Différence : ${Math.abs(c2Gain - c2Perte)}`}
                title="Bilan Financier Debout"
                showColumnOp={true}
              />
            </div>
          )}

          {/* Concept 2.5 : Soustraction de relatifs */}
          {selectedConceptIdx === 5 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>🔄</span>
                <span>Concept 5 : Soustraction de Relatifs (Ajouter l'opposé !)</span>
              </h4>
              <p className="text-xs text-slate-300">
                Règle d'or absolue du CIAM : a - (-b) se transforme TOUJOURS en a + (+b) !
              </p>

              <StandingMathRenderer
                expression="C = (+12) - (-8) | = (+12) + (+8) | = +20"
                subResult="- (-8) se transforme en + (+8)"
                title="Transformation de Soustraction Debout"
                showColumnOp={true}
              />
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------- */}
      {/* CHAPITRE 3 : FRACTIONS & ÉCRITURES FRACTIONNAIRES              */}
      {/* -------------------------------------------------------------- */}
      {selectedChapIdx === 2 && (
        <div className="space-y-4">
          {/* Concept 3.1 : Découpeur d'atangas */}
          {selectedConceptIdx === 1 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>🥧</span>
                <span>Concept 1 : Le Découpeur de Parts Égales (Fractions a/b)</span>
              </h4>
              <p className="text-xs text-slate-300">
                Change le numérateur (parts mangées) et le dénominateur (découpage total) !
              </p>

              <div className="grid sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <label className="text-[11px] text-amber-300 font-bold block mb-1">Numérateur a (Parts sélectionnées) : {c3NumParts}</label>
                  <input
                    type="range"
                    min="1"
                    max={c3DenParts}
                    value={c3NumParts}
                    onChange={(e) => setC3NumParts(Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-sky-300 font-bold block mb-1">Dénominateur b (Parts totales) : {c3DenParts}</label>
                  <input
                    type="range"
                    min="2"
                    max="12"
                    value={c3DenParts}
                    onChange={(e) => {
                      const newDen = Number(e.target.value);
                      setC3DenParts(newDen);
                      if (c3NumParts > newDen) setC3NumParts(newDen);
                    }}
                    className="w-full accent-sky-400"
                  />
                </div>
              </div>

              {/* Visualisation SVG des parts */}
              <div className="flex flex-wrap items-center justify-center gap-2 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                {Array.from({ length: c3DenParts }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-all shadow-md ${
                      i < c3NumParts
                        ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 scale-105'
                        : 'bg-slate-800 text-slate-500 border border-slate-700'
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              <StandingMathRenderer
                expression={`Fraction = ${c3NumParts} / ${c3DenParts} | Valeur décimale ≈ ${(c3NumParts / c3DenParts).toFixed(2)} | Pourcentage = ${Math.round((c3NumParts / c3DenParts) * 100)} %`}
                title="Fraction Découpée Debout"
                showColumnOp={false}
              />
            </div>
          )}

          {/* Concept 3.2 : Fractions équivalentes */}
          {selectedConceptIdx === 2 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>✨</span>
                <span>Concept 2 : Fractions Équivalentes (Multiplier par k en haut et en bas)</span>
              </h4>
              <p className="text-xs text-slate-300">
                Multiplier le haut et le bas par le même nombre ne change pas la valeur de la fraction !
              </p>

              <div className="grid sm:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1">Numérateur a : {c3EquivBaseNum}</label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={c3EquivBaseNum}
                    onChange={(e) => setC3EquivBaseNum(Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1">Dénominateur b : {c3EquivBaseDen}</label>
                  <input
                    type="range"
                    min="2"
                    max="8"
                    value={c3EquivBaseDen}
                    onChange={(e) => setC3EquivBaseDen(Number(e.target.value))}
                    className="w-full accent-sky-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-emerald-400 font-bold block mb-1">Multiplicateur k : ×{c3EquivK}</label>
                  <input
                    type="range"
                    min="2"
                    max="6"
                    value={c3EquivK}
                    onChange={(e) => setC3EquivK(Number(e.target.value))}
                    className="w-full accent-emerald-400"
                  />
                </div>
              </div>

              <StandingMathRenderer
                expression={`F = ${c3EquivBaseNum} / ${c3EquivBaseDen} | = (${c3EquivBaseNum} × ${c3EquivK}) / (${c3EquivBaseDen} × ${c3EquivK}) | = ${c3EquivBaseNum * c3EquivK} / ${c3EquivBaseDen * c3EquivK}`}
                subResult={`${c3EquivBaseNum} / ${c3EquivBaseDen} = ${c3EquivBaseNum * c3EquivK} / ${c3EquivBaseDen * c3EquivK}`}
                title="Agrandissement de Fraction Debout"
                showColumnOp={false}
              />
            </div>
          )}

          {/* Concept 3.3 : Simplification pas à pas */}
          {selectedConceptIdx === 3 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>✂️</span>
                <span>Concept 3 : Simplification de Fraction par le Diviseur Commun</span>
              </h4>
              <p className="text-xs text-slate-300">
                15 et 20 se terminent par 5 et 0 : on divise le haut et le bas par 5 !
              </p>

              <StandingMathRenderer
                expression="F = 15 / 20 | = (15 ÷ 5) / (20 ÷ 5) | = 3 / 4"
                subResult="Fraction irréductible : 3/4"
                title="Simplification Debout (Barre horizontale)"
                showColumnOp={false}
              />
            </div>
          )}

          {/* Concept 3.4 : Addition dénominateur multiple */}
          {selectedConceptIdx === 4 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>➕</span>
                <span>Concept 4 : Addition de Fractions avec Dénominateurs Multiples</span>
              </h4>
              <p className="text-xs text-slate-300">
                Interdit d'additionner les dénominateurs ! On met au même dénominateur d'abord :
              </p>

              <StandingMathRenderer
                expression="S = 1/2 + 3/4 | = (1 × 2) / (2 × 2) + 3/4 | = 2/4 + 3/4 | = (2 + 3) / 4 | = 5/4"
                subResult="Même dénominateur commun = 4"
                title="Addition de Fractions Debout"
                showColumnOp={false}
              />
            </div>
          )}

          {/* Concept 3.5 : Fraction d'un budget */}
          {selectedConceptIdx === 5 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>💵</span>
                <span>Concept 5 : Prendre une Fraction d'une Somme en Franc CFA</span>
              </h4>
              <p className="text-xs text-slate-300">
                Prendre 3/5 de 40 000 F CFA : divise d'abord par 5, puis multiplie par 3 !
              </p>

              <StandingMathRenderer
                expression={`Part = ${c3BudgetTotal} F × (3/5) | = (${c3BudgetTotal} ÷ 5) × 3 | = ${c3BudgetTotal / 5} × 3 | = ${(c3BudgetTotal / 5) * 3} F CFA`}
                subResult={`Valeur d'1 part : ${c3BudgetTotal / 5} F CFA`}
                title="Partage de Budget Debout"
                showColumnOp={true}
              />
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------- */}
      {/* CHAPITRE 4 : PROPORTIONNALITÉ & POURCENTAGES                   */}
      {/* -------------------------------------------------------------- */}
      {selectedChapIdx === 3 && (
        <div className="space-y-4">
          {/* Concept 4.1 : Tableau & coefficient k */}
          {selectedConceptIdx === 1 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>📊</span>
                <span>Concept 1 : Tableau de Proportionnalité & Coefficient Multiplicateur k</span>
              </h4>
              <p className="text-xs text-slate-300">
                Le prix au kilo au marché Mont-Bouët est constant : Prix = Masse × k !
              </p>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-[11px] text-slate-400 font-bold block">Prix d'un kilo k : {c4KgPrice} F CFA/kg</label>
                <input
                  type="range"
                  min="500"
                  max="3000"
                  step="100"
                  value={c4KgPrice}
                  onChange={(e) => setC4KgPrice(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />

                <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono font-bold pt-2">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">1 kg ➔ {c4KgPrice * 1} F</div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">2 kg ➔ {c4KgPrice * 2} F</div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">5 kg ➔ {c4KgPrice * 5} F</div>
                  <div className="p-2 rounded-xl bg-amber-400 text-slate-950 border border-amber-300 font-black">10 kg ➔ {c4KgPrice * 10} F</div>
                </div>
              </div>

              <StandingMathRenderer
                expression={`Coefficient k = ${c4KgPrice} F CFA/kg | Pour 7 kg : Prix = 7 × ${c4KgPrice} | = ${7 * c4KgPrice} F CFA`}
                title="Calcul Proportionnel Debout"
                showColumnOp={true}
              />
            </div>
          )}

          {/* Concept 4.2 : Produit en croix */}
          {selectedConceptIdx === 2 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>❌</span>
                <span>Concept 2 : Le Super Produit en Croix (Règle de Trois)</span>
              </h4>
              <p className="text-xs text-slate-300">
                Multiplie les deux nombres sur la diagonale complète, puis divise par le troisième !
              </p>

              <div className="grid sm:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1">Articles connus : {c4CrossA}</label>
                  <input
                    type="range"
                    min="2"
                    max="6"
                    value={c4CrossA}
                    onChange={(e) => setC4CrossA(Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1">Prix connu : {c4CrossB} F</label>
                  <input
                    type="range"
                    min="500"
                    max="3000"
                    step="100"
                    value={c4CrossB}
                    onChange={(e) => setC4CrossB(Number(e.target.value))}
                    className="w-full accent-sky-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-emerald-400 font-bold block mb-1">Articles voulus : {c4CrossC}</label>
                  <input
                    type="range"
                    min="4"
                    max="15"
                    value={c4CrossC}
                    onChange={(e) => setC4CrossC(Number(e.target.value))}
                    className="w-full accent-emerald-400"
                  />
                </div>
              </div>

              <StandingMathRenderer
                expression={`x = (${c4CrossC} × ${c4CrossB}) / ${c4CrossA} | = ${c4CrossC * c4CrossB} / ${c4CrossA} | = ${Math.round((c4CrossC * c4CrossB) / c4CrossA)} F CFA`}
                subResult={`Produit de la diagonale : ${c4CrossC} × ${c4CrossB} = ${c4CrossC * c4CrossB}`}
                title="Produit en Croix Debout"
                showColumnOp={false}
              />
            </div>
          )}

          {/* Concept 4.3 : Calculateur de remise */}
          {selectedConceptIdx === 3 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>🏷️</span>
                <span>Concept 3 : Calculateur de Soldes et Remises en %</span>
              </h4>
              <p className="text-xs text-slate-300">
                Calcule la remise en F CFA puis soustrais-la du prix initial !
              </p>

              <div className="grid sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1">Prix initial : {c4DiscountPrice} F CFA</label>
                  <input
                    type="range"
                    min="5000"
                    max="50000"
                    step="1000"
                    value={c4DiscountPrice}
                    onChange={(e) => setC4DiscountPrice(Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-emerald-400 font-bold block mb-1">Pourcentage de remise : {c4DiscountPct} %</label>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={c4DiscountPct}
                    onChange={(e) => setC4DiscountPct(Number(e.target.value))}
                    className="w-full accent-emerald-400"
                  />
                </div>
              </div>

              {(() => {
                const rem = (c4DiscountPrice * c4DiscountPct) / 100;
                return (
                  <StandingMathRenderer
                    expression={`Remise = (${c4DiscountPrice} × ${c4DiscountPct}) / 100 | = ${c4DiscountPrice * c4DiscountPct} / 100 | = ${rem} F CFA | Prix Payé = ${c4DiscountPrice} - ${rem} | = ${c4DiscountPrice - rem} F CFA`}
                    subResult={`Économie réalisée : ${rem} F CFA`}
                    title="Calcul de Remise Posé Debout"
                    showColumnOp={true}
                  />
                );
              })()}
            </div>
          )}

          {/* Concept 4.4 : TVA & Augmentation */}
          {selectedConceptIdx === 4 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>📈</span>
                <span>Concept 4 : TVA & Augmentations de Prix (Taux en %)</span>
              </h4>
              <p className="text-xs text-slate-300">
                Au Gabon, la TVA standard est de 18% sur les produits commerciaux !
              </p>

              {(() => {
                const tva = (c4TaxPrice * c4TaxPct) / 100;
                return (
                  <StandingMathRenderer
                    expression={`Montant TVA = (${c4TaxPrice} × ${c4TaxPct}) / 100 | = ${c4TaxPrice * c4TaxPct} / 100 | = ${tva} F CFA | Prix TTC = ${c4TaxPrice} + ${tva} | = ${c4TaxPrice + tva} F CFA`}
                    subResult={`Taxe ajoutée : ${tva} F CFA`}
                    title="Calcul de Hausse Debout"
                    showColumnOp={true}
                  />
                );
              })()}
            </div>
          )}

          {/* Concept 4.5 : Échelle de carte */}
          {selectedConceptIdx === 5 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>🗺️</span>
                <span>Concept 5 : Échelle d'une Carte du Gabon (1 / 1 000 000)</span>
              </h4>
              <p className="text-xs text-slate-300">
                1 cm sur la carte représente 1 000 000 cm dans la réalité, soit exactement 10 km !
              </p>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-[11px] text-slate-400 font-bold block">Distance mesurée à la règle sur la carte : {c4MapCm} cm</label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={c4MapCm}
                  onChange={(e) => setC4MapCm(Number(e.target.value))}
                  className="w-full accent-sky-400"
                />
              </div>

              <StandingMathRenderer
                expression={`Distance Réelle = ${c4MapCm} cm × 1 000 000 | = ${c4MapCm * 1000000} cm | = ${(c4MapCm * 1000000) / 100} m | = ${(c4MapCm * 1000000) / 100000} km`}
                subResult={`1 cm ➔ 10 km | ${c4MapCm} cm ➔ ${c4MapCm * 10} km`}
                title="Conversion d'Échelle Debout"
                showColumnOp={false}
              />
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------- */}
      {/* CHAPITRE 5 : TRIANGLES & ANGLES                                */}
      {/* -------------------------------------------------------------- */}
      {selectedChapIdx === 4 && (
        <div className="space-y-4">
          {/* Concept 5.1 : Somme des angles = 180° */}
          {selectedConceptIdx === 1 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>📐</span>
                <span>Concept 1 : Somme des Angles d'un Triangle = Toujours 180°</span>
              </h4>
              <p className="text-xs text-slate-300">
                Modifie l'Angle A et l'Angle B, le 3ème angle s'ajuste automatiquement pour faire 180° pile !
              </p>

              <div className="grid sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <label className="text-[11px] text-amber-300 font-bold block mb-1">Angle Â : {c5AngleA}°</label>
                  <input
                    type="range"
                    min="10"
                    max="140"
                    value={c5AngleA}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val + c5AngleB < 179) setC5AngleA(val);
                    }}
                    className="w-full accent-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-sky-300 font-bold block mb-1">Angle B̂ : {c5AngleB}°</label>
                  <input
                    type="range"
                    min="10"
                    max="140"
                    value={c5AngleB}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val + c5AngleA < 179) setC5AngleB(val);
                    }}
                    className="w-full accent-sky-400"
                  />
                </div>
              </div>

              <StandingMathRenderer
                expression={`Ĉ = 180° - (Â + B̂) | = 180° - (${c5AngleA}° + ${c5AngleB}°) | = 180° - ${c5AngleA + c5AngleB}° | = ${c5AngleC}°`}
                subResult={`Somme : ${c5AngleA}° + ${c5AngleB}° + ${c5AngleC}° = 180°`}
                title="Calcul de l'Angle Manquant Posé Debout"
                showColumnOp={true}
              />
            </div>
          )}

          {/* Concept 5.2 : Inégalité triangulaire */}
          {selectedConceptIdx === 2 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>📏</span>
                <span>Concept 2 : Inégalité Triangulaire (Le triangle peut-il se fermer ?)</span>
              </h4>
              <p className="text-xs text-slate-300">
                Règle : Le plus grand côté doit être strictement inférieur à la somme des deux autres côtés !
              </p>

              <div className="grid sm:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1">Côté a : {c5SideA} cm</label>
                  <input
                    type="range"
                    min="2"
                    max="12"
                    value={c5SideA}
                    onChange={(e) => setC5SideA(Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1">Côté b : {c5SideB} cm</label>
                  <input
                    type="range"
                    min="2"
                    max="12"
                    value={c5SideB}
                    onChange={(e) => setC5SideB(Number(e.target.value))}
                    className="w-full accent-sky-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-emerald-400 font-bold block mb-1">Grand côté c : {c5SideC} cm</label>
                  <input
                    type="range"
                    min="2"
                    max="20"
                    value={c5SideC}
                    onChange={(e) => setC5SideC(Number(e.target.value))}
                    className="w-full accent-emerald-400"
                  />
                </div>
              </div>

              {(() => {
                const sum = c5SideA + c5SideB;
                const isValid = c5SideC < sum;
                return (
                  <StandingMathRenderer
                    expression={`Test : ${c5SideC} < ${c5SideA} + ${c5SideB} | Somme des petits côtés = ${sum} cm | Comparaison : ${c5SideC} ${isValid ? '<' : '≥'} ${sum} | Statut : ${isValid ? 'TRIANGLE CONSTRUCTIBLE' : 'IMPOSSIBLE À TRACER'}`}
                    subResult={isValid ? '✓ Le compas se referme !' : '✗ Les arcs ne se coupent pas'}
                    title="Vérification Géométrique Debout"
                    showColumnOp={false}
                  />
                );
              })()}
            </div>
          )}

          {/* Concept 5.3 : Triangle rectangle */}
          {selectedConceptIdx === 3 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>📐</span>
                <span>Concept 3 : Le Triangle Rectangle & Angles Aigus Complémentaires</span>
              </h4>
              <p className="text-xs text-slate-300">
                L'angle droit vaut 90°. Les deux autres angles font 90° ensemble : Â + B̂ = 90° !
              </p>

              <StandingMathRenderer
                expression="Â = 90° | B̂ = 40° | Ĉ = 90° - 40° | Ĉ = 50°"
                subResult="40° + 50° = 90° (Angles complémentaires)"
                title="Angles du Triangle Rectangle Debout"
                showColumnOp={true}
              />
            </div>
          )}

          {/* Concept 5.4 : Triangle isocèle */}
          {selectedConceptIdx === 4 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>⛺</span>
                <span>Concept 4 : Triangle Isocèle (2 Côtés Égaux & 2 Angles à la Base Égaux)</span>
              </h4>
              <p className="text-xs text-slate-300">
                Dans un triangle isocèle en A, l'angle au sommet vaut 180° - 2 × (angle à la base) !
              </p>

              <StandingMathRenderer
                expression="Base = 55° chacune | Somme base = 55° + 55° | = 110° | Sommet = 180° - 110° | = 70°"
                subResult="Angles à la base jumeaux = 55°"
                title="Calcul du Sommet Isocèle Debout"
                showColumnOp={true}
              />
            </div>
          )}

          {/* Concept 5.5 : Triangle équilatéral */}
          {selectedConceptIdx === 5 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>🔺</span>
                <span>Concept 5 : Triangle Équilatéral (3 Côtés Égaux & 3 Angles de 60°)</span>
              </h4>
              <p className="text-xs text-slate-300">
                180° divisé par 3 = exactement 60° pour chaque angle !
              </p>

              <StandingMathRenderer
                expression="Chaque angle = 180° ÷ 3 | = 60° | Périmètre = 3 × 6 cm | = 18 cm"
                subResult="Symétrie parfaite : 3 angles de 60°"
                title="Triangle Équilatéral Debout"
                showColumnOp={false}
              />
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------- */}
      {/* CHAPITRE 6 : PÉRIMÈTRES & AIRES                                */}
      {/* -------------------------------------------------------------- */}
      {selectedChapIdx === 5 && (
        <div className="space-y-4">
          {/* Concept 6.1 : Aire du triangle */}
          {selectedConceptIdx === 1 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>🔺</span>
                <span>Concept 1 : Aire du Triangle = (Base × Hauteur) ÷ 2</span>
              </h4>
              <p className="text-xs text-slate-300">
                Pourquoi diviser par 2 ? Parce qu'un triangle est la moitié exacte d'un rectangle !
              </p>

              <div className="grid sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <label className="text-[11px] text-amber-300 font-bold block mb-1">Base b : {c6TriBase} cm</label>
                  <input
                    type="range"
                    min="4"
                    max="16"
                    value={c6TriBase}
                    onChange={(e) => setC6TriBase(Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-sky-300 font-bold block mb-1">Hauteur h : {c6TriHeight} cm</label>
                  <input
                    type="range"
                    min="3"
                    max="12"
                    value={c6TriHeight}
                    onChange={(e) => setC6TriHeight(Number(e.target.value))}
                    className="w-full accent-sky-400"
                  />
                </div>
              </div>

              <StandingMathRenderer
                expression={`Aire = (${c6TriBase} × ${c6TriHeight}) / 2 | = ${c6TriBase * c6TriHeight} / 2 | = ${(c6TriBase * c6TriHeight) / 2} cm²`}
                subResult={`Aire du rectangle entier : ${c6TriBase * c6TriHeight} cm²`}
                title="Calcul de l'Aire du Triangle Posé Debout"
                showColumnOp={false}
              />
            </div>
          )}

          {/* Concept 6.2 : Aire parallélogramme */}
          {selectedConceptIdx === 2 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>▱</span>
                <span>Concept 2 : Aire du Parallélogramme = Base × Hauteur</span>
              </h4>
              <p className="text-xs text-slate-300">
                En coupant le triangle incliné d'un côté pour le coller de l'autre, on obtient un rectangle parfait !
              </p>

              <StandingMathRenderer
                expression="Aire = Base × Hauteur | = 9 cm × 4 cm | = 36 cm²"
                subResult="Ne confonds pas la hauteur avec le côté oblique !"
                title="Aire du Parallélogramme Debout"
                showColumnOp={true}
              />
            </div>
          )}

          {/* Concept 6.3 : Terrain rectangulaire */}
          {selectedConceptIdx === 3 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>🏡</span>
                <span>Concept 3 : Périmètre et Aire d'un Terrain Rectangulaire au Gabon</span>
              </h4>
              <p className="text-xs text-slate-300">
                Le périmètre sert pour la clôture (en mètres) et l'aire pour la surface (en m²) !
              </p>

              <div className="grid sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1">Longueur L : {c6RecL} m</label>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="5"
                    value={c6RecL}
                    onChange={(e) => setC6RecL(Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1">Largeur l : {c6Recl} m</label>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="5"
                    value={c6Recl}
                    onChange={(e) => setC6Recl(Number(e.target.value))}
                    className="w-full accent-sky-400"
                  />
                </div>
              </div>

              <StandingMathRenderer
                expression={`Périmètre = 2 × (${c6RecL} + ${c6Recl}) | = 2 × ${c6RecL + c6Recl} | = ${2 * (c6RecL + c6Recl)} m | Aire = ${c6RecL} × ${c6Recl} | = ${c6RecL * c6Recl} m²`}
                subResult={`Demi-périmètre : ${c6RecL + c6Recl} m`}
                title="Périmètre & Aire du Terrain Posés Debout"
                showColumnOp={true}
              />
            </div>
          )}

          {/* Concept 6.4 : Périmètre du cercle */}
          {selectedConceptIdx === 4 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>⭕</span>
                <span>Concept 4 : Périmètre du Cercle (La Roue qui Roule 2 × π × R)</span>
              </h4>
              <p className="text-xs text-slate-300">
                Périmètre = 2 × π × Rayon = π × Diamètre (avec π ≈ 3,14) !
              </p>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-[11px] text-slate-400 font-bold block">Rayon du cercle R : {c6CircleR} cm</label>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="1"
                  value={c6CircleR}
                  onChange={(e) => setC6CircleR(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>

              <StandingMathRenderer
                expression={`Périmètre = 2 × π × ${c6CircleR} | ≈ 2 × 3,14 × ${c6CircleR} | = ${2 * c6CircleR} × 3,14 | = ${(2 * 3.14 * c6CircleR).toFixed(2)} cm`}
                subResult={`Diamètre : ${c6CircleR * 2} cm`}
                title="Périmètre Circulaire Debout"
                showColumnOp={false}
              />
            </div>
          )}

          {/* Concept 6.5 : Aire du disque */}
          {selectedConceptIdx === 5 && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>🎯</span>
                <span>Concept 5 : Aire du Disque = π × R² (Au Stade d'Angondjé)</span>
              </h4>
              <p className="text-xs text-slate-300">
                Attention : R² signifie R × R (rayon au carré) et non 2 × R !
              </p>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-[11px] text-slate-400 font-bold block">Rayon R : {c6DiscR} m</label>
                <input
                  type="range"
                  min="2"
                  max="15"
                  step="1"
                  value={c6DiscR}
                  onChange={(e) => setC6DiscR(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>

              <StandingMathRenderer
                expression={`Aire = π × (${c6DiscR})² | = π × (${c6DiscR} × ${c6DiscR}) | = π × ${c6DiscR * c6DiscR} | ≈ 3,14 × ${c6DiscR * c6DiscR} | = ${(3.14 * c6DiscR * c6DiscR).toFixed(2)} m²`}
                subResult={`Rayon au carré : ${c6DiscR}² = ${c6DiscR * c6DiscR}`}
                title="Aire du Disque Posée Debout"
                showColumnOp={false}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
