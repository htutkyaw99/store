import { create } from "zustand";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity?: number;
}

interface CartState {
  cart: Product[];
  totalItems: number;
  totalPrice: number;

  addToCart: (item: Product) => void;
  removeFromCart: (id: number) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: JSON.parse(sessionStorage.getItem("cart") || "[]"),
  totalItems: JSON.parse(sessionStorage.getItem("totalItems") || "0"),
  totalPrice: JSON.parse(sessionStorage.getItem("totalPrice") || "0"),

  addToCart: (item) => {
    const itemExist = get().cart.find((el) => el.id === item.id);

    if (itemExist) {
      itemExist.quantity++;
      set({
        cart: [...get().cart],
        totalPrice: get().totalPrice + item.price,
      });
      sessionStorage.setItem("cart", JSON.stringify(get().cart));
      sessionStorage.setItem("totalPrice", JSON.stringify(get().totalPrice));
      sessionStorage.setItem("totalItems", JSON.stringify(get().totalItems));
    } else {
      set({
        cart: [...get().cart, { ...item, quantity: 1 }],
        totalItems: get().totalItems + 1,
        totalPrice: get().totalPrice + item.price,
      });
      sessionStorage.setItem("cart", JSON.stringify(get().cart));
      sessionStorage.setItem("totalPrice", JSON.stringify(get().totalPrice));
      sessionStorage.setItem("totalItems", JSON.stringify(get().totalItems));
    }
  },

  removeFromCart: (id) => {
    set((state) => {
      const productToRemove = state.cart.find((product) => product.id === id);

      if (!productToRemove) {
        return state;
      }

      const updatedCart = state.cart.filter((product) => product.id !== id);

      const quantity = productToRemove.quantity || 1;

      const newTotalPrice = state.totalPrice - productToRemove.price * quantity;

      return {
        cart: updatedCart,
        totalItems: state.totalItems - 1,
        totalPrice: parseFloat(newTotalPrice.toFixed(2)),
      };
    });

    const newState = get();
    sessionStorage.setItem("cart", JSON.stringify(newState.cart));
    sessionStorage.setItem("totalItems", JSON.stringify(newState.totalItems));
    sessionStorage.setItem("totalPrice", JSON.stringify(newState.totalPrice));
  },
}));
