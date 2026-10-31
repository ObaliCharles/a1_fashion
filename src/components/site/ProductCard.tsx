import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { addToCart } from "@/lib/cart";
import { Product, formatUGX } from "@/lib/data";
import { toggleWishlist, useWishlist } from "@/lib/wishlist";
import placeholder from "@/assets/fashion-placeholder.svg";

export function ProductCard({ product }: { product: Product }) {
  const saved = useWishlist().includes(product.slug);
  return (
    <article className="group a1-product-card">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Link to="/shop/$slug" params={{ slug: product.slug }} className="block h-full">
          {product.badge && (
            <span className="absolute left-3 top-3 z-10 bg-white px-3 py-1 text-[9px] uppercase tracking-[0.18em]">
              {product.badge}
            </span>
          )}
          <img
            src={product.image}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = placeholder;
            }}
            alt={product.name}
            width={600}
            height={800}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
          />
        </Link>
        <button
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product.slug)}
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 ${saved ? "text-rose-700" : "text-neutral-800"}`}
        >
          <Heart className="h-4 w-4" fill={saved ? "currentColor" : "none"} />
        </button>
        <button
          onClick={() => {
            const added = addToCart({
              id: product.slug,
              name: product.name,
              price: product.price,
              image: product.image,
              type: "product",
            });
            if (added) toast.success(`${product.name} added to bag`);
            else toast.error("Your bag could not be updated in this browser.");
          }}
          className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center bg-white text-neutral-900 transition hover:bg-neutral-900 hover:text-white sm:opacity-0 sm:group-hover:opacity-100"
          aria-label={`Add ${product.name} to bag`}
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
      </div>
      <div className="pt-3">
        <p className="text-[9px] uppercase tracking-[0.18em] text-neutral-500">
          {product.department} / {product.category}
        </p>
        <Link
          to="/shop/$slug"
          params={{ slug: product.slug }}
          className="mt-1 block text-sm font-medium hover:underline"
        >
          {product.name}
        </Link>
        <p className="mt-1 text-sm">{formatUGX(product.price)}</p>
        <p className="mt-1 text-[10px] text-neutral-500">
          {product.colors.slice(0, 3).join(" · ")}
        </p>
      </div>
    </article>
  );
}
