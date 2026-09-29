import React, { createContext, useContext, useState, useEffect } from 'react';
import { SmsMessage, SmsGatewayConfig, Order, StylingBooking } from '../types';

interface SmsContextType {
  messages: SmsMessage[];
  activeToast: SmsMessage | null;
  unreadCount: number;
  isInboxOpen: boolean;
  isDispatchingSms: boolean;
  gatewayConfig: SmsGatewayConfig;
  isGatewayModalOpen: boolean;
  pushPermission: NotificationPermission;
  lastGatewayStatus: string | null;
  openInbox: () => void;
  closeInbox: () => void;
  openGatewayModal: () => void;
  closeGatewayModal: () => void;
  updateGatewayConfig: (newConfig: Partial<SmsGatewayConfig>) => void;
  requestPushPermission: () => Promise<boolean>;
  dismissToast: () => void;
  markAllAsRead: () => void;
  clearHistory: () => void;
  sendSms: (order: Order) => Promise<SmsMessage>;
  sendOrderPlacedSms: (order: Order) => Promise<SmsMessage>;
  sendOrderProcessingSms: (order: Order, detail?: string) => Promise<SmsMessage>;
  sendOrderDispatchedSms: (order: Order) => Promise<SmsMessage>;
  sendConsultationSms: (booking: StylingBooking) => Promise<SmsMessage>;
  testSendSms: (phone: string, text: string) => Promise<SmsMessage>;
}

const SmsContext = createContext<SmsContextType | undefined>(undefined);

const DEFAULT_GATEWAY_CONFIG: SmsGatewayConfig = {
  provider: 'simulated',
  arkeselSenderId: 'BOULEVARD',
};

// Play a pleasant high-end notification chime via Web Audio API
const playSmsChime = () => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now); // D5
    osc1.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
    gain1.gain.setValueAtTime(0.12, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);

    // Second chime note
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1174.66, now + 0.12); // D6
    gain2.gain.setValueAtTime(0.1, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.5);
  } catch {
    // Audio autoplay restrictions are gracefully ignored
  }
};

