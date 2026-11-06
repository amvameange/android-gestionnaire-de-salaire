import React, { useState, useEffect } from 'react';
import { Download, Smartphone, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PWAInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if in standalone mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsInstalled(isStandalone);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setDeferredPrompt(null);
    }
  };

  if (isInstalled || isDismissed || !deferredPrompt) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-3 rounded-2xl shadow-xl flex items-center justify-between gap-3 text-xs mb-3 border border-emerald-400/30 animate-fade-in">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-white/20">
          <Smartphone className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="font-bold">Installer sur Android</div>
          <div className="text-[10px] text-emerald-100">
            Accédez à vos gains et alarmes en 1 clic
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleInstallClick}
          className="px-3 py-1.5 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-emerald-50 transition cursor-pointer active:scale-95 shadow"
        >
          Installer
        </button>
        <button
          onClick={() => setIsDismissed(true)}
          className="p-1 text-white/70 hover:text-white cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
