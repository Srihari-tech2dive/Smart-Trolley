
import React, { useEffect } from 'react';

interface SuccessViewProps {
  onDone: () => void;
}

const SuccessView: React.FC<SuccessViewProps> = ({ onDone }) => {
  useEffect(() => {
    // Optional: Auto-redirect or sound effect
  }, []);

  return (
    <div className="max-w-md mx-auto py-12 text-center animate-in fade-in zoom-in-90 duration-700">
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-6xl mx-auto z-10 relative">
          <i className="fas fa-check"></i>
        </div>
        {/* Animated rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-green-200 rounded-full animate-ping opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-green-100 rounded-full animate-pulse opacity-20"></div>
      </div>

      <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Payment Successful!</h2>
      <p className="text-gray-500 mb-10 text-lg">Your transaction was processed successfully. A digital receipt has been sent to your registered email.</p>

      <div className="space-y-4">
        <button 
          onClick={onDone}
          className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-xl shadow-gray-200"
        >
          Back to Terminal
        </button>
        <button className="w-full py-4 bg-white border border-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
          <i className="fas fa-file-invoice text-indigo-500"></i>
          <span>Download Receipt</span>
        </button>
      </div>
    </div>
  );
};

export default SuccessView;
