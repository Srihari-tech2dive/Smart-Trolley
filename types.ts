
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum PaymentMethod {
  CARD = 'CARD',
  UPI = 'UPI',
  WEB = 'WEB'
}

export enum AppStep {
  SCANNING = 'SCANNING',
  PAYMENT_SELECTION = 'PAYMENT_SELECTION',
  PIN_VERIFICATION = 'PIN_VERIFICATION',
  SUCCESS = 'SUCCESS'
}
