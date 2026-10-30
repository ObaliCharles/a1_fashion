import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MapPin, Mail } from "lucide-react";
import { saveEnquiryDraft } from "@/lib/enquiries";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — A1 FASHION" },
      {
        name: "description",
        content: "Contact A1 Fashion for styling and order enquiries in Uganda.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const values = new FormData(form);
    try {
      saveEnquiryDraft({
        type: "general",
        name: String(values.get("name") || "").trim(),
        email: String(values.get("email") || "").trim(),
        phone: String(values.get("phone") || "").trim(),
        organisation: "",
        details: `${String(values.get("subject") || "").trim()}\n\n${String(values.get("message") || "").trim()}`,
      });
      form.reset();
      setSaved(true);
      setSaveError(false);
    } catch {
      setSaveError(true);
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-blush py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-rose mb-3">Get in Touch</p>
            <h1 className="font-serif text-5xl md:text-6xl">Contact Us</h1>
            <p className="mt-4 text-muted-foreground">
              For styling questions and order enquiries, leave us a message.
            </p>
          </div>
        </section>
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-3xl mb-6">A1 Fashion · Uganda</h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <MapPin className="text-rose shrink-0" /> <span>Uganda</span>
                </li>
                <li className="flex gap-3">
                  <Mail className="text-rose shrink-0" />{" "}
                  <span>Use the form to save an enquiry draft in your browser.</span>
                </li>
              </ul>
              <p className="mt-8 border-t border-border pt-5 text-sm text-muted-foreground">
                Our verified store location and customer support details will be published here
                before launch.
              </p>
            </div>
            <form onSubmit={submit} className="space-y-4">
              <h2 className="font-serif text-3xl mb-6">Send a Message</h2>
              <p className="text-xs leading-5 text-muted-foreground">
                The form saves a draft in this browser; it does not send a message to A1 Fashion.
              </p>
              {saved && (
                <p role="status" className="border border-[#9a7843]/40 bg-[#eee9e0] p-4 text-sm">
                  Your message draft is saved in this browser. A1 Fashion has not received it.
                </p>
              )}
              {saveError && (
                <p
                  role="alert"
                  className="border border-red-800/30 bg-red-50 p-4 text-sm text-red-900"
                >
                  This browser could not save your message. The form still contains your details;
                  please try again.
                </p>
              )}
              <input
                name="name"
                required
                maxLength={100}
                placeholder="Your name"
                className="w-full border border-border px-4 py-3 bg-background"
              />
              <input
                name="email"
                required
                type="email"
                maxLength={254}
                placeholder="Email address"
                className="w-full border border-border px-4 py-3 bg-background"
              />
              <input
                name="phone"
                maxLength={30}
                placeholder="Phone (optional)"
                className="w-full border border-border px-4 py-3 bg-background"
              />
              <input
                name="subject"
                required
                maxLength={150}
                placeholder="Subject"
                className="w-full border border-border px-4 py-3 bg-background"
              />
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={3000}
                rows={5}
                placeholder="Your message"
                className="w-full border border-border px-4 py-3 bg-background"
              />
              <button className="bg-primary text-primary-foreground px-10 py-4 text-xs uppercase tracking-widest hover:bg-primary/90">
                Save Message Draft
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
