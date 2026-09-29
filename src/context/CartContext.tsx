import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  items: CartItem[];
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addToCart: (product: Product, selectedSize: string, selectedColor: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  hasFreeShipping: boolean;
  promoCode: string;
  discount: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD_GHS = 5000;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('boulevard_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem('boulevard_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const addToCart = (product: Product, selectedSize: string, selectedColor: string, quantity = 1) => {
    const id = `${product.id}-${selectedSize}-${selectedColor}`;
    setItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id, product, selectedSize, selectedColor, quantity }];
    });
    setIsDrawerOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode('');
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Reactive discount calculation
  const discount = items.length === 0 ? 0 : promoCode === 'BOULEVARD10'
    ? Math.round(subtotal * 0.1)
    : promoCode === 'WELCOME500' && subtotal >= 4000
    ? 500
    : 0;

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_GHS - subtotal);
  const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD_GHS;

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'BOULEVARD10') {
      setPromoCode('BOULEVARD10');
      return { success: true, message: '10% Sartorial Welcome discount applied!' };
    }
    if (clean === 'WELCOME500') {
      if (subtotal < 4000) {
        return { success: false, message: 'WELCOME500 requires a minimum order of GH₵4,000.' };
      }
      setPromoCode('WELCOME500');
      return { success: true, message: 'GH₵500 First Order voucher applied!' };
    }
    return { success: false, message: 'Invalid or expired promotional code. Try BOULEVARD10.' };
  };

  const removePromoCode = () => {
    setPromoCode('');
  };

  const total = Math.max(0, subtotal - discount);

  return (
    <CartContext.Provider
      value={{
        items,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD_GHS,
        amountNeededForFreeShipping,
        hasFreeShipping,
        promoCode,
        discount,
        applyPromoCode,
        removePromoCode,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
