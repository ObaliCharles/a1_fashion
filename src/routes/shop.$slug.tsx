import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Truck } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { addToCart } from "@/lib/cart";
import { products, formatUGX, type Product } from "@/lib/data";
import placeholder from "@/assets/fashion-placeholder.svg";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — A1 FASHION` },
          { name: "description", content: loaderData.product.description },
        ]
      : [],
  }),
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center">Piece not found</div>
  ),
});
function ProductDetail() {
  const { product } = Route.useLoaderData() as { product: Product };
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  return (
    <div className="min-h-screen bg-[#F5F1E9] text-[#171717]">
      <Header />
      <main className="mx-auto max-w-[1280px] px-5 py-8 md:px-12 md:py-14">
        <p className="mb-6 text-[9px] uppercase tracking-[0.16em] text-neutral-500">
          <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {product.name}
        </p>
        <div className="grid gap-9 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[90px_1fr] md:gap-4">
            <div className="order-2 flex gap-2 sm:order-1 sm:flex-col">
              <img
                src={product.image}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = placeholder;
                }}
                alt={`${product.name} detail`}
                className="aspect-[3/4] w-[68px] object-cover sm:w-full"
              />
              <img
                src={product.image}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = placeholder;
                }}
                alt={`${product.name} styling`}
                className="aspect-[3/4] w-[68px] object-cover object-[70%] sm:w-full"
              />
            </div>
            <div className="order-1 aspect-[4/5] overflow-hidden bg-[#e9e3d8] sm:order-2">
              <img
                src={product.image}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = placeholder;
                }}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <section className="pt-1 md:pt-5">
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#9a7843]">
              {product.department} / {product.category}
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">{product.name}</h1>
            <p className="mt-4 text-lg">{formatUGX(product.price)}</p>
            <p className="mt-5 max-w-md text-sm leading-7 text-neutral-600">
              {product.description}
            </p>
            <div className="mt-8">
              <div className="mb-3 flex justify-between text-[9px] uppercase tracking-[0.16em]">
                <span>Colour</span>
                <span className="text-neutral-500">{color}</span>
              </div>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    aria-label={`Choose ${c}`}
                    className={`h-8 min-w-8 border px-3 text-[9px] ${color === c ? "border-black" : "border-black/20"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-7">
              <div className="mb-3 flex justify-between text-[9px] uppercase tracking-[0.16em]">
                <span>Size</span>
                <span className="text-neutral-500">Select your fit</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`grid h-10 min-w-11 place-items-center border px-3 text-xs ${size === s ? "border-black bg-black text-white" : "border-black/20 hover:border-black"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-7 flex items-center gap-3">
              <div className="flex h-12 items-center border border-black/20">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  aria-label="Decrease quantity"
                  className="px-3"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-7 text-center text-xs">{qty}</span>
                <button
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  aria-label="Increase quantity"
                  className="px-3"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
              <button
                disabled={product.stock < 1}
                onClick={() => {
                  addToCart(
                    {
                      id: `${product.slug}-${size}-${color}`,
                      name: `${product.name} · ${color} · ${size}`,
                      price: product.price,
                      image: product.image,
                      type: "product",
                    },
                    qty,
                  );
                  toast.success("Added to your bag");
                }}
                className="h-12 flex-1 bg-[#171717] text-[9px] uppercase tracking-[0.18em] text-white transition hover:bg-[#9a7843] disabled:opacity-40"
              >
                Add to bag · {formatUGX(product.price * qty)}
              </button>
            </div>
            <p className="mt-4 text-[10px] text-neutral-500">
              {product.stock > 0
                ? "Availability shown is sample catalog data"
                : "Currently unavailable"}
            </p>
            <div className="mt-8 border-y border-black/10 py-5 text-xs">
              <p className="flex items-center gap-3">
                <Truck className="h-4 w-4" />
                Delivery information will be published before the store opens for orders.
              </p>
            </div>
            <p className="mt-6 text-[9px] uppercase tracking-[0.18em]">Details & care</p>
            <p className="mt-3 text-xs leading-6 text-neutral-600">
              Product descriptions, materials, size guides and stock are sample content pending
              verified A1 inventory.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
