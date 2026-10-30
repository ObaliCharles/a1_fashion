export const formatUGX = (n: number) => `UGX ${n.toLocaleString("en-UG")}`;

export type Product = {
  slug: string;
  name: string;
  category: string;
  department: "Women" | "Men";
  price: number;
  image: string;
  badge?: string;
  description: string;
  sizes: string[];
  colors: string[];
  stock: number;
};
import type { EnquiryType } from "@/lib/enquiries";

// Editorial placeholder catalog: replace prices, stock and imagery with verified A1 inventory before launch.
const editorialImages = {
  women:
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85",
  woman2:
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85",
  woman3:
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85",
  men: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=85",
  men2: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1000&q=85",
  men3: "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1000&q=85",
};

export const products: Product[] = [
  {
    slug: "satin-evening-dress",
    name: "The Satin Evening Dress",
    category: "Dresses",
    department: "Women",
    price: 245000,
    image: editorialImages.women,
    badge: "New season",
    description:
      "A fluid, floor-length silhouette with a soft drape and refined neckline. Made for evenings that call for understated presence.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Onyx", "Champagne"],
    stock: 12,
  },
  {
    slug: "tailored-blazer",
    name: "The Tailored Blazer",
    category: "Jackets",
    department: "Women",
    price: 280000,
    image: editorialImages.woman3,
    badge: "Bestseller",
    description:
      "A considered essential with a clean single-button front, structured shoulders and a long, elegant line.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Sand"],
    stock: 8,
  },
  {
    slug: "city-shirt",
    name: "The City Shirt",
    category: "Shirts",
    department: "Men",
    price: 165000,
    image: editorialImages.men,
    badge: "New",
    description:
      "An easy, elevated shirt with a relaxed fit and crisp finish. Designed to move effortlessly from day to evening.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Sky", "Black"],
    stock: 15,
  },
  {
    slug: "wide-leg-trouser",
    name: "The Wide-Leg Trouser",
    category: "Trousers",
    department: "Women",
    price: 190000,
    image: editorialImages.woman2,
    description:
      "A high-rise tailored trouser with a graceful wide leg and versatile year-round weight.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Ivory"],
    stock: 10,
  },
  {
    slug: "essential-knit",
    name: "The Essential Knit Polo",
    category: "T-shirts",
    department: "Men",
    price: 145000,
    image: editorialImages.men2,
    badge: "Popular",
    description:
      "A refined knit polo with a soft hand and clean ribbed finish. An everyday piece with a little more intention.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Olive", "Cream", "Navy"],
    stock: 18,
  },
  {
    slug: "occasion-dress",
    name: "The Occasion Dress",
    category: "Dresses",
    department: "Women",
    price: 310000,
    image: editorialImages.women,
    description:
      "A sculpted, occasion-ready dress with a modern silhouette and thoughtful details.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Burgundy", "Black"],
    stock: 6,
  },
  {
    slug: "straight-leg-denim",
    name: "The Straight-Leg Denim",
    category: "Trousers",
    department: "Men",
    price: 185000,
    image: editorialImages.men3,
    description:
      "A timeless straight-leg jean in durable denim, finished with a considered mid-rise and clean hardware.",
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Indigo", "Washed black"],
    stock: 14,
  },
  {
    slug: "weekend-tote",
    name: "The Weekend Tote",
    category: "Bags",
    department: "Women",
    price: 175000,
    image: editorialImages.woman3,
    description:
      "A spacious everyday carryall with understated lines and room for everything the day brings.",
    sizes: ["One size"],
    colors: ["Tan", "Black"],
    stock: 9,
  },
  {
    slug: "structured-linen-top",
    name: "The Structured Linen Top",
    category: "Tops",
    department: "Women",
    price: 135000,
    image: editorialImages.woman2,
    badge: "New",
    description:
      "A clean-lined linen-blend top with an easy shape for warm days and layered looks.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Ivory", "Terracotta", "Black"],
    stock: 10,
  },
  {
    slug: "pleated-midi-skirt",
    name: "The Pleated Midi Skirt",
    category: "Skirts",
    department: "Women",
    price: 180000,
    image: editorialImages.women,
    description: "A fluid midi skirt with a softly pleated movement and a versatile high waist.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Ink", "Ochre"],
    stock: 7,
  },
  {
    slug: "everyday-leather-slide",
    name: "The Everyday Leather Slide",
    category: "Shoes",
    department: "Women",
    price: 160000,
    image: editorialImages.woman3,
    description: "A minimal slide with a considered profile for everyday city wear.",
    sizes: ["36", "37", "38", "39", "40", "41"],
    colors: ["Black", "Cognac"],
    stock: 11,
  },
  {
    slug: "woven-statement-earrings",
    name: "The Woven Statement Earrings",
    category: "Accessories",
    department: "Women",
    price: 65000,
    image: editorialImages.women,
    description:
      "Lightweight statement earrings inspired by the texture and rhythm of handwoven forms.",
    sizes: ["One size"],
    colors: ["Natural", "Onyx"],
    stock: 16,
  },
  {
    slug: "field-jacket",
    name: "The Field Jacket",
    category: "Jackets",
    department: "Men",
    price: 295000,
    image: editorialImages.men2,
    badge: "New",
    description: "A modern utility jacket with practical pockets and an understated, easy layer.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Olive", "Sand"],
    stock: 8,
  },
  {
    slug: "city-court-sneaker",
    name: "The City Court Sneaker",
    category: "Shoes",
    department: "Men",
    price: 220000,
    image: editorialImages.men,
    description:
      "A clean low-profile sneaker designed to pair with relaxed tailoring and everyday denim.",
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: ["White", "Black"],
    stock: 9,
  },
  {
    slug: "woven-leather-belt",
    name: "The Woven Leather Belt",
    category: "Accessories",
    department: "Men",
    price: 95000,
    image: editorialImages.men3,
    description: "A woven belt with a considered finish for an easy, relaxed fit.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Tan", "Black"],
    stock: 13,
  },
];

