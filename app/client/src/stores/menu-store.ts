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

const calculateTotals = (cart: CartItem[]) => {
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  return { cartTotal, cartCount };
};

export const useMenuStore = create<MenuStore>((set) => ({
  // Initial state
  cart: [],
  selectedItem: null,
  activeCategory: "popular",
  cartTotal: 0,
  cartCount: 0,

  // Actions
  addToCart: (item: MenuItem, quantity = 1) => {
    set((state) => {
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === item.id
      );

      let newCart: CartItem[];

      if (existingItem) {
        newCart = state.cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        newCart = [...state.cart, { ...item, quantity }];
      }

      const { cartTotal, cartCount } = calculateTotals(newCart);

      return {
        cart: newCart,
        cartTotal,
        cartCount,
      };
    });
  },

  updateQuantity: (id: number, quantity: number) => {
    set((state) => {
      const newCart = state.cart
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0);

      const { cartTotal, cartCount } = calculateTotals(newCart);

      return {
        cart: newCart,
        cartTotal,
        cartCount,
      };
    });
  },

  removeFromCart: (id: number) => {
    set((state) => {
      const newCart = state.cart.filter((item) => item.id !== id);
      const { cartTotal, cartCount } = calculateTotals(newCart);

      return {
        cart: newCart,
        cartTotal,
        cartCount,
      };
    });
  },

  clearCart: () => {
    set({
      cart: [],
      cartTotal: 0,
      cartCount: 0,
    });
  },

  setSelectedItem: (item: MenuItem | null) => {
    set({ selectedItem: item });
  },

  setActiveCategory: (category: string) => {
    set({ activeCategory: category });
  },
}));
