import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/testimonials")({
  head: () => ({ meta: [{ title: "A1 FASHION — Our customers" }] }),
  component: () => (
    <div className="min-h-screen bg-[#F5F1E9]">
      <Header />
      <main className="grid min-h-[55vh] place-items-center px-5 text-center">
        <div>
          <p className="text-[9px] uppercase tracking-[0.25em] text-[#9a7843]">A1 Fashion</p>
          <h1 className="mt-3 font-serif text-5xl">A new story starts here.</h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-neutral-600">
            Customer reviews will appear after verified orders. We do not publish sample
            testimonials.
          </p>
          <Link
            to="/shop"
            className="mt-7 inline-block border-b border-black pb-2 text-[9px] uppercase tracking-widest"
          >
            Explore the collection
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  ),
});