export const womenCategories = [
  "Dresses",
  "Tops",
  "Trousers",
  "Skirts",
  "Shoes",
  "Bags",
  "Accessories",
];
export const menCategories = ["Shirts", "T-shirts", "Trousers", "Jackets", "Shoes", "Accessories"];

export type FashionService = {
  slug: string;
  name: string;
  category: "Design" | "Styling" | "Corporate" | "Production" | "Digital" | "Events";
  image: string;
  short: string;
  description: string;
  details: string[];
  enquiryType: EnquiryType;
};

export const fashionServices: FashionService[] = [
  {
    slug: "custom-fashion-design",
    name: "Custom Fashion Design",
    category: "Design",
    image: editorialImages.women,
    short: "Personalised pieces developed around your vision, fit and occasion.",
    description:
      "From the first conversation to final fitting, A1 works with you to shape a distinctive piece that feels personal and considered. Share a reference, an occasion or just an idea; we will help define the direction.",
    details: [
      "Design consultation and concept direction",
      "Fabric and finish discussion",
      "Made-to-measure fitting milestones",
      "Occasion, formal and everyday commissions",
    ],
    enquiryType: "custom-order",
  },
  {
    slug: "personal-styling",
    name: "Personal Styling",
    category: "Styling",
    image: editorialImages.woman2,
    short: "A considered wardrobe edit built around your lifestyle and point of view.",
    description:
      "A1 styling helps you make more of what you wear. We can plan looks for a particular moment, refine your everyday wardrobe or help you build a versatile edit that reflects your personal style.",
    details: [
      "Wardrobe and lifestyle conversation",
      "Occasion and event outfit planning",
      "Personal shopping direction",
      "Lookbook and outfit pairing",
    ],
    enquiryType: "styling",
  },
  {
    slug: "corporate-uniforms",
    name: "Corporate Uniforms",
    category: "Corporate",
    image: editorialImages.men,
    short: "Branded workwear with thoughtful fit, function and identity.",
    description:
      "We partner with teams to develop a consistent uniform language, from a small front-of-house capsule to a larger staff programme. Each enquiry is scoped around your people, use case and production needs.",
    details: [
      "Brand and role discovery",
      "Uniform concepts and sample direction",
      "Sizing and team-fit planning",
      "Production quantities and delivery planning",
    ],
    enquiryType: "corporate",
  },
  {
    slug: "fashion-production",
    name: "Fashion Production",
    category: "Production",
    image: editorialImages.men2,
    short: "Small-batch garment development and production support.",
    description:
      "Bring a collection idea into a production-ready plan with design development, sampling and small-batch production coordination. We review each brief to agree on a realistic scope and timeline.",
    details: [
      "Collection and technical brief review",
      "Sample development planning",
      "Small-batch production coordination",
      "Quality and finishing requirements",
    ],
    enquiryType: "production",
  },
  {
    slug: "digital-fashion",
    name: "Digital Fashion Services",
    category: "Digital",
    image: editorialImages.woman3,
    short: "Digital concepts and visual assets for contemporary fashion brands.",
    description:
      "A1 supports fashion teams with digital-first creative work, including collection visualisation, campaign direction and product storytelling. Share the channel, audience and deliverables you have in mind.",
    details: [
      "Digital campaign concepts",
      "Collection and product storytelling",
      "Creative direction for social channels",
      "Digital lookbook planning",
    ],
    enquiryType: "digital",
  },
  {
    slug: "fashion-events",
    name: "Fashion Event Services",
    category: "Events",
    image: editorialImages.women,
    short: "Fashion-led experiences, runway concepts and event wardrobe direction.",
    description:
      "From a brand presentation to a runway moment, A1 can help shape the fashion side of your event. We work from your objectives, audience, venue and production needs to build a practical creative brief.",
    details: [
      "Event concept and fashion direction",
      "Runway and presentation planning",
      "Model and wardrobe coordination brief",
      "Brand activation and launch support",
    ],
    enquiryType: "event",
  },
];
