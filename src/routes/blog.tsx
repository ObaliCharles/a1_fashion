import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — A1 FASHION" },
      {
        name: "description",
        content: "Notes on personal style and getting dressed, from A1 Fashion.",
      },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-[#F5F1E9]">
      <Header />
      <main className="mx-auto max-w-5xl px-5 py-16 md:px-12 md:py-24">
        <p className="text-[9px] uppercase tracking-[0.25em] text-[#9a7843]">A1 journal</p>
        <h1 className="mt-3 font-serif text-5xl md:text-7xl">Notes on style</h1>
        <p className="mt-5 max-w-lg text-sm leading-6 text-neutral-600">
          Our journal is taking shape. In the meantime, explore pieces selected to make everyday
          dressing feel more considered.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-3 border-b border-black pb-2 text-[9px] uppercase tracking-widest"
        >
          Explore the collection <ArrowRight className="h-4 w-4" />
        </Link>
      </main>
      <Footer />
    </div>
  ),
});
