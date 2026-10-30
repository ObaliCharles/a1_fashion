import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { User, CalendarCheck, Heart, Package, Settings } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My Account — A1 FASHION" }] }),
  component: Account,
});

const links = [
  { to: "/account", label: "Profile", icon: User, exact: true },
  { to: "/account/orders", label: "Orders", icon: Package },
  { to: "/wishlist", label: "Wishlist", icon: Heart },
  { to: "/account/settings", label: "Settings", icon: Settings },
] as const;

function Account() {
  const loc = useLocation();
  const isRoot = loc.pathname === "/account";
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-[240px_1fr] gap-10">
          <aside>
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.3em] text-rose">Welcome</p>
              <h2 className="font-serif text-2xl">Hello, Guest</h2>
            </div>
            <nav className="space-y-1">
              {links.map((l) => {
                const exact = "exact" in l ? l.exact : false;
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted rounded"
                    activeProps={{ className: "bg-muted text-rose" }}
                    activeOptions={{ exact }}
                  >
                    <l.icon className="h-4 w-4" /> {l.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
          <section>
            {isRoot ? (
              <div>
                <h1 className="font-serif text-3xl">Profile</h1>
                <p className="text-muted-foreground text-sm mt-2">
                  Customer accounts will be available when the A1 store backend is connected.
                </p>
                <div className="mt-8 grid sm:grid-cols-2 gap-6">
                  <div className="border border-border p-5">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Name</p>
                    <p className="font-serif text-xl mt-1">Guest User</p>
                  </div>
                  <div className="border border-border p-5">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Email</p>
                    <p className="font-serif text-xl mt-1">Not connected</p>
                  </div>
                  <div className="border border-border p-5">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Phone</p>
                    <p className="font-serif text-xl mt-1">Not connected</p>
                  </div>
                  <div className="border border-border p-5">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      Location
                    </p>
                    <p className="font-serif text-xl mt-1">Uganda</p>
                  </div>
                </div>
                <p className="mt-8 text-xs text-muted-foreground">
                  Profile information is not stored by this preview storefront.
                </p>
              </div>
            ) : (
              <Outlet />
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
