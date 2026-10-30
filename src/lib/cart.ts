import { useEffect, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  type: "product" | "service";
};

const KEY = "a1fashion_cart";
const MAX_CART_LINES = 50;
const MAX_ITEM_QTY = 99;
const MAX_CART_STORAGE_CHARS = 256_000;

const read = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(KEY);
    if (stored && stored.length > MAX_CART_STORAGE_CHARS) return [];
    const parsed: unknown = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(parsed)) return [];

    const uniqueItems = new Map<string, CartItem>();
    for (const value of parsed.slice(0, MAX_CART_LINES)) {
      if (!value || typeof value !== "object") continue;
      const item = value as Partial<CartItem>;
      if (
        typeof item.id !== "string" ||
        !item.id ||
        typeof item.name !== "string" ||
        !Number.isFinite(item.price) ||
        (item.price as number) < 0 ||
        typeof item.image !== "string" ||
        !Number.isFinite(item.qty) ||
        (item.qty as number) <= 0 ||
        (item.type !== "product" && item.type !== "service")
      ) {
        continue;
      }

      const existing = uniqueItems.get(item.id);
      const qty = Math.min(MAX_ITEM_QTY, Math.max(1, Math.floor(item.qty as number)));
      if (existing) existing.qty = Math.min(MAX_ITEM_QTY, existing.qty + qty);
      else {
        uniqueItems.set(item.id, {
          id: item.id.slice(0, 120),
          name: item.name.slice(0, 200),
          price: item.price as number,
          image: item.image.slice(0, 2048),
          qty,
          type: item.type,
        });
      }
    }
    return [...uniqueItems.values()];
  } catch {
    return [];
  }
};

const write = (items: CartItem[]) => {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("cart:update"));
    return true;
  } catch {
    return false;
  }
};

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    setItems(read());
    const onUpdate = () => setItems(read());
    window.addEventListener("cart:update", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("cart:update", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);
  return items;
};

export const addToCart = (item: Omit<CartItem, "qty">, qty = 1) => {
  if (!Number.isFinite(item.price) || !Number.isFinite(qty) || qty <= 0) return false;
  const items = read();
  const existing = items.find((i) => i.id === item.id);
  const safeQty = Math.min(MAX_ITEM_QTY, Math.max(1, Math.floor(qty)));
  if (existing) existing.qty = Math.min(MAX_ITEM_QTY, existing.qty + safeQty);
  else if (items.length < MAX_CART_LINES) items.push({ ...item, qty: safeQty });
  else return false;
  return write(items);
};

export const removeFromCart = (id: string) => {
  return write(read().filter((i) => i.id !== id));
};

export const updateQty = (id: string, qty: number) => {
  if (!Number.isFinite(qty)) return false;
  const safeQty = Math.min(MAX_ITEM_QTY, Math.max(1, Math.floor(qty)));
  const items = read().map((i) => (i.id === id ? { ...i, qty: safeQty } : i));
  return write(items);
};

export const clearCart = () => write([]);

export const cartTotal = (items: CartItem[]) => items.reduce((sum, i) => sum + i.price * i.qty, 0);
