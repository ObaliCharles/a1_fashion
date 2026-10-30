import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/lib/data";
import { useWishlist } from "@/lib/wishlist";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Saved pieces — A1 FASHION" }] }),
  component: Wishlist,
});
function Wishlist() {
  const ids = useWishlist();
  const saved = products.filter((product) => ids.includes(product.slug));
  return (
    <div className="min-h-screen bg-[#F5F1E9] text-[#171717]">
      <Header />
      <main className="mx-auto min-h-[55vh] max-w-[1440px] px-5 py-12 md:px-12 md:py-16">
        <p className="text-[9px] uppercase tracking-[0.25em] text-[#9a7843]">Your edit</p>
        <h1 className="mt-2 font-serif text-5xl">Saved pieces</h1>
        {saved.length ? (
          <div className="mt-9 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-4 md:gap-6">
            {saved.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-sm text-neutral-600">Pieces you save will be waiting here.</p>
            <Link
              to="/shop"
              className="mt-6 inline-block border-b border-black pb-2 text-[9px] uppercase tracking-widest"
            >
              Explore the collection
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
