import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Sparkles, Check, ArrowRight } from 'lucide-react';
import { STORE_LOCATIONS } from '../data/stores';
import { StoreLocation } from '../types';

interface StoresPageProps {
  onNavigate: (route: string, params?: Record<string, string>) => void;
}

export const StoresPage: React.FC<StoresPageProps> = ({ onNavigate }) => {
  const [selectedStore, setSelectedStore] = useState<StoreLocation>(STORE_LOCATIONS[0]);

  return (
    <div className="px-4 sm:px-8 max-w-7xl mx-auto py-8 space-y-12">
      {/* 1. Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#8C724B]">
          Physical Ateliers & Showrooms
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
          Our Accra Boutiques
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
          Visit us for private styling, made-to-measure suiting consultations, and complimentary alterations by our master tailors.
        </p>
      </div>

      {/* 2. Store Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STORE_LOCATIONS.map((store) => (
          <div
            key={store.id}
            onClick={() => setSelectedStore(store)}
            className={`cursor-pointer rounded-xl p-6 border transition-all duration-300 flex flex-col justify-between ${
              selectedStore.id === store.id
                ? 'bg-white border-[#8C724B] shadow-lg ring-1 ring-[#8C724B]'
                : 'bg-white/80 border-[#E6E2DC] hover:border-stone-400 hover:shadow-sm'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C724B]">
                    {store.area}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-stone-900 mt-1">
                    {store.name}
                  </h3>
                </div>
                {selectedStore.id === store.id && (
                  <span className="px-2 py-0.5 bg-[#8C724B] text-white text-[10px] font-semibold uppercase tracking-wider rounded">
                    Selected
                  </span>
                )}
              </div>

              <p className="text-xs text-stone-600">{store.address}</p>

              <div className="text-xs text-stone-500 space-y-1 pt-2 border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#8C724B]" />
                  <span>{store.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#8C724B]" />
                  <span>{store.hours.weekdays}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-100">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('bespoke', { store: store.name });
                }}
                className="w-full py-2 bg-[#121214] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded text-center transition-colors"
              >
                Book In-Store Fitting
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Detailed Selected Store Spotlight */}
      <div className="bg-white rounded-2xl border border-[#E6E2DC] p-6 sm:p-10 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Store Info */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8C724B]">
                Selected Atelier
              </span>
              <h2 className="font-serif text-3xl font-bold text-stone-900 mt-1">
                {selectedStore.name}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#8C724B] shrink-0" />
                <span>{selectedStore.address}</span>
              </p>
            </div>

            {/* Operating Hours Box */}
            <div className="bg-[#FAF9F6] p-4 rounded-lg border border-[#E6E2DC] text-xs space-y-2">
              <h4 className="font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#8C724B]" />
                <span>Operating Hours</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-600">
                <p><strong>Mon – Fri:</strong> {selectedStore.hours.weekdays.replace('Monday – Friday: ', '')}</p>
                <p><strong>Saturday:</strong> {selectedStore.hours.saturday.replace('Saturday: ', '')}</p>
                <p className="sm:col-span-2"><strong>Sunday:</strong> {selectedStore.hours.sunday.replace('Sunday: ', '')}</p>
              </div>
            </div>

            {/* Services Available */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">
                Services & Amenities at this Boutique
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedStore.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-stone-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('bespoke', { store: selectedStore.name })}
                className="px-6 py-3 bg-[#121214] hover:bg-black text-[#EDE8DF] text-xs font-bold uppercase tracking-widest rounded flex items-center gap-2 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Schedule Private Appointment</span>
              </button>

              <a
                href={`https://wa.me/${selectedStore.whatsapp.replace(/\D/g, '')}?text=Hello%20Boulevard%20Menswear,%20I%20would%20like%20to%20inquire%20about%20a%20fitting%20at%20${encodeURIComponent(selectedStore.name)}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 border border-stone-300 hover:border-emerald-600 text-stone-800 hover:text-emerald-700 text-xs font-semibold uppercase tracking-wider rounded flex items-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Image & Map Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-stone-100 border border-stone-200 shadow-inner">
              <img
                src={selectedStore.image}
                alt={selectedStore.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                <p className="font-semibold text-sm">{selectedStore.area}</p>
                <p className="text-stone-300 text-[11px]">Private Fitting & Tailoring Available</p>
              </div>
            </div>

            {/* Simulated Live Boutique Map */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg flex items-center justify-between text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>Accra Central · Greater Accra Region</span>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=Boulevard+Menswear+${encodeURIComponent(selectedStore.address)}`}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#8C724B] hover:underline flex items-center gap-1"
              >
                <span>Google Maps</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
