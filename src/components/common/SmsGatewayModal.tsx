import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Send, 
  Smartphone, 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  RefreshCw,
  Phone
} from 'lucide-react';
import { useSms } from '../../context/SmsContext';

export const SmsGatewayModal: React.FC = () => {
  const { 
    isGatewayModalOpen, 
    closeGatewayModal, 
    gatewayConfig, 
    updateGatewayConfig, 
    pushPermission, 
    requestPushPermission, 
    testSendSms,
    lastGatewayStatus
  } = useSms();

  const [provider, setProvider] = useState<'simulated' | 'twilio' | 'arkesel'>(gatewayConfig.provider || 'simulated');
  const [twilioAccountSid, setTwilioAccountSid] = useState(gatewayConfig.twilioAccountSid || '');
  const [twilioAuthToken, setTwilioAuthToken] = useState(gatewayConfig.twilioAuthToken || '');
  const [twilioPhoneNumber, setTwilioPhoneNumber] = useState(gatewayConfig.twilioPhoneNumber || '');
  const [arkeselApiKey, setArkeselApiKey] = useState(gatewayConfig.arkeselApiKey || '');
  const [arkeselSenderId, setArkeselSenderId] = useState(gatewayConfig.arkeselSenderId || 'BOULEVARD');

  const [testPhone, setTestPhone] = useState('+233501234567');
  const [testMessage, setTestMessage] = useState('BOULEVARD: Test delivery to your mobile phone. Your atelier order notifications are active!');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  if (!isGatewayModalOpen) return null;

  const handleSave = () => {
    updateGatewayConfig({
      provider,
      twilioAccountSid,
      twilioAuthToken,
      twilioPhoneNumber,
      arkeselApiKey,
      arkeselSenderId,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleTestDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTesting(true);
    setTestResult(null);

    try {
      // First save current settings
      updateGatewayConfig({
        provider,
        twilioAccountSid,
        twilioAuthToken,
        twilioPhoneNumber,
        arkeselApiKey,
        arkeselSenderId,
      });

      const res = await testSendSms(testPhone, testMessage);
      setTestResult(`Success! Dispatched test SMS to ${testPhone} via ${res.provider || provider}.`);
    } catch (err: any) {
      setTestResult(`Notice: ${err?.message || 'Dispatch completed with fallback'}`);
    } finally {
      setIsTesting(false);
    }
  };

  const handleEnablePush = async () => {
    const granted = await requestPushPermission();
    if (granted) {
      setTestResult('Native push notifications enabled! You will now receive OS desktop/phone system alerts.');
    } else {
      setTestResult('Push notifications were not granted by the browser.');
    }
  };

  const cleanPhoneForDirect = testPhone.replace(/[^\d+]/g, '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#121214] border border-[#2D2D36] text-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#1A1A1F] px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C5A880] text-[#121214] flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base tracking-wide text-white">
                SMS Gateway & Cellular Delivery Setup
              </h3>
              <p className="text-[11px] text-stone-400">
                Configure real telecom carriers (Twilio, Arkesel) or direct device messaging
              </p>
            </div>
          </div>

          <button
            onClick={closeGatewayModal}
            className="p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Explanation Banner: Why Real SMS Requires Gateway */}
          <div className="p-4 rounded-xl bg-[#1C1C24] border border-[#373748] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#E5D7C2]">
              <Smartphone className="w-4 h-4 text-[#C5A880]" />
              <span>How SMS Delivery Works on Boulevard</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Standard web browsers do not contain cellular SIM radios to broadcast over-the-air SMS directly without an SMS gateway. Boulevard provides <strong>three foolproof delivery options</strong>:
            </p>
            <ul className="text-[11px] text-stone-400 space-y-1 list-disc pl-4">
              <li><strong className="text-white">1-Tap Native Device Messages App (sms:):</strong> Instant cellular delivery on any iPhone or Android handset without third-party fees.</li>
              <li><strong className="text-white">Ghana & Global Cellular Gateways (Arkesel / Twilio):</strong> Connect your API keys to broadcast real cellular SMS directly over MTN, Telecel, AirtelTigo, or international carriers.</li>
              <li><strong className="text-white">Atelier Virtual Simulator & Push Alerts:</strong> Real-time audio chime, in-app handset screen, and native operating system notifications.</li>
            </ul>
          </div>

          {/* Device Push Notification Card */}
          <div className="p-4 rounded-xl bg-[#1A1A20] border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Native System Push Notifications</h4>
                <p className="text-[11px] text-stone-400">
                  Status:{' '}
                  <span className={`font-semibold ${pushPermission === 'granted' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {pushPermission === 'granted' ? 'Enabled (Active on your device)' : 'Not granted yet'}
                  </span>
                </p>
              </div>
            </div>

            {pushPermission !== 'granted' && (
              <button
                type="button"
                onClick={handleEnablePush}
                className="px-3.5 py-1.5 bg-[#C5A880] hover:bg-[#D5B890] text-[#121214] text-xs font-bold rounded-lg transition-colors shrink-0"
              >
                Enable Push Alerts
              </button>
            )}
          </div>

          {/* Provider Selection Tabs */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-300 block">
              Choose Outbound SMS Carrier Gateway
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setProvider('simulated')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  provider === 'simulated'
                    ? 'border-[#C5A880] bg-[#C5A880]/10 text-white ring-1 ring-[#C5A880]'
                    : 'border-white/10 bg-[#16161A] text-stone-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">Simulator & Direct</span>
                  {provider === 'simulated' && <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />}
                </div>
                <p className="text-[10px] text-stone-400">
                  Zero setup. Audio, push notification & 1-tap Messages app link.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setProvider('arkesel')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  provider === 'arkesel'
                    ? 'border-[#C5A880] bg-[#C5A880]/10 text-white ring-1 ring-[#C5A880]'
                    : 'border-white/10 bg-[#16161A] text-stone-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">Arkesel (Ghana)</span>
                  {provider === 'arkesel' && <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />}
                </div>
                <p className="text-[10px] text-stone-400">
                  MTN, Telecel, AT cellular SMS via Arkesel Ghana gateway.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setProvider('twilio')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  provider === 'twilio'
                    ? 'border-[#C5A880] bg-[#C5A880]/10 text-white ring-1 ring-[#C5A880]'
                    : 'border-white/10 bg-[#16161A] text-stone-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">Twilio (Global)</span>
                  {provider === 'twilio' && <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />}
                </div>
                <p className="text-[10px] text-stone-400">
                  Cellular telecom SMS delivery worldwide via Twilio API.
                </p>
              </button>
            </div>
          </div>

          {/* Arkesel Form */}
          {provider === 'arkesel' && (
            <div className="p-4 rounded-xl bg-[#16161A] border border-white/10 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#E5D7C2]">Arkesel Ghana API Settings</span>
                <a
                  href="https://arkesel.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] text-[#C5A880] hover:underline flex items-center gap-1"
                >
                  <span>arkesel.com</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-stone-300">Arkesel API Key</label>
                <input
                  type="password"
                  value={arkeselApiKey}
                  onChange={(e) => setArkeselApiKey(e.target.value)}
                  placeholder="e.g. bWFzdGVyX2FwaV9rZXlfeXl5eQ=="
                  className="w-full px-3 py-2 bg-[#0E0E10] border border-stone-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-stone-300">Sender ID (max 11 chars)</label>
                <input
                  type="text"
                  value={arkeselSenderId}
                  onChange={(e) => setArkeselSenderId(e.target.value)}
                  placeholder="BOULEVARD"
                  maxLength={11}
                  className="w-full px-3 py-2 bg-[#0E0E10] border border-stone-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>
          )}

          {/* Twilio Form */}
          {provider === 'twilio' && (
            <div className="p-4 rounded-xl bg-[#16161A] border border-white/10 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#E5D7C2]">Twilio Carrier API Settings</span>
                <a
                  href="https://www.twilio.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] text-[#C5A880] hover:underline flex items-center gap-1"
                >
                  <span>twilio.com</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-stone-300">Account SID</label>
                <input
                  type="text"
                  value={twilioAccountSid}
                  onChange={(e) => setTwilioAccountSid(e.target.value)}
                  placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-3 py-2 bg-[#0E0E10] border border-stone-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-stone-300">Auth Token</label>
                <input
                  type="password"
                  value={twilioAuthToken}
                  onChange={(e) => setTwilioAuthToken(e.target.value)}
                  placeholder="Your Twilio Auth Token"
                  className="w-full px-3 py-2 bg-[#0E0E10] border border-stone-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-stone-300">From Phone Number (or Alphanumeric Sender ID)</label>
                <input
                  type="text"
                  value={twilioPhoneNumber}
                  onChange={(e) => setTwilioPhoneNumber(e.target.value)}
                  placeholder="+1234567890 or BOULEVARD"
                  className="w-full px-3 py-2 bg-[#0E0E10] border border-stone-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2.5 bg-[#C5A880] hover:bg-[#D5B890] text-[#121214] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2"
            >
              <span>{isSaved ? 'Settings Saved!' : 'Save Gateway Configuration'}</span>
              {isSaved && <CheckCircle2 className="w-4 h-4 text-emerald-950" />}
            </button>
            {lastGatewayStatus && (
              <span className="text-[11px] text-stone-400 font-mono italic">
                {lastGatewayStatus}
              </span>
            )}
          </div>

          {/* Live Mobile Test Dispatcher Section */}
          <form onSubmit={handleTestDispatch} className="p-4 rounded-2xl bg-[#0E0E12] border border-[#2B2B36] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                <Send className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Test Live Outbound SMS Dispatch</span>
              </h4>
              <span className="text-[10px] text-stone-500 font-mono">Real-time test</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] text-stone-300">Recipient Phone Number</label>
                <input
                  type="tel"
                  value={testPhone}
                  onChange={(e) => setTestPhone(e.target.value)}
                  placeholder="+233 24 123 4567"
                  className="w-full px-3 py-2 bg-[#1A1A20] border border-stone-700 rounded-lg text-xs text-white font-mono focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-stone-300">Message Text</label>
                <input
                  type="text"
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                  placeholder="Test message..."
                  className="w-full px-3 py-2 bg-[#1A1A20] border border-stone-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="submit"
                disabled={isTesting}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                {isTesting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Dispatching...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Send Test SMS</span>
                  </>
                )}
              </button>

              {/* Direct 1-Tap Open in Messages app */}
              <a
                href={`sms:${cleanPhoneForDirect}?body=${encodeURIComponent(testMessage)}`}
                className="px-4 py-2 bg-[#C5A880]/20 hover:bg-[#C5A880]/30 text-[#E5D7C2] text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 transition-colors"
                title="Opens your device's native Messages app"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Open in Messages App (Direct SMS)</span>
              </a>

              {/* WhatsApp direct link */}
              <a
                href={`https://wa.me/${cleanPhoneForDirect.replace(/^\+/, '')}?text=${encodeURIComponent(testMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-300 text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            {testResult && (
              <p className="text-[11px] text-stone-300 bg-white/5 p-2.5 rounded-lg font-mono border border-white/10">
                {testResult}
              </p>
            )}
          </form>

        </div>

        {/* Footer */}
        <div className="bg-[#1A1A1F] px-6 py-3 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
          <span className="text-[11px]">Boulevard Menswear Atelier SMS Infrastructure</span>
          <button
            onClick={closeGatewayModal}
            className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold rounded transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
