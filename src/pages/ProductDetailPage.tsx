import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Ruler, 
  Truck, 
  Scissors, 
  Plus, 
  Minus, 
  Check, 
  ArrowLeft,
  Share2,
  Calendar
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SizeGuideModal } from '../components/common/SizeGuideModal';
import { ProductCard } from '../components/product/ProductCard';

interface ProductDetailPageProps {
  product: Product;
  onNavigate: (route: string, params?: Record<string, string>) => void;
  onSelectProduct: (product: Product) => void;
  onDirectCheckout: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onNavigate,
  onSelectProduct,
  onDirectCheckout,
}) => {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'care'>('details');
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync state when product changes
  React.useEffect(() => {
    setActiveImageIdx(0);
    setSelectedSize(product.sizes[0] || 'Standard');
    setSelectedColor(product.colors[0]?.name || 'Standard');
    setQuantity(1);
  }, [product.id]);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    onDirectCheckout();
  };

  const handleShare = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      // Fallback if clipboard access denied in iframe
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Related products in same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="px-4 sm:px-8 max-w-7xl mx-auto py-8">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 mb-6">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-stone-900 transition-colors"
        >
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => onNavigate('shop')}
          className="hover:text-stone-900 transition-colors"
        >
          Catalog
        </button>
        <span>/</span>
        <button
          onClick={() => onNavigate('collection', { category: product.category })}
          className="capitalize hover:text-stone-900 transition-colors"
        >
          {product.category.replace('-', ' ')}
        </button>
        <span>/</span>
        <span className="text-stone-900 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* 2. Main Product Grid: Sticky Gallery (Left) & Contiguous Purchase Module (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left: Gallery Column (7 cols on desktop) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Selected Image */}
          <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-xl overflow-hidden bg-[#F5F3EF] border border-[#E6E2DC] shadow-xs">
            <img
              src={product.images[activeImageIdx] || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top transition-all duration-300"
            />

            {/* Wishlist button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full transition-all ${
                isFavorited
                  ? 'bg-red-50 text-red-600 shadow-sm'
                  : 'bg-white/90 text-stone-800 hover:text-black shadow-xs hover:bg-white'
              }`}
              aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
            </button>

            {/* Guarantee Tag */}
            <div className="absolute bottom-4 left-4 bg-[#141416]/85 backdrop-blur-xs text-[#EDE8DF] text-xs font-semibold px-3 py-1.5 rounded flex items-center gap-1.5 border border-white/10">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>3-Month No-Questions Guarantee</span>
            </div>
          </div>

          {/* Thumbnails Row */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-stone-100 ${
                    activeImageIdx === idx
                      ? 'border-[#8C724B] shadow-xs'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} angle ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Contiguous Purchase Module (5 cols on desktop) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            {/* Clean unboxed metadata */}
            <div className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-widest font-semibold">
              <span>{product.fit}</span>
              <span aria-hidden="true">·</span>
              <span>SKU: {product.sku}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 font-bold">In Stock</span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight">
              {product.name}
            </h1>

            {/* Tagline */}
            <p className="text-xs sm:text-sm text-stone-600 font-medium">
              {product.tagline}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="font-mono text-base text-stone-400 line-through tabular-nums">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
          </div>

          <hr className="border-[#E6E2DC]" />

          {/* Color Selection */}
          {product.colors.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-900">Color Tone:</span>
                <span className="text-stone-600 font-medium">{selectedColor}</span>
              </div>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs transition-all ${
                      selectedColor === c.name
                        ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                        : 'border-stone-300 bg-white text-stone-800 hover:border-stone-500'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/20"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-900">
                Select Size ({product.category === 'footwear' ? 'EU' : 'UK/US'}):
              </span>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-[#8C724B] hover:text-black font-semibold flex items-center gap-1"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide</span>
              </button>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`py-2 text-xs font-mono font-medium rounded border transition-all text-center ${
                    selectedSize === sz
                      ? 'border-stone-900 bg-stone-900 text-white shadow-xs font-bold'
                      : 'border-stone-300 bg-white text-stone-800 hover:border-stone-700'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Buy CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-stone-300 rounded bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2.5 text-stone-600 hover:text-black hover:bg-stone-100"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-mono font-bold text-stone-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2.5 text-stone-600 hover:text-black hover:bg-stone-100"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-6 bg-[#121214] hover:bg-black text-[#EDE8DF] text-xs font-bold uppercase tracking-widest rounded flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
                <span>Add to Shopping Bag</span>
              </button>
            </div>

            {/* Direct Express Buy CTA */}
            <button
              onClick={handleBuyNow}
              className="w-full py-3 px-6 bg-[#C5A880] hover:bg-[#B3956E] text-[#121214] text-xs font-bold uppercase tracking-widest rounded transition-colors shadow-xs"
            >
              Express Checkout
            </button>
          </div>

          {/* In-store Services & Reassurance Strip */}
          <div className="bg-[#FAF7F2] border border-[#E8E2D8] rounded-lg p-4 space-y-3 text-xs text-stone-700">
            <div className="flex items-center gap-2.5">
              <Scissors className="w-4 h-4 text-[#8C724B] shrink-0" />
              <span>
                <strong>Complimentary Alterations:</strong> Tailored in-person at our Dzorwulu atelier.
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#8C724B] shrink-0" />
              <span>
                <strong>Accra Express Delivery:</strong> Same-day or next-day courier across Greater Accra.
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#8C724B] shrink-0" />
              <button
                onClick={() => onNavigate('bespoke')}
                className="text-[#8C724B] underline font-semibold hover:text-black"
              >
                Prefer to try on in store? Reserve a fitting appointment.
              </button>
            </div>
          </div>

          {/* Specifications Accordion / Tabs */}
          <div className="border-t border-[#E6E2DC] pt-4">
            <div className="flex border-b border-stone-200 gap-6 text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'details'
                    ? 'border-[#8C724B] text-[#8C724B]'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                Sartorial Details
              </button>
              <button
                onClick={() => setActiveTab('fabric')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'fabric'
                    ? 'border-[#8C724B] text-[#8C724B]'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                Fabric & Origin
              </button>
              <button
                onClick={() => setActiveTab('care')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'care'
                    ? 'border-[#8C724B] text-[#8C724B]'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                Care & Longevity
              </button>
            </div>

            <div className="py-4 text-xs text-stone-600 leading-relaxed">
              {activeTab === 'details' && (
                <div className="space-y-3">
                  <p>{product.description}</p>
                  <ul className="space-y-1.5 pt-2">
                    {product.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#8C724B] font-bold">·</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'fabric' && (
                <div className="space-y-2">
                  <p><strong>Fabric Specification:</strong> {product.fabric}</p>
                  <p><strong>Origin & Craft:</strong> {product.origin}</p>
                  <p><strong>Cut & Silhouette:</strong> {product.fit}</p>
                </div>
              )}

              {activeTab === 'care' && (
                <ul className="space-y-1.5">
                  {product.care.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#8C724B] font-bold">·</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Share link button */}
            <div className="pt-2 flex items-center justify-between text-xs text-stone-500">
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 hover:text-stone-900 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Link copied to clipboard!' : 'Share piece'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Related Pieces Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-10 border-t border-[#E6E2DC]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8C724B]">
                Complementary Pieces
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                You May Also Admire
              </h3>
            </div>
            <button
              onClick={() => onNavigate('collection', { category: product.category })}
              className="text-xs font-semibold text-[#8C724B] hover:text-black uppercase tracking-wider"
            >
              View All In {product.category.replace('-', ' ')}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        defaultTab={
          product.category === 'footwear'
            ? 'footwear'
            : product.category === 'shirts-trousers'
            ? 'shirts'
            : 'suits'
        }
      />
    </div>
  );
};
