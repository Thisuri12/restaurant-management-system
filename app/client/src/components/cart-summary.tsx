"use client";

import { Minus, Plus, X, ShoppingBasket } from "lucide-react";
import { useMenuStore } from "@/stores/menu-store";

export function CartSummary() {
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } =
    useMenuStore();

  const totalItems = cartCount;
  const totalAmount = cartTotal;

  if (totalItems === 0) {
    return (
      <div className="bg-white border p-8 rounded shadow">
        <div className="h-32 md:h-96 text-center text-gray-400 flex flex-col items-center justify-center mb-6 ">
          <div className="flex justify-center mb-4">
            <ShoppingBasket className="h-16 w-16 text-gray-400" />
          </div>
          <p>Your basket is empty</p>
        </div>
        <button className="w-full bg-gray-300 text-gray-400 font-semibold py-3 rounded cursor-not-allowed">
          Go to checkout
        </button>
      </div>
    );
  }

  return (
    <div>
      {" "}
      <div className="bg-white border p-4 rounded shadow max-h-96 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <h3 className="text-lg font-semibold border-b pb-2">Your Order</h3>

        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div className="flex-1">
                <h4 className="text-sm font-medium">{item.name}</h4>
                <p className="text-xs text-gray-600">
                  £{item.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="p-1 rounded border hover:bg-gray-100"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded border hover:bg-gray-100"
                >
                  <Plus className="h-3 w-3" />
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1 rounded hover:bg-red-100 text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t pt-2 flex justify-between items-center">
        <span className="font-medium">Total</span>
        <span className="font-bold">£{totalAmount.toFixed(2)}</span>
      </div>
      <button
        disabled={totalItems === 0}
        className="w-full bg-customGreen text-white py-3 rounded hover:bg-customGreenDark  disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition"
      >
        Go to checkout
      </button>
    </div>
  );
}
