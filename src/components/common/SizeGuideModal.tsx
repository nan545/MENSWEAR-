import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'suits' | 'footwear' | 'shirts';
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'suits',
}) => {
  const [activeTab, setActiveTab] = useState<'suits' | 'footwear' | 'shirts'>(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <Ruler className="w-5 h-5 text-[#8C724B]" />
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Boulevard Sartorial Sizing Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 transition-colors"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-stone-200 px-5 pt-3 gap-6 text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('suits')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'suits'
                ? 'border-[#8C724B] text-[#8C724B]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Suits & Safari Jackets
          </button>
          <button
            onClick={() => setActiveTab('footwear')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'footwear'
                ? 'border-[#8C724B] text-[#8C724B]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            European Footwear
          </button>
          <button
            onClick={() => setActiveTab('shirts')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'shirts'
                ? 'border-[#8C724B] text-[#8C724B]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Formal Shirts
          </button>
        </div>

        {/* Content Table */}
        <div className="p-6 overflow-x-auto text-xs">
          {activeTab === 'suits' && (
            <div>
              <p className="text-stone-600 mb-4 leading-relaxed">
                Our suits are tailored with a classic British silhouette and natural chest drape. If you are between sizes, we recommend selecting the larger size; our master tailors at our Dzorwulu atelier provide complimentary alterations.
              </p>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-300 font-bold uppercase tracking-wider text-stone-900 bg-stone-100/60">
                    <th className="py-2.5 px-3">Size (UK/US)</th>
                    <th className="py-2.5 px-3">Chest (in)</th>
                    <th className="py-2.5 px-3">Waist (in)</th>
                    <th className="py-2.5 px-3">Shoulder (in)</th>
                    <th className="py-2.5 px-3">Sleeve Length (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 font-mono text-stone-700">
                  <tr><td className="py-2 px-3 font-semibold text-stone-900">38R</td><td className="py-2 px-3">38 – 39</td><td className="py-2 px-3">32</td><td className="py-2 px-3">17.8</td><td className="py-2 px-3">25.0</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-stone-900">40R</td><td className="py-2 px-3">40 – 41</td><td className="py-2 px-3">34</td><td className="py-2 px-3">18.4</td><td className="py-2 px-3">25.5</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-stone-900">42R</td><td className="py-2 px-3">42 – 43</td><td className="py-2 px-3">36</td><td className="py-2 px-3">19.0</td><td className="py-2 px-3">26.0</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-stone-900">44R</td><td className="py-2 px-3">44 – 45</td><td className="py-2 px-3">38</td><td className="py-2 px-3">19.6</td><td className="py-2 px-3">26.5</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-stone-900">46R</td><td className="py-2 px-3">46 – 47</td><td className="py-2 px-3">40</td><td className="py-2 px-3">20.2</td><td className="py-2 px-3">27.0</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-stone-900">48R</td><td className="py-2 px-3">48 – 49</td><td className="py-2 px-3">42</td><td className="py-2 px-3">20.8</td><td className="py-2 px-3">27.5</td></tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'footwear' && (
            <div>
              <p className="text-stone-600 mb-4 leading-relaxed">
                Arbiter and our distinguished European footwear are built on standard Continental lasts. They fit true to European sizing.
              </p>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-300 font-bold uppercase tracking-wider text-stone-900 bg-stone-100/60">
                    <th className="py-2.5 px-3">EU Size</th>
                    <th className="py-2.5 px-3">UK Size</th>
                    <th className="py-2.5 px-3">US Size</th>
                    <th className="py-2.5 px-3">Foot Length (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 font-mono text-stone-700">
                  <tr><td className="py-2 px-3 font-semibold text-stone-900">EU 40</td><td className="py-2 px-3">6.5</td><td className="py-2 px-3">7.5</td><td className="py-2 px-3">25.4</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-stone-900">EU 41</td><td className="py-2 px-3">7.5</td><td className="py-2 px-3">8.5</td><td className="py-2 px-3">26.0</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-stone-900">EU 42</td><td className="py-2 px-3">8.0</td><td className="py-2 px-3">9.0</td><td className="py-2 px-3">26.7</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-stone-900">EU 43</td><td className="py-2 px-3">9.0</td><td className="py-2 px-3">10.0</td><td className="py-2 px-3">27.3</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-stone-900">EU 44</td><td className="py-2 px-3">9.5</td><td className="py-2 px-3">10.5</td><td className="py-2 px-3">28.0</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-stone-900">EU 45</td><td className="py-2 px-3">10.5</td><td className="py-2 px-3">11.5</td><td className="py-2 px-3">28.7</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-stone-900">EU 46</td><td className="py-2 px-3">11.5</td><td className="py-2 px-3">12.5</td><td className="py-2 px-3">29.4</td></tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'shirts' && (
            <div>
              <p className="text-stone-600 mb-4 leading-relaxed">
                Measured by collar neck circumference in inches. Features a tailored fit through the torso and French double cuffs.
              </p>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-300 font-bold uppercase tracking-wider text-stone-900 bg-stone-100/60">
                    <th className="py-2.5 px-3">Collar (in)</th>
                    <th className="py-2.5 px-3">Collar (cm)</th>
                    <th className="py-2.5 px-3">Chest (in)</th>
                    <th className="py-2.5 px-3">Sleeve Length (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 font-mono text-stone-700">
                  <tr><td className="py-2 px-3 font-semibold text-stone-900">15.0</td><td className="py-2 px-3">38.0</td><td className="py-2 px-3">39.0</td><td className="py-2 px-3">34.0</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-stone-900">15.5</td><td className="py-2 px-3">39.5</td><td className="py-2 px-3">41.0</td><td className="py-2 px-3">34.5</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-stone-900">16.0</td><td className="py-2 px-3">41.0</td><td className="py-2 px-3">43.0</td><td className="py-2 px-3">35.0</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-stone-900">16.5</td><td className="py-2 px-3">42.0</td><td className="py-2 px-3">45.0</td><td className="py-2 px-3">35.5</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-stone-900">17.0</td><td className="py-2 px-3">43.0</td><td className="py-2 px-3">47.0</td><td className="py-2 px-3">36.0</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-stone-900">17.5</td><td className="py-2 px-3">44.5</td><td className="py-2 px-3">49.0</td><td className="py-2 px-3">36.5</td></tr>
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between text-stone-500">
            <span>Need bespoke guidance? Visit our Dzorwulu Flagship.</span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-900 text-white rounded hover:bg-black transition-colors font-medium"
            >
              Close Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
