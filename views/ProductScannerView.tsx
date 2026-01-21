
import React, { useState } from 'react';
import { CartItem, Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import BarcodeScanner from '../components/BarcodeScanner';

interface ProductScannerViewProps {
  cart: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (id: string) => void;
  onConfirm: () => void;
  total: number;
}

const ProductScannerView: React.FC<ProductScannerViewProps> = ({ cart, onAdd, onRemove, onConfirm, total }) => {
  const [manualCode, setManualCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const processBarcode = (code: string) => {
    const product = MOCK_PRODUCTS[code];
    if (product) {
      onAdd({ ...product, quantity: 1 });
      setError(null);
      setManualCode("");
      // Audio feedback (vibration or bip if possible)
      if ("vibrate" in navigator) {
        navigator.vibrate(100);
      }
    } else {
      setError(`Product code ${code} not found in database.`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Scanner Control */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <i className="fas fa-camera text-indigo-600 mr-2"></i>
              Scan Product
            </h2>
            
            {isCameraActive ? (
              <div className="space-y-4">
                <BarcodeScanner onScan={processBarcode} />
                <button 
                  onClick={() => setIsCameraActive(false)}
                  className="w-full py-2 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Stop Camera
                </button>
              </div>
            ) : (
              <div 
                onClick={() => setIsCameraActive(true)}
                className="w-full aspect-video bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-100 transition-colors group"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 transition-transform">
                  <i className="fas fa-video text-2xl"></i>
                </div>
                <p className="mt-4 text-indigo-600 font-semibold text-lg">Activate Scanner</p>
                <p className="text-indigo-400 text-sm">Use your device's camera</p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm font-medium text-gray-500 mb-3">Manual Entry</p>
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="e.g. 12345, 67890"
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && processBarcode(manualCode)}
                />
                <button 
                  onClick={() => processBarcode(manualCode)}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-md"
                >
                  Add
                </button>
              </div>
              {error && <p className="text-red-500 text-xs mt-2 font-medium"><i className="fas fa-exclamation-circle mr-1"></i> {error}</p>}
              <div className="mt-2 flex flex-wrap gap-2">
                <p className="text-[10px] text-gray-400 w-full">Demo codes:</p>
                {Object.keys(MOCK_PRODUCTS).map(code => (
                  <button 
                    key={code} 
                    onClick={() => processBarcode(code)}
                    className="text-[10px] bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-md text-gray-600"
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Cart Listing */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col min-h-[400px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold flex items-center">
                <i className="fas fa-shopping-cart text-indigo-600 mr-2"></i>
                Cart
              </h2>
              <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-full">
                {cart.length} items
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1 max-h-[400px]">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-2 opacity-60 py-12">
                  <i className="fas fa-ghost text-4xl"></i>
                  <p>Your cart is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl group hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <p className="text-sm font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <i className="fas fa-times-circle"></i>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-500 font-medium">Grand Total</span>
                <span className="text-3xl font-black text-gray-900">${total.toFixed(2)}</span>
              </div>
              <button 
                onClick={onConfirm}
                disabled={cart.length === 0}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 disabled:bg-gray-200 disabled:cursor-not-allowed transition-all transform active:scale-[0.98] shadow-lg shadow-indigo-100 flex items-center justify-center space-x-2"
              >
                <span>Checkout Now</span>
                <i className="fas fa-arrow-right text-sm"></i>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductScannerView;
