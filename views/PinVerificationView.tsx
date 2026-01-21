
import React, { useState, useRef, useEffect } from 'react';
import { DEMO_PIN } from '../constants';

interface PinVerificationViewProps {
  total: number;
  onSuccess: () => void;
  onBack: () => void;
}

const PinVerificationView: React.FC<PinVerificationViewProps> = ({ total, onSuccess, onBack }) => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  useEffect(() => {
    // Focus first input on mount
    inputRefs[0].current?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    
    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);
    setError(false);

    // Auto focus next
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSubmit = async () => {
    const enteredPin = pin.join("");
    if (enteredPin.length < 4) return;

    setIsProcessing(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (enteredPin === DEMO_PIN) {
      onSuccess();
    } else {
      setError(true);
      setPin(["", "", "", ""]);
      inputRefs[0].current?.focus();
    }
    setIsProcessing(false);
  };

  return (
    <div className="max-w-md mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center">
        <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
          <i className="fas fa-shield-alt"></i>
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Web Verification</h2>
        <p className="text-gray-500">Enter your 4-digit security PIN to authorize the payment of <span className="text-indigo-600 font-bold">${total.toFixed(2)}</span></p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="flex justify-center space-x-4 mb-8">
          {pin.map((digit, i) => (
            <input
              key={i}
              ref={inputRefs[i]}
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`w-14 h-18 text-center text-3xl font-black rounded-2xl border-2 outline-none transition-all ${
                error ? 'border-red-500 bg-red-50 text-red-600 shake' : 
                digit ? 'border-indigo-600 bg-indigo-50 text-indigo-900' : 
                'border-gray-100 bg-gray-50 focus:border-indigo-300'
              }`}
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm font-bold text-center mb-6 animate-pulse">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            Invalid PIN. Please try again.
          </p>
        )}

        <button 
          onClick={handleSubmit}
          disabled={pin.some(d => !d) || isProcessing}
          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 disabled:bg-gray-200 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center space-x-3"
        >
          {isProcessing ? (
            <i className="fas fa-circle-notch fa-spin"></i>
          ) : (
            <>
              <i className="fas fa-lock"></i>
              <span>Confirm & Pay</span>
            </>
          )}
        </button>
      </div>

      <div className="text-center space-y-4">
        <p className="text-xs text-gray-400">Hint: Use demo PIN <span className="font-bold text-gray-600">1234</span></p>
        <button 
          onClick={onBack}
          className="text-gray-400 font-bold hover:text-gray-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PinVerificationView;
