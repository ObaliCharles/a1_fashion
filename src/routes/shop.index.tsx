import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/lib/data";

export const Route = createFileRoute("/shop/")({
  validateSearch: (search: Record<string, unknown>) => ({
    department: typeof search.department === "string" ? search.department : "all",
    collection: typeof search.collection === "string" ? search.collection : "all",
  }),
  head: () => ({
    meta: [
      { title: "Shop the collection — A1 FASHION" },
      {
        name: "description",
        content:
          "Shop contemporary clothing and accessories for women and men at A1 Fashion Uganda.",
      },
    ],
  }),
  component: Shop,
});
function Shop() {
  const search = useSearch({ from: "/shop/" });
  const initialDepartment =
    search.department === "women" ? "Women" : search.department === "men" ? "Men" : "All pieces";
  const [department, setDepartment] = useState(initialDepartment);
  const [category, setCategory] = useState("All categories");
  const [sort, setSort] = useState("Featured");
  const [query, setQuery] = useState("");
  useEffect(() => {
    setDepartment(
      search.department === "women" ? "Women" : search.department === "men" ? "Men" : "All pieces",
    );
    setCategory("All categories");
  }, [search.department, search.collection]);
  const categories = [
    "All categories",
    ...new Set(
      products
        .filter((p) => department === "All pieces" || p.department === department)
        .map((p) => p.category),
    ),
  ];
  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (department === "All pieces" || p.department === department) &&
        (search.collection !== "new" || p.badge === "New" || p.badge === "New season") &&
        (category === "All categories" || p.category === category) &&
        `${p.name} ${p.category} ${p.department}`.toLowerCase().includes(query.toLowerCase()),
    );
    if (sort === "Price: low to high") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: high to low") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [department, category, query, sort, search.collection]);
  return (
    <div className="min-h-screen bg-[#F5F1E9] text-[#171717]">
      <Header />
      <main className="mx-auto max-w-[1440px] px-5 pb-16 pt-10 md:px-12 md:pt-16">
        <div className="border-b border-black/10 pb-8 md:pb-12">
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#9a7843]">Discover A1</p>
          <h1 className="mt-3 font-serif text-5xl md:text-7xl">
            {search.collection === "new"
              ? "New arrivals"
              : search.collection === "best"
                ? "Best sellers"
                : department === "All pieces"
                  ? "The collection"
                  : `${department}'s collection`}
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-6 text-neutral-600">
            Considered pieces for the everyday and the in-between.
          </p>
        </div>
        <div className="flex flex-col gap-4 border-b border-black/10 py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-5 overflow-x-auto">
            {["All pieces", "Women", "Men"].map((d) => (
              <button
                key={d}
                onClick={() => {
                  setDepartment(d);
                  setCategory("All categories");
                }}
                className={`whitespace-nowrap border-b pb-2 text-[9px] uppercase tracking-[0.15em] ${department === d ? "border-[#171717]" : "border-transparent text-neutral-500"}`}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-[9px] uppercase tracking-wider text-neutral-500">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="max-w-36 bg-transparent text-[#171717] outline-none"
              >
                <option>All categories</option>
                {categories.slice(1).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pieces"
              className="w-28 border-b border-black/20 bg-transparent py-2 text-xs outline-none placeholder:text-neutral-400 focus:border-black"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent text-[9px] uppercase tracking-wider outline-none"
            >
              <option>Featured</option>
              <option>Price: low to high</option>
              <option>Price: high to low</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between py-5 text-[9px] uppercase tracking-[0.16em] text-neutral-500">
          <span>
            {department} / {category}
          </span>
          <span>{filtered.length} pieces</span>
        </div>
        {filtered.length ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="font-serif text-3xl">No pieces found</p>
            <button
              onClick={() => {
                setQuery("");
                setCategory("All categories");
                setDepartment("All pieces");
              }}
              className="mt-4 border-b border-black pb-1 text-[9px] uppercase tracking-widest"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
