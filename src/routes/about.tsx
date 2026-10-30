import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our story — A1 FASHION" },
      {
        name: "description",
        content:
          "Meet A1 Fashion: modern style, thoughtful details and a considered wardrobe for Uganda.",
      },
    ],
  }),
  component: About,
});
function About() {
  return (
    <div className="min-h-screen bg-[#F5F1E9] text-[#171717]">
      <Header />
      <main>
        <section className="px-5 py-20 text-center md:py-28">
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#9a7843]">Our point of view</p>
          <h1 className="mx-auto mt-5 max-w-4xl font-serif text-5xl leading-tight md:text-7xl">
            Wear confidence.
            <br />
            Define your style.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-neutral-600">
            A1 Fashion is a new destination for considered clothing and accessories in Uganda. We
            make getting dressed feel personal, expressive and entirely your own.
          </p>
        </section>
        <section className="grid bg-[#e9e3d8] md:grid-cols-2">
          <div className="min-h-[360px] bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85')] bg-cover bg-center md:min-h-[600px]" />
          <div className="flex items-center px-8 py-14 md:px-16">
            <div className="max-w-md">
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#9a7843]">
                Built around you
              </p>
              <h2 className="mt-4 font-serif text-4xl md:text-5xl">
                Personal style, thoughtfully edited.
              </h2>
              <p className="mt-5 text-sm leading-7 text-neutral-600">
                Our collections bring together versatile silhouettes, modern essentials and
                distinctive finishing touches. Each piece is selected to work hard in your wardrobe
                and feel right when you wear it.
              </p>
              <p className="mt-4 text-sm leading-7 text-neutral-600">
                As A1 grows, our focus stays on thoughtful service, clear product information and
                making good style easier to find.
              </p>
              <Link
                to="/shop"
                className="mt-8 inline-block border-b border-black pb-2 text-[9px] uppercase tracking-[0.18em]"
              >
                Explore the collection
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
