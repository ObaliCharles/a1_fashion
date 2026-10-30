import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { fashionServices } from "@/lib/data";
import placeholder from "@/assets/fashion-placeholder.svg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Fashion Services — A1 FASHION" },
      {
        name: "description",
        content:
          "Explore A1 Fashion services: custom design, personal styling, corporate uniforms, fashion production, digital fashion and event services.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <div className="min-h-screen bg-[#F5F1E9] text-[#171717]">
      <Header />
      <main>
        <section className="bg-[#e9e3d8] px-5 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[1440px]">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#9a7843]">
              Beyond the wardrobe
            </p>
            <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.02] md:text-7xl">
              Fashion services, shaped around your vision.
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-neutral-600">
              A1 Fashion brings ideas into form across personal style, garment design, team identity
              and fashion experiences. Tell us what you are building and we will help define the
              next step.
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-[1440px] px-5 py-14 md:px-12 md:py-20">
          <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {fashionServices.map((service, index) => (
              <Link
                key={service.slug}
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="group"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#e9e3d8]">
                  <img
                    src={service.image}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = placeholder;
                    }}
                    alt={service.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-4 top-4 bg-[#F5F1E9] px-3 py-1 text-[9px] uppercase tracking-[0.18em]">
                    0{index + 1} / {service.category}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-5 pt-4">
                  <div>
                    <h2 className="font-serif text-2xl md:text-3xl">{service.name}</h2>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-600">
                      {service.short}
                    </p>
                  </div>
                  <ArrowRight className="mt-2 h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className="bg-[#171717] px-5 py-14 text-center text-white md:py-20">
          <p className="text-[9px] uppercase tracking-[0.25em] text-[#C5A46D]">
            Have a brief in mind?
          </p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Let’s make it yours.</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-white/65">
            Share a custom design, team uniform, production, digital or event enquiry with A1.
          </p>
          <Link
            to="/enquire"
            search={{ type: "general" }}
            className="mt-7 inline-flex items-center gap-3 border border-white/50 px-6 py-4 text-[9px] uppercase tracking-[0.18em] transition hover:border-[#C5A46D] hover:text-[#C5A46D]"
          >
            Start an enquiry <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
