
import React from 'react';
import { X } from 'lucide-react';
import ShippingCalculator from './ShippingCalculator';

interface ShippingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShippingDrawer = ({ isOpen, onClose }: ShippingDrawerProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-xl font-bold font-poppins">Shipping Calculator</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-stone-powder/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <ShippingCalculator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingDrawer;
