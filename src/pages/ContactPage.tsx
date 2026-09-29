import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { STORE_LOCATIONS } from '../data/stores';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="px-4 sm:px-8 max-w-7xl mx-auto py-10 space-y-12">
      {/* 1. Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#8C724B]">
          Client Concierge & Inquiries
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
          We Await Your Acquaintance
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
          Whether inquiring about a bespoke cut, sizing recommendations, or wedding party styling, our concierge team is dedicated to your complete satisfaction.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-[#E6E2DC] shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Message Received
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto">
                Thank you, {formData.name}. A Boulevard Menswear client advisor will review your note and respond within two hours during boutique hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                Send A Private Message
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nana Kwame"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-stone-900"
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
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

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
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-stone-900"
                >
                  <option value="General Inquiry">General Sartorial Inquiry</option>
                  <option value="Safari Suit Commission">Safari Suit Made-to-Measure</option>
                  <option value="Wedding Consultation">Wedding & Groomsmen Wardrobe</option>
                  <option value="Alteration Request">Alteration / 3-Month Guarantee Request</option>
                  <option value="Footwear Sizing">Arbiter Footwear Sizing Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Message Details *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How may our advisors assist your wardrobe today?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-stone-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#121214] hover:bg-black text-[#EDE8DF] text-xs font-bold uppercase tracking-widest rounded flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Send className="w-4 h-4 text-[#C5A880]" />
                <span>Transmit Message to Concierge</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Flagships & Quick Contacts (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#141416] text-white p-6 sm:p-8 rounded-2xl border border-stone-800 space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
                Immediate Assistance
              </span>
              <h3 className="font-serif text-2xl font-bold mt-1">
                WhatsApp Live Concierge
              </h3>
              <p className="text-xs text-stone-300 mt-1">
                Speak directly with our head stylist for instantaneous advice, fabric pictures, or appointment confirmations.
              </p>
            </div>

            <a
              href="https://wa.me/233501234567"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-widest rounded flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Launch WhatsApp Chat (+233 50 123 4567)</span>
            </a>
          </div>

          {/* Accra Boutiques List */}
          <div className="bg-white p-6 rounded-2xl border border-[#E6E2DC] space-y-4">
            <h4 className="font-serif text-lg font-bold text-stone-900">
              Accra Showroom Locations
            </h4>

            <div className="divide-y divide-stone-100 text-xs text-stone-600 space-y-3">
              {STORE_LOCATIONS.map((loc) => (
                <div key={loc.id} className="pt-3 space-y-1">
                  <p className="font-bold text-stone-900">{loc.name}</p>
                  <p className="text-stone-500">{loc.address}</p>
                  <p className="font-mono text-stone-700">{loc.phone}</p>
                  <p className="text-[11px] text-stone-400">{loc.hours.weekdays}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
