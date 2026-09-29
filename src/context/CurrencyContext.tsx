import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyCode, CurrencyConfig } from '../types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  GHS: { code: 'GHS', symbol: 'GH₵', rate: 1.0, name: 'Ghanaian Cedi' },
  USD: { code: 'USD', symbol: '$', rate: 0.065, name: 'US Dollar' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.050, name: 'British Pound' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.059, name: 'Euro' },
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountGhs: number) => string;
  config: CurrencyConfig;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>('GHS');

  useEffect(() => {
    const saved = localStorage.getItem('boulevard_currency') as CurrencyCode;
    if (saved && CURRENCIES[saved]) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    localStorage.setItem('boulevard_currency', code);
  };

  const config = CURRENCIES[currency];

  const formatPrice = (amountGhs: number): string => {
    const converted = amountGhs * config.rate;
    if (currency === 'GHS') {
      return `${config.symbol} ${amountGhs.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
    return `${config.symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, config }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
};
