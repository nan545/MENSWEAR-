import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, X, RotateCcw, ChevronDown, Check, Heart } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product, Category, FitType } from '../types';
import { ProductCard } from '../components/product/ProductCard';
import { useWishlist } from '../context/WishlistContext';

interface ShopPageProps {
  initialCategory?: Category;
  initialSearch?: string;
  initialFilter?: string;
  onSelectProduct: (product: Product) => void;
  onNavigate: (route: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory = 'all',
  initialSearch = '',
  initialFilter = '',
  onSelectProduct,
  onNavigate,
}) => {
  const { wishlistIds } = useWishlist();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategory);
  const [selectedFit, setSelectedFit] = useState<FitType | 'all'>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [priceMax, setPriceMax] = useState<number>(12000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'new'>('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isWishlistOnly, setIsWishlistOnly] = useState<boolean>(initialFilter === 'wishlist');

  // Collect unique sizes across products
  const availableSizes = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => {
      p.sizes.forEach((s) => set.add(s));
    });
    return Array.from(set).sort();
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;

      // Fit filter
      if (selectedFit !== 'all' && p.fit !== selectedFit) return false;

      // Size filter
      if (selectedSize !== 'all' && !p.sizes.includes(selectedSize)) return false;

      // Price filter
      if (p.price > priceMax) return false;

      // Stock filter
      if (inStockOnly && !p.inStock) return false;

      // Wishlist filter
      if (isWishlistOnly && !wishlistIds.includes(p.id)) return false;

      // Search query
      if (initialSearch.trim()) {
        const q = initialSearch.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'new') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [
    selectedCategory,
    selectedFit,
    selectedSize,
    priceMax,
    inStockOnly,
    isWishlistOnly,
    wishlistIds,
    initialSearch,
    sortBy,
  ]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedFit('all');
    setSelectedSize('all');
    setPriceMax(12000);
    setInStockOnly(false);
    setIsWishlistOnly(false);
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedFit !== 'all' ||
    selectedSize !== 'all' ||
    priceMax < 12000 ||
    inStockOnly ||
    isWishlistOnly;

  return (
    <div className="px-4 sm:px-8 max-w-7xl mx-auto py-8">
      {/* 1. Header & Title Banner */}
      <div className="mb-8 pb-6 border-b border-[#E6E2DC]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#8C724B] mb-1">
              <span>Boulevard Catalog</span>
              {initialSearch && <span>· Search: "{initialSearch}"</span>}
              {isWishlistOnly && <span>· Saved Items</span>}
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 capitalize">
              {isWishlistOnly
                ? 'Your Saved Pieces'
                : selectedCategory === 'all'
                ? 'All Menswear Collections'
                : selectedCategory.replace('-', ' ')}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
              Impeccably tailored suits, signature safari suiting, and distinguished European footwear made for discerning gentlemen.
            </p>
          </div>

          {/* Sort & Mobile Filter Trigger */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden px-3.5 py-2 border border-stone-300 rounded text-xs font-semibold flex items-center gap-2 bg-white"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filter ({filteredProducts.length})</span>
            </button>

            {/* Sort Selector */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products by"
                className="appearance-none bg-white border border-stone-300 px-3.5 py-2 pr-8 rounded text-xs font-semibold text-stone-800 focus:outline-none focus:border-stone-900 cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="new">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-stone-200/60">
            <span className="text-xs text-stone-500 font-medium">Active Filters:</span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-200 text-stone-800 text-xs rounded">
                <span>Category: {selectedCategory.replace('-', ' ')}</span>
                <button onClick={() => setSelectedCategory('all')} aria-label="Clear category filter">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedFit !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-200 text-stone-800 text-xs rounded">
                <span>Fit: {selectedFit}</span>
                <button onClick={() => setSelectedFit('all')} aria-label="Clear fit filter">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedSize !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-200 text-stone-800 text-xs rounded">
                <span>Size: {selectedSize}</span>
                <button onClick={() => setSelectedSize('all')} aria-label="Clear size filter">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {isWishlistOnly && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-100 text-red-800 text-xs rounded">
                <span>Wishlist only</span>
                <button onClick={() => setIsWishlistOnly(false)} aria-label="Clear wishlist only filter">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {priceMax < 12000 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-200 text-stone-800 text-xs rounded">
                <span>Max: GH₵ {priceMax.toLocaleString()}</span>
                <button onClick={() => setPriceMax(12000)} aria-label="Reset price filter">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {inStockOnly && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-200 text-stone-800 text-xs rounded">
                <span>In Stock only</span>
                <button onClick={() => setInStockOnly(false)} aria-label="Clear in stock filter">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={resetFilters}
              className="text-xs text-[#8C724B] hover:text-black font-semibold flex items-center gap-1 ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset all</span>
            </button>
          </div>
        )}
      </div>

      {/* 2. Main Content Grid: Desktop Filters Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-lg border border-[#E6E2DC] h-fit sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <h3 className="font-serif text-lg font-bold text-stone-900">Refine Selection</h3>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] text-[#8C724B] hover:text-black font-semibold"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">Category</h4>
            <div className="space-y-1 text-xs">
              {[
                { id: 'all', label: 'All Collections' },
                { id: 'suits', label: 'Two & Three-Piece Suits' },
                { id: 'safari-suits', label: 'Signature Safari Suits' },
                { id: 'footwear', label: 'European & Italian Footwear' },
                { id: 'shirts-trousers', label: 'Shirts & Tailored Chinos' },
                { id: 'accessories', label: 'Leather Goods & Silk' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as Category)}
                  className={`w-full text-left py-1.5 px-2 rounded transition-colors flex items-center justify-between ${
                    selectedCategory === cat.id
                      ? 'bg-stone-900 text-white font-semibold'
                      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  <span>{cat.label}</span>
                  {selectedCategory === cat.id && <Check className="w-3 h-3" />}
                </button>
              ))}
            </div>
          </div>

          {/* Fit Filter */}
          <div className="space-y-2 pt-3 border-t border-stone-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">Tailoring Fit</h4>
            <div className="flex flex-wrap gap-1.5">
              {['all', 'Tailored Fit', 'Slim Fit', 'Classic Fit'].map((fit) => (
                <button
                  key={fit}
                  onClick={() => setSelectedFit(fit as any)}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    selectedFit === fit
                      ? 'bg-[#8C724B] text-white font-semibold'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {fit === 'all' ? 'All Fits' : fit}
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="space-y-2 pt-3 border-t border-stone-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">Size</h4>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
              <button
                onClick={() => setSelectedSize('all')}
                className={`px-2 py-1 text-xs font-mono rounded ${
                  selectedSize === 'all'
                    ? 'bg-stone-900 text-white font-bold'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                All
              </button>
              {availableSizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-2 py-1 text-xs font-mono rounded ${
                    selectedSize === sz
                      ? 'bg-stone-900 text-white font-bold'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 pt-3 border-t border-stone-200">
            <div className="flex items-center justify-between text-xs">
              <h4 className="font-bold uppercase tracking-wider text-stone-800">Max Price</h4>
              <span className="font-mono font-semibold text-stone-900">
                GH₵ {priceMax.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={1000}
              max={12000}
              step={250}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              aria-label="Filter by maximum price in GHS"
              className="w-full accent-[#8C724B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-mono">
              <span>GH₵ 1,000</span>
              <span>GH₵ 12,000</span>
            </div>
          </div>

          {/* Wishlist toggle in sidebar */}
          <div className="pt-3 border-t border-stone-200">
            <button
              onClick={() => setIsWishlistOnly(!isWishlistOnly)}
              className={`w-full py-2 px-3 rounded text-xs font-semibold flex items-center justify-between transition-colors ${
                isWishlistOnly
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <span className="flex items-center gap-2">
                <Heart className={`w-3.5 h-3.5 ${isWishlistOnly ? 'fill-current' : ''}`} />
                <span>Saved Items Only</span>
              </span>
              <span className="font-mono">({wishlistIds.length})</span>
            </button>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-[#E6E2DC] rounded-xl p-12 text-center">
              <h3 className="font-serif text-xl font-bold text-stone-900">No matching garments found</h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-md mx-auto">
                No pieces meet your current filter combinations. Try loosening the price limit or resetting the category.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 px-6 py-2.5 bg-[#121214] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-black transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div>
              <p className="text-xs text-stone-500 mb-4">
                Displaying <span className="font-semibold text-stone-900">{filteredProducts.length}</span> handcrafted piece{filteredProducts.length > 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={onSelectProduct}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Slide-over Modal */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#FAF9F6] h-full shadow-2xl flex flex-col justify-between p-6 z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E6E2DC]">
                <h3 className="font-serif text-lg font-bold text-stone-900">Filters</h3>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5 text-stone-600" />
                </button>
              </div>

              {/* Category */}
              <div className="py-4 border-b border-stone-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-2">Category</h4>
                <div className="space-y-1 text-xs">
                  {[
                    { id: 'all', label: 'All Collections' },
                    { id: 'suits', label: 'Suits' },
                    { id: 'safari-suits', label: 'Safari Suits' },
                    { id: 'footwear', label: 'Footwear' },
                    { id: 'shirts-trousers', label: 'Shirts & Chinos' },
                    { id: 'accessories', label: 'Accessories' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id as Category)}
                      className={`w-full text-left py-1.5 px-2 rounded ${
                        selectedCategory === cat.id
                          ? 'bg-stone-900 text-white font-bold'
                          : 'text-stone-700'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="py-4 border-b border-stone-200">
                <div className="flex justify-between text-xs mb-2">
                  <h4 className="font-bold uppercase tracking-wider text-stone-900">Max Price</h4>
                  <span className="font-mono font-bold">GH₵ {priceMax.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={12000}
                  step={250}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  aria-label="Filter by maximum price in GHS on mobile"
                  className="w-full accent-[#8C724B]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E6E2DC] space-y-2">
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full py-3 bg-[#121214] text-white text-xs font-bold uppercase tracking-wider rounded text-center"
              >
                Apply Filters ({filteredProducts.length})
              </button>
              <button
                onClick={resetFilters}
                className="w-full py-2 text-stone-600 text-xs font-medium text-center"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
