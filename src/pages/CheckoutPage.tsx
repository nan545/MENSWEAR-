import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Truck, 
  MapPin, 
  CreditCard, 
  Phone, 
  CheckCircle2, 
  ArrowLeft,
  ShoppingBag,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useSms } from '../context/SmsContext';
import { Order } from '../types';

interface CheckoutPageProps {
  onOrderComplete: (order: Order) => void;
  onNavigate: (route: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onOrderComplete, onNavigate }) => {
  const { items, subtotal, discount, promoCode, total, clearCart } = useCart();
  const { formatPrice, currency } = useCurrency();
  const { sendSms, sendOrderPlacedSms, isDispatchingSms, openGatewayModal } = useSms();

  const [countryCode, setCountryCode] = useState('+233');

  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: 'Accra',
    region: 'Greater Accra',
    postalCode: '',
    country: 'Ghana',
  });

  const [deliveryMethod, setDeliveryMethod] = useState<Order['deliveryMethod']>('accra-express');
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('momo');
  const [momoNetwork, setMomoNetwork] = useState<'MTN' | 'Telecel' | 'AirtelTigo'>('MTN');
  const [momoNumber, setMomoNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSendingSms, setIsSendingSms] = useState(false);

  // Delivery costs
  const getDeliveryFee = () => {
    if (deliveryMethod === 'pickup-dzorwulu' || deliveryMethod === 'pickup-labone') return 0;
    if (subtotal >= 5000) return 0; // Free delivery over GH₵5,000
    if (deliveryMethod === 'accra-express') return 120;
    if (deliveryMethod === 'ghana-standard') return 180;
    if (deliveryMethod === 'international') return 750;
    return 120;
  };

  const deliveryFee = getDeliveryFee();
  const grandTotal = total + deliveryFee;

  const handlePlaceOrder = async (e?: React.FormEvent) => {
    e?.preventDefault?.();
    setLoading(true);
    setIsProcessing(true);

    try {
      const orderNumber = `BLV-${Math.floor(100000 + Math.random() * 900000)}`;
      const completedOrder: Order = {
        id: `ord_${Date.now()}`,
        orderNumber,
        items,
        customer: {
          ...customer,
          countryCode,
          smsNotifications: true,
        },
        deliveryMethod,
        deliveryFee,
        paymentMethod,
        paymentDetails:
          paymentMethod === 'momo'
            ? { network: momoNetwork, momoNumber: momoNumber || customer.phone }
            : undefined,
        subtotal,
        discount,
        total: grandTotal,
        currency,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };

      // Trigger sendSms with the order details after successful order processing
      await sendSms(completedOrder);

      clearCart();
      setLoading(false);
      setIsProcessing(false);
      onOrderComplete(completedOrder);
    } catch (error) {
      console.error('Error submitting order / dispatching SMS:', error);
      setLoading(false);
      setIsProcessing(false);
    }
  };

  const handleSubmitOrder = handlePlaceOrder;

  if (items.length === 0) {
    return (
      <div className="px-4 py-16 text-center max-w-lg mx-auto space-y-4">
        <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
        <h2 className="font-serif text-2xl font-bold text-stone-900">Your bag is empty</h2>
        <p className="text-xs text-stone-500">
          You don't have any pieces to checkout yet. Browse our tailored collections.
        </p>
        <button
          onClick={() => onNavigate('shop')}
          className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-8 max-w-7xl mx-auto py-8">
      {/* Back button */}
      <button
        onClick={() => onNavigate('shop')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-black mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Continue Shopping</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Checkout Form (7 cols) */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-8">
          
          {/* Section 1: Customer Contact */}
          <div className="bg-white p-6 rounded-xl border border-[#E6E2DC] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h2 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
                <span>1. Contact & Customer Details</span>
              </h2>
              <span className="text-[11px] text-stone-500">Required for order tracking</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nana"
                  value={customer.firstName}
                  onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Mensah"
                  value={customer.lastName}
                  onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-stone-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="nana@example.com"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Mobile Number (For Live SMS Updates) *
                </label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="text-xs p-2.5 bg-stone-50 border border-stone-300 rounded font-mono font-medium focus:outline-none focus:border-stone-900 shrink-0"
                    aria-label="Country Dial Code"
                  >
                    <option value="+233">🇬🇭 +233 (Ghana)</option>
                    <option value="+1">🇺🇸 +1 (US / Canada)</option>
                    <option value="+44">🇬🇧 +44 (United Kingdom)</option>
                    <option value="+234">🇳🇬 +234 (Nigeria)</option>
                    <option value="+49">🇩🇪 +49 (Germany)</option>
                    <option value="+33">🇫🇷 +33 (France)</option>
                    <option value="+27">🇿🇦 +27 (South Africa)</option>
                  </select>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 50 123 4567"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="flex-1 text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-stone-900 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Instant SMS Updates Banner & Info */}
            <div className="mt-3 p-3.5 bg-[#FAF7F2] border border-[#E8E2D8] rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#8C724B]/15 text-[#8C724B] flex items-center justify-center shrink-0 mt-0.5">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-900">
                      Automatic SMS Order Confirmation Included
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                      Guaranteed SMS
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    Once your order is successfully placed, a confirmation SMS message is triggered and sent directly to your phone number from <strong>BOULEVARD</strong>, accompanied by an instant audio chime and followed by live tailoring and dispatch alerts.
                  </p>
                  {isSendingSms || isDispatchingSms ? (
                    <p className="text-[11px] font-mono text-[#8C724B] pt-0.5 flex items-center gap-1.5 font-bold animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-[#8C724B] animate-ping"></span>
                      <span>Sending SMS notification to <strong>{countryCode} {customer.phone}</strong>...</span>
                    </p>
                  ) : customer.phone ? (
                    <div className="space-y-1">
                      <p className="text-[11px] font-mono text-[#8C724B] pt-0.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Verified SMS Recipient: <strong>{countryCode} {customer.phone}</strong></span>
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-stone-500 pt-0.5">
                        <span>Direct 1-tap mobile Messages app (sms:) & WhatsApp transmission ready.</span>
                        <button
                          type="button"
                          onClick={openGatewayModal}
                          className="text-[#8C724B] hover:underline font-semibold"
                        >
                          Carrier Setup
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between pt-0.5">
                      <p className="text-[11px] text-stone-400 italic">
                        Enter your mobile number above to preview your recipient phone number.
                      </p>
                      <button
                        type="button"
                        onClick={openGatewayModal}
                        className="text-[10px] text-[#8C724B] hover:underline font-semibold"
                      >
                        Carrier Setup
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Delivery & Shipping Destination */}
          <div className="bg-white p-6 rounded-xl border border-[#E6E2DC] shadow-xs space-y-4">
            <div className="border-b border-stone-200 pb-3">
              <h2 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
                <span>2. Delivery Method</span>
              </h2>
            </div>

            {/* Delivery Method Options */}
            <div className="space-y-2.5">
              <label
                className={`flex items-start justify-between p-3.5 rounded-lg border cursor-pointer transition-all ${
                  deliveryMethod === 'accra-express'
                    ? 'border-[#8C724B] bg-[#FAF8F5]'
                    : 'border-stone-200 hover:border-stone-400'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    checked={deliveryMethod === 'accra-express'}
                    onChange={() => setDeliveryMethod('accra-express')}
                    className="mt-0.5 text-[#8C724B] accent-[#8C724B]"
                  />
                  <div>
                    <p className="text-xs font-bold text-stone-900">Accra Same-Day / Next-Day Express</p>
                    <p className="text-[11px] text-stone-500">
                      Dispatched directly by dedicated courier across Greater Accra
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-stone-900">
                  {subtotal >= 5000 ? 'FREE' : formatPrice(120)}
                </span>
              </label>

              <label
                className={`flex items-start justify-between p-3.5 rounded-lg border cursor-pointer transition-all ${
                  deliveryMethod === 'pickup-dzorwulu'
                    ? 'border-[#8C724B] bg-[#FAF8F5]'
                    : 'border-stone-200 hover:border-stone-400'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    checked={deliveryMethod === 'pickup-dzorwulu'}
                    onChange={() => setDeliveryMethod('pickup-dzorwulu')}
                    className="mt-0.5 text-[#8C724B] accent-[#8C724B]"
                  />
                  <div>
                    <p className="text-xs font-bold text-stone-900">
                      Boutique Pickup: Dzorwulu Flagship & Atelier
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Blohum Street, Dzorwulu · Complimentary in-person hem/fitting
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700">FREE</span>
              </label>

              <label
                className={`flex items-start justify-between p-3.5 rounded-lg border cursor-pointer transition-all ${
                  deliveryMethod === 'pickup-labone'
                    ? 'border-[#8C724B] bg-[#FAF8F5]'
                    : 'border-stone-200 hover:border-stone-400'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    checked={deliveryMethod === 'pickup-labone'}
                    onChange={() => setDeliveryMethod('pickup-labone')}
                    className="mt-0.5 text-[#8C724B] accent-[#8C724B]"
                  />
                  <div>
                    <p className="text-xs font-bold text-stone-900">
                      Boutique Pickup: Labone Boutique
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Kweku Baako Street, Labone, Accra
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700">FREE</span>
              </label>

              <label
                className={`flex items-start justify-between p-3.5 rounded-lg border cursor-pointer transition-all ${
                  deliveryMethod === 'ghana-standard'
                    ? 'border-[#8C724B] bg-[#FAF8F5]'
                    : 'border-stone-200 hover:border-stone-400'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    checked={deliveryMethod === 'ghana-standard'}
                    onChange={() => setDeliveryMethod('ghana-standard')}
                    className="mt-0.5 text-[#8C724B] accent-[#8C724B]"
                  />
                  <div>
                    <p className="text-xs font-bold text-stone-900">Nationwide Ghana (Kumasi, Takoradi, Tamale)</p>
                    <p className="text-[11px] text-stone-500">2-3 business days via secure insured courier</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-stone-900">
                  {subtotal >= 5000 ? 'FREE' : formatPrice(180)}
                </span>
              </label>
            </div>

            {/* Address fields (if shipping) */}
            {deliveryMethod !== 'pickup-dzorwulu' && deliveryMethod !== 'pickup-labone' && (
              <div className="pt-4 border-t border-stone-200 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Street Address / Landmark *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 14 Independence Avenue, Ridge, Accra"
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.city}
                      onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                      className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                      Region
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.region}
                      onChange={(e) => setCustomer({ ...customer, region: e.target.value })}
                      className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Payment Method */}
          <div className="bg-white p-6 rounded-xl border border-[#E6E2DC] shadow-xs space-y-4">
            <div className="border-b border-stone-200 pb-3">
              <h2 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
                <span>3. Payment Selection</span>
              </h2>
            </div>

            <div className="space-y-3">
              {/* Mobile Money */}
              <label
                className={`block p-4 rounded-lg border cursor-pointer transition-all ${
                  paymentMethod === 'momo'
                    ? 'border-[#8C724B] bg-[#FAF8F5]'
                    : 'border-stone-200 hover:border-stone-400'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'momo'}
                      onChange={() => setPaymentMethod('momo')}
                      className="text-[#8C724B] accent-[#8C724B]"
                    />
                    <div>
                      <p className="text-xs font-bold text-stone-900">
                        Mobile Money (MTN MoMo / Telecel Cash / AT Money)
                      </p>
                      <p className="text-[11px] text-stone-500">
                        Prompt will be sent to your registered mobile wallet
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-yellow-600">Popular</span>
                </div>

                {paymentMethod === 'momo' && (
                  <div className="mt-4 pt-3 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Network:</label>
                      <select
                        value={momoNetwork}
                        onChange={(e) => setMomoNetwork(e.target.value as any)}
                        className="w-full p-2 border border-stone-300 rounded bg-white"
                      >
                        <option value="MTN">MTN MoMo</option>
                        <option value="Telecel">Telecel Cash</option>
                        <option value="AirtelTigo">AirtelTigo Money</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">MoMo Number:</label>
                      <input
                        type="tel"
                        placeholder={customer.phone || '024 123 4567'}
                        value={momoNumber}
                        onChange={(e) => setMomoNumber(e.target.value)}
                        className="w-full p-2 border border-stone-300 rounded bg-white"
                      />
                    </div>
                  </div>
                )}
              </label>

              {/* Card Payment */}
              <label
                className={`block p-4 rounded-lg border cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#8C724B] bg-[#FAF8F5]'
                    : 'border-stone-200 hover:border-stone-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="text-[#8C724B] accent-[#8C724B]"
                  />
                  <div>
                    <p className="text-xs font-bold text-stone-900">
                      Credit or Debit Card (Visa & Mastercard)
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Protected by 256-bit bank-grade TLS encryption
                    </p>
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <div className="mt-4 pt-3 border-t border-stone-200 space-y-3 text-xs">
                    <input
                      type="text"
                      placeholder="Card number (XXXX XXXX XXXX XXXX)"
                      className="w-full p-2 border border-stone-300 rounded bg-white font-mono"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="p-2 border border-stone-300 rounded bg-white font-mono"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        className="p-2 border border-stone-300 rounded bg-white font-mono"
                      />
                    </div>
                  </div>
                )}
              </label>

              {/* Cash on Delivery / Pay at Store */}
              <label
                className={`block p-4 rounded-lg border cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[#8C724B] bg-[#FAF8F5]'
                    : 'border-stone-200 hover:border-stone-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="text-[#8C724B] accent-[#8C724B]"
                  />
                  <div>
                    <p className="text-xs font-bold text-stone-900">
                      Pay on Delivery / In-Store Pickup
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Pay with cash or POS terminal upon receiving your pieces
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Place Order CTA Section */}
          <div className="checkout-button-container space-y-3">
            {/* Real-time Asynchronous SMS Dispatch Status Banner */}
            {(loading || isDispatchingSms) && (
              <div className="p-3.5 bg-[#FAF7F2] border border-[#8C724B] rounded-xl flex items-center justify-between gap-3 text-xs text-stone-800 shadow-sm animate-pulse">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8C724B] animate-ping" />
                  <span className="font-semibold text-stone-900">
                    Sending SMS notification...
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#8C724B] bg-[#8C724B]/10 px-2 py-0.5 rounded font-bold">
                  {countryCode} {customer.phone}
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || isProcessing || isDispatchingSms}
              className="w-full py-4 bg-[#121214] hover:bg-black text-[#EDE8DF] text-xs font-bold uppercase tracking-widest rounded flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading || isDispatchingSms ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
                  <span>Sending SMS notification...</span>
                </span>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#C5A880]" />
                  <span>Place Order · {formatPrice(grandTotal)}</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Right: Order Summary Sidebar (5 cols) */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-[#E6E2DC] shadow-xs space-y-5 sticky top-24">
            <h3 className="font-serif text-lg font-bold text-stone-900 pb-3 border-b border-stone-200">
              Order Summary ({items.length} piece{items.length > 1 ? 's' : ''})
            </h3>

            {/* Items list */}
            <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto pr-1 space-y-2">
              {items.map((item) => (
                <div key={item.id} className="pt-2 flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-16 object-cover rounded bg-stone-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-stone-900 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Size: {item.selectedSize} · Qty: {item.quantity}
                    </p>
                    <p className="text-xs font-mono font-bold text-stone-800 mt-0.5">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="pt-4 border-t border-stone-200 space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-semibold text-stone-900">{formatPrice(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Promo Code ({promoCode})</span>
                  <span className="font-mono font-semibold">-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-mono font-semibold text-stone-900">
                  {deliveryFee === 0 ? 'Complimentary' : formatPrice(deliveryFee)}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-stone-900 pt-3 border-t border-stone-200">
                <span>Grand Total</span>
                <span className="font-mono text-lg">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* 3-Month Guarantee Reassurance */}
            <div className="p-3.5 bg-[#FAF7F2] rounded-lg border border-[#E8E2D8] text-xs text-stone-700 space-y-1.5">
              <div className="flex items-center gap-2 text-stone-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-[#8C724B]" />
                <span>The Boulevard 3-Month Guarantee</span>
              </div>
              <p className="text-[11px] leading-relaxed text-stone-600">
                Full alterations, repair, or replacement guarantee on every suit and garment. If the fit isn't exceptional, our master tailors will alter it free of charge.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
