import React, { useState } from 'react';
import { MathHeader, MainViewTab } from './components/MathHeader';
import { ChapterListSelector } from './components/ChapterListSelector';
import { LessonChapterView } from './components/LessonChapterView';
import { InfiniteExerciseGenerator } from './components/InfiniteExerciseGenerator';
import { MathVisualizers } from './components/MathVisualizers';
import { MemoSheetModal } from './components/MemoSheetModal';
import { CHAPTERS, DOMAINS } from './data/curriculumData';
import { DomainId } from './types/math';
import { BookOpen, Sparkles, Compass, CheckCircle2, Award } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<MainViewTab>('cours');
  const [selectedDomain, setSelectedDomain] = useState<DomainId | 'all'>('all');
  const [selectedChapterId, setSelectedChapterId] = useState<string>(CHAPTERS[0].id);
  const [isMemoOpen, setIsMemoOpen] = useState<boolean>(false);

  const selectedChapterIndex = CHAPTERS.findIndex((c) => c.id === selectedChapterId);
  const currentChapter = CHAPTERS[selectedChapterIndex] || CHAPTERS[0];

  const handleNextChapter = () => {
    if (selectedChapterIndex < CHAPTERS.length - 1) {
      setSelectedChapterId(CHAPTERS[selectedChapterIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevChapter = () => {
    if (selectedChapterIndex > 0) {
      setSelectedChapterId(CHAPTERS[selectedChapterIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* Main Top Header */}
      <MathHeader
        currentTab={currentTab}
        onChangeTab={setCurrentTab}
        onOpenMemo={() => setIsMemoOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 space-y-6">
        {/* VIEW 1 : COURS & EXERCICES D'APPLICATION CORRIGÉS */}
        {currentTab === 'cours' && (
          <div className="space-y-6">
            {/* Chapter Selector & Categories */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg sm:text-xl font-extrabold text-white">
                      Programme Officiel de Mathématiques 5ème Gabon
                    </h1>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                      Collection CIAM
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    120 exercices d’application corrigés pas à pas, astuces de Koko et calculs pratiques en Franc CFA
                  </p>
                </div>
              </div>

              <ChapterListSelector
                chapters={CHAPTERS}
                selectedChapterId={selectedChapterId}
                onSelectChapter={setSelectedChapterId}
                selectedDomain={selectedDomain}
                onSelectDomain={setSelectedDomain}
              />
            </div>

            {/* Selected Chapter View with Exercises & Step by Step Corrections */}
            <LessonChapterView
              chapter={currentChapter}
              onNextChapter={
                selectedChapterIndex < CHAPTERS.length - 1
                  ? handleNextChapter
                  : undefined
              }
              onPrevChapter={
                selectedChapterIndex > 0 ? handlePrevChapter : undefined
              }
            />
          </div>
        )}

        {/* VIEW 2 : GÉNÉRATEUR DES EXERCICES INFINI AVEC CORRECTION PAS À PAS */}
        {currentTab === 'generateur' && <InfiniteExerciseGenerator />}

        {/* VIEW 3 : LABORATOIRE VISUEL & SIMULATEURS MATHÉMATIQUES */}
        {currentTab === 'simulateurs' && <MathVisualizers />}
      </main>

      {/* Revision Memo Modal */}
      <MemoSheetModal isOpen={isMemoOpen} onClose={() => setIsMemoOpen(false)} />

      {/* Quiet Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-4 text-center text-xs text-slate-500">
        Maths 5ème Gabon · Conforme au programme officiel CIAM (Collège cycle 4) · Monnaie officielle : Franc CFA
      </footer>
    </div>
  );
}
