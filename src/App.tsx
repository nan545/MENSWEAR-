import React, { useState, useEffect } from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { SmsProvider } from './context/SmsContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SearchModal } from './components/common/SearchModal';
import { CartDrawer } from './components/common/CartDrawer';
import { SmsNotificationToast } from './components/common/SmsNotificationToast';
import { SmsInboxModal } from './components/common/SmsInboxModal';
import { SmsGatewayModal } from './components/common/SmsGatewayModal';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { StoresPage } from './pages/StoresPage';
import { BespokePage } from './pages/BespokePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { GuaranteePage } from './pages/GuaranteePage';
import { ContactPage } from './pages/ContactPage';
import { Product, Category, Order } from './types';
import { PRODUCTS } from './data/products';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [routeParams, setRouteParams] = useState<Record<string, string>>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute, selectedProduct]);

  const handleNavigate = (route: string, params?: Record<string, string>) => {
    setCurrentRoute(route);
    setRouteParams(params || {});
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentRoute('product');
  };

  const handleSearchFilter = (query: string) => {
    setCurrentRoute('shop');
    setRouteParams({ search: query });
  };

  const handleOrderCompleted = (order: Order) => {
    setCompletedOrder(order);
    setCurrentRoute('order-confirmation');
  };

  return (
    <CurrencyProvider>
      <CartProvider>
        <WishlistProvider>
          <SmsProvider>
            <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#121214] font-sans">
            {/* Universal Top Header with 3-Zone Contract */}
            <Header
              currentRoute={currentRoute}
              onNavigate={handleNavigate}
              onOpenSearch={() => setIsSearchOpen(true)}
            />

            {/* Main Page Body */}
            <main className="flex-1">
              {currentRoute === 'home' && (
                <HomePage
                  onNavigate={handleNavigate}
                  onSelectProduct={handleSelectProduct}
                />
              )}

              {(currentRoute === 'shop' || currentRoute === 'collection') && (
                <ShopPage
                  key={`${currentRoute}-${routeParams.category || ''}-${routeParams.search || ''}-${routeParams.filter || ''}`}
                  initialCategory={(routeParams.category as Category) || 'all'}
                  initialSearch={routeParams.search || ''}
                  initialFilter={routeParams.filter || ''}
                  onSelectProduct={handleSelectProduct}
                  onNavigate={handleNavigate}
                />
              )}

              {currentRoute === 'product' && selectedProduct && (
                <ProductDetailPage
                  key={selectedProduct.id}
                  product={selectedProduct}
                  onNavigate={handleNavigate}
                  onSelectProduct={handleSelectProduct}
                  onDirectCheckout={() => setCurrentRoute('checkout')}
                />
              )}

              {currentRoute === 'about' && (
                <AboutPage onNavigate={handleNavigate} />
              )}

              {currentRoute === 'stores' && (
                <StoresPage onNavigate={handleNavigate} />
              )}

              {currentRoute === 'bespoke' && (
                <BespokePage
                  initialStore={routeParams.store}
                  onNavigate={handleNavigate}
                />
              )}

              {currentRoute === 'checkout' && (
                <CheckoutPage
                  onOrderComplete={handleOrderCompleted}
                  onNavigate={handleNavigate}
                />
              )}

              {currentRoute === 'order-confirmation' && completedOrder && (
                <OrderConfirmationPage
                  order={completedOrder}
                  onNavigate={handleNavigate}
                />
              )}

              {currentRoute === 'guarantee' && (
                <GuaranteePage onNavigate={handleNavigate} />
              )}

              {currentRoute === 'contact' && (
                <ContactPage />
              )}
            </main>

            {/* Universal Footer */}
            <Footer onNavigate={handleNavigate} />

            {/* Global Slide-Over Cart Drawer */}
            <CartDrawer
              onNavigateToCheckout={() => setCurrentRoute('checkout')}
              onNavigateToShop={() => setCurrentRoute('shop')}
            />

            {/* Global Live Instant Search Modal */}
            <SearchModal
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
              onSelectProduct={handleSelectProduct}
              onViewAllResults={handleSearchFilter}
            />

            {/* Real-time Atelier SMS Notification Toast */}
            <SmsNotificationToast />

            {/* Virtual Atelier Mobile SMS Inbox / History */}
            <SmsInboxModal />

            {/* Carrier Gateway & Live Telecom Settings Modal */}
            <SmsGatewayModal />
          </div>
          </SmsProvider>
        </WishlistProvider>
      </CartProvider>
    </CurrencyProvider>
  );
}
