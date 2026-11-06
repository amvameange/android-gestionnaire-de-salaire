import React from 'react';
import { Chapter, DomainId } from '../types/math';
import { DOMAINS } from '../data/curriculumData';
import { BookOpen, CheckCircle2 } from 'lucide-react';

interface ChapterListSelectorProps {
  chapters: Chapter[];
  selectedChapterId: string;
  onSelectChapter: (id: string) => void;
  selectedDomain: DomainId | 'all';
  onSelectDomain: (domain: DomainId | 'all') => void;
}

export const ChapterListSelector: React.FC<ChapterListSelectorProps> = ({
  chapters,
  selectedChapterId,
  onSelectChapter,
  selectedDomain,
  onSelectDomain,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredChapters = chapters.filter((c) => {
    const matchesDomain = selectedDomain === 'all' || c.domainId === selectedDomain;
    const matchesQuery =
      !searchQuery.trim() ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesQuery;
  });

  return (
    <div className="space-y-3">
      {/* Search & Domain Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between">
        <input
          type="text"
          placeholder="Rechercher une notion (ex: fractions, relatifs, angles, aires...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-1.5 text-xs text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none flex-1 max-w-md"
        />
      </div>
      {/* Domain Filter Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => onSelectDomain('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
            selectedDomain === 'all'
              ? 'bg-white text-slate-950 font-bold shadow'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Tous les domaines ({chapters.length})
        </button>

        {DOMAINS.map((dom) => (
          <button
            key={dom.id}
            onClick={() => onSelectDomain(dom.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedDomain === dom.id
                ? 'bg-sky-500 text-slate-950 font-bold shadow'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {dom.shortTitle}
          </button>
        ))}
      </div>

      {/* Chapters Grid / List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {filteredChapters.map((chap) => {
          const isSelected = chap.id === selectedChapterId;
          const domain = DOMAINS.find((d) => d.id === chap.domainId);

          return (
            <button
              key={chap.id}
              onClick={() => onSelectChapter(chap.id)}
              className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                isSelected
                  ? 'bg-slate-800/95 border-amber-400 ring-2 ring-amber-400/40 shadow-xl scale-[1.01]'
                  : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800/70 hover:border-slate-700'
              }`}
            >
              {/* Subtle youth gradient glow */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${chap.themeGradient} opacity-15 rounded-full blur-xl pointer-events-none transition-opacity group-hover:opacity-30`}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="font-extrabold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
                    {chap.badge}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-900/50">
                    {chap.exercises.length} exercices
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1 group-hover:text-amber-200 transition-colors">
                  {chap.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                  {chap.shortDesc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 relative z-10">
                <span className="font-medium">{domain?.shortTitle}</span>
                <span className="text-amber-300 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Étudier</span>
                  <span>➔</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
