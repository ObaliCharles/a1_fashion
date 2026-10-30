import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ShieldAlert } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useCart, cartTotal } from "@/lib/cart";
import { formatUGX } from "@/lib/data";
import { saveOrderDraft, type OrderDraft } from "@/lib/order-drafts";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — A1 FASHION" }] }),
  component: Checkout,
});

function Checkout() {
  const items = useCart();
  const subtotal = cartTotal(items);
  const [savedOrder, setSavedOrder] = useState<OrderDraft | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!items.length) {
      setError("Your bag is empty. Add a piece before saving an order draft.");
      return;
    }
    setSaving(true);
    const form = new FormData(event.currentTarget);
    try {
      const order = saveOrderDraft({
        customer: String(form.get("customer") || "").trim(),
        email: String(form.get("email") || "").trim(),
        phone: String(form.get("phone") || "").trim(),
        address: String(form.get("address") || "").trim(),
        city: String(form.get("city") || "").trim(),
        items: items.map((item) => ({ ...item })),
        subtotal,
      });
      setSavedOrder(order);
      setError("");
    } catch {
      setError(
        "This browser could not save the order draft. Your bag is unchanged; please try again.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E9] text-[#171717]">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-10 md:py-16">
        <h1 className="font-serif text-4xl md:text-5xl">Checkout</h1>
        <div className="mt-5 flex gap-3 border border-[#9a7843]/30 bg-[#eee9e0] p-4 text-sm leading-6">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#9a7843]" />
          <p>
            Checkout and payment are not connected yet. Saving creates a private draft in this
            browser only. A1 Fashion will not receive it, and no payment or confirmed order is
            created.
          </p>
        </div>
        {savedOrder && (
          <div
            role="status"
            className="mt-5 flex gap-3 border border-green-800/20 bg-green-50 p-5 text-sm leading-6 text-green-950"
          >
            <Check className="mt-0.5 h-5 w-5 shrink-0" />
            <p>
              Order draft <strong>{savedOrder.reference}</strong> is saved on this device. Your bag
              remains unchanged. This is not an order confirmation.
            </p>
          </div>
        )}
        {error && (
          <p
            role="alert"
            className="mt-5 border border-red-800/30 bg-red-50 p-4 text-sm text-red-900"
          >
            {error}
          </p>
        )}
        {!items.length ? (
          <div className="mt-10 border border-dashed border-black/20 p-10 text-center">
            <p className="font-serif text-2xl">Your bag is empty</p>
            <Link
              to="/shop"
              search={{ department: "all", collection: "all" }}
              className="mt-5 inline-block bg-[#171717] px-6 py-3 text-[9px] uppercase tracking-widest text-white"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="mt-9 grid gap-10 lg:grid-cols-[1fr_360px]"
          >
            <div className="space-y-8">
              <section>
                <h2 className="mb-4 font-serif text-2xl">Contact and delivery details</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-xs sm:col-span-2">
                    Full name *
                    <input
                      name="customer"
                      required
                      maxLength={100}
                      autoComplete="off"
                      className="mt-2 block h-12 w-full border border-black/15 bg-transparent px-3 text-sm outline-none focus:border-[#9a7843]"
                    />
                  </label>
                  <label className="text-xs">
                    Email *
                    <input
                      name="email"
                      type="email"
                      required
                      maxLength={254}
                      autoComplete="off"
                      className="mt-2 block h-12 w-full border border-black/15 bg-transparent px-3 text-sm outline-none focus:border-[#9a7843]"
                    />
                  </label>
                  <label className="text-xs">
                    Ugandan phone number *
                    <input
                      name="phone"
                      type="tel"
                      required
                      maxLength={30}
                      autoComplete="off"
                      placeholder="+256 …"
                      className="mt-2 block h-12 w-full border border-black/15 bg-transparent px-3 text-sm outline-none focus:border-[#9a7843]"
                    />
                  </label>
                  <label className="text-xs sm:col-span-2">
                    Street, area or delivery instructions *
                    <input
                      name="address"
                      required
                      maxLength={300}
                      autoComplete="off"
                      className="mt-2 block h-12 w-full border border-black/15 bg-transparent px-3 text-sm outline-none focus:border-[#9a7843]"
                    />
                  </label>
                  <label className="text-xs">
                    City or town *
                    <input
                      name="city"
                      required
                      maxLength={100}
                      autoComplete="off"
                      className="mt-2 block h-12 w-full border border-black/15 bg-transparent px-3 text-sm outline-none focus:border-[#9a7843]"
                    />
                  </label>
                </div>
              </section>
              <section className="border-t border-black/10 pt-5">
                <h2 className="font-serif text-2xl">Payment</h2>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  MTN MoMo, Airtel Money, card payments and delivery collection are not configured.
                  This page will not request payment details.
                </p>
              </section>
            </div>
            <aside className="h-fit border border-black/10 bg-white/45 p-6">
              <h2 className="font-serif text-2xl">Bag summary</h2>
              <div className="mt-5 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between gap-4 text-sm">
                    <span>
                      {item.name} × {item.qty}
                    </span>
                    <span className="shrink-0">{formatUGX(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex justify-between border-t border-black/10 pt-4 text-sm">
                <span>Items subtotal</span>
                <span>{formatUGX(subtotal)}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm text-neutral-600">
                <span>Delivery</span>
                <span>To be confirmed</span>
              </div>
              <div className="mt-4 border-t border-black/10 pt-4">
                <p className="flex justify-between font-medium">
                  <span>Items total</span>
                  <span>{formatUGX(subtotal)}</span>
                </p>
                <p className="mt-2 text-[10px] leading-5 text-neutral-500">
                  Final delivery and payment arrangements are not calculated in this preview.
                </p>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="mt-6 w-full bg-[#171717] px-5 py-4 text-[9px] uppercase tracking-[0.16em] text-white transition hover:bg-[#9a7843]"
              >
                {saving ? "Saving…" : "Save order draft"}
              </button>
            </aside>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}
