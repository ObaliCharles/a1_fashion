import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useCart, removeFromCart, updateQty, cartTotal } from "@/lib/cart";
import { formatUGX } from "@/lib/data";
import { Minus, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your bag — A1 FASHION" }] }),
  component: Cart,
});

function Cart() {
  const items = useCart();
  const total = cartTotal(items);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mx-auto max-w-6xl px-4 py-16 w-full">
        <h1 className="font-serif text-4xl md:text-5xl mb-3">Your bag</h1>
        <p className="mb-10 text-sm text-muted-foreground">
          Items and prices are sample catalog data until verified A1 inventory is connected.
        </p>
        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Link
              to="/shop"
              className="inline-block mt-6 bg-primary text-primary-foreground px-8 py-3 text-xs uppercase tracking-widest"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-border pb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover bg-muted"
                  />
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {item.type}
                    </p>
                    <h3 className="font-serif text-xl">{item.name}</h3>
                    <p className="text-sm mt-1">{formatUGX(item.price)}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="flex items-center border border-border">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="p-2">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-3 text-sm">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="p-2">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-muted/40 p-8 h-fit">
              <h3 className="font-serif text-2xl mb-4">Order Summary</h3>
              <div className="flex justify-between text-sm mb-2">
                <span>Items</span>
                <span>{formatUGX(total)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Estimated delivery</span>
                <span>Confirmed at launch</span>
              </div>
              <div className="border-t border-border my-4 pt-4 flex justify-between font-medium">
                <span>Items subtotal</span>
                <span>{formatUGX(total)}</span>
              </div>
              <Link
                to="/checkout"
                className="block text-center bg-primary text-primary-foreground py-4 text-xs uppercase tracking-widest hover:bg-primary/90"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
