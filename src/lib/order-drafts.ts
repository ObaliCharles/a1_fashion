import type { CartItem } from "@/lib/cart";

export type OrderDraft = {
  reference: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  items: CartItem[];
  subtotal: number;
  createdAt: string;
  status: "Saved on this device";
};

const KEY = "a1fashion_order_drafts";

export function readOrderDrafts(): OrderDraft[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(KEY) || "[]");
    return Array.isArray(parsed) ? (parsed as OrderDraft[]) : [];
  } catch {
    return [];
  }
}

export function saveOrderDraft(draft: Omit<OrderDraft, "reference" | "createdAt" | "status">) {
  const order: OrderDraft = {
    ...draft,
    reference: `A1-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: "Saved on this device",
  };
  if (typeof window === "undefined")
    throw new Error("Order drafts can only be saved in a browser.");
  try {
    window.localStorage.setItem(KEY, JSON.stringify([order, ...readOrderDrafts()]));
  } catch {
    throw new Error("Could not save the order draft in this browser.");
  }
  return order;
}
