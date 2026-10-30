import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#171717] pb-16 text-[#F5F1E9] md:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 sm:grid-cols-2 md:grid-cols-4 md:px-12 md:py-16">
        <div className="sm:col-span-2 md:col-span-1">
          <Link to="/" className="inline-flex items-center gap-3 font-serif text-2xl tracking-[0.12em]">
            <img src="/images/a1-fashion-logo.png" alt="" className="h-12 w-12 rounded-sm object-cover" />
            A1 FASHION
          </Link>
          <p className="mt-4 max-w-xs text-xs leading-6 text-white/55">
            Wear Confidence. Define Your Style.
            <br />A considered wardrobe for all.
          </p>
          <p className="mt-5 text-[9px] uppercase tracking-[0.16em] text-[#C5A46D]">
            Kampala · Uganda
          </p>
        </div>
        <div>
          <h2 className="text-[9px] uppercase tracking-[0.2em] text-[#C5A46D]">Discover</h2>
          <ul className="mt-5 space-y-3 text-xs text-white/70">
            <li>
              <Link to="/shop" search={{ department: "all", collection: "new" }}>
                New arrivals
              </Link>
            </li>
            <li>
              <Link to="/shop" search={{ department: "women", collection: "all" }}>
                Women
              </Link>
            </li>
            <li>
              <Link to="/shop" search={{ department: "men", collection: "all" }}>
                Men
              </Link>
            </li>
            <li>
              <Link to="/services">Fashion services</Link>
            </li>
            <li>
              <Link to="/enquire" search={{ type: "custom-order" }}>
                Custom orders
              </Link>
            </li>
            <li>
              <Link to="/enquire" search={{ type: "corporate" }}>
                Corporate uniforms
              </Link>
            </li>
            <li>
              <Link to="/about">Our story</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-[9px] uppercase tracking-[0.2em] text-[#C5A46D]">Client care</h2>
          <ul className="mt-5 space-y-3 text-xs text-white/70">
            <li>
              <Link to="/contact">Contact us</Link>
            </li>
            <li>
              <Link to="/faq">FAQs</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy</Link>
            </li>
            <li>
              <Link to="/account/orders">Orders & delivery</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-[9px] uppercase tracking-[0.2em] text-[#C5A46D]">Get in touch</h2>
          <p className="mt-5 text-xs leading-6 text-white/70">
            For styling and order enquiries, reach us through our contact page.
          </p>
          <Link
            to="/contact"
            className="mt-4 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.16em]"
          >
            Contact A1 <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-5 text-[9px] uppercase tracking-[0.12em] text-white/45 sm:flex-row sm:justify-between md:px-12">
          <span>© {new Date().getFullYear()} A1 Fashion. All rights reserved.</span>
          <span>Wear Confidence. Define Your Style.</span>
        </div>
      </div>
    </footer>
  );
}
