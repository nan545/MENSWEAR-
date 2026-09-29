import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown, Phone, MapPin, Sparkles, MessageSquare, Settings } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCurrency, CURRENCIES } from '../../context/CurrencyContext';
import { useWishlist } from '../../context/WishlistContext';
import { useSms } from '../../context/SmsContext';
import { CurrencyCode } from '../../types';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string, params?: Record<string, string>) => void;
  onOpenSearch: () => void;
}

const ANNOUNCEMENTS = [
  'COMPLIMENTARY DELIVERY ACROSS GHANA ON ORDERS OVER GH₵5,000',
  'REAL-TIME SMS UPDATES DISPATCHED WHEN ORDERS ARE PLACED & PROCESSED',
  'DISTINGUISHED EUROPEAN FOOTWEAR & ARBITER ITALIAN CRAFTSMANSHIP',
  'OUR ICONIC 3-MONTH NO-QUESTIONS-ASKED SATISFACTION GUARANTEE',
  'BESPOKE SUITING & PRIVATE FITTINGS IN DZORWULU, LABONE & EAST LEGON',
];

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate, onOpenSearch }) => {
  const { itemCount, openDrawer } = useCart();
  const { currency, setCurrency } = useCurrency();
  const { wishlistCount } = useWishlist();
  const { unreadCount, openInbox, messages, openGatewayModal } = useSms();
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Rotate announcements
  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Detect scroll for subtle header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Suits & Tailoring', route: 'collection', params: { category: 'suits' } },
    { label: 'Safari Suits', route: 'collection', params: { category: 'safari-suits' } },
    { label: 'Footwear', route: 'collection', params: { category: 'footwear' } },
    { label: 'Shirts & Chinos', route: 'collection', params: { category: 'shirts-trousers' } },
    { label: 'Leather & Accessories', route: 'collection', params: { category: 'accessories' } },
    { label: 'Our Stores', route: 'stores' },
    { label: 'Bespoke Atelier', route: 'bespoke' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6] border-b border-[#E6E2DC] transition-shadow duration-200">
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#141416] text-[#E0D8CB] text-[11px] tracking-widest font-medium py-2 px-4 border-b border-black/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Store locations quick info */}
          <div className="hidden lg:flex items-center gap-4 text-[#A89E8F] text-[11px]">
            <button
              onClick={() => onNavigate('stores')}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <MapPin className="w-3 h-3 text-[#C5A880]" />
              <span>Dzorwulu · Labone · East Legon</span>
            </button>
            <span className="text-[#3E3C38]">|</span>
            <a
              href="https://wa.me/233501234567"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-[#C5A880]" />
              <span>Concierge: +233 50 123 4567</span>
            </a>
          </div>

          {/* Center: Dynamic Announcement */}
          <div className="flex-1 text-center font-medium overflow-hidden">
            <span className="inline-block transition-all duration-500 ease-in-out">
              {ANNOUNCEMENTS[announcementIdx]}
            </span>
          </div>

          {/* Right: Currency Selector */}
          <div className="relative">
            <button
              onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
              className="flex items-center gap-1 px-2 py-0.5 rounded text-[#E0D8CB] hover:text-white transition-colors uppercase text-[11px]"
              aria-label="Select Currency"
            >
              <span>{currency} ({CURRENCIES[currency].symbol})</span>
              <ChevronDown className="w-3 h-3 text-[#C5A880]" />
            </button>

            {isCurrencyDropdownOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-[#1A1A1D] border border-[#3E3C38] rounded-md shadow-xl py-1 z-50">
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                  <button
                    key={code}
                    onClick={() => {
                      setCurrency(code);
                      setIsCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-[11px] flex items-center justify-between hover:bg-[#2B2B30] transition-colors ${
                      currency === code ? 'text-[#C5A880] font-semibold' : 'text-stone-300'
                    }`}
                  >
                    <span>{CURRENCIES[code].name}</span>
                    <span className="font-mono">{CURRENCIES[code].symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Top Bar Contract: Brand Zone (1 line) — Nav Links (single-line) — 1-2 Actions */}
      <div className={`px-4 sm:px-8 max-w-7xl mx-auto py-3.5 transition-all duration-200 ${isScrolled ? 'py-2.5' : 'py-4'}`}>
        <div className="flex items-center justify-between gap-4">
          
          {/* Mobile menu trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 text-stone-900 hover:text-[#C5A880] transition-colors"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={onOpenSearch}
              className="p-1.5 text-stone-900 hover:text-[#C5A880] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Zone 1: Single text element wordmark */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <button
              onClick={() => onNavigate('home')}
              className="group inline-flex flex-col items-center lg:items-start text-left focus:outline-none"
            >
              <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-[0.18em] text-[#121214] uppercase group-hover:text-[#8C724B] transition-colors">
                BOULEVARD
              </span>
              <span className="text-[9px] tracking-[0.38em] uppercase text-stone-600 font-sans -mt-1 font-medium">
                MENSWEAR
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wide text-stone-800">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => onNavigate(link.route, link.params)}
                className="relative py-1 hover:text-[#8C724B] transition-colors whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#8C724B] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Interactive Affordances */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Desktop Search Button */}
            <button
              onClick={onOpenSearch}
              className="hidden lg:flex items-center gap-2 text-stone-700 hover:text-[#8C724B] transition-colors text-[13px] font-medium py-1 px-2.5 rounded hover:bg-stone-200/50"
              aria-label="Search Catalog"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => onNavigate('shop', { filter: 'wishlist' })}
              className="relative p-1.5 text-stone-800 hover:text-[#8C724B] transition-colors"
              aria-label={`Wishlist (${wishlistCount} items)`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8C724B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* SMS Atelier Updates Inbox Button */}
            <button
              onClick={openInbox}
              className="relative p-1.5 text-stone-800 hover:text-[#8C724B] transition-colors"
              aria-label={`SMS Notifications (${messages.length} messages)`}
              title="View SMS notifications from Boulevard Atelier"
            >
              <MessageSquare className="w-5 h-5" />
              {messages.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {unreadCount > 0 ? unreadCount : messages.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={openDrawer}
              className="relative flex items-center gap-2 px-3 py-1.5 bg-[#141416] hover:bg-[#252528] text-white rounded transition-colors text-xs font-medium tracking-wide"
              aria-label={`Shopping Bag (${itemCount} items)`}
            >
              <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-[#C5A880] text-[#141416] text-[10px] font-bold px-1.5 py-0.5 rounded-sm ml-0.5">
                {itemCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="relative w-4/5 max-w-sm bg-[#FAF9F6] h-full shadow-2xl flex flex-col justify-between p-6 z-10 overflow-y-auto">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[#E6E2DC]">
                <div>
                  <span className="font-serif text-2xl font-semibold tracking-wider text-[#121214]">
                    BOULEVARD
                  </span>
                  <p className="text-[9px] tracking-widest text-stone-500 uppercase">MENSWEAR</p>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-stone-600 hover:text-black"
                  aria-label="Close Mobile Menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Links */}
              <div className="py-6 flex flex-col gap-4 text-base font-medium text-stone-900">
                <button
                  onClick={() => {
                    onNavigate('home');
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left py-2 border-b border-stone-200/60 hover:text-[#8C724B] transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    onNavigate('shop');
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left py-2 border-b border-stone-200/60 hover:text-[#8C724B] transition-colors"
                >
                  All Collections
                </button>
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => {
                      onNavigate(link.route, link.params);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left py-2 border-b border-stone-200/60 hover:text-[#8C724B] transition-colors flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-[#C5A880]">→</span>
                  </button>
                ))}
                <button
                  onClick={() => {
                    onNavigate('about');
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left py-2 border-b border-stone-200/60 hover:text-[#8C724B] transition-colors"
                >
                  About Boulevard
                </button>
                <button
                  onClick={() => {
                    onNavigate('guarantee');
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left py-2 border-b border-stone-200/60 hover:text-[#8C724B] transition-colors"
                >
                  3-Month Guarantee
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openInbox();
                  }}
                  className="text-left py-2 border-b border-stone-200/60 hover:text-[#8C724B] transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#8C724B]" />
                    <span>SMS Order Updates</span>
                  </span>
                  {messages.length > 0 && (
                    <span className="bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {messages.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openGatewayModal();
                  }}
                  className="text-left py-2 border-b border-stone-200/60 hover:text-[#8C724B] transition-colors flex items-center justify-between text-xs text-stone-600"
                >
                  <span className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-stone-500" />
                    <span>SMS Carrier & Push Settings</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Bottom contact & actions */}
            <div className="pt-6 border-t border-[#E6E2DC] space-y-4">
              <button
                onClick={() => {
                  onNavigate('bespoke');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-[#141416] text-[#C5A880] text-xs font-semibold uppercase tracking-wider rounded text-center flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Book Bespoke Fitting</span>
              </button>

              <div className="text-xs text-stone-600 space-y-1.5">
                <p className="font-semibold text-stone-800">Accra Boutiques:</p>
                <p>Dzorwulu · Labone · East Legon</p>
                <p className="pt-1">Tel / WhatsApp: +233 50 123 4567</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
