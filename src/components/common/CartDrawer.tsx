import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';

interface CartDrawerProps {
  onNavigateToCheckout: () => void;
  onNavigateToShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onNavigateToCheckout,
  onNavigateToShop,
}) => {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeFromCart,
    updateQuantity,
    subtotal,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    hasFreeShipping,
    promoCode,
    discount,
    applyPromoCode,
    removePromoCode,
    total,
  } = useCart();

  const { formatPrice } = useCurrency();
  const [promoInput, setPromoInput] = useState('');
  const [promoStatus, setPromoStatus] = useState<{ success?: boolean; message?: string }>({});

  if (!isDrawerOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoStatus(res);
  };

  const freeShippingPercentage = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F6] shadow-2xl flex flex-col border-l border-[#E6E2DC]">
          
          {/* Header */}
          <div className="p-5 border-b border-[#E6E2DC] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#8C724B]" />
              <h3 className="font-serif text-xl font-bold tracking-wide text-stone-900">
                Your Shopping Bag ({items.length})
              </h3>
            </div>
            <button
              onClick={closeDrawer}
              className="p-1.5 text-stone-400 hover:text-stone-800 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-[#F4EFEA] p-3.5 border-b border-[#E6E2DC] text-xs">
            {hasFreeShipping ? (
              <div className="flex items-center gap-2 text-emerald-800 font-medium">
                <Sparkles className="w-4 h-4 text-[#8C724B]" />
                <span>You've unlocked Complimentary Delivery across Ghana!</span>
              </div>
            ) : (
              <div>
                <p className="text-stone-700 font-medium">
                  Add <span className="font-semibold text-stone-900">{formatPrice(amountNeededForFreeShipping)}</span> more for Complimentary Delivery.
                </p>
                <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-[#8C724B] h-full transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingPercentage}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-stone-800">Your bag is empty</h4>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  Explore our tailored suits, signature safari suiting, and distinguished European footwear.
                </p>
                <button
                  onClick={() => {
                    closeDrawer();
                    onNavigateToShop();
                  }}
                  className="mt-6 px-6 py-2.5 bg-[#121214] text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-stone-800 transition-colors"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white rounded-lg border border-[#E6E2DC] transition-shadow hover:shadow-xs"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover rounded bg-stone-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-semibold text-stone-900 leading-snug truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-0.5"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-stone-500 mt-1 space-x-2">
                        <span>Size: <strong className="text-stone-800">{item.selectedSize}</strong></span>
                        <span>·</span>
                        <span>Tone: <strong className="text-stone-800">{item.selectedColor}</strong></span>
                      </div>

                      <p className="text-xs font-mono font-bold text-stone-900 mt-1.5">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-stone-200 rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-stone-600 hover:text-black hover:bg-stone-100"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-medium text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-stone-600 hover:text-black hover:bg-stone-100"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-mono text-stone-600">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#E6E2DC] bg-white space-y-4">
              {/* Promo Code Form */}
              <div>
                {promoCode ? (
                  <div className="flex items-center justify-between p-2 bg-stone-100 border border-stone-200 rounded text-xs">
                    <span className="font-mono text-stone-800 font-semibold">
                      CODE: {promoCode} (-{formatPrice(discount)})
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-stone-400 hover:text-red-600 text-xs font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. BOULEVARD10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 text-xs uppercase px-3 py-2 border border-stone-200 rounded focus:outline-none focus:border-stone-900"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold rounded uppercase"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoStatus.message && (
                  <p
                    className={`text-[11px] mt-1.5 ${
                      promoStatus.success ? 'text-emerald-600' : 'text-red-500'
                    }`}
                  >
                    {promoStatus.message}
                  </p>
                )}
              </div>

              {/* Subtotals */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-medium text-stone-900">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span className="font-mono font-medium">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-medium text-stone-900">
                    {hasFreeShipping ? 'Complimentary' : 'Calculated at checkout'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total</span>
                  <span className="font-mono text-base">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    closeDrawer();
                    onNavigateToCheckout();
                  }}
                  className="w-full py-3.5 bg-[#121214] hover:bg-black text-[#EDE8DF] text-xs font-bold uppercase tracking-widest rounded flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                </button>
                <button
                  onClick={() => {
                    closeDrawer();
                    onNavigateToShop();
                  }}
                  className="w-full py-2.5 text-stone-600 hover:text-black text-xs font-medium text-center transition-colors"
                >
                  Continue Browsing
                </button>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500 uppercase tracking-wider pt-2 border-t border-stone-100">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8C724B]" />
                <span>3-Month Guarantee · Complimentary Alterations</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
