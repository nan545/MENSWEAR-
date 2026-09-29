import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  CheckCheck, 
  Copy, 
  Check, 
  Trash2, 
  ShieldCheck, 
  Phone, 
  Settings,
  Bell,
  ExternalLink 
} from 'lucide-react';
import { useSms } from '../../context/SmsContext';

export const SmsInboxModal: React.FC = () => {
  const { 
    messages, 
    isInboxOpen, 
    closeInbox, 
    clearHistory, 
    openGatewayModal,
    pushPermission,
    requestPushPermission 
  } = useSms();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isInboxOpen) return null;

  const handleCopy = (id: string, text: string) => {
    try {
      navigator.clipboard?.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0F0F11] border border-stone-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
        
        {/* Simulated Phone Top Bezel */}
        <div className="bg-[#18181B] px-6 pt-3 pb-2 flex items-center justify-between text-[11px] text-stone-400 font-mono border-b border-stone-800">
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <div className="w-20 h-4 bg-black rounded-full mx-auto" />
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-emerald-400 font-bold">● LIVE</span>
            <span>5G</span>
          </div>
        </div>

        {/* Sender Header */}
        <div className="bg-[#1E1E24] px-5 py-3 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C5A880] text-[#121214] font-serif font-bold text-lg flex items-center justify-center shadow-sm">
              B
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-serif font-bold text-white text-base tracking-wide">
                  BOULEVARD
                </h3>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-[10px] text-stone-400 font-sans">
                Verified Atelier Business · Telecom SMS Gateway
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                closeInbox();
                openGatewayModal();
              }}
              className="p-2 text-stone-400 hover:text-[#C5A880] rounded-full hover:bg-white/10 transition-colors"
              title="SMS Gateway & Carrier Configuration"
              aria-label="SMS Gateway Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            {messages.length > 0 && (
              <button
                onClick={clearHistory}
                className="p-2 text-stone-400 hover:text-red-400 rounded-full hover:bg-white/10 transition-colors"
                title="Clear SMS log"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={closeInbox}
              className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Device Push Notice Banner */}
        {pushPermission !== 'granted' && (
          <div className="bg-[#C5A880]/10 border-b border-[#C5A880]/20 px-4 py-2 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-stone-300 text-[11px]">
              <Bell className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Enable native system notifications on your device</span>
            </div>
            <button
              onClick={requestPushPermission}
              className="text-[11px] font-bold text-[#C5A880] hover:underline"
            >
              Enable Alerts
            </button>
          </div>
        )}

        {/* SMS Chat Bubbles Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0A0A0C]">
          {messages.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 bg-stone-900 border border-stone-800 rounded-full flex items-center justify-center mx-auto text-stone-500">
                <Smartphone className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-stone-300">
                No SMS Received Yet
              </h4>
              <p className="text-xs text-stone-400 max-w-xs mx-auto leading-relaxed">
                When you place an order on the Checkout page, official SMS updates from BOULEVARD will appear here, and you can open them directly in your phone's Messages app.
              </p>
              <button
                onClick={() => {
                  closeInbox();
                  openGatewayModal();
                }}
                className="mt-2 text-xs font-semibold text-[#C5A880] hover:underline inline-flex items-center gap-1"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Configure Cellular Gateway (Twilio / Arkesel)</span>
              </button>
            </div>
          ) : (
            messages.map((sms) => {
              const cleanPhone = sms.recipientPhone.replace(/[^\d+]/g, '');
              const encodedText = encodeURIComponent(sms.message);

              return (
                <div key={sms.id} className="space-y-1.5">
                  {/* Date separator */}
                  <div className="text-center">
                    <span className="text-[10px] uppercase tracking-wider font-mono text-stone-500 bg-stone-900/60 px-2.5 py-0.5 rounded-full">
                      {new Date(sms.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {new Date(sms.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  {/* SMS Bubble */}
                  <div className="bg-[#1C1C22] border border-[#2D2D36] text-stone-100 rounded-2xl rounded-tl-xs p-4 max-w-[95%] shadow-sm relative group space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-[#C5A880] font-semibold tracking-wider uppercase">
                      <span>{sms.title}</span>
                      <span className="text-stone-400 font-mono font-normal">To: {sms.recipientPhone}</span>
                    </div>

                    <p className="text-xs leading-relaxed text-stone-200 font-sans">
                      {sms.message}
                    </p>

                    {/* Direct Handset Delivery Links (sms: and wa.me) */}
                    <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                      <div className="flex items-center gap-2">
                        {/* 1-Tap native SMS */}
                        <a
                          href={`sms:${cleanPhone}?body=${encodedText}`}
                          className="bg-[#C5A880]/20 hover:bg-[#C5A880]/30 text-[#E5D7C2] px-2.5 py-1 rounded font-medium inline-flex items-center gap-1 transition-colors"
                          title="Open directly in your mobile phone's native Messages app"
                        >
                          <Smartphone className="w-3 h-3" />
                          <span>Open in Phone Messages</span>
                        </a>

                        {/* WhatsApp direct */}
                        <a
                          href={`https://wa.me/${cleanPhone.replace(/^\+/, '')}?text=${encodedText}`}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-300 px-2.5 py-1 rounded font-medium inline-flex items-center gap-1 transition-colors"
                        >
                          <Phone className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-stone-400">
                        <span className="flex items-center gap-1 text-emerald-400 font-medium font-mono">
                          <CheckCheck className="w-3 h-3" />
                          <span>Delivered</span>
                        </span>

                        <button
                          onClick={() => handleCopy(sms.id, sms.message)}
                          className="inline-flex items-center gap-1 text-stone-400 hover:text-white transition-colors"
                        >
                          {copiedId === sms.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Concierge Quick Access */}
        <div className="bg-[#141418] p-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <button
            onClick={() => {
              closeInbox();
              openGatewayModal();
            }}
            className="text-[11px] text-[#C5A880] hover:underline flex items-center gap-1 font-medium"
          >
            <Settings className="w-3 h-3" />
            <span>Cellular Gateway Settings</span>
          </button>

          <a
            href="https://wa.me/233501234567"
            target="_blank"
            rel="noreferrer"
            className="text-[11px] font-semibold text-[#C5A880] hover:underline flex items-center gap-1"
          >
            <Phone className="w-3 h-3" />
            <span>Need Help? Chat Concierge</span>
          </a>
        </div>
      </div>
    </div>
  );
};

