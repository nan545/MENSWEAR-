import { StoreLocation } from '../types';
import DZORWULU_IMG from '../assets/images/hero_boulevard_suit_1790673872929.jpg';
import LABONE_IMG from '../assets/images/category_italian_shoes_1790673896488.jpg';
import EAST_LEGON_IMG from '../assets/images/category_accessories_bag_1790673910920.jpg';

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: 'dzorwulu-flagship',
    name: 'Boulevard Menswear Dzorwulu Flagship & Atelier',
    area: 'Dzorwulu, Accra',
    address: 'Blohum Street, Near Dzorwulu Junction, Accra, Ghana',
    city: 'Accra',
    phone: '+233 50 123 4567',
    whatsapp: '+233 50 123 4567',
    email: 'dzorwulu@boulevardmenswear.com',
    hours: {
      weekdays: 'Monday – Friday: 9:00 AM – 7:30 PM',
      saturday: 'Saturday: 9:30 AM – 8:00 PM',
      sunday: 'Sunday: 1:00 PM – 6:00 PM (By Appointment)',
    },
    features: [
      'Master Bespoke Tailoring & Fitting Suite',
      'Full Safari Suit & Formal Wear Collection',
      'Arbiter & European Luxury Footwear Gallery',
      'Private VIP Styling Lounge & Champagne Service',
      'Complimentary In-House Alterations & Hemming',
    ],
    image: DZORWULU_IMG,
  },
  {
    id: 'labone-boutique',
    name: 'Boulevard Menswear Labone Boutique',
    area: 'Labone, Accra',
    address: 'Kweku Baako Street, Off Ndabaningi Sithole Rd, Labone, Accra',
    city: 'Accra',
    phone: '+233 50 234 5678',
    whatsapp: '+233 50 234 5678',
    email: 'labone@boulevardmenswear.com',
    hours: {
      weekdays: 'Monday – Friday: 9:30 AM – 7:00 PM',
      saturday: 'Saturday: 10:00 AM – 7:30 PM',
      sunday: 'Sunday: Closed',
    },
    features: [
      'Ready-to-Wear Sartorial & Casual Collections',
      'Italian Shoes & Handcrafted Leather Goods',
      'Shirt Tailoring & Monogramming Service',
      'Click & Collect Pickup Point',
    ],
    image: LABONE_IMG,
  },
  {
    id: 'east-legon-showroom',
    name: 'Boulevard Menswear East Legon Showroom',
    area: 'East Legon, Accra',
    address: 'Lagos Avenue, Near American House, East Legon, Accra',
    city: 'Accra',
    phone: '+233 50 345 6789',
    whatsapp: '+233 50 345 6789',
    email: 'eastlegon@boulevardmenswear.com',
    hours: {
      weekdays: 'Monday – Friday: 10:00 AM – 8:00 PM',
      saturday: 'Saturday: 10:00 AM – 8:30 PM',
      sunday: 'Sunday: 1:30 PM – 6:30 PM',
    },
    features: [
      'Signature Safari Suits & Evening Wear',
      'Bespoke Wedding & Groomsmen Wardrobe Consultations',
      'Full Italian Calfskin Leather Accessories',
      'Express Alterations Suite',
    ],
    image: EAST_LEGON_IMG,
  },
];
