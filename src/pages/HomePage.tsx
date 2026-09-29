import React, { useState } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Ruler, MapPin, ChevronRight, Phone } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { STORE_LOCATIONS } from '../data/stores';
import { Product, Category } from '../types';
import { ProductCard } from '../components/product/ProductCard';
import HERO_IMAGE from '../assets/images/hero_boulevard_suit_1790673872929.jpg';
import SAFARI_IMAGE from '../assets/images/category_safari_suit_1790673884456.jpg';
import FOOTWEAR_IMAGE from '../assets/images/category_italian_shoes_1790673896488.jpg';
import ACCESSORIES_IMAGE from '../assets/images/category_accessories_bag_1790673910920.jpg';

interface HomePageProps {
  onNavigate: (route: string, params?: Record<string, string>) => void;
  onSelectProduct: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectProduct }) => {
  const [selectedTab, setSelectedTab] = useState<Category>('all');

  const filteredFeatured = selectedTab === 'all'
    ? PRODUCTS.filter((p) => p.featured)
    : PRODUCTS.filter((p) => p.category === selectedTab);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO CAMPAIGN SHOWCASE */}
      <section className="relative px-4 sm:px-8 max-w-7xl mx-auto pt-4 sm:pt-6">
        <div className="relative rounded-xl overflow-hidden bg-[#111113] min-h-[580px] sm:min-h-[640px] flex items-center shadow-xl">
          {/* Hero Photography with measured contrast scrim */}
          <div className="absolute inset-0">
            <img
              src={HERO_IMAGE}
              alt="Boulevard Menswear Bespoke Sartorial Campaign"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000 ease-out"
            />
            {/* Measured scrim ensuring high legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-2xl text-white space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 backdrop-blur-md border border-white/15 text-[#C5A880] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autumn / Winter Sartorial Edition</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-white">
              Timeless Style Without Compromise
            </h1>

            <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-xl font-light">
              Curated for the modern gentleman characterized by determination, self-confidence, elegance, and talent. Hand-tailored safari suits, two-piece suiting, and distinguished European footwear.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('shop')}
                className="px-7 py-3.5 bg-[#C5A880] hover:bg-[#B3956E] text-[#121214] text-xs font-bold uppercase tracking-widest rounded transition-all shadow-md flex items-center gap-2 group"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate('bespoke')}
                className="px-7 py-3.5 bg-black/40 hover:bg-black/70 border border-white/30 text-white text-xs font-semibold uppercase tracking-widest rounded transition-colors backdrop-blur-xs"
              >
                Book Bespoke Fitting
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-6 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                <span>3-Month Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                <span>Complimentary Alterations</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                <span>3 Accra Boutiques</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CURATED SARTORIAL PILLARS (3-COLUMN CAMPAIGN GRID) */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8C724B]">
            Hand-Crafted Disciplines
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            The Boulevard Wardrobe
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Distinctive cuts balancing British Savile Row precision with Italian relaxed sophistication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Safari Suits */}
          <div
            onClick={() => onNavigate('collection', { category: 'safari-suits' })}
            className="group cursor-pointer relative rounded-xl overflow-hidden aspect-[4/5] bg-stone-900 shadow-md"
          >
            <img
              src={SAFARI_IMAGE}
              alt="Bespoke Safari Suits"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">
                Signature Collection
              </span>
              <h3 className="font-serif text-2xl font-bold">Bespoke Safari Suits</h3>
              <p className="text-xs text-stone-300 line-clamp-2">
                Structured bellow pockets, horn buttons, and high-twist tropical wool built for the African climate.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#C5A880] group-hover:text-white transition-colors">
                <span>Discover Safari Suits</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Card 2: Footwear & Arbiter */}
          <div
            onClick={() => onNavigate('collection', { category: 'footwear' })}
            className="group cursor-pointer relative rounded-xl overflow-hidden aspect-[4/5] bg-stone-900 shadow-md"
          >
            <img
              src={FOOTWEAR_IMAGE}
              alt="Arbiter Italian Shoes"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">
                Tuscany Artisans
              </span>
              <h3 className="font-serif text-2xl font-bold">European Footwear</h3>
              <p className="text-xs text-stone-300 line-clamp-2">
                Hand-burnished calfskin Oxfords, double monkstraps, and Goodyear welted masterpieces from Arbiter.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#C5A880] group-hover:text-white transition-colors">
                <span>View Footwear Gallery</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Card 3: Leather Goods & Accessories */}
          <div
            onClick={() => onNavigate('collection', { category: 'accessories' })}
            className="group cursor-pointer relative rounded-xl overflow-hidden aspect-[4/5] bg-stone-900 shadow-md"
          >
            <img
              src={ACCESSORIES_IMAGE}
              alt="Leather Goods and Accessories"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">
                Artisanal Accoutrements
              </span>
              <h3 className="font-serif text-2xl font-bold">Leather & Silk</h3>
              <p className="text-xs text-stone-300 line-clamp-2">
                Full-grain weekender duffles, solid brass dress belts, and hand-rolled Lake Como grenadine ties.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#C5A880] group-hover:text-white transition-colors">
                <span>Explore Accessories</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SHOWCASE WITH CATEGORY TABS */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-[#E6E2DC]">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#8C724B]">
              Curated Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
              Featured Creations
            </h2>
          </div>

          {/* Segmented Filter Control */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Curations' },
              { id: 'safari-suits', label: 'Safari Suits' },
              { id: 'suits', label: 'Tailored Suits' },
              { id: 'footwear', label: 'Italian Footwear' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as Category)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  selectedTab === tab.id
                    ? 'bg-[#121214] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFeatured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('shop')}
            className="px-8 py-3.5 border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white text-xs font-bold uppercase tracking-widest rounded transition-all inline-flex items-center gap-2"
          >
            <span>View Full Boulevard Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. THE BOULEVARD ESSENCE & PHILOSOPHY */}
      <section className="bg-[#141416] text-[#FAF9F6] py-16 sm:py-24 my-10">
        <div className="px-4 sm:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              The Boulevard Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              Elegance Grounded in Conviction, Heritage & Precision
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-stone-300 font-light leading-relaxed">
              <p>
                At Boulevard Menswear, we believe true personal style is not dictated by passing trends, but born from individual inspiration. Our philosophy revolves around the man who values the heritage of classic tailoring while striding purposefully into the future.
              </p>
              <p>
                From our ateliers in Accra to historic mills in Biella and Tuscan shoe workshops, we curate fabrics and silhouettes engineered for the modern African climate without sacrificing an ounce of sartorial formality.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-stone-800">
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C5A880] block">3-Month</span>
                <span className="text-xs text-stone-400 mt-1 block">No-Questions Guarantee</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C5A880] block">100%</span>
                <span className="text-xs text-stone-400 mt-1 block">European Fabrics & Leather</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C5A880] block">Accra</span>
                <span className="text-xs text-stone-400 mt-1 block">Dzorwulu · Labone · Legon</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('about')}
                className="px-6 py-3 bg-[#C5A880] hover:bg-[#B3956E] text-[#121214] text-xs font-bold uppercase tracking-wider rounded transition-colors"
              >
                Read Our Story
              </button>
              <button
                onClick={() => onNavigate('guarantee')}
                className="px-6 py-3 bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
              >
                Our 3-Month Guarantee
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden aspect-[4/5] shadow-2xl border border-stone-800">
              <img
                src={SAFARI_IMAGE}
                alt="Boulevard Tailoring Atelier"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-xs text-stone-300">
                <p className="font-serif text-sm font-semibold text-white">The Bespoke Experience</p>
                <p className="mt-1 text-stone-400">
                  Private fittings, champagne reception, and custom measurements with our master tailors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ACCRA FLAGSHIP BOUTIQUES SHOWCASE */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E6E2DC] gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#8C724B]">
              Physical Ateliers
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
              Visit Our Accra Boutiques
            </h2>
          </div>
          <button
            onClick={() => onNavigate('stores')}
            className="text-xs font-semibold text-[#8C724B] hover:text-black uppercase tracking-wider flex items-center gap-1"
          >
            <span>All Store Details & Directions</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STORE_LOCATIONS.map((store) => (
            <div
              key={store.id}
              className="bg-white border border-[#E6E2DC] rounded-xl p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C724B]">
                      {store.area}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-stone-900 mt-0.5 group-hover:text-[#8C724B] transition-colors">
                      {store.name}
                    </h3>
                  </div>
                  <div className="p-2 bg-stone-100 rounded text-stone-700">
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {store.address}
                </p>

                <div className="pt-2 border-t border-stone-100 space-y-1 text-xs text-stone-500">
                  <p className="font-medium text-stone-700">Opening Hours:</p>
                  <p>{store.hours.weekdays}</p>
                  <p>{store.hours.saturday}</p>
                </div>

                <div className="pt-2">
                  <ul className="space-y-1.5">
                    {store.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="text-[11px] text-stone-600 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#8C724B]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center gap-3">
                <button
                  onClick={() => onNavigate('bespoke')}
                  className="flex-1 py-2.5 bg-[#121214] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded text-center transition-colors"
                >
                  Book Fitting
                </button>
                <a
                  href={`https://wa.me/${store.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 border border-stone-200 hover:border-emerald-600 text-stone-700 hover:text-emerald-600 rounded transition-colors"
                  aria-label={`WhatsApp ${store.name}`}
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BESPOKE SERVICE INVITATION BANNER */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto pb-6">
        <div className="rounded-xl bg-gradient-to-r from-[#17171A] to-[#24242A] p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-stone-800 shadow-xl">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              Personal Sartorial Concierge
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Require a Made-to-Measure Suit or Wedding Consultation?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Our tailoring consultants will guide your fabric selection, lapel profile, monogramming, and fit nuances at your preferred boutique in Accra.
            </p>
          </div>
          <button
            onClick={() => onNavigate('bespoke')}
            className="px-8 py-3.5 bg-[#C5A880] hover:bg-[#B3956E] text-[#121214] text-xs font-bold uppercase tracking-widest rounded whitespace-nowrap transition-colors shadow-md"
          >
            Reserve Your Appointment
          </button>
        </div>
      </section>
    </div>
  );
};
