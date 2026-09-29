import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onViewAllResults: (query: string) => void;
}

const POPULAR_SEARCHES = [
  'Safari Suit',
  'Arbiter Oxford Shoes',
  'Double Breasted Zecca',
  'Midnight Navy Suit',
  'Egyptian Cotton Shirt',
  'Leather Duffle Bag',
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onViewAllResults,
}) => {
  const [query, setQuery] = useState('');
  const { formatPrice } = useCurrency();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-xs">
      <div className="w-full max-w-3xl bg-[#FAF9F6] rounded-lg shadow-2xl overflow-hidden border border-[#E6E2DC] flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#E6E2DC] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-stone-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search suits, safari suits, European shoes, shirts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) {
                onViewAllResults(query);
                onClose();
              }
            }}
            className="w-full text-base sm:text-lg text-stone-900 placeholder-stone-400 focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 ml-2 text-stone-500 hover:text-black rounded hover:bg-stone-100"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Body Content */}
        <div className="p-5 overflow-y-auto flex-1">
          {query.trim() === '' ? (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Trending Sartorial Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 border border-stone-200/80 rounded-md text-xs font-medium text-stone-800 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <div className="mt-8 border-t border-stone-200/60 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
                  Featured Sartorial Icons
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRODUCTS.slice(0, 4).map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="flex items-center gap-3 p-2.5 rounded-lg border border-stone-200 hover:border-[#C5A880] hover:bg-white text-left transition-all group"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-14 object-cover rounded bg-stone-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-stone-900 truncate group-hover:text-[#8C724B] transition-colors">
                          {product.name}
                        </p>
                        <p className="text-[11px] text-stone-500 truncate">{product.fabric}</p>
                        <p className="text-xs font-mono font-medium text-[#111112] mt-0.5">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                  Found {results.length} item{results.length > 1 ? 's' : ''} for "{query}"
                </p>
                <button
                  onClick={() => {
                    onViewAllResults(query);
                    onClose();
                  }}
                  className="text-xs font-medium text-[#8C724B] hover:underline flex items-center gap-1"
                >
                  <span>View all in shop</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="divide-y divide-stone-200">
                {results.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="w-full py-3.5 px-2 flex items-center gap-4 hover:bg-white text-left rounded-md transition-colors group"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-18 object-cover rounded bg-stone-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[11px] text-stone-500">
                        <span className="capitalize">{product.category.replace('-', ' ')}</span>
                        <span>·</span>
                        <span>{product.fit}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-stone-900 group-hover:text-[#8C724B] transition-colors truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-stone-500 line-clamp-1">{product.tagline}</p>
                      <p className="text-xs font-mono font-semibold text-stone-900 mt-1">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#8C724B] group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-sm font-medium text-stone-800">No pieces found matching "{query}"</p>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Try searching for "safari", "oxford", "double-breasted", "navy", or browse our full collections.
              </p>
              <button
                onClick={() => {
                  onViewAllResults('');
                  onClose();
                }}
                className="mt-4 px-4 py-2 bg-[#121214] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-stone-800 transition-colors"
              >
                Browse All Collections
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
