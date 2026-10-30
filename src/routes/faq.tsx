import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQs — A1 FASHION" }] }),
  component: FAQ,
});

const faqs = [
  {
    q: "Where do you deliver?",
    a: "Delivery options and timelines across Uganda will be confirmed before checkout is enabled.",
  },
  {
    q: "Which payment methods can I use?",
    a: "Mobile money, card and other payment options are not connected yet. No payment is currently accepted through this site.",
  },
  {
    q: "How do I choose the right size?",
    a: "Size information is shown on each product page. Detailed size guides will be added with verified product specifications.",
  },
  {
    q: "How can I contact A1 Fashion?",
    a: "Use the Contact page to send an enquiry. The form is a visual preview and is not connected to a customer service inbox yet.",
  },
];

function FAQ() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mx-auto max-w-3xl px-4 py-16 w-full">
        <h1 className="font-serif text-5xl mb-10 text-center">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="border border-border p-5 group">
              <summary className="font-serif text-xl cursor-pointer">{f.q}</summary>
              <p className="mt-3 text-muted-foreground text-sm">{f.a}</p>
            </details>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
