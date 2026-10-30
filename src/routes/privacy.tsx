import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — A1 FASHION" }] }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mx-auto max-w-3xl px-4 py-16 prose">
        <h1 className="font-serif text-5xl mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground">
          A1 Fashion is preparing its online store. This page will be updated with the final privacy
          notice before customer accounts or order processing are enabled.
        </p>
        <p className="text-muted-foreground mt-4">
          The current storefront does not submit customer details to a server, process payments, or
          create customer orders.
        </p>
        <p className="text-muted-foreground mt-4">
          Please do not submit sensitive personal or payment information through this preview site.
        </p>
      </main>
      <Footer />
    </div>
  );
}
