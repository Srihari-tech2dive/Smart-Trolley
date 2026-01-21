
import React, { useState, useMemo } from 'react';
import { AppStep, CartItem, PaymentMethod } from './types';
import ProductScannerView from './views/ProductScannerView';
import PaymentSelectionView from './views/PaymentSelectionView';
import PinVerificationView from './views/PinVerificationView';
import SuccessView from './views/SuccessView';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.SCANNING);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);

  const totalAmount = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cart]);

  const handleAddToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, item];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleReset = () => {
    setCart([]);
    setSelectedPayment(null);
    setCurrentStep(AppStep.SCANNING);
  };

  const renderView = () => {
    switch (currentStep) {
      case AppStep.SCANNING:
        return (
          <ProductScannerView 
            cart={cart} 
            onAdd={handleAddToCart} 
            onRemove={handleRemoveFromCart}
            onConfirm={() => setCurrentStep(AppStep.PAYMENT_SELECTION)}
            total={totalAmount}
          />
        );
      case AppStep.PAYMENT_SELECTION:
        return (
          <PaymentSelectionView 
            total={totalAmount} 
            onBack={() => setCurrentStep(AppStep.SCANNING)}
            onSelect={(method) => {
              setSelectedPayment(method);
              if (method === PaymentMethod.WEB) {
                setCurrentStep(AppStep.PIN_VERIFICATION);
              } else {
                // Mock direct success for other methods
                setCurrentStep(AppStep.SUCCESS);
              }
            }}
          />
        );
      case AppStep.PIN_VERIFICATION:
        return (
          <PinVerificationView 
            total={totalAmount}
            onBack={() => setCurrentStep(AppStep.PAYMENT_SELECTION)}
            onSuccess={() => setCurrentStep(AppStep.SUCCESS)}
          />
        );
      case AppStep.SUCCESS:
        return (
          <SuccessView onDone={handleReset} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <i className="fas fa-barcode"></i>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-800">SmartBilling</h1>
          </div>
          <div className="flex items-center space-x-4">
             <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">
               {currentStep.replace('_', ' ')}
             </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-100 overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500 ease-out"
            style={{ 
              width: currentStep === AppStep.SCANNING ? '25%' : 
                     currentStep === AppStep.PAYMENT_SELECTION ? '50%' : 
                     currentStep === AppStep.PIN_VERIFICATION ? '75%' : '100%' 
            }}
          />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {renderView()}
      </main>

      {/* Footer (Demo Info) */}
      <footer className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-400 text-sm">
        <p>© 2024 SmartBilling Demo System • Academic Use Only</p>
      </footer>
    </div>
  );
};

export default App;
