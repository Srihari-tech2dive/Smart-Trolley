
import React, { useEffect, useRef } from 'react';

interface BarcodeScannerProps {
  onScan: (decodedText: string) => void;
  onError?: (error: any) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan, onError }) => {
  const scannerRef = useRef<any>(null);

  useEffect(() => {
    // Check if Html5QrcodeScanner is available globally
    const Html5QrcodeScanner = (window as any).Html5QrcodeScanner;
    
    if (Html5QrcodeScanner) {
      scannerRef.current = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 150 } },
        /* verbose= */ false
      );
      
      scannerRef.current.render(onScan, onError);
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch((error: any) => {
          console.error("Failed to clear scanner", error);
        });
      }
    };
  }, [onScan, onError]);

  return (
    <div className="w-full bg-black rounded-2xl overflow-hidden shadow-xl">
      <div id="qr-reader" className="w-full"></div>
    </div>
  );
};

export default BarcodeScanner;
