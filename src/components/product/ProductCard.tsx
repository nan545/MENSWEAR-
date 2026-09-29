import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { formatPrice } = useCurrency();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedQuickSize, setSelectedQuickSize] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const currentImage = isHovered && product.images[1] ? product.images[1] : product.images[0];

  const handleQuickAdd = (e: React.MouseEvent, size: string) => {
    e.stopPropagation();
    setSelectedQuickSize(size);
    addToCart(product, size, product.colors[0]?.name || 'Standard', 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div
      onClick={() => onSelect(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setSelectedQuickSize(null);
      }}
      className="group cursor-pointer flex flex-col bg-white border border-[#EBE8E3] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#C5A880]/50"
    >
      {/* 1. Image Container (takes ~70% of card visual balance) */}
      <div className="relative aspect-[3/4] bg-[#F5F3EF] overflow-hidden">
        <img
          src={currentImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Minimal text kicker tag (max 1, unboxed text or quiet subtle tag, no bright pill) */}
        {product.bestSeller && (
          <span className="absolute top-3 left-3 bg-[#141416]/90 text-[#E0D8CB] text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-xs backdrop-blur-xs">
            Signature Piece
          </span>
        )}
        {product.isNew && !product.bestSeller && (
          <span className="absolute top-3 left-3 bg-[#8C724B] text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-xs">
            New Arrival
          </span>
        )}

        {/* Wishlist toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isFavorited
              ? 'bg-red-50 text-red-600 shadow-sm'
              : 'bg-white/80 text-stone-700 hover:text-black hover:bg-white shadow-xs'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Size Overlay on desktop hover */}
        <div
          className={`absolute inset-x-0 bottom-0 bg-[#141416]/90 backdrop-blur-xs p-3 transition-transform duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex items-center justify-between text-[11px] text-[#C5A880] mb-1.5 font-medium">
            <span>Quick Add Size:</span>
            {justAdded && (
              <span className="flex items-center gap-1 text-emerald-400">
                <Check className="w-3 h-3" /> Added to Bag
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {product.sizes.slice(0, 6).map((sz) => (
              <button
                key={sz}
                onClick={(e) => handleQuickAdd(e, sz)}
                className={`px-2 py-1 text-[11px] font-mono rounded transition-colors ${
                  selectedQuickSize === sz
                    ? 'bg-[#C5A880] text-black font-bold'
                    : 'bg-stone-800 text-stone-200 hover:bg-[#C5A880] hover:text-black'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Clean Metadata & Information */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Quiet unboxed metadata */}
          <div className="flex items-center gap-1.5 text-[11px] text-stone-500 uppercase tracking-wider mb-1 font-medium">
            <span>{product.fit}</span>
            <span aria-hidden="true">·</span>
            <span>{product.origin.includes('Italy') ? 'Italian Craft' : 'Hand-Tailored'}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-[17px] font-semibold text-stone-900 leading-snug group-hover:text-[#8C724B] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
            {product.fabric}
          </p>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-3 mt-2 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-base font-bold text-stone-900 tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="font-mono text-xs text-stone-400 line-through tabular-nums">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Mobile direct add icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="sm:hidden p-1.5 text-stone-700 hover:text-black"
            aria-label="View Product"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
