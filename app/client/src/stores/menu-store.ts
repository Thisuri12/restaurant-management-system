import { create } from "zustand";
import { CartItem, MenuItem } from "@/lib/types";

interface MenuStore {
  // State
  cart: CartItem[];
  selectedItem: MenuItem | null;
  activeCategory: string;

  // Computed values
  cartTotal: number;
  cartCount: number;

  // Actions
  addToCart: (item: MenuItem, quantity?: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  setSelectedItem: (item: MenuItem | null) => void;
  setActiveCategory: (category: string) => void;
}

export const useMenuStore = create<MenuStore>((set, get) => ({
  // Initial state
  cart: [],
  selectedItem: null,
  activeCategory: "popular",

  // Computed values
  get cartTotal() {
    return get().cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  },

  get cartCount() {
    return get().cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  // Actions
  addToCart: (item: MenuItem, quantity = 1) => {
    set((state) => {
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + quantity }
              : cartItem
          ),
        };
      }

      return {
        cart: [...state.cart, { ...item, quantity }],
      };
    });
  },

  updateQuantity: (id: number, quantity: number) => {
    set((state) => ({
      cart: state.cart
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    }));
  },

  removeFromCart: (id: number) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    }));
  },

  clearCart: () => {
    set({ cart: [] });
  },

  setSelectedItem: (item: MenuItem | null) => {
    set({ selectedItem: item });
  },

  setActiveCategory: (category: string) => {
    set({ activeCategory: category });
  },
}));
