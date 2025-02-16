import { create } from 'zustand'

interface CartState {
  cart: { id: number; name: string; price: number }[]
  addToCart: (item: { id: number; name: string; price: number }) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
  clearCart: () => set({ cart: [] }),
}))
