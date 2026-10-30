import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/account/bookings")({
  head: () => ({ meta: [{ title: "Account — A1 FASHION" }] }),
  component: () => (
    <div>
      <h1 className="font-serif text-3xl">Customer account</h1>
      <p className="text-muted-foreground text-sm mt-2">
        Order history will be available after accounts and checkout are connected.
      </p>
      <div className="mt-10 border border-dashed border-border p-10 text-center">
        <p className="text-sm text-muted-foreground">
          No account data is stored in this storefront preview.
        </p>
        <Link
          to="/shop"
          className="inline-block mt-4 bg-primary text-primary-foreground px-6 py-3 text-xs uppercase tracking-widest"
        >
          Explore the collection
        </Link>
      </div>
    </div>
  ),
});
