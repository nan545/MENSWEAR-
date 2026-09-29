import React from 'react';
import { ShieldCheck, Scissors, RefreshCw, CheckCircle2, Phone, ArrowRight } from 'lucide-react';

interface GuaranteePageProps {
  onNavigate: (route: string) => void;
}

export const GuaranteePage: React.FC<GuaranteePageProps> = ({ onNavigate }) => {
  return (
    <div className="px-4 sm:px-8 max-w-5xl mx-auto py-10 space-y-12">
      {/* 1. Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 rounded text-xs font-semibold uppercase tracking-widest text-[#8C724B]">
          <ShieldCheck className="w-4 h-4" />
          <span>The Boulevard Standard</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
          Our 3-Month No-Questions Guarantee
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
          When you invest in a Boulevard suit, safari jacket, or pair of handcrafted European shoes, you receive an unconditional guarantee of sartorial integrity.
        </p>
      </div>

      {/* 2. Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl border border-[#E6E2DC] shadow-xs space-y-3">
          <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center text-[#8C724B]">
            <Scissors className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-900">
            Complimentary Alterations
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            If your body measurements change or you desire a sharper taper or hem within 90 days of purchase, our master tailors at our Dzorwulu atelier alter your garment without fee.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#E6E2DC] shadow-xs space-y-3">
          <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center text-[#8C724B]">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-900">
            Faultless Exchange or Replacement
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Should any seam, button, zip, or leather sole display an unforeseen defect under regular wear, we will repair or exchange the item immediately—no interrogation, no hurdles.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#E6E2DC] shadow-xs space-y-3">
          <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center text-[#8C724B]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-900">
            Lifetime Sizing Records
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            We preserve your bespoke patterns and anatomical measurements on file across our Dzorwulu, Labone, and East Legon boutiques for effortless repeat commissions.
          </p>
        </div>
      </div>

      {/* 3. Detailed FAQs & Policy */}
      <div className="bg-white border border-[#E6E2DC] rounded-xl p-8 space-y-6">
        <h2 className="font-serif text-2xl font-bold text-stone-900">
          Frequently Asked Questions Regarding Our Guarantee
        </h2>

        <div className="divide-y divide-stone-200 space-y-4 pt-2">
          <div className="pt-4 space-y-1 text-xs">
            <h4 className="font-bold text-stone-900 text-sm">
              How do I initiate an alteration or exchange?
            </h4>
            <p className="text-stone-600 leading-relaxed">
              Simply bring the garment and your receipt or order number to any Boulevard Menswear boutique in Accra (Dzorwulu, Labone, or East Legon). You may also message our WhatsApp Concierge at +233 50 123 4567 to arrange courier pickup.
            </p>
          </div>

          <div className="pt-4 space-y-1 text-xs">
            <h4 className="font-bold text-stone-900 text-sm">
              Are online orders eligible for in-store tailoring?
            </h4>
            <p className="text-stone-600 leading-relaxed">
              Yes, absolutely. Every piece purchased online enjoys the exact same privileges as purchases made inside our physical showrooms.
            </p>
          </div>

          <div className="pt-4 space-y-1 text-xs">
            <h4 className="font-bold text-stone-900 text-sm">
              What if I live outside of Greater Accra?
            </h4>
            <p className="text-stone-600 leading-relaxed">
              Our national courier service can collect your garment from Kumasi, Takoradi, Tamale, or any region, return it to our Dzorwulu atelier for precision tailoring, and deliver it back to your doorstep.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Banner */}
      <div className="rounded-xl bg-[#141416] p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-serif text-xl font-bold">Have Questions About Your Garment?</h3>
          <p className="text-xs text-stone-300">
            Our sartorial concierge is ready to assist you on WhatsApp or in person.
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href="https://wa.me/233501234567"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold uppercase tracking-wider rounded inline-flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
          <button
            onClick={() => onNavigate('shop')}
            className="px-5 py-2.5 bg-[#C5A880] text-black text-xs font-bold uppercase tracking-wider rounded hover:bg-[#B3956E]"
          >
            Explore Collections
          </button>
        </div>
      </div>
    </div>
  );
};
