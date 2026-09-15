import { useMemo, useState } from "react";
import SampleProduct from "../components/SampleProduct";
import hero01 from "../assets/shopHero.avif";
import { products as ALL_PRODUCTS } from "../data/products";
import { parsePrice } from "../utils/price";
import {
  Leaf,
  RotateCcw,
  ShieldCheck,
  Truck,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import {ShopHero} from '../components/sections/ShopHero'

const SWATCHES = [hero01, hero01, hero01, hero01, hero01];
const CATEGORIES = ["All Products", "Men's Wear", "Women's Wear", "Children's Wear"];

const SORTS = [
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
];

const TRUST = [
  {
    icon: <Truck size={20} strokeWidth={1.5} />,
    title: "Free Shipping",
    desc: "On all orders over $150",
  },
  {
    icon: <RotateCcw size={20} strokeWidth={1.5} />,
    title: "Easy Returns",
    desc: "30-day hassle-free returns",
  },
  {
    icon: <Leaf size={20} strokeWidth={1.5} />,
    title: "Sustainably Made",
    desc: "Ethical, eco-conscious fabrics",
  },
  {
    icon: <ShieldCheck size={20} strokeWidth={1.5} />,
    title: "Secure Checkout",
    desc: "SSL encrypted payments",
  },
];

const Shops = () => {
  const [active, setActive] = useState("All Products");
  const [sortBy, setSortBy] = useState("newest");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered = useMemo(() => {
    const base =
      active === "All Products"
        ? ALL_PRODUCTS
        : ALL_PRODUCTS.filter((p) => p.category === active);

    if (sortBy === "price-asc") {
      return [...base].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    }
    if (sortBy === "price-desc") {
      return [...base].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }
    return base;
  }, [active, sortBy]);

  // Split the grid so an editorial break can sit between two rows of product —
  // only when there's enough inventory for the break to feel earned.
  const showBreak = filtered.length > 6;
  const firstBatch = showBreak ? filtered.slice(0, 6) : filtered;
  const secondBatch = showBreak ? filtered.slice(6) : [];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3500);
  };

  return (
    <div>
      <ShopHero swatches={SWATCHES} onSearch={(q) => console.log("search:", q)} />

      <div className="flex flex-col gap-8 px-4 py-10 sm:gap-10 sm:px-6 md:px-10 lg:px-16 xl:px-28">
        {/* ─── Toolbar: categories, sort, live count ───────────────────── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1 sm:overflow-visible sm:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 sm:px-5 sm:py-2.5 ${
                  active === cat
                    ? "bg-black text-white"
                    : "bg-[#f2f2f0] text-black hover:bg-black/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <span className="text-sm text-black/40">
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-11 appearance-none rounded-full border border-black/10 bg-white pl-4 pr-9 text-sm font-medium text-black outline-none transition-colors hover:border-black/25"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-black/40"
              />
            </div>
          </div>
        </div>

        {/* ─── Grid, part one ───────────────────────────────────────────── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 lg:gap-6">
            {firstBatch.map((product) => (
              <SampleProduct
                key={product.slug}
                slug={product.slug}
                img1={product.img1}
                img2={product.img2}
                title={product.title}
                price={product.price}
                discount={product.discount}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 py-20 sm:py-32">
            <p className="text-xl font-semibold text-black sm:text-2xl">
              No items found
            </p>
            <p className="text-sm text-black/40">
              Try selecting a different category
            </p>
          </div>
        )}
      </div>

      {/* ─── Editorial break — reuses hero photography, ties into filter state ── */}
      {showBreak && (
        <div className="relative my-2 h-[420px] w-full overflow-hidden sm:h-[480px]">
          <img
            src={hero01}
            alt=""
            className="h-full w-full object-cover object-[center_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
          <div className="absolute inset-0 flex flex-col items-start justify-end px-4 pb-12 sm:px-6 sm:pb-16 md:px-10 lg:px-16 xl:px-28">
            <h2 className="max-w-md text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-4xl">
              Pieces built to outlast the season
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
              Every fabric is chosen for how it wears in, not just how it looks
              on day one.
            </p>
            <button
              onClick={() => setActive("All Products")}
              className="group mt-6 flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all hover:bg-white/90"
            >
              Shop the full collection
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-8 px-4 pb-10 sm:gap-10 sm:px-6 md:px-10 lg:px-16 xl:px-28">
        {/* ─── Grid, part two ───────────────────────────────────────────── */}
        {showBreak && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 lg:gap-6">
            {secondBatch.map((product) => (
              <SampleProduct
                key={product.slug}
                slug={product.slug}
                img1={product.img1}
                img2={product.img2}
                title={product.title}
                price={product.price}
                discount={product.discount}
              />
            ))}
          </div>
        )}
{/* ─── Load more — thread spool ──────────────────────────────── */}
{filtered.length > 0 && (
  <div className="flex flex-col items-center gap-3 py-2">
    <button className="group flex flex-col items-center gap-3">
      <div className="relative h-16 w-16">
        <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
          <circle cx="32" cy="32" r="27" fill="none" stroke="black" strokeOpacity="0.1" strokeWidth="2" />
          <circle
            cx="32"
            cy="32"
            r="27"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 27}`}
            strokeDashoffset={`${
              2 * Math.PI * 27 * (1 - Math.min(filtered.length / ALL_PRODUCTS.length, 1))
            }`}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[10px] text-black/60">
            {String(filtered.length).padStart(2, "0")}
          </span>
        </div>
      </div>
      <span className="flex items-center gap-1.5 text-sm font-medium text-black transition-colors group-hover:text-black/60">
        Load more pieces
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </button>
  </div>
)}
{/* ─── Trust strip — stitched buttons ─────────────────────────── */}
<div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-black/8 lg:grid-cols-4">
  {TRUST.map((item, i) => (
    <div key={i} className="flex flex-col items-center gap-3 bg-white px-4 py-7 text-center">
      <svg width="34" height="34" viewBox="0 0 34 34" className="shrink-0">
        <circle cx="17" cy="17" r="15.5" fill="none" stroke="black" strokeOpacity="0.15" strokeWidth="1" />
        <circle cx="12.5" cy="12.5" r="1.6" fill="black" fillOpacity="0.35" />
        <circle cx="21.5" cy="12.5" r="1.6" fill="black" fillOpacity="0.35" />
        <circle cx="12.5" cy="21.5" r="1.6" fill="black" fillOpacity="0.35" />
        <circle cx="21.5" cy="21.5" r="1.6" fill="black" fillOpacity="0.35" />
        <line x1="12.5" y1="12.5" x2="21.5" y2="21.5" stroke="black" strokeOpacity="0.25" strokeWidth="1" />
        <line x1="21.5" y1="12.5" x2="12.5" y2="21.5" stroke="black" strokeOpacity="0.25" strokeWidth="1" />
      </svg>
      <div>
        <p className="text-[13px] font-medium text-black">{item.title}</p>
        <p className="mt-1 text-[11px] leading-relaxed text-black/40">{item.desc}</p>
      </div>
    </div>
  ))}
</div>
      </div>
{/* ─── Closing band — hang tag ─────────────────────────────────── */}
{/* ─── Closing band — hang tag on a fabric backdrop ──────────────── */}
<div className="relative flex items-center justify-center overflow-hidden px-4 py-24 sm:py-32">
  {/* background: video with image fallback */}
  <video
    autoPlay
    muted
    loop
    playsInline
    poster={hero01}
    className="absolute inset-0 h-full w-full object-cover"
  >
    <source src="/videos/fabric-weave.mp4" type="video/mp4" />
  </video>

  {/* darken + desaturate so it reads as texture, not a photo */}
  <div className="absolute inset-0 bg-[#0e0e0d]/80" />
  <div className="absolute inset-0 bg-[#0e0e0d] mix-blend-color" />

  {/* faint moving light sweep, ties motion to the tag settling on hover */}
  <div
    className="absolute inset-0 opacity-[0.06]"
    style={{
      backgroundImage:
        "linear-gradient(115deg, transparent 20%, white 50%, transparent 80%)",
      backgroundSize: "200% 200%",
      animation: "sheen 8s ease-in-out infinite",
    }}
  />

  {/* grain, so the flat overlay doesn't look like a plain dark div */}
  <div
    className="absolute inset-0 opacity-[0.05]"
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
    }}
  />

  <style>{`
    @keyframes sheen {
      0%, 100% { background-position: 0% 0%; }
      50% { background-position: 100% 100%; }
    }
  `}</style>

  <div className="pointer-events-none absolute left-1/2 top-0 z-10 h-16 w-px -translate-x-1/2 bg-white/15" />

  <div className="relative z-10 w-full max-w-sm -rotate-2 rounded-lg bg-[#f4f2ec] p-7 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:rotate-0 sm:p-9">
    <div
      className="pointer-events-none absolute inset-3 rounded-md"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, rgba(0,0,0,0.25) 0, rgba(0,0,0,0.25) 4px, transparent 4px, transparent 9px), repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0, rgba(0,0,0,0.25) 4px, transparent 4px, transparent 9px)",
        backgroundRepeat: "repeat-x, repeat-y",
        backgroundSize: "9px 1px, 1px 9px",
        backgroundPosition: "top, left",
        maskImage:
          "linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent calc(100% - 1px), black calc(100% - 1px)), linear-gradient(to right, black 0, black 1px, transparent 1px, transparent calc(100% - 1px), black calc(100% - 1px))",
        WebkitMaskComposite: "source-in",
        maskComposite: "intersect",
      }}
    />

    <div className="absolute left-1/2 top-3 h-3.5 w-3.5 -translate-x-1/2 rounded-full border border-black/30 bg-[#0e0e0d]" />

    <div className="mt-7 flex flex-col items-center gap-5 text-center">
      <div className="h-24 w-24 overflow-hidden rounded-full border border-black/10">
        <img src={hero01} alt="" className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold leading-tight tracking-[-0.01em] text-black">
          Get the next drop first
        </h2>
        <p className="mx-auto max-w-[220px] text-[13px] leading-relaxed text-black/50">
          Restocks and new fabrics, sent before they hit the shop floor.
        </p>
      </div>

      <form
        onSubmit={handleSubscribe}
        className="flex w-full flex-col gap-2.5 border-t border-dashed border-black/20 pt-5"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="h-10 w-full rounded-sm border border-black/15 bg-white px-3.5 text-center text-sm text-black outline-none placeholder:text-black/30 focus:border-black/40"
        />
        <button
          type="submit"
          className="h-10 rounded-sm bg-black text-sm font-medium text-white transition-colors hover:bg-black/80"
        >
          {subscribed ? "You're on the list ✓" : "Join the list"}
        </button>
      </form>

      <span className="font-mono text-[10px] tracking-widest text-black/25">
        NO. {String(ALL_PRODUCTS.length).padStart(4, "0")} — EST. LIST
      </span>
    
  </div>
  </div>
</div>
    </div>
    
  );
};

export default Shops;