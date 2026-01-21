
import React from 'react';
import { PaymentMethod } from '../types';

interface PaymentSelectionViewProps {
  total: number;
  onSelect: (method: PaymentMethod) => void;
  onBack: () => void;
}

const PaymentSelectionView: React.FC<PaymentSelectionViewProps> = ({ total, onSelect, onBack }) => {
  const options = [
    { 
      id: PaymentMethod.CARD, 
      name: "Credit / Debit Card", 
      icon: "fa-credit-card", 
      description: "Pay securely with VISA, MasterCard or AMEX",
      color: "blue"
    },
    { 
      id: PaymentMethod.UPI, 
      name: "UPI / Wallet", 
      icon: "fa-mobile-alt", 
      description: "Google Pay, Apple Pay or PhonePe",
      color: "green"
    },
    { 
      id: PaymentMethod.WEB, 
      name: "Web Portal", 
      icon: "fa-globe", 
      description: "Direct web verification via secure PIN",
      color: "indigo"
    }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-3xl font-black text-gray-900 mb-2">Final Payment</h2>
        <p className="text-gray-500">Choose your preferred method to complete the purchase</p>
      </div>

      <div className="bg-indigo-600 text-white rounded-3xl p-8 flex flex-col items-center justify-center shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <p className="text-indigo-200 font-medium mb-1 uppercase tracking-widest text-sm">Amount Due</p>
        <div className="text-5xl font-black tracking-tighter">${total.toFixed(2)}</div>
      </div>

      <div className="space-y-4">
        {options.map((option) => (
          <button 
            key={option.id}
            onClick={() => onSelect(option.id)}
            className="w-full bg-white border border-gray-100 p-6 rounded-2xl flex items-center justify-between hover:border-indigo-300 hover:shadow-md transition-all group text-left"
          >
            <div className="flex items-center space-x-5">
              <div className={`w-14 h-14 rounded-xl bg-${option.color}-50 text-${option.color}-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                <i className={`fas ${option.icon}`}></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">{option.name}</h3>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            </div>
            <i className="fas fa-chevron-right text-gray-300 group-hover:text-indigo-500 transition-colors"></i>
          </button>
        ))}
      </div>

      <button 
        onClick={onBack}
        className="w-full py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors flex items-center justify-center space-x-2"
      >
        <i className="fas fa-arrow-left text-sm"></i>
        <span>Modify Order</span>
      </button>
    </div>
  );
};

export default PaymentSelectionView;
