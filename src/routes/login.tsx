import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign In — A1 FASHION" }] }),
  component: Login,
});

function Login() {
  const [message, setMessage] = useState("");
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-md px-4">
          <h1 className="font-serif text-4xl text-center">Welcome back</h1>
          <p className="text-center text-muted-foreground text-sm mt-2">
            Customer accounts will be available when the A1 store backend is connected.
          </p>
          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setMessage("Sign-in is not connected yet. No credentials were sent or saved.");
            }}
          >
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 text-xs uppercase tracking-widest hover:bg-primary/90"
            >
              Sign In
            </button>
          </form>
          {message && (
            <p
              role="status"
              className="mt-4 border border-[#9a7843]/30 bg-[#eee9e0] p-4 text-center text-sm"
            >
              {message}
            </p>
          )}
          <p className="text-center text-sm mt-6 text-muted-foreground">
            New here?{" "}
            <Link to="/register" className="text-rose">
              Create an account
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
