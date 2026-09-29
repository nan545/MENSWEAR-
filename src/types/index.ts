export type Category = 'all' | 'suits' | 'safari-suits' | 'footwear' | 'shirts-trousers' | 'accessories';

export type Subcategory = 
  | 'double-breasted' 
  | 'three-piece' 
  | 'two-piece' 
  | 'safari' 
  | 'oxford' 
  | 'monkstrap' 
  | 'derby' 
  | 'moccasin' 
  | 'formal-shirt' 
  | 'chinos' 
  | 'leather-bag' 
  | 'belt' 
  | 'ties';

export type FitType = 'Tailored Fit' | 'Slim Fit' | 'Classic Fit';

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: Category;
  subcategory: Subcategory;
  price: number; // In GHS (Ghanaian Cedi)
  compareAtPrice?: number;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  fit: FitType;
  fabric: string;
  origin: string;
  inStock: boolean;
  featured?: boolean;
  isNew?: boolean;
  bestSeller?: boolean;
  sku: string;
  details: string[];
  care: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export type CurrencyCode = 'GHS' | 'USD' | 'GBP' | 'EUR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // Multiply GHS price by rate
  name: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  area: string;
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  features: string[];
  image: string;
}

export interface StylingBooking {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  storeLocation: string;
  serviceType: 'Bespoke Suit Consultation' | 'Personal Styling' | 'Wedding Party Consultation' | 'Made-to-Measure';
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    countryCode?: string;
    smsNotifications?: boolean;
    address: string;
    apartment?: string;
    city: string;
    region: string;
    postalCode?: string;
    country: string;
  };
  deliveryMethod: 'accra-express' | 'ghana-standard' | 'pickup-dzorwulu' | 'pickup-labone' | 'international';
  deliveryFee: number;
  paymentMethod: 'momo' | 'card' | 'cod' | 'bank_transfer';
  paymentDetails?: {
    network?: 'MTN' | 'Telecel' | 'AirtelTigo';
    momoNumber?: string;
  };
  subtotal: number;
  discount: number;
  total: number;
  currency: CurrencyCode;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}

export type SmsType = 'order_placed' | 'order_processing' | 'order_dispatched' | 'consultation_booked';

export interface SmsGatewayConfig {
  provider: 'simulated' | 'twilio' | 'arkesel';
  twilioAccountSid?: string;
  twilioAuthToken?: string;
  twilioPhoneNumber?: string;
  arkeselApiKey?: string;
  arkeselSenderId?: string;
}

export interface SmsMessage {
  id: string;
  orderNumber?: string;
  recipientPhone: string;
  recipientName: string;
  senderId: 'BOULEVARD';
  type: SmsType;
  title: string;
  message: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'failed';
  read?: boolean;
  provider?: 'simulated' | 'twilio' | 'arkesel';
  gatewayDetails?: string;
}
