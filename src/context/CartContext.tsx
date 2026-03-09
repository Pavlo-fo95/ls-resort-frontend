import { createContext } from "react";
import type { ShopItem } from "../data/shopItems";

export type CartLine = {
  item: ShopItem;
  quantity: number;
};

export type CartContextType = {
  items: CartLine[];
  totalCount: number;
  totalPrice: number;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);