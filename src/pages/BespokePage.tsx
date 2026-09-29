import React, { useState } from 'react';
import { Sparkles, Calendar, Clock, MapPin, CheckCircle, Scissors, Phone } from 'lucide-react';
import { STORE_LOCATIONS } from '../data/stores';
import { StylingBooking } from '../types';

interface BespokePageProps {
  initialStore?: string;
  onNavigate: (route: string) => void;
}

export const BespokePage: React.FC<BespokePageProps> = ({ initialStore, onNavigate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    storeLocation: initialStore || STORE_LOCATIONS[0].name,
    serviceType: 'Bespoke Suit Consultation' as StylingBooking['serviceType'],
    preferredDate: '',
    preferredTime: '11:00 AM',
    notes: '',
  });

  const [submittedBooking, setSubmittedBooking] = useState<StylingBooking | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: StylingBooking = {
      id: `BLV-APT-${Math.floor(1000 + Math.random() * 9000)}`,
      ...formData,
      createdAt: new Date().toISOString(),
    };
    setSubmittedBooking(newBooking);
  };

  return (
    <div className="px-4 sm:px-8 max-w-5xl mx-auto py-10 space-y-12">
      {/* 1. Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 rounded text-xs font-semibold uppercase tracking-widest text-[#8C724B]">
          <Scissors className="w-3.5 h-3.5" />
          <span>Made-to-Measure & Private Wardrobe</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
          Book Your Bespoke Consultation
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
          Enjoy an unhurried, private fitting with our master sartorial consultants at our Dzorwulu atelier, Labone, or East Legon showrooms.
        </p>
      </div>

      {submittedBooking ? (
        /* Confirmation State */
        <div className="bg-white border border-[#E6E2DC] rounded-2xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-md space-y-6">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-mono font-bold text-[#8C724B]">
              APPOINTMENT #{submittedBooking.id}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Your Fitting is Confirmed
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              Thank you, {submittedBooking.fullName}. A Boulevard sartorial consultant will reach out via WhatsApp / phone to confirm your custom measurements and fabric preferences.
            </p>
          </div>

          <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 text-left text-xs space-y-2 text-stone-700">
            <p><strong>Service:</strong> {submittedBooking.serviceType}</p>
            <p><strong>Boutique:</strong> {submittedBooking.storeLocation}</p>
            <p><strong>Date & Time:</strong> {submittedBooking.preferredDate} at {submittedBooking.preferredTime}</p>
            <p><strong>Contact:</strong> {submittedBooking.phone} ({submittedBooking.email})</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={`https://wa.me/233501234567?text=Hello%20Boulevard,%20I%20just%20scheduled%20appointment%20${submittedBooking.id}%20for%20${encodeURIComponent(submittedBooking.fullName)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Connect on WhatsApp</span>
            </a>
            <button
              onClick={() => onNavigate('shop')}
              className="w-full sm:w-auto px-6 py-3 bg-[#121214] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-black transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      ) : (
        /* Booking Form Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white border border-[#E6E2DC] rounded-2xl p-6 sm:p-10 shadow-sm">
          
          {/* Left: What to Expect */}
          <div className="lg:col-span-5 space-y-6 lg:border-r lg:border-stone-200 lg:pr-8">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              The Boulevard Fitting Experience
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Every bespoke garment is crafted to reflect your posture, stature, and personal flair. Here is what to expect during your consultation:
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#121214] text-[#C5A880] text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    Fabric & Silhouette Selection
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Browse swatches from leading Biella mills, British wools, and tropical high-twist linens.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#121214] text-[#C5A880] text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    Comprehensive Anatomical Measurements
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Over 25 precise measurements accounting for shoulder pitch, armhole depth, and trouser rise.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#121214] text-[#C5A880] text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    Custom Monogramming & Details
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Choose horn or mother-of-pearl buttons, pocket styles, lapel widths, and silk lining motifs.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-600 space-y-1">
              <p className="font-semibold text-stone-900">Direct Concierge Telephone:</p>
              <p>+233 50 123 4567 / +233 50 234 5678</p>
              <p className="text-stone-400">Available Monday through Saturday, 9am - 8pm.</p>
            </div>
          </div>

          {/* Right: Appointment Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-4">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Schedule Your Fitting
            </h3>

            {/* Service Type */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Select Service
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as any })}
                className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-stone-900"
              >
                <option value="Bespoke Suit Consultation">Bespoke Suit Consultation (2-Piece / 3-Piece)</option>
                <option value="Made-to-Measure">Signature Safari Suit Tailoring</option>
                <option value="Personal Styling">Personal Wardrobe Styling & Footwear Fitting</option>
                <option value="Wedding Party Consultation">Wedding / Groomsmen Party Consultation</option>
              </select>
            </div>

            {/* Store Location */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Preferred Boutique Location
              </label>
              <select
                value={formData.storeLocation}
                onChange={(e) => setFormData({ ...formData, storeLocation: e.target.value })}
                className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-stone-900"
              >
                {STORE_LOCATIONS.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name} ({s.area})
                  </option>
                ))}
              </select>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nana Kwame Mensah"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+233 50 123 4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded focus:outline-none focus:border-stone-900"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="client@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded focus:outline-none focus:border-stone-900"
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Preferred Time Slot
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded focus:outline-none focus:border-stone-900"
                >
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:30 PM">03:30 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                  <option value="06:30 PM">06:30 PM</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Specific Occasion or Requirements (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Tell us about the occasion (e.g., wedding, state event, business gala) or particular fabrics of interest..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded focus:outline-none focus:border-stone-900"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#121214] hover:bg-black text-[#EDE8DF] text-xs font-bold uppercase tracking-widest rounded transition-colors shadow-sm mt-2"
            >
              Confirm Fitting Reservation
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
