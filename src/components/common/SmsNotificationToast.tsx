import React from 'react';
import { MessageSquare, X, CheckCheck, Smartphone, ArrowRight, Share2, Phone, Bell } from 'lucide-react';
import { useSms } from '../../context/SmsContext';

export const SmsNotificationToast: React.FC = () => {
  const { activeToast, dismissToast, openInbox, pushPermission, requestPushPermission } = useSms();

  if (!activeToast) return null;

  const cleanPhone = activeToast.recipientPhone.replace(/[^\d+]/g, '');
  const encodedText = encodeURIComponent(activeToast.message);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      navigator.share({
        title: activeToast.title,
        text: activeToast.message,
      }).catch(() => {});
    }
  };

  return (
    <div className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none animate-in fade-in slide-in-from-top-6 duration-300">
      <div className="pointer-events-auto w-full max-w-lg bg-[#141416]/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-[#C5A880]/50 p-4 overflow-hidden relative group">
        
        {/* Top Header metadata */}
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#C5A880] text-[#141416] flex items-center justify-center font-bold text-xs shadow-xs">
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider">
              <span className="text-[#C5A880] uppercase">MESSAGES</span>
              <span className="text-white/40">·</span>
              <span className="text-white uppercase font-bold">BOULEVARD</span>
              <span className="text-white/40">·</span>
              <span className="text-stone-400 font-normal">Just now</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-stone-300">
              {activeToast.recipientPhone}
            </span>
            <button
              onClick={dismissToast}
              className="p-1 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              aria-label="Dismiss SMS notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Body */}
        <div className="pt-3 pb-2">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-[#E5D7C2] flex items-center gap-1.5">
                  <span>{activeToast.title}</span>
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-mono text-emerald-400">
                    <CheckCheck className="w-3 h-3" /> Delivered
                  </span>
                </p>
                {activeToast.provider && activeToast.provider !== 'simulated' && (
                  <span className="text-[9px] font-mono uppercase bg-[#C5A880]/20 text-[#E5D7C2] px-1.5 py-0.5 rounded">
                    Via {activeToast.provider} Gateway
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-200 leading-relaxed font-sans font-light">
                {activeToast.message}
              </p>
            </div>
          </div>
        </div>

        {/* Immediate Delivery Actions (Direct SMS, WhatsApp, Share) */}
        <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            {/* 1-Tap Open in Mobile SMS / Messages app */}
            <a
              href={`sms:${cleanPhone}?body=${encodedText}`}
              className="text-[11px] font-semibold bg-[#C5A880] hover:bg-[#D5B890] text-[#121214] px-2.5 py-1 rounded flex items-center gap-1 transition-colors shadow-xs"
              title="Open directly in your phone's Messages app"
            >
              <Smartphone className="w-3 h-3" />
              <span>Open in Phone SMS App</span>
            </a>

            {/* WhatsApp option */}
            <a
              href={`https://wa.me/${cleanPhone.replace(/^\+/, '')}?text=${encodedText}`}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] font-semibold bg-emerald-800/80 hover:bg-emerald-700 text-white px-2 py-1 rounded flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>

            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                type="button"
                onClick={handleShare}
                className="text-[11px] text-stone-300 hover:text-white px-1.5 py-1 rounded hover:bg-white/10 flex items-center gap-1 transition-colors"
                title="Share SMS message"
              >
                <Share2 className="w-3 h-3" />
              </button>
            )}
          </div>

          <button
            onClick={() => {
              dismissToast();
              openInbox();
            }}
            className="text-[11px] font-semibold text-[#C5A880] hover:text-white flex items-center gap-1 transition-colors ml-auto"
          >
            <span>SMS Inbox</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Push alert prompt if not enabled */}
        {pushPermission !== 'granted' && (
          <div className="mt-2 pt-1.5 border-t border-white/5 flex items-center justify-between text-[10px] text-stone-400">
            <span className="flex items-center gap-1">
              <Bell className="w-3 h-3 text-[#C5A880]" />
              <span>Want real OS desktop/phone alerts?</span>
            </span>
            <button
              onClick={requestPushPermission}
              className="text-[#C5A880] hover:underline font-bold"
            >
              Enable Native Alerts
            </button>
          </div>
        )}

        {/* Animated Timeout Progress Bar */}
        <div className="absolute bottom-0 inset-x-0 h-0.5 bg-white/10">
          <div className="h-full bg-[#C5A880] transition-all duration-[8000ms] ease-linear w-0 group-hover:w-full" />
        </div>
      </div>
    </div>
  );
};