export const SmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<SmsMessage[]>([]);
  const [activeToast, setActiveToast] = useState<SmsMessage | null>(null);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [isGatewayModalOpen, setIsGatewayModalOpen] = useState(false);
  const [isDispatchingSms, setIsDispatchingSms] = useState(false);
  const [lastGatewayStatus, setLastGatewayStatus] = useState<string | null>(null);
  const [pushPermission, setPushPermission] = useState<NotificationPermission>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'default';
  });

  const [gatewayConfig, setGatewayConfig] = useState<SmsGatewayConfig>(() => {
    try {
      const saved = localStorage.getItem('boulevard_sms_gateway_config');
      return saved ? JSON.parse(saved) : DEFAULT_GATEWAY_CONFIG;
    } catch {
      return DEFAULT_GATEWAY_CONFIG;
    }
  });

  // Load SMS history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('boulevard_sms_messages');
      if (saved) {
        setMessages(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save SMS history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('boulevard_sms_messages', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Save gateway config to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('boulevard_sms_gateway_config', JSON.stringify(gatewayConfig));
    } catch {
      // ignore
    }
  }, [gatewayConfig]);

  // Auto-dismiss floating toast after 8 seconds
  useEffect(() => {
    if (activeToast) {
      const timer = setTimeout(() => {
        setActiveToast(null);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [activeToast]);

  const requestPushPermission = async (): Promise<boolean> => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return false;
    }
    try {
      const permission = await Notification.requestPermission();
      setPushPermission(permission);
      return permission === 'granted';
    } catch {
      return false;
    }
  };

  const updateGatewayConfig = (newConfig: Partial<SmsGatewayConfig>) => {
    setGatewayConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const dispatchSms = async (newMsg: SmsMessage): Promise<SmsMessage> => {
    setIsDispatchingSms(true);
    let finalMsg: SmsMessage = { ...newMsg, provider: gatewayConfig.provider };

    try {
      // Outbound SMS gateway dispatch to local endpoint
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newMsg, gatewayConfig }),
      });

      const data = await response.json().catch(() => null);
      if (data) {
        if (data.provider) finalMsg.provider = data.provider;
        if (data.status) finalMsg.status = data.status;
        if (data.error) {
          finalMsg.gatewayDetails = `Gateway notice: ${data.error}`;
          setLastGatewayStatus(`Notice: ${data.error}`);
        } else if (data.sid) {
          finalMsg.gatewayDetails = `Twilio SID: ${data.sid}`;
          setLastGatewayStatus(`Twilio cellular SMS sent: ${data.sid}`);
        } else if (data.data) {
          finalMsg.gatewayDetails = `Arkesel Gateway delivered`;
          setLastGatewayStatus('Arkesel cellular SMS delivered');
        } else {
          setLastGatewayStatus('SMS delivered to handset & ready for direct device delivery');
        }
      }
    } catch {
      finalMsg.gatewayDetails = 'Handset simulator delivery';
    } finally {
      setIsDispatchingSms(false);
    }

    setMessages((prev) => [finalMsg, ...prev]);
    setActiveToast(finalMsg);
    playSmsChime();

    // Trigger Native OS push notification if permission granted
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(`BOULEVARD SMS: ${finalMsg.title}`, {
          body: finalMsg.message,
          icon: '/favicon.ico',
        });
      } catch {
        // ignore
      }
    }

    // Trigger subtle vibration on mobile devices if supported
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([100, 50, 100]);
      } catch {
        // ignore
      }
    }

    return finalMsg;
  };

  const sendOrderPlacedSms = async (order: Order): Promise<SmsMessage> => {
    const fullPhone = `${order.customer.countryCode || '+233'} ${order.customer.phone}`;
    const itemsSummary = order.items
      .map((i) => `${i.product.name} (${i.selectedSize})`)
      .slice(0, 2)
      .join(', ');

    const newMsg: SmsMessage = {
      id: `sms_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      orderNumber: order.orderNumber,
      recipientPhone: fullPhone,
      recipientName: `${order.customer.firstName} ${order.customer.lastName}`,
      senderId: 'BOULEVARD',
      type: 'order_placed',
      title: 'Order Confirmed',
      message: `BOULEVARD: Thank you ${order.customer.firstName}! Order #${order.orderNumber} confirmed (${order.currency} ${order.total.toLocaleString()}). Items: ${itemsSummary}. We will send an SMS update once tailoring begins. Concierge: +233501234567`,
      timestamp: new Date().toISOString(),
      status: 'delivered',
      read: false,
    };

    return await dispatchSms(newMsg);
  };

  const sendOrderProcessingSms = async (order: Order, detail?: string): Promise<SmsMessage> => {
    const fullPhone = `${order.customer.countryCode || '+233'} ${order.customer.phone}`;
    const customDetail = detail || 'Master tailors have begun cutting, canvas basting & hand-finishing your garments at our Dzorwulu atelier.';

    const newMsg: SmsMessage = {
      id: `sms_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      orderNumber: order.orderNumber,
      recipientPhone: fullPhone,
      recipientName: `${order.customer.firstName} ${order.customer.lastName}`,
      senderId: 'BOULEVARD',
      type: 'order_processing',
      title: 'Order Is Being Processed',
      message: `BOULEVARD UPDATE: Order #${order.orderNumber} is now BEING PROCESSED. ${customDetail} Covered by our 3-Month Guarantee. Need adjustments? WhatsApp +233501234567.`,
      timestamp: new Date().toISOString(),
      status: 'delivered',
      read: false,
    };

    return await dispatchSms(newMsg);
  };

  const sendOrderDispatchedSms = async (order: Order): Promise<SmsMessage> => {
    const fullPhone = `${order.customer.countryCode || '+233'} ${order.customer.phone}`;
    const newMsg: SmsMessage = {
      id: `sms_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      orderNumber: order.orderNumber,
      recipientPhone: fullPhone,
      recipientName: `${order.customer.firstName} ${order.customer.lastName}`,
      senderId: 'BOULEVARD',
      type: 'order_dispatched',
      title: 'Order Dispatched / En Route',
      message: `BOULEVARD: Order #${order.orderNumber} has been DISPATCHED from our atelier! Our dedicated express courier is en route to ${order.customer.city}. Inquiries: +233501234567.`,
      timestamp: new Date().toISOString(),
      status: 'delivered',
      read: false,
    };

    return await dispatchSms(newMsg);
  };

  const sendConsultationSms = async (booking: StylingBooking): Promise<SmsMessage> => {
    const newMsg: SmsMessage = {
      id: `sms_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      orderNumber: booking.id,
      recipientPhone: booking.phone,
      recipientName: booking.fullName,
      senderId: 'BOULEVARD',
      type: 'consultation_booked',
      title: 'Bespoke Consultation Confirmed',
      message: `BOULEVARD: Dear ${booking.fullName}, your private fitting for "${booking.serviceType}" at our ${booking.storeLocation} is scheduled for ${booking.preferredDate} at ${booking.preferredTime}. We look forward to receiving you.`,
      timestamp: new Date().toISOString(),
      status: 'delivered',
      read: false,
    };

    return await dispatchSms(newMsg);
  };

  const testSendSms = async (phone: string, text: string): Promise<SmsMessage> => {
    const testMsg: SmsMessage = {
      id: `sms_test_${Date.now()}`,
      orderNumber: `TEST-${Math.floor(1000 + Math.random() * 9000)}`,
      recipientPhone: phone,
      recipientName: 'Valued Client',
      senderId: 'BOULEVARD',
      type: 'order_placed',
      title: 'Boulevard Test SMS Dispatch',
      message: text || `BOULEVARD: This is a test transmission to verify mobile carrier SMS delivery to ${phone}. Atelier Concierge: +233501234567`,
      timestamp: new Date().toISOString(),
      status: 'delivered',
      read: false,
    };

    return await dispatchSms(testMsg);
  };

  const sendSms = async (order: Order | any): Promise<SmsMessage> => {
    const orderData = order?.order || order;
    return await sendOrderPlacedSms(orderData as Order);
  };

  const openInbox = () => setIsInboxOpen(true);
  const closeInbox = () => setIsInboxOpen(false);
  const openGatewayModal = () => setIsGatewayModalOpen(true);
  const closeGatewayModal = () => setIsGatewayModalOpen(false);
  const dismissToast = () => setActiveToast(null);

  const markAllAsRead = () => {
    setMessages((prev) => prev.map((m) => ({ ...m, read: true })));
  };

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem('boulevard_sms_messages');
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <SmsContext.Provider
      value={{
        messages,
        activeToast,
        unreadCount,
        isInboxOpen,
        isDispatchingSms,
        gatewayConfig,
        isGatewayModalOpen,
        pushPermission,
        lastGatewayStatus,
        openInbox,
        closeInbox,
        openGatewayModal,
        closeGatewayModal,
        updateGatewayConfig,
        requestPushPermission,
        dismissToast,
        markAllAsRead,
        clearHistory,
        sendSms,
        sendOrderPlacedSms,
        sendOrderProcessingSms,
        sendOrderDispatchedSms,
        sendConsultationSms,
        testSendSms,
      }}
    >
      {children}
    </SmsContext.Provider>
  );
};

export const useSms = () => {
  const ctx = useContext(SmsContext);
  if (!ctx) throw new Error('useSms must be used within SmsProvider');
  return ctx;
};
