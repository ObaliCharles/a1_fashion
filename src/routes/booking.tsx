import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/booking")({
  head: () => ({ meta: [{ title: "Custom Design Enquiry — A1 FASHION" }] }),
  component: () => (
    <div className="min-h-screen bg-[#F5F1E9]">
      <Header />
      <main className="grid min-h-[55vh] place-items-center px-5 text-center">
        <div>
          <p className="text-[9px] uppercase tracking-[0.25em] text-[#9a7843]">
            A1 Fashion / Custom design
          </p>
          <h1 className="mt-3 font-serif text-5xl">Bring your idea to life.</h1>
          <p className="mt-4 text-sm text-neutral-600">
            Share your design, fitting or occasion brief with A1.
          </p>
          <Link
            to="/enquire"
            search={{ type: "custom-order" }}
            className="mt-7 inline-block bg-[#171717] px-7 py-4 text-[9px] uppercase tracking-widest text-white"
          >
            Shop now
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  ),
});
