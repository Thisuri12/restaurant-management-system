"use client";

import { useState } from "react";
import { X, Minus, Plus } from "lucide-react";
import { useMenuStore } from "@/stores/menu-store";
import type { MenuItem } from "@/lib/types";
import Image from "next/image";

interface ItemModalProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
}

export function ItemModal({ item, isOpen, onClose }: ItemModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useMenuStore();

  if (!isOpen) return null;

  const handleAddToCart = () => {
    addToCart(item, quantity);
    onClose();
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="fixed inset-0 z-50 flex items-stretch sm:items-center justify-center p-0 sm:p-4 text-center overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className=" relative w-full h-full sm:h-auto sm:w-full sm:max-w-[28rem] sm:max-h-[38rem] lg:max-w-[30rem] lg:max-h-[40rem] 
        aspect-[3/4] transform overflow-hidden rounded-none sm:rounded-sm bg-white text-left shadow-xl transition-all flex flex-col overflow-y-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="border absolute right-4 top-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full focus:outline-none focus:ring-2 focus:ring-customGreen focus:border-customGreen active:shadow-md transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Item image */}
        <div className="w-full h-48 sm:h-64">
          <Image
            src={item.image}
            alt={item.name}
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="px-6 py-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {item.name}
              </h2>
            </div>
          </div>

          <p className="text-gray-600 mb-6">{item.description}</p>

          {/* Quantity selector fixed at bottom on mobile */}
          <div className="flex-1 flex flex-col justify-end">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-lg font-medium min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {/* Add to cart button below quantity */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-customGreen hover:bg-customGreenDark text-white py-3 px-6 rounded-sm font-medium transition-colors"
              >
                Add for • £{(item.price * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
