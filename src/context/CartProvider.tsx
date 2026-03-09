import { useEffect, useMemo, useState, type ReactNode } from "react";
import { CartContext, type CartLine, type CartContextType } from "./CartContext";
import { getItemById } from "../data/shopItems";

const STORAGE_KEY = "ls-resort-cart";

type StoredCartItem = {
  id: string;
  quantity: number;
};

function getInitialCart(): CartLine[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed: StoredCartItem[] = JSON.parse(raw);

    return parsed
      .map(({ id, quantity }) => {
        const item = getItemById(id);
        if (!item) return null;
        return { item, quantity };
      })
      .filter(Boolean) as CartLine[];
  } catch (error) {
    console.error("Помилка читання корзини:", error);
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>(getInitialCart);

  useEffect(() => {
    const serialized: StoredCartItem[] = items.map(({ item, quantity }) => ({
      id: item.id,
      quantity,
    }));

    localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
  }, [items]);

  const addToCart = (itemId: string) => {
    const item = getItemById(itemId);
    if (!item) return;

    setItems((prev) => {
      const existing = prev.find((line) => line.item.id === itemId);

      if (existing) {
        return prev.map((line) =>
          line.item.id === itemId
            ? { ...line, quantity: line.quantity + 1 }
            : line
        );
      }

      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((line) => line.item.id !== itemId));
  };

  const decreaseQuantity = (itemId: string) => {
    setItems((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId
            ? { ...line, quantity: line.quantity - 1 }
            : line
        )
        .filter((line) => line.quantity > 0)
    );
  };

  const clearCart = () => setItems([]);

  const totalCount = useMemo(
    () => items.reduce((sum, line) => sum + line.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, line) => sum + line.item.price * line.quantity, 0),
    [items]
  );

  const value: CartContextType = {
    items,
    totalCount,
    totalPrice,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}