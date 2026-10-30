import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { saveEnquiryDraft, type EnquiryType } from "@/lib/enquiries";

const enquiryOptions: { value: EnquiryType; label: string }[] = [
  { value: "custom-order", label: "Custom fashion design" },
  { value: "styling", label: "Personal styling" },
  { value: "corporate", label: "Corporate uniforms" },
  { value: "production", label: "Fashion production" },
  { value: "digital", label: "Digital fashion services" },
  { value: "event", label: "Fashion event services" },
  { value: "gift-card", label: "Gift cards" },
  { value: "general", label: "Other / not sure yet" },
];

export const Route = createFileRoute("/enquire")({
  validateSearch: (search: Record<string, unknown>) => ({
    type: enquiryOptions.some((item) => item.value === search.type)
      ? (search.type as EnquiryType)
      : "general",
  }),
  head: () => ({
    meta: [
      { title: "Start an Enquiry — A1 FASHION" },
      {
        name: "description",
        content:
          "Tell A1 Fashion about a custom design, styling, corporate uniform, production, digital or event brief.",
      },
    ],
  }),
  component: Enquire,
});

function Enquire() {
  const { type } = useSearch({ from: "/enquire" });
  const [selectedType, setSelectedType] = useState<EnquiryType>(type);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);
  useEffect(() => setSelectedType(type), [type]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      saveEnquiryDraft({
        type: selectedType,
        name: String(form.get("name") || "").trim(),
        email: String(form.get("email") || "").trim(),
        phone: String(form.get("phone") || "").trim(),
        organisation: String(form.get("organisation") || "").trim(),
        details: String(form.get("details") || "").trim(),
      });
      event.currentTarget.reset();
      setSaved(true);
      setSaveError(false);
    } catch {
      setSaveError(true);
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F1E9] text-[#171717]">
      <Header />
      <main className="mx-auto grid max-w-[1440px] gap-10 px-5 py-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20 md:px-12 md:py-16">
        <section className="md:sticky md:top-28 md:self-start">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.17em] text-neutral-500"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Fashion services
          </Link>
          <p className="mt-10 text-[9px] uppercase tracking-[0.25em] text-[#9a7843]">
            A1 / Let’s begin
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.02] md:text-7xl">
            Tell us about your brief.
          </h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-neutral-600">
            A few details help us understand what you have in mind. We’ll review the scope, timeline
            and next steps with you.
          </p>
          <div className="mt-10 border-t border-black/10 pt-5 text-xs leading-6 text-neutral-500">
            This project currently saves enquiries only in this browser. It does not send them to A1
            Fashion. Avoid entering sensitive or payment information.
          </div>
        </section>
        <section className="bg-white/55 p-5 sm:p-8 md:p-10">
          {saved && (
            <div
              role="status"
              className="mb-7 flex gap-3 border border-[#9a7843]/40 bg-[#eee9e0] p-4 text-sm"
            >
              <Check className="h-5 w-5 shrink-0 text-[#9a7843]" />
              <span>
                Your enquiry draft is saved on this device. A1 Fashion has not received it.
              </span>
            </div>
          )}
          {saveError && (
            <p
              role="alert"
              className="mb-7 border border-red-800/30 bg-red-50 p-4 text-sm text-red-900"
            >
              The enquiry draft could not be saved in this browser. Your entered details remain in
              the form; please try again later.
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="block">
              <span className="mb-2 block text-[9px] uppercase tracking-[0.17em]">
                What can we help with?
              </span>
              <select
                name="type"
                value={selectedType}
                onChange={(event) => setSelectedType(event.target.value as EnquiryType)}
                className="h-12 w-full border border-black/15 bg-[#F5F1E9] px-3 text-sm outline-none focus:border-[#9a7843]"
              >
                {enquiryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-[9px] uppercase tracking-[0.17em]">
                  Your name *
                </span>
                <input
                  name="name"
                  required
                  maxLength={100}
                  autoComplete="name"
                  className="h-12 w-full border border-black/15 bg-transparent px-3 text-sm outline-none focus:border-[#9a7843]"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-[9px] uppercase tracking-[0.17em]">Email *</span>
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  className="h-12 w-full border border-black/15 bg-transparent px-3 text-sm outline-none focus:border-[#9a7843]"
                />
              </label>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-[9px] uppercase tracking-[0.17em]">
                  Phone (optional)
                </span>
                <input
                  name="phone"
                  type="tel"
                  maxLength={30}
                  autoComplete="tel"
                  placeholder="+256 …"
                  className="h-12 w-full border border-black/15 bg-transparent px-3 text-sm outline-none focus:border-[#9a7843]"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-[9px] uppercase tracking-[0.17em]">
                  Organisation (optional)
                </span>
                <input
                  name="organisation"
                  maxLength={150}
                  autoComplete="organization"
                  className="h-12 w-full border border-black/15 bg-transparent px-3 text-sm outline-none focus:border-[#9a7843]"
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-2 block text-[9px] uppercase tracking-[0.17em]">
                Tell us about your idea *
              </span>
              <textarea
                name="details"
                required
                minLength={10}
                maxLength={3000}
                rows={7}
                placeholder="Include the type of work, intended use, approximate quantity or audience, timing, and any references you already have."
                className="w-full resize-y border border-black/15 bg-transparent p-3 text-sm leading-6 outline-none focus:border-[#9a7843]"
              />
            </label>
            <button
              type="submit"
              className="w-full bg-[#171717] px-6 py-4 text-[9px] uppercase tracking-[0.18em] text-white transition hover:bg-[#9a7843] sm:w-auto"
            >
              Save enquiry draft
            </button>
            <p className="text-[10px] text-neutral-500">
              By saving, you store these details locally in this browser. No email, server request
              or order is created.
            </p>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
