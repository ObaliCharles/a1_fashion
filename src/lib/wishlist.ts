import { useEffect, useState } from "react";

const KEY = "a1fashion_wishlist";
const read = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};
const write = (ids: string[]) => {
  localStorage.setItem(KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event("wishlist:update"));
};
export const toggleWishlist = (id: string) => {
  const ids = read();
  write(ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]);
  return !ids.includes(id);
};
export const useWishlist = () => {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    setIds(read());
    const update = () => setIds(read());
    window.addEventListener("wishlist:update", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("wishlist:update", update);
      window.removeEventListener("storage", update);
    };
  }, []);
  return ids;
};
