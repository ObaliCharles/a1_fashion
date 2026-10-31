import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, UserRound, ShoppingBag, Menu, X, Heart, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { products, formatUGX } from "@/lib/data";
import { useCart } from "@/lib/cart";
import placeholder from "@/assets/fashion-placeholder.svg";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const items = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? products
          .filter((p) => `${p.name} ${p.category} ${p.department}`.toLowerCase().includes(q))
          .slice(0, 6)
      : [];
  }, [query]);

  return (
    <>
      <div className="bg-[#171717] px-4 py-2 text-center text-[9px] uppercase tracking-[0.2em] text-white sm:text-[10px]">
        A new point of view on everyday style <span className="px-2 text-[#C5A46D]">•</span> A1
        Fashion, Uganda
      </div>
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#F5F1E9]/95 backdrop-blur">
        <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-4 md:h-[82px] md:px-8">
          <button className="md:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="flex items-center gap-2 md:gap-3">
            <img
              src="/images/a1-fashion-logo.png"
              alt="A1 Fashion"
              className="h-10 w-10 rounded-sm object-cover md:h-12 md:w-12"
            />
            <span className="leading-none">
              <span className="block text-[13px] font-semibold tracking-[0.22em] md:text-base">
                A1 FASHION
              </span>
              <span className="mt-1 hidden text-[8px] uppercase tracking-[0.3em] text-neutral-500 sm:block">
                Wear confidence
              </span>
            </span>
          </Link>
          <nav className="hidden h-full items-center gap-9 text-[10px] uppercase tracking-[0.18em] md:flex">
            <Link
              to="/shop"
              search={{ department: "all", collection: "new" }}
              className="transition-colors duration-300 hover:text-[#9a7843]"
            >
              New arrivals
            </Link>
            <Link
              to="/shop"
              search={{ department: "women", collection: "all" }}
              className="hover:text-[#9a7843]"
            >
              Women
            </Link>
            <Link
              to="/shop"
              search={{ department: "men", collection: "all" }}
              className="hover:text-[#9a7843]"
            >
              Men
            </Link>
            <Link
              to="/shop"
              search={{ department: "all", collection: "all" }}
              className="hover:text-[#9a7843]"
            >
              Shop all
            </Link>
            <Link to="/services" className="hover:text-[#9a7843]">
              Services
            </Link>
            <Link to="/enquire" search={{ type: "custom-order" }} className="hover:text-[#9a7843]">
              Custom orders
            </Link>
            <Link to="/enquire" search={{ type: "corporate" }} className="hover:text-[#9a7843]">
              Corporate
            </Link>
            <Link to="/about" className="hover:text-[#9a7843]">
              Our story
            </Link>
          </nav>
          <div className="flex items-center gap-4 md:gap-5">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="hover:text-[#9a7843]"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <button
              aria-label="Account"
              onClick={() => navigate({ to: "/account" })}
              className="hidden hover:text-[#9a7843] sm:block"
            >
              <UserRound className="h-[18px] w-[18px]" />
            </button>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="hidden hover:text-[#9a7843] sm:block"
            >
              <Heart className="h-[18px] w-[18px]" />
            </Link>
            <Link to="/cart" aria-label="Shopping bag" className="relative hover:text-[#9a7843]">
              <ShoppingBag className="h-[18px] w-[18px]" />
              {items.length > 0 && (
                <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-[#C5A46D] px-1 text-[9px] text-white">
                  {items.reduce((sum, item) => sum + item.qty, 0)}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-xl rounded-none">
          <DialogHeader>
            <DialogTitle className="font-serif text-3xl">Find your next favourite</DialogTitle>
          </DialogHeader>
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search clothing, accessories…"
            className="h-12 rounded-none border-0 border-b bg-transparent px-0 focus-visible:ring-0"
          />
          <div className="max-h-[55vh] overflow-auto">
            {query && matches.length === 0 && (
              <p className="py-8 text-center text-sm text-neutral-500">
                No pieces found for “{query}”. Try another search.
              </p>
            )}
            {matches.map((p) => (
              <Link
                key={p.slug}
                to="/shop/$slug"
                params={{ slug: p.slug }}
                onClick={() => setSearchOpen(false)}
                className="flex items-center gap-4 border-b py-3"
              >
                <img
                  src={p.image}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = placeholder;
                  }}
                  alt=""
                  className="h-16 w-14 object-cover"
                />
                <span className="flex-1">
                  <span className="block text-sm">{p.name}</span>
                  <span className="text-xs text-neutral-500">
                    {p.department} · {p.category}
                  </span>
                </span>
                <span className="text-xs">{formatUGX(p.price)}</span>
              </Link>
            ))}
            <Link
              to="/services"
              onClick={() => setSearchOpen(false)}
              className="flex items-center justify-between border-b border-black/10 py-4 text-xs uppercase tracking-[0.15em]"
            >
              Fashion Services
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/enquire"
              search={{ type: "custom-order" }}
              onClick={() => setSearchOpen(false)}
              className="flex items-center justify-between border-b border-black/10 py-4 text-xs uppercase tracking-[0.15em]"
            >
              Custom Orders
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/enquire"
              search={{ type: "corporate" }}
              onClick={() => setSearchOpen(false)}
              className="flex items-center justify-between border-b border-black/10 py-4 text-xs uppercase tracking-[0.15em]"
            >
              Corporate Enquiries
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </DialogContent>
      </Dialog>
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            className="absolute inset-0 bg-black/40 transition-opacity"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          />
          <aside className="absolute inset-y-0 left-0 w-[86%] max-w-sm bg-[#F5F1E9] p-6 transition-transform">
            <div className="flex items-center justify-between border-b border-black/10 pb-5">
              <span className="flex items-center gap-3 font-serif text-xl tracking-[0.12em]">
                <img
                  src="/images/a1-fashion-logo.png"
                  alt=""
                  className="h-10 w-10 rounded-sm object-cover"
                />
                A1 FASHION
              </span>
              <button onClick={() => setMenuOpen(false)} aria-label="Close">
                <X />
              </button>
            </div>
            <nav className="mt-5">
              {[
                ["New Arrivals", "new"],
                ["Women", "women"],
                ["Men", "men"],
                ["Collections", "all"],
              ].map(([label, to]) => (
                <Link
                  key={label}
                  to="/shop"
                  search={{
                    department: to === "women" || to === "men" ? to : "all",
                    collection: to === "new" ? "new" : "all",
                  }}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between border-b border-black/10 py-4 text-xs uppercase tracking-[0.15em]"
                >
                  {label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between border-b border-black/10 py-4 text-xs uppercase tracking-[0.15em]"
              >
                Our Story
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between border-b border-black/10 py-4 text-xs uppercase tracking-[0.15em]"
              >
                Wishlist
                <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
            <p className="mt-8 text-xs text-neutral-500">Wear Confidence. Define Your Style.</p>
          </aside>
        </div>
      )}
      <nav className="fixed inset-x-0 bottom-0 z-30 grid h-14 grid-cols-4 border-t border-black/10 bg-[#F5F1E9] md:hidden">
        <Link
          to="/shop"
          className="flex flex-col items-center justify-center gap-1 text-[9px] uppercase tracking-wider"
        >
          <Search className="h-4 w-4" />
          Shop
        </Link>
        <Link
          to="/wishlist"
          className="flex flex-col items-center justify-center gap-1 text-[9px] uppercase tracking-wider"
        >
          <Heart className="h-4 w-4" />
          Saved
        </Link>
        <Link
          to="/cart"
          className="flex flex-col items-center justify-center gap-1 text-[9px] uppercase tracking-wider"
        >
          <ShoppingBag className="h-4 w-4" />
          Bag
        </Link>
        <Link
          to="/account"
          className="flex flex-col items-center justify-center gap-1 text-[9px] uppercase tracking-wider"
        >
          <UserRound className="h-4 w-4" />
          Account
        </Link>
      </nav>
    </>
  );
}
