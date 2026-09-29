import React, { useState } from 'react';
import { ShieldCheck, Truck, Clock, Sparkles, MapPin, Phone, Mail, ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string, params?: Record<string, string>) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#111113] text-[#EDE8DF] border-t border-[#29292D] mt-20">
      {/* 1. Value Proposition Pillars Bar */}
      <div className="border-b border-[#242428] py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#1A1A1E] rounded border border-[#2D2D32] text-[#C5A880]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white uppercase">3-Month Guarantee</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                No-questions-asked replacement or alteration guarantee on every suit and garment.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#1A1A1E] rounded border border-[#2D2D32] text-[#C5A880]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white uppercase">Complimentary Delivery</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Free express shipping on all orders over GH₵5,000 across Greater Accra and nationwide.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#1A1A1E] rounded border border-[#2D2D32] text-[#C5A880]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white uppercase">Italian Craftsmanship</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Distinguished European footwear, Biella wools, and Tuscan leather accessories.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#1A1A1E] rounded border border-[#2D2D32] text-[#C5A880]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white uppercase">Complimentary Alteration</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                In-house master tailors at our Dzorwulu atelier ensure every garment drapes flawlessly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Grid */}
      <div className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Brand & Story: 4 cols */}
          <div className="lg:col-span-4 space-y-5">
            <div>
              <span className="font-serif text-2xl font-bold tracking-[0.16em] text-white uppercase">
                BOULEVARD
              </span>
              <p className="text-[10px] tracking-[0.35em] text-[#C5A880] uppercase font-medium">
                MENSWEAR · ACCRA
              </p>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Timeless style without compromising on quality. Created for the modern gentleman characterized by determination, self-confidence, elegance, and talent. Marrying classic British sartorial attitude with distinguished European craftsmanship.
            </p>

            <div className="pt-2 text-xs text-stone-400 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Flagship: Blohum Street, Dzorwulu, Accra</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Concierge: +233 50 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Email: concierge@boulevardmenswear.com</span>
              </div>
            </div>
          </div>

          {/* Sartorial Collections: 2 cols */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Collections</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('collection', { category: 'suits' })}
                  className="hover:text-white transition-colors"
                >
                  Tailored Two-Piece Suits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection', { category: 'suits' })}
                  className="hover:text-white transition-colors"
                >
                  Double-Breasted Zecca Suits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection', { category: 'safari-suits' })}
                  className="hover:text-white transition-colors"
                >
                  Signature Safari Suits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection', { category: 'footwear' })}
                  className="hover:text-white transition-colors"
                >
                  Arbiter Italian Footwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection', { category: 'shirts-trousers' })}
                  className="hover:text-white transition-colors"
                >
                  Egyptian Cotton Shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection', { category: 'accessories' })}
                  className="hover:text-white transition-colors"
                >
                  Full-Grain Leather Goods
                </button>
              </li>
            </ul>
          </div>

          {/* Client Concierge: 2 cols */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Client Concierge</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('bespoke')} className="hover:text-white transition-colors">
                  Book Fitting Appointment
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('guarantee')} className="hover:text-white transition-colors">
                  3-Month Guarantee
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('stores')} className="hover:text-white transition-colors">
                  Store Hours & Directions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact Customer Care
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">
                  Order Tracking
                </button>
              </li>
            </ul>
          </div>

          {/* VIP Newsletter & Privilege: 4 cols */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">The Boulevard Circle</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Subscribe for private previews of new European fabric arrivals, trunk shows, and receive <span className="text-[#C5A880] font-semibold">10% off</span> your initial suiting order with code <span className="font-mono text-white bg-stone-800 px-1.5 py-0.5 rounded">BOULEVARD10</span>.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#1A261E] border border-[#2B4B34] rounded flex items-center gap-2 text-xs text-emerald-400">
                <Check className="w-4 h-4 shrink-0" />
                <span>Welcome to the Boulevard Circle. Use code BOULEVARD10 at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#1A1A1E] border border-[#34343B] text-white text-xs px-3.5 py-2.5 rounded focus:outline-none focus:border-[#C5A880]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#C5A880] hover:bg-[#B3956E] text-[#121214] text-xs font-bold tracking-wider uppercase rounded transition-colors flex items-center gap-1"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div className="pt-2">
              <p className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Accepted Payments</p>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] font-mono text-stone-400">
                <span className="px-2 py-1 bg-[#1A1A1E] border border-[#2D2D32] rounded text-yellow-400">MTN MoMo</span>
                <span className="px-2 py-1 bg-[#1A1A1E] border border-[#2D2D32] rounded text-red-400">Telecel Cash</span>
                <span className="px-2 py-1 bg-[#1A1A1E] border border-[#2D2D32] rounded text-blue-400">Visa / Mastercard</span>
                <span className="px-2 py-1 bg-[#1A1A1E] border border-[#2D2D32] rounded text-stone-300">Pay on Pickup</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Legal & Copyright Bar */}
      <div className="border-t border-[#202024] py-6 px-4 sm:px-8 text-[11px] text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Boulevard Menswear. Timeless Sartorial Elegance. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <button onClick={() => onNavigate('guarantee')} className="hover:text-stone-300 transition-colors">
              Guarantee Policy
            </button>
            <span>·</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-stone-300 transition-colors">
              Privacy Policy
            </button>
            <span>·</span>
            <button onClick={() => onNavigate('stores')} className="hover:text-stone-300 transition-colors">
              Accra Boutiques
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
