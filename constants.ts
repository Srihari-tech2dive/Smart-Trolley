
import { Product } from './types';

export const MOCK_PRODUCTS: Record<string, Product> = {
  "12345": { id: "12345", name: "Organic Whole Milk", price: 4.50, category: "Dairy" },
  "67890": { id: "67890", name: "Sourdough Bread", price: 3.25, category: "Bakery" },
  "11111": { id: "11111", name: "Greek Yogurt", price: 1.50, category: "Dairy" },
  "22222": { id: "22222", name: "Fresh Strawberries", price: 5.99, category: "Produce" },
  "33333": { id: "33333", name: "Sparkling Water", price: 1.25, category: "Beverages" },
  "44444": { id: "44444", name: "Roasted Almonds", price: 7.45, category: "Snacks" },
};

export const DEMO_PIN = "1234";
