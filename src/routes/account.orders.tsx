import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { formatUGX } from "@/lib/data";
import { readOrderDrafts, type OrderDraft } from "@/lib/order-drafts";

export const Route = createFileRoute("/account/orders")({
  head: () => ({ meta: [{ title: "Order drafts — A1 FASHION" }] }),
  component: Orders,
});

function Orders() {
  const [drafts, setDrafts] = useState<OrderDraft[]>([]);
  useEffect(() => setDrafts(readOrderDrafts()), []);
  return (
    <div>
      <h1 className="font-serif text-3xl">Order drafts</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Drafts saved in this browser. They are not sent to A1 Fashion and are not confirmed orders.
      </p>
      {drafts.length ? (
        <div className="mt-7 space-y-4">
          {drafts.map((draft) => (
            <article key={draft.reference} className="border border-border p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-[#9a7843]">
                    Draft · {draft.reference}
                  </p>
                  <h2 className="mt-1 font-medium">{draft.customer}</h2>
                  <p className="text-xs text-muted-foreground">
                    {draft.email} · {draft.phone}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(draft.createdAt).toLocaleDateString()}
                </p>
              </div>
              <ul className="mt-4 space-y-2 border-t border-border pt-4">
                {draft.items.map((item) => (
                  <li key={item.id} className="flex justify-between gap-4 text-sm">
                    <span>
                      {item.name} × {item.qty}
                    </span>
                    <span>{formatUGX(item.price * item.qty)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-right text-sm font-medium">
                Items subtotal · {formatUGX(draft.subtotal)}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-8 border border-dashed border-border p-10 text-center">
          <p className="text-sm text-muted-foreground">
            You have no saved order drafts in this browser.
          </p>
          <Link
            to="/shop"
            search={{ department: "all", collection: "all" }}
            className="mt-4 inline-block bg-primary px-6 py-3 text-xs uppercase tracking-widest text-primary-foreground"
          >
            Explore the collection
          </Link>
        </div>
      )}
    </div>
  );
}
