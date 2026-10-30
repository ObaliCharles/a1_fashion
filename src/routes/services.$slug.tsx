import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { fashionServices, type FashionService } from "@/lib/data";
import placeholder from "@/assets/fashion-placeholder.svg";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = fashionServices.find((item) => item.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.service.name} — A1 FASHION` },
          { name: "description", content: loaderData.service.short },
        ]
      : [],
  }),
  component: ServiceDetail,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-[#F5F1E9] text-center">
      <div>
        <h1 className="font-serif text-4xl">Service not found</h1>
        <Link to="/services" className="mt-5 inline-block underline">
          View all services
        </Link>
      </div>
    </div>
  ),
});

function ServiceDetail() {
  const { service } = Route.useLoaderData() as { service: FashionService };
  return (
    <div className="min-h-screen bg-[#F5F1E9] text-[#171717]">
      <Header />
      <main>
        <section className="mx-auto grid max-w-[1440px] gap-8 px-5 py-8 md:grid-cols-[1.05fr_0.95fr] md:gap-16 md:px-12 md:py-14">
          <div className="relative aspect-[4/4.5] overflow-hidden bg-[#e9e3d8] md:aspect-[4/4.3]">
            <img
              src={service.image}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = placeholder;
              }}
              alt={service.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center py-5 md:py-12">
            <Link
              to="/services"
              className="mb-9 inline-flex w-fit items-center gap-2 text-[9px] uppercase tracking-[0.17em] text-neutral-500"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All services
            </Link>
            <p className="text-[9px] uppercase tracking-[0.25em] text-[#9a7843]">
              A1 / {service.category}
            </p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.02] md:text-7xl">{service.name}</h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-600">
              {service.description}
            </p>
            <ul className="mt-8 space-y-3 border-t border-black/10 pt-6">
              {service.details.map((detail) => (
                <li key={detail} className="flex gap-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#9a7843]" />
                  {detail}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/enquire"
                search={{ type: service.enquiryType }}
                className="inline-flex items-center justify-center gap-3 bg-[#171717] px-6 py-4 text-[9px] uppercase tracking-[0.16em] text-white transition hover:bg-[#9a7843]"
              >
                Discuss your brief <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center border border-black/25 px-6 py-4 text-[9px] uppercase tracking-[0.16em]"
              >
                Contact A1
              </Link>
            </div>
            <p className="mt-4 text-[10px] text-neutral-500">
              Every project is scoped individually. We’ll confirm availability, timing and pricing
              after reviewing your brief.
            </p>
          </div>
        </section>
        <section className="border-y border-black/10 bg-[#eee9e0] px-5 py-12 md:px-12 md:py-16">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] text-[#9a7843]">The next step</p>
              <h2 className="mt-2 font-serif text-3xl md:text-4xl">
                Tell us what you’re imagining.
              </h2>
            </div>
            <Link
              to="/enquire"
              search={{ type: service.enquiryType }}
              className="inline-flex w-fit items-center gap-3 border-b border-black pb-2 text-[9px] uppercase tracking-[0.16em]"
            >
              Start an enquiry <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
