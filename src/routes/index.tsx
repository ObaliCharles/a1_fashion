import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { fashionServices, products } from "@/lib/data";
import heroImage from "@/assets/a1-hero.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A1 FASHION — Wear Confidence. Define Your Style." },
      {
        name: "description",
        content:
          "Discover considered fashion for women and men at A1 Fashion. Shop the latest edit, delivered in Uganda.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-[#F5F1E9] text-[#171717]">
      <Header />
      <main>
        <section className="relative min-h-[590px] overflow-hidden bg-neutral-800 md:min-h-[720px]">
          <img
            src={heroImage}
            alt="A1 Fashion editorial portrait in warm afternoon light"
            className="a1-hero-image absolute inset-0 h-full w-full object-cover object-[58%_32%]"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent sm:hidden" />
          <div className="relative mx-auto flex min-h-[590px] max-w-[1440px] items-end px-6 pb-16 sm:items-center sm:pb-0 md:min-h-[720px] md:px-12">
            <div className="a1-hero-copy max-w-2xl text-white">
              <p className="text-[9px] uppercase tracking-[0.35em] text-white/80 md:text-[10px]">
                The new season · Kampala, Uganda
              </p>
              <h1 className="a1-hero-title mt-5 max-w-xl font-serif text-5xl leading-[0.97] sm:text-6xl md:text-8xl">
                Wear confidence.
                <br />
                Define your style.
              </h1>
              <p className="mt-6 max-w-md text-sm leading-6 text-white/80">
                A considered wardrobe for every version of you. Discover pieces made to stay in your
                rotation.
              </p>
              <div className="mt-8 flex gap-3">
                <Link
                  to="/shop"
                  className="a1-hero-button inline-flex items-center gap-4 bg-[#F5F1E9] px-6 py-4 text-[9px] uppercase tracking-[0.2em] text-[#171717] transition duration-300 hover:-translate-y-1 hover:bg-[#C5A46D]"
                >
                  Explore the collection <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-7 right-8 hidden text-[9px] uppercase tracking-[0.25em] text-white/75 md:block">
            A1 / Collection 01
          </div>
        </section>
        <section className="border-b border-black/10">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 divide-x divide-black/10 px-5 md:px-12">
            <Link
              to="/shop"
              search={{ department: "women", collection: "all" }}
              className="group flex items-center justify-between py-6 pr-5 md:py-8 md:pr-10"
            >
              <span>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-neutral-500">
                  Explore the edit
                </span>
                <span className="mt-2 block font-serif text-2xl md:text-3xl">For her</span>
              </span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/shop"
              search={{ department: "men", collection: "all" }}
              className="group flex items-center justify-between py-6 pl-5 md:py-8 md:pl-10"
            >
              <span>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-neutral-500">
                  Explore the edit
                </span>
                <span className="mt-2 block font-serif text-2xl md:text-3xl">For him</span>
              </span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
        <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-12 md:py-24">
          <div className="mb-8 flex items-end justify-between md:mb-11">
            <div>
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#9a7843]">
                The first edit
              </p>
              <h2 className="mt-2 font-serif text-4xl md:text-5xl">New arrivals</h2>
            </div>
            <Link
              to="/shop"
              className="flex items-center gap-2 pb-1 text-[9px] uppercase tracking-[0.16em]"
            >
              Shop all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-4 md:gap-6">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
        <section className="grid bg-[#e9e3d8] md:grid-cols-2">
          <div className="relative min-h-[390px] overflow-hidden md:min-h-[600px]">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85"
              alt="Contemporary womenswear editorial"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="flex items-center px-7 py-14 md:px-16 md:py-20">
            <div className="max-w-md">
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#9a7843]">
                A1 point of view
              </p>
              <h2 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">
                Style is how you introduce yourself.
              </h2>
              <p className="mt-6 text-sm leading-7 text-neutral-600">
                We believe getting dressed should feel instinctive. A1 brings together modern
                silhouettes, thoughtful details and lasting pieces for the way you live now.
              </p>
              <Link
                to="/about"
                className="mt-8 inline-flex items-center gap-3 border-b border-black pb-2 text-[9px] uppercase tracking-[0.2em]"
              >
                Discover A1 <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-12 md:py-24">
          <div className="mb-8 flex items-end justify-between md:mb-11">
            <div>
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#9a7843]">
                A considered wardrobe
              </p>
              <h2 className="mt-2 font-serif text-4xl md:text-5xl">The A1 selection</h2>
            </div>
            <Link
              to="/shop"
              className="flex items-center gap-2 pb-1 text-[9px] uppercase tracking-[0.16em]"
            >
              Explore all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-4 md:gap-6">
            {products.slice(4, 8).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
        <section className="border-y border-black/10 bg-[#eee9e0] py-16 md:py-24">
          <div className="mx-auto max-w-[1440px] px-5 md:px-12">
            <div className="mb-8 flex items-end justify-between gap-4 md:mb-11">
              <div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-[#9a7843]">
                  A1 / Made for more
                </p>
                <h2 className="mt-2 font-serif text-4xl md:text-5xl">Fashion, beyond the rack.</h2>
              </div>
              <Link
                to="/services"
                className="flex items-center gap-2 pb-1 text-[9px] uppercase tracking-[0.16em]"
              >
                All services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {fashionServices.slice(0, 3).map((service) => (
                <Link
                  key={service.slug}
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  className="a1-service-card group border border-black/10 bg-[#F5F1E9] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#9a7843] md:p-8"
                >
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#9a7843]">
                    {service.category}
                  </p>
                  <div className="mt-8 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-2xl md:text-3xl">{service.name}</h3>
                      <p className="mt-2 text-xs leading-5 text-neutral-600">{service.short}</p>
                    </div>
                    <ArrowRight className="mb-1 h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {fashionServices.slice(3).map((service) => (
                <Link
                  key={service.slug}
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  className="flex items-center justify-between border-b border-black/15 py-4 text-xs hover:text-[#9a7843]"
                >
                  <span>
                    <span className="mr-3 text-[9px] uppercase tracking-[0.15em] text-[#9a7843]">
                      {service.category}
                    </span>
                    {service.name}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
            <div className="mt-10 flex flex-col gap-4 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-neutral-600">
                For teams and organisations, we develop uniform programmes around your brand and
                working needs.
              </p>
              <Link
                to="/enquire"
                search={{ type: "corporate" }}
                className="inline-flex w-fit items-center gap-2 border-b border-black pb-2 text-[9px] uppercase tracking-[0.16em]"
              >
                Corporate enquiries <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        <section className="bg-[#171717] px-5 py-16 text-center text-white md:py-20">
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#C5A46D]">The A1 letter</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">A little more considered.</h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/65">
            Sign up to hear about new arrivals, thoughtful edits and a first look at what’s next.
          </p>
          <p className="mx-auto mt-6 max-w-md text-[10px] text-white/50">
            Newsletter sign-up is coming soon. This preview does not collect email addresses.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
