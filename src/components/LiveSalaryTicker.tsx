import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Play,
  Pause,
  Square,
  Plus,
  Zap,
  TrendingUp,
  Clock,
  Sparkles,
  Award,
  Coffee,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatMoney, formatLiveMoney, formatDuration } from '../utils/formatters';
import { CurrencyCode, ActiveWorkSession, SalaryProfile } from '../types';
import { playCashChime } from '../utils/audioAlarms';

interface LiveSalaryTickerProps {
  profile: SalaryProfile;
  session: ActiveWorkSession;
  dailyRate: number;
  hourlyRate: number;
  secondRate: number;
  onStartSession: () => void;
  onPauseSession: () => void;
  onResumeSession: () => void;
  onStopSession: () => void;
  onAddOvertime: (minutes: number) => void;
}

export const LiveSalaryTicker: React.FC<LiveSalaryTickerProps> = ({
  profile,
  session,
  dailyRate,
  hourlyRate,
  secondRate,
  onStartSession,
  onPauseSession,
  onResumeSession,
  onStopSession,
  onAddOvertime,
}) => {
  // Micro-tick for fluid second and sub-second money stream visualization
  const [fluidSeconds, setFluidSeconds] = useState(session.accumulatedSeconds);
  const [simulationSpeed, setSimulationSpeed] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const prevEarnedRef = useRef<number>(0);

  // Keep fluid seconds synced with session
  useEffect(() => {
    setFluidSeconds(session.accumulatedSeconds);
  }, [session.accumulatedSeconds]);

  // High-frequency animation loop when active
  useEffect(() => {
    if (!session.isActive || session.isPaused) return;

    let lastTime = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const deltaSec = ((now - lastTime) / 1000) * simulationSpeed;
      lastTime = now;
      setFluidSeconds((prev) => prev + deltaSec);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [session.isActive, session.isPaused, simulationSpeed]);

  // Real-time calculation of today's live earnings
  const liveEarnedToday = useMemo(() => {
    const regularSeconds = Math.min(fluidSeconds, profile.hoursPerDay * 3600);
    const overtimeSeconds = Math.max(0, fluidSeconds - profile.hoursPerDay * 3600) + (session.overtimeMinutes * 60);

    const regularEarned = regularSeconds * secondRate;
    const overtimeEarned = overtimeSeconds * secondRate * profile.overtimeMultiplier;

    return regularEarned + overtimeEarned;
  }, [fluidSeconds, profile.hoursPerDay, secondRate, session.overtimeMinutes, profile.overtimeMultiplier]);

  // Milestone triggers with confetti
  useEffect(() => {
    if (!session.isActive) return;

    const milestones = [
      { amount: 5, label: 'Café matinal payé ! ☕', id: 'coffee' },
      { amount: 15, label: 'Déjeuner du midi assuré ! 🥪', id: 'lunch' },
      { amount: dailyRate * 0.5, label: '50% de la journée effectuée ! ⚡', id: 'halfday' },
      { amount: dailyRate, label: 'Objectif journalier 100% atteint ! 🎉', id: 'fullday' },
    ];

    const prev = prevEarnedRef.current;
    milestones.forEach((m) => {
      if (prev < m.amount && liveEarnedToday >= m.amount && prev > 0) {
        setToastMessage(m.label);
        if (profile.soundEnabled) playCashChime();
        try {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.8 },
          });
        } catch {}
        setTimeout(() => setToastMessage(null), 4000);
      }
    });

    prevEarnedRef.current = liveEarnedToday;
  }, [liveEarnedToday, dailyRate, profile.soundEnabled, session.isActive]);

  const liveParts = formatLiveMoney(liveEarnedToday, profile.currency);

  const standardDaySeconds = profile.hoursPerDay * 3600;
  const progressPercent = Math.min(100, (fluidSeconds / standardDaySeconds) * 100);

  return (
    <div className="space-y-4 pb-20">
      {/* Toast Notification for Spontaneous Milestones */}
      {toastMessage && (
        <div className="bg-emerald-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-lg flex items-center justify-between text-xs animate-bounce">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-900 hover:text-black font-semibold text-xs ml-2 cursor-pointer"
          >
            Fermer
          </button>
        </div>
      )}

      {/* Hero Live Counter Card (Android Material 3 Elevated Card) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-5 shadow-2xl">
        {/* Glow backdrop */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header row */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold uppercase tracking-wider text-[11px] text-emerald-400">
              Gains Spontanés en Temps Réel
            </span>
          </div>

          {/* Work Status Badge */}
          <div className="text-[11px] font-medium px-2 py-0.5 rounded-full border border-slate-700 bg-slate-800/80 text-slate-300">
            {session.isActive
              ? session.isPaused
                ? 'En Pause ⏸'
                : 'En Session Active 🟢'
              : 'En Attente ⏹'}
          </div>
        </div>

        {/* Live Digits Display */}
        <div className="my-4 text-center">
          <div className="text-slate-400 text-xs font-medium mb-1">
            Revenu généré aujourd&apos;hui
          </div>

          <div className="flex items-baseline justify-center font-mono-numbers tracking-tight">
            <span className="text-4xl sm:text-5xl font-extrabold text-white">
              {liveParts.whole}
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-emerald-400 ml-0.5">
              .{liveParts.cents}
            </span>
            <span className="text-base sm:text-lg text-emerald-400/70 font-semibold ml-0.5">
              {liveParts.micro}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-slate-300 ml-2">
              {liveParts.symbol}
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 mt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1 font-mono-numbers">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              {formatDuration(fluidSeconds)}
            </span>
            <span>·</span>
            <span className="text-emerald-400 font-medium font-mono-numbers">
              +{formatMoney(secondRate * 60, profile.currency, 3)}/min
            </span>
          </div>
        </div>

        {/* Daily Progress Gauge */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-400">Objectif Journée ({profile.hoursPerDay}h)</span>
            <span className="font-semibold text-slate-200 font-mono-numbers">
              {progressPercent.toFixed(0)}% · {formatMoney(dailyRate, profile.currency)}
            </span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Session Action Buttons (Large Touch-Friendly Android Controls) */}
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          {!session.isActive ? (
            <button
              onClick={onStartSession}
              className="col-span-2 min-h-[48px] rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Démarrer ma Journée de Travail</span>
            </button>
          ) : (
            <>
              {session.isPaused ? (
                <button
                  onClick={onResumeSession}
                  className="min-h-[48px] rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Reprendre</span>
                </button>
              ) : (
                <button
                  onClick={onPauseSession}
                  className="min-h-[48px] rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Mettre en Pause</span>
                </button>
              )}

              <button
                onClick={onStopSession}
                className="min-h-[48px] rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-[0.98] text-red-300 border border-red-500/30 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Square className="w-4 h-4" />
                <span>Terminer & Enregistrer</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Quick Add Overtime & Simulator Controls */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-200 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400" />
            Heures Supplémentaires Rapides ({profile.overtimeMultiplier}x)
          </span>
          {session.overtimeMinutes > 0 && (
            <span className="text-amber-400 font-semibold text-[11px] font-mono-numbers">
              +{session.overtimeMinutes} min ajoutées
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onAddOvertime(15)}
            className="min-h-[40px] px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 text-xs font-medium border border-slate-700/60 transition cursor-pointer"
          >
            +15 min
          </button>
          <button
            onClick={() => onAddOvertime(30)}
            className="min-h-[40px] px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 text-xs font-medium border border-slate-700/60 transition cursor-pointer"
          >
            +30 min
          </button>
          <button
            onClick={() => onAddOvertime(60)}
            className="min-h-[40px] px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 text-xs font-medium border border-slate-700/60 transition cursor-pointer"
          >
            +1 heure
          </button>
        </div>

        {/* Spontaneous Speed Accelerator Simulation (allows user to see dynamic live ticks rapidly) */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span className="text-[11px]">Accélérateur démo (simulation) :</span>
          <div className="flex items-center gap-1">
            {[1, 10, 60].map((speed) => (
              <button
                key={speed}
                onClick={() => setSimulationSpeed(speed)}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition cursor-pointer ${
                  simulationSpeed === speed
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {speed === 1 ? '1x (Réel)' : `${speed}x`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Salary Breakdown Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-3.5">
          <div className="text-[11px] text-slate-400 font-medium">Taux Journalier</div>
          <div className="text-lg font-bold text-white mt-1 font-mono-numbers">
            {formatMoney(dailyRate, profile.currency)}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Base mensuelle / {profile.workingDaysPerMonth} jours
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-3.5">
          <div className="text-[11px] text-slate-400 font-medium">Taux Horaire</div>
          <div className="text-lg font-bold text-white mt-1 font-mono-numbers">
            {formatMoney(hourlyRate, profile.currency)}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Pour {profile.hoursPerDay}h par jour
          </div>
        </div>
      </div>

      {/* Daily Milestones Showcase */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4">
        <div className="text-xs font-semibold text-slate-200 mb-3 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-cyan-400" />
          Paliers de Gain Franchis Aujourd&apos;hui
        </div>

        <div className="space-y-2.5">
          {[
            {
              threshold: 5,
              name: 'Café & Viennoiserie',
              cost: formatMoney(5, profile.currency),
              desc: 'Gagné en ~18 minutes',
            },
            {
              threshold: 15,
              name: 'Déjeuner du midi',
              cost: formatMoney(15, profile.currency),
              desc: 'Gagné en ~55 minutes',
            },
            {
              threshold: dailyRate * 0.5,
              name: 'Mi-journée rentabilisée',
              cost: formatMoney(dailyRate * 0.5, profile.currency),
              desc: `${(profile.hoursPerDay / 2).toFixed(1)}h de travail`,
            },
            {
              threshold: dailyRate,
              name: 'Journée entière validée',
              cost: formatMoney(dailyRate, profile.currency),
              desc: `${profile.hoursPerDay}h complètes`,
            },
          ].map((milestone, idx) => {
            const isUnlocked = liveEarnedToday >= milestone.threshold;
            return (
              <div
                key={idx}
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-colors ${
                  isUnlocked
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-200'
                    : 'bg-slate-900/50 border-slate-800/80 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isUnlocked ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-600'
                    }`}
                  >
                    {isUnlocked ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <span className="text-[10px] font-bold">{idx + 1}</span>
                    )}
                  </div>
                  <div>
                    <div
                      className={`text-xs font-medium ${isUnlocked ? 'text-white' : 'text-slate-400'}`}
                    >
                      {milestone.name}
                    </div>
                    <div className="text-[10px] text-slate-500">{milestone.desc}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`text-xs font-semibold font-mono-numbers ${
                      isUnlocked ? 'text-emerald-400' : 'text-slate-500'
                    }`}
                  >
                    {milestone.cost}
                  </div>
                  <div className="text-[9px] uppercase tracking-wider">
                    {isUnlocked ? 'Débloqué' : 'En attente'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
