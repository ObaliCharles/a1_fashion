import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [{ title: "The A1 Edit — A1 FASHION" }] }),
  component: () => (
    <div className="min-h-screen bg-[#F5F1E9]">
      <Header />
      <main className="mx-auto max-w-[1440px] px-5 py-14 md:px-12">
        <p className="text-[9px] uppercase tracking-[0.25em] text-[#9a7843]">A1 / Visual journal</p>
        <h1 className="mt-3 font-serif text-5xl md:text-7xl">The A1 edit</h1>
        <p className="mt-4 text-sm text-neutral-600">A closer look at the A1 style story.</p>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["/images/chic-blonde-braids-plaza.png", "Golden braids in a European plaza"],
            ["/images/golden-braids-interior.png", "Golden braids in a warm interior"],
            ["/images/parisian-golden-hour-portrait.png", "Parisian golden-hour fashion portrait"],
          ].map(([image, caption]) => (
            <figure key={image} className="overflow-hidden">
              <img
                src={image}
                alt={caption}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <figcaption className="py-3 text-[9px] uppercase tracking-wider">
                {caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  ),
});
