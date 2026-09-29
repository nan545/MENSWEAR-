import React from 'react';
import { ShieldCheck, Sparkles, Scissors, MapPin, ArrowRight } from 'lucide-react';
import HERO_IMG from '../assets/images/hero_boulevard_suit_1790673872929.jpg';
import SAFARI_IMG from '../assets/images/category_safari_suit_1790673884456.jpg';

interface AboutPageProps {
  onNavigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hero Header */}
      <section className="px-4 sm:px-8 max-w-5xl mx-auto text-center pt-8 sm:pt-14 space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#8C724B]">
          Heritage & Sartorial Philosophy
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-stone-900 leading-tight">
          Timeless Style Without Compromising on Quality
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto font-light">
          Boulevard Menswear was founded on a singular conviction: that the modern gentleman deserves garments of unyielding integrity, handcrafted with classical European artistry and tailored for African excellence.
        </p>
      </section>

      {/* 2. Visual Story with Scrim */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-stone-900 shadow-xl">
          <img
            src={HERO_IMG}
            alt="Boulevard Menswear Craftsmanship"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-6 sm:bottom-12 left-6 sm:left-12 right-6 sm:right-12 text-white max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              The Modern Gentleman
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold mt-1">
              Determination. Self-Confidence. Elegance. Talent.
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 font-light">
              We guide our patrons to develop an individual sense of elegant and wearable style rather than blindly conforming to ephemeral trends.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Three Pillars */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl border border-[#E6E2DC] space-y-4">
            <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center text-[#8C724B]">
              <Scissors className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Savile Row British Attitude
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Every Boulevard jacket and trouser begins with precise anatomical proportioning. Clean lines, soft roped shoulders, half-canvas chest pieces, and functional surgeon cuffs ensure an authoritative posture that breathes naturally.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-[#E6E2DC] space-y-4">
            <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center text-[#8C724B]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              European & Italian Mastery
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              From historic mills in Biella supplying Super 130s and tropical high-twist wools, to master shoe workshops in Tuscany crafting Arbiter Goodyear-welted oxfords, our materials represent centuries of dedicated artisanal tradition.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-[#E6E2DC] space-y-4">
            <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center text-[#8C724B]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              The 3-Month Guarantee
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We stand unreservedly behind our stitching and materials. Every item purchased comes with our famous 3-month, no-questions-asked guarantee: complimentary alterations, repairs, or replacements if anything falls short of perfection.
            </p>
          </div>
        </div>
      </section>

      {/* 4. The Safari Suit Legacy */}
      <section className="bg-[#141416] text-white py-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              Signature Silhouette
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              The Boulevard Safari Suit: Sartorial Authority in the Tropics
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              In West Africa, the safari suit—often revered as the statesman's and executive's garment of choice—demands a balance between formal distinction and effortless thermal comfort.
            </p>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              We re-engineered the classic silhouette with four pleated box-pleat pockets, structured convertible collar, and unlined piped interior. Woven from breathable tropical wool and Belgian linen blends, it stands as an indelible symbol of dignity, leadership, and style.
            </p>
            <button
              onClick={() => onNavigate('shop')}
              className="mt-4 px-6 py-3 bg-[#C5A880] text-black text-xs font-bold uppercase tracking-wider rounded inline-flex items-center gap-2 hover:bg-[#B3956E] transition-colors"
            >
              <span>Explore Safari Suits</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="rounded-xl overflow-hidden aspect-[4/5] border border-stone-800 shadow-2xl">
            <img
              src={SAFARI_IMG}
              alt="Boulevard Safari Suit Architecture"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 5. Physical Presence in Accra */}
      <section className="px-4 sm:px-8 max-w-5xl mx-auto text-center space-y-6">
        <span className="text-xs font-bold uppercase tracking-widest text-[#8C724B]">
          Three Destinations of Distinction
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Experience Boulevard Across Accra
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
          Step inside our boutiques in Dzorwulu, Labone, and East Legon. Savor bespoke consultations, personalized tailoring adjustments, and private fitting suites.
        </p>

        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onNavigate('stores')}
            className="px-6 py-3 bg-[#121214] text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-black transition-colors"
          >
            Find A Boutique
          </button>
          <button
            onClick={() => onNavigate('bespoke')}
            className="px-6 py-3 border border-stone-900 text-stone-900 text-xs font-bold uppercase tracking-wider rounded hover:bg-stone-900 hover:text-white transition-colors"
          >
            Book In-Store Fitting
          </button>
        </div>
      </section>
    </div>
  );
};
