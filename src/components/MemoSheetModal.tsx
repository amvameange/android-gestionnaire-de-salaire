import React, { useState } from 'react';
import { X, Sparkles, Printer, BookOpen, Check, ArrowDown, FileText, CheckCircle2 } from 'lucide-react';
import { CHAPTERS } from '../data/curriculumData';
import { StandingMathRenderer } from './StandingMathRenderer';

interface MemoSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MemoSheetModal: React.FC<MemoSheetModalProps> = ({ isOpen, onClose }) => {
  const [selectedChapId, setSelectedChapId] = useState<string>('all');

  if (!isOpen) return null;

  const activeChapters = selectedChapId === 'all'
    ? CHAPTERS
    : CHAPTERS.filter((c) => c.id === selectedChapId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-400 text-slate-950 font-black shadow-md">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                <span>Fiches Mémos & Formules Verticales (5ème Gabon CIAM)</span>
                <span className="text-xs bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full border border-amber-800 font-bold hidden sm:inline">
                  🇬🇦 6 Chapitres
                </span>
              </h3>
              <div className="text-[11px] text-slate-400">
                Formules rédigées ligne par ligne en colonne pour réussir ses devoirs surveillés
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition cursor-pointer flex items-center gap-1.5 shadow"
              title="Imprimer toutes les fiches"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Imprimer</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chapter Selection Pills */}
        <div className="px-5 py-2.5 border-b border-slate-800/80 bg-slate-950/50 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setSelectedChapId('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              selectedChapId === 'all'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Tous les chapitres (6)
          </button>
          {CHAPTERS.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setSelectedChapId(ch.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedChapId === ch.id
                  ? 'bg-sky-400 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {ch.badge.replace(' · 5ème Gabon', '')}
            </button>
          ))}
        </div>

        {/* Scrollable Content with Vertical Formulas */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs">
          {activeChapters.map((ch) => {
            const memo = ch.memoSheet;
            return (
              <div
                key={ch.id}
                className="rounded-3xl bg-slate-950/90 border-2 border-slate-800 p-5 space-y-4 shadow-xl"
              >
                {/* Chapter Banner */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-800/80">
                        {ch.badge}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        Collection CIAM
                      </span>
                    </div>
                    <h4 className="text-base font-black text-white mt-1">
                      {ch.title}
                    </h4>
                  </div>
                  <div className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/80">
                    ⭐ Fiche Mémo Contrôle
                  </div>
                </div>

                {/* Vertical Formulas Grid */}
                {memo?.verticalFormulas && memo.verticalFormulas.length > 0 && (
                  <div className="space-y-3">
                    <div className="text-[11px] font-black text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                      <ArrowDown className="w-3.5 h-3.5 text-amber-400" />
                      <span>Formules en Colonne Verticale (À retenir par cœur) :</span>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {memo.verticalFormulas.map((vf, vIdx) => (
                        <div
                          key={vIdx}
                          className="rounded-2xl bg-slate-900 border border-slate-800 p-3.5 space-y-2.5 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between text-xs font-bold text-white mb-1.5">
                              <span className="flex items-center gap-1.5 truncate">
                                <span>{vf.badge || '📐'}</span>
                                <span className="truncate">{vf.name}</span>
                              </span>
                            </div>

                            {/* Standing Math Renderer (Debout & Non Couché) */}
                            <StandingMathRenderer
                              expression={vf.steps.join('\n')}
                              subResult={vf.resultHighlight}
                              title={`Debout : ${vf.name}`}
                              showColumnOp={false}
                            />
                          </div>

                          {vf.tip && (
                            <div className="text-[11px] text-amber-300/90 italic pt-1 border-t border-slate-800">
                              💡 {vf.tip}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Koko Tip and Pitfall */}
                {memo && (
                  <div className="grid sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-[11px] text-amber-200">
                      <strong>🐆 L’astuce de Koko :</strong> {memo.kokoTip}
                    </div>
                    <div className="p-3 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-[11px] text-rose-200">
                      <strong>⚠️ Piège à éviter :</strong> {memo.pitfallToAvoid}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="text-[11px] text-slate-400 flex items-center gap-2">
            <span>🇬🇦 Conforme au programme officiel CIAM 5ème</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold">Monnaie : Franc CFA</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition cursor-pointer shadow"
          >
            Fermer les fiches mémos
          </button>
        </div>
      </div>
    </div>
  );
};
