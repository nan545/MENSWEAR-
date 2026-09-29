import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  Printer, 
  ArrowRight, 
  Package, 
  MessageSquare, 
  CheckCheck, 
  Scissors, 
  Truck, 
  Smartphone, 
  Sparkles,
  RefreshCw,
  Settings
} from 'lucide-react';
import { Order } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { useSms } from '../context/SmsContext';

interface OrderConfirmationPageProps {
  order: Order;
  onNavigate: (route: string) => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ order, onNavigate }) => {
  const { formatPrice } = useCurrency();
  const { 
    sendOrderProcessingSms, 
    sendOrderDispatchedSms, 
    messages, 
    openInbox, 
    openGatewayModal,
    pushPermission,
    requestPushPermission 
  } = useSms();

  const [orderStage, setOrderStage] = useState<'confirmed' | 'processing' | 'dispatched'>('confirmed');
  const [hasSentProcessingSms, setHasSentProcessingSms] = useState(false);
  const [hasSentDispatchedSms, setHasSentDispatchedSms] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(3);

  // Automatically simulate transitioning order into atelier tailoring and dispatching processing SMS
  useEffect(() => {
    // Countdown timer for automatic atelier intake
    const countdown = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(countdown);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    const timer = setTimeout(() => {
      setOrderStage('processing');
      if (!hasSentProcessingSms) {
        const itemNames = order.items.map((i) => i.product.name).slice(0, 2).join(' & ');
        sendOrderProcessingSms(
          order,
          `Master tailors at our Dzorwulu atelier have begun pattern matching, canvas basting & hand-crafting ${itemNames || 'your pieces'}.`
        );
        setHasSentProcessingSms(true);
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdown);
    };
  }, [order.id]);

  const handleManualProcessingSms = () => {
    setOrderStage('processing');
    sendOrderProcessingSms(
      order,
      `Master tailors at our Dzorwulu atelier are actively pressing, finishing seams and tailoring ${order.items[0]?.product.name || 'your garment'}.`
    );
    setHasSentProcessingSms(true);
  };

  const handleManualDispatchedSms = () => {
    setOrderStage('dispatched');
    sendOrderDispatchedSms(order);
    setHasSentDispatchedSms(true);
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch {
      // In restricted iframe environments print may be disabled
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Boulevard Menswear Concierge, I just placed order ${order.orderNumber} under the name ${order.customer.firstName} ${order.customer.lastName}. Please confirm delivery details.`
  );

  // Find all SMS sent for this specific order
  const orderSmsList = messages.filter((m) => m.orderNumber === order.orderNumber);

  return (
    <div className="px-4 sm:px-8 max-w-4xl mx-auto py-12 space-y-8">
      {/* 1. Header Banner */}
      <div className="bg-white border border-[#E6E2DC] rounded-2xl p-8 sm:p-12 text-center shadow-sm space-y-4">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C724B]">
            Order #{order.orderNumber}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
            Thank You, {order.customer.firstName}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto">
            Your sartorial order has been received. Real-time SMS status updates are being dispatched directly to{' '}
            <strong className="text-stone-900 font-mono">
              {order.customer.countryCode || '+233'} {order.customer.phone}
            </strong>.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          {/* 1-Tap Open in Device Messages App */}
          <a
            href={`sms:${(order.customer.countryCode || '+233') + order.customer.phone}?body=${encodeURIComponent(
              `BOULEVARD: Thank you ${order.customer.firstName}! Order #${order.orderNumber} confirmed (${order.currency} ${order.total.toLocaleString()}). Concierge: +233501234567`
            )}`}
            className="px-5 py-2.5 bg-[#C5A880] hover:bg-[#D5B890] text-[#121214] text-xs font-bold uppercase tracking-wider rounded inline-flex items-center gap-2 transition-colors shadow-xs"
            title="Open SMS confirmation directly in your smartphone's Messages app"
          >
            <Smartphone className="w-4 h-4" />
            <span>Open in Phone Messages App</span>
          </a>

          <button
            onClick={openInbox}
            className="px-5 py-2.5 bg-[#141416] hover:bg-black text-[#C5A880] text-xs font-semibold uppercase tracking-wider rounded inline-flex items-center gap-2 transition-colors shadow-xs"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Virtual Handset Inbox</span>
            {orderSmsList.length > 0 && (
              <span className="bg-[#C5A880] text-[#141416] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {orderSmsList.length}
              </span>
            )}
          </button>

          <a
            href={`https://wa.me/233501234567?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold uppercase tracking-wider rounded inline-flex items-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Concierge WhatsApp</span>
          </a>

          <button
            onClick={openGatewayModal}
            className="px-4 py-2.5 border border-[#8C724B]/40 hover:border-[#8C724B] text-stone-800 text-xs font-semibold uppercase tracking-wider rounded inline-flex items-center gap-2 transition-colors"
            title="Configure real telecom gateways (Twilio, Arkesel) or test SMS"
          >
            <Settings className="w-4 h-4 text-[#8C724B]" />
            <span>SMS Carrier Setup</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 border border-stone-300 hover:border-black text-stone-800 text-xs font-semibold uppercase tracking-wider rounded inline-flex items-center gap-2 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Live Order & SMS Processing Tracker */}
      <div className="bg-white border border-[#E6E2DC] rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="font-serif text-lg font-bold text-stone-900">
                Live Atelier Order & SMS Processing Tracker
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Live updates automatically sent via SMS to {order.customer.countryCode || '+233'} {order.customer.phone}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleManualProcessingSms}
              className="text-[11px] font-semibold text-[#8C724B] hover:text-black inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#8C724B]/30 hover:border-[#8C724B] rounded transition-colors"
              title="Trigger or re-send processing SMS"
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>{orderStage === 'confirmed' ? 'Start Processing Now' : 'Re-send Processing SMS'}</span>
            </button>

            <button
              onClick={handleManualDispatchedSms}
              className="text-[11px] font-semibold text-stone-600 hover:text-black inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-300 hover:border-black rounded transition-colors"
              title="Simulate courier dispatch SMS"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Simulate Courier SMS</span>
            </button>
          </div>
        </div>

        {/* 4-Stage Progress Visualizer */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
          {/* Stage 1: Order Placed */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                ✓
              </span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                SMS SENT
              </span>
            </div>
            <h4 className="text-xs font-bold text-stone-900">1. Order Placed</h4>
            <p className="text-[11px] text-stone-600 leading-tight">
              Order confirmed. Initial receipt transmitted to mobile.
            </p>
          </div>

          {/* Stage 2: Being Processed */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              orderStage === 'processing' || orderStage === 'dispatched'
                ? 'border-[#C5A880] bg-[#FAF7F2] shadow-xs'
                : 'border-stone-200 bg-stone-50/50 opacity-75'
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  orderStage === 'processing' || orderStage === 'dispatched'
                    ? 'bg-[#8C724B] text-white shadow-xs'
                    : 'bg-stone-200 text-stone-600'
                }`}
              >
                <Scissors className="w-3.5 h-3.5" />
              </span>
              {orderStage === 'processing' || orderStage === 'dispatched' ? (
                <span className="text-[10px] font-mono text-[#8C724B] bg-[#C5A880]/20 px-2 py-0.5 rounded font-bold animate-pulse">
                  SMS SENT
                </span>
              ) : (
                <span className="text-[10px] font-mono text-stone-500 bg-stone-200/60 px-2 py-0.5 rounded">
                  {timeRemaining ? `In ${timeRemaining}s...` : 'Pending'}
                </span>
              )}
            </div>
            <h4 className="text-xs font-bold text-stone-900">2. Being Processed</h4>
            <p className="text-[11px] text-stone-600 leading-tight">
              Pattern cutting, canvas basting & hand-finishing at Dzorwulu atelier.
            </p>
          </div>

          {/* Stage 3: Quality Check */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              orderStage === 'dispatched'
                ? 'border-emerald-200 bg-emerald-50/50'
                : 'border-stone-200 bg-stone-50/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  orderStage === 'dispatched' ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-600'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <span className="text-[10px] font-mono text-stone-500 bg-stone-200/60 px-2 py-0.5 rounded">
                {orderStage === 'dispatched' ? 'PASSED' : 'Next'}
              </span>
            </div>
            <h4 className="text-xs font-bold text-stone-900">3. Quality Inspection</h4>
            <p className="text-[11px] text-stone-600 leading-tight">
              Pressing, stitch inspection & garment bag preparation.
            </p>
          </div>

          {/* Stage 4: Dispatched / Ready */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              orderStage === 'dispatched'
                ? 'border-emerald-200 bg-emerald-50/50 shadow-xs'
                : 'border-stone-200 bg-stone-50/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  orderStage === 'dispatched' ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-600'
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
              </span>
              <span className="text-[10px] font-mono text-stone-500 bg-stone-200/60 px-2 py-0.5 rounded">
                {orderStage === 'dispatched' ? 'EN ROUTE' : 'Pending'}
              </span>
            </div>
            <h4 className="text-xs font-bold text-stone-900">4. Dispatch & Fitting</h4>
            <p className="text-[11px] text-stone-600 leading-tight">
              Courier dispatch across Accra or boutique collection.
            </p>
          </div>
        </div>

        {/* Real-time SMS Transcript Feed for this Order */}
        <div className="pt-4 border-t border-stone-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#8C724B]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                Official SMS Transmissions ({orderSmsList.length} Messages Dispatched)
              </h3>
            </div>
            <button
              onClick={openInbox}
              className="text-xs text-[#8C724B] hover:text-black font-semibold inline-flex items-center gap-1 transition-colors"
            >
              <span>View On Phone Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {orderSmsList.length === 0 ? (
            <div className="p-4 bg-stone-50 rounded-lg text-center text-xs text-stone-500">
              Generating first SMS notification...
            </div>
          ) : (
            <div className="space-y-2.5">
              {orderSmsList.map((sms) => (
                <div
                  key={sms.id}
                  className="p-4 bg-[#141416] text-white rounded-xl border border-stone-800 shadow-sm space-y-2"
                >
                  <div className="flex items-center justify-between text-[11px] pb-1.5 border-b border-white/10">
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-[#C5A880] font-bold">FROM: BOULEVARD</span>
                      <span className="text-stone-500">→</span>
                      <span className="text-stone-300">TO: {sms.recipientPhone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px]">
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>DELIVERED ({new Date(sms.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-[#E5D7C2] block mb-0.5">
                      {sms.title}
                    </span>
                    <p className="text-xs text-stone-200 leading-relaxed font-sans font-light">
                      {sms.message}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <div className="flex items-center gap-2">
                      <a
                        href={`sms:${sms.recipientPhone.replace(/[^\d+]/g, '')}?body=${encodeURIComponent(sms.message)}`}
                        className="bg-[#C5A880]/20 hover:bg-[#C5A880]/30 text-[#E5D7C2] px-2.5 py-1 rounded inline-flex items-center gap-1 transition-colors font-medium"
                      >
                        <Smartphone className="w-3 h-3" />
                        <span>Open in Messages</span>
                      </a>
                      <a
                        href={`https://wa.me/${sms.recipientPhone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(sms.message)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-300 px-2.5 py-1 rounded inline-flex items-center gap-1 transition-colors font-medium"
                      >
                        <Phone className="w-3 h-3" />
                        <span>WhatsApp</span>
                      </a>
                    </div>

                    {sms.provider && sms.provider !== 'simulated' && (
                      <span className="text-[10px] font-mono text-[#C5A880] uppercase">
                        Via {sms.provider} Carrier
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. Order Details Invoice Card */}
      <div className="bg-white border border-[#E6E2DC] rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-2">
          <div>
            <span className="font-serif text-xl font-bold tracking-widest text-stone-900">
              BOULEVARD MENSWEAR
            </span>
            <p className="text-[10px] text-stone-500 uppercase tracking-widest">
              Accra · Dzorwulu · Labone · East Legon
            </p>
          </div>
          <div className="text-left sm:text-right text-xs text-stone-500 font-mono">
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Payment: {order.paymentMethod.toUpperCase()}</p>
          </div>
        </div>

        {/* Delivery & Customer Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-stone-600">
          <div className="space-y-1">
            <p className="font-bold text-stone-900 uppercase tracking-wider">Delivery Destination:</p>
            <p className="font-medium text-stone-800">{order.customer.firstName} {order.customer.lastName}</p>
            <p className="font-mono text-stone-800">{order.customer.phone}</p>
            {order.deliveryMethod.includes('pickup') ? (
              <p className="text-[#8C724B] font-semibold">
                In-Store Collection ({order.deliveryMethod.replace('pickup-', '').toUpperCase()} Boutique)
              </p>
            ) : (
              <>
                <p>{order.customer.address}</p>
                <p>{order.customer.city}, {order.customer.region}, Ghana</p>
              </>
            )}
          </div>

          <div className="space-y-1">
            <p className="font-bold text-stone-900 uppercase tracking-wider">Delivery Estimate:</p>
            <p className="text-stone-800">
              {order.deliveryMethod === 'accra-express'
                ? 'Within 24 Hours via Express Courier'
                : order.deliveryMethod.includes('pickup')
                ? 'Ready for In-Store Fitting & Collection today'
                : '2 - 3 Business Days via Insured Courier'}
            </p>
            <p className="pt-2 text-stone-500 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-[#8C724B]" />
              <span>Complimentary alterations available at Dzorwulu atelier.</span>
            </p>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="border-t border-stone-200 pt-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">
            Garment Details
          </h3>
          <div className="divide-y divide-stone-100">
            {order.items.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-14 object-cover rounded bg-stone-100"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900">{item.product.name}</h4>
                    <p className="text-[11px] text-stone-500">
                      Size: {item.selectedSize} · Tone: {item.selectedColor} · Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-stone-900">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Totals */}
        <div className="border-t border-stone-200 pt-4 space-y-2 text-xs text-stone-600 max-w-xs ml-auto">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-mono text-stone-900 font-semibold">{formatPrice(order.subtotal)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>Discount</span>
              <span className="font-mono font-semibold">-{formatPrice(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Shipping / Delivery</span>
            <span className="font-mono text-stone-900 font-semibold">
              {order.deliveryFee === 0 ? 'Complimentary' : formatPrice(order.deliveryFee)}
            </span>
          </div>
          <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
            <span>Total Paid</span>
            <span className="font-mono text-lg">{formatPrice(order.total)}</span>
          </div>
        </div>

        {/* Reassurance */}
        <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#E8E2D8] flex items-center gap-3 text-xs text-stone-700">
          <ShieldCheck className="w-5 h-5 text-[#8C724B] shrink-0" />
          <p>
            <strong>Covered by our 3-Month Guarantee:</strong> Bring this receipt to any Boulevard Menswear boutique in Accra if any tailoring adjustments or repairs are ever required.
          </p>
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={() => onNavigate('shop')}
          className="px-8 py-3.5 bg-[#121214] text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-black transition-colors inline-flex items-center gap-2"
        >
          <span>Return to Store</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
