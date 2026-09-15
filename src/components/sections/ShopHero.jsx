import { useState } from "react";
import { Search, Pin } from "lucide-react";

export const MarkedPhoto = ({ src, alt = "", className = "", code }) => (
   <div className={`relative ${className}`}>
    <div className="relative h-full w-full overflow-hidden bg-white">
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>


    {/* corner crop marks — each one an L-shaped bracket just outside the frame */}
    {[
      "-top-2 -left-2 border-t border-l",
      "-top-2 -right-2 border-t border-r",
      "-bottom-2 -left-2 border-b border-l",
      "-bottom-2 -right-2 border-b border-r",
    ].map((pos, i) => (
      <span
        key={i}
        className={`pointer-events-none absolute h-3.5 w-3.5 border-black/40 ${pos}`}
      />
    ))}

    {/* registration cross, top-left, like a printer's alignment mark */}
    <svg
      className="pointer-events-none absolute -left-4 -top-4 h-3 w-3 text-black/25"
      viewBox="0 0 12 12"
    >
      <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="0.75" />
      <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="6" cy="6" r="3" fill="none" stroke="currentColor" strokeWidth="0.75" />
    </svg>

    {code && (
      <span className="absolute -bottom-6 left-0 font-mono text-[9px] tracking-widest text-black/35">
        {code}
      </span>
    )}
  </div>
);
export const ShopHero = ({ swatches = [], onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query);
  };

  const board = swatches.length >= 4 ? swatches.slice(0, 4) : [];
  const rotations = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3"];

  return (
    <div className="relative overflow-hidden bg-[#f4f2ec] px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-14 md:px-10 lg:px-16 xl:px-28">
      {/* pattern-paper grid, very faint */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* left: chalk-marked type */}
        <div className="flex flex-col items-start gap-5">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-black/40">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c9a96e]" />
            SS26 — CUT & SEWN
          </span>

          <h1 className="relative max-w-lg text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-black sm:text-5xl">
            Find your
            <br />
            perfect fit
            <svg
              className="absolute -bottom-2 left-0 w-[80%]"
              height="10"
              viewBox="0 0 300 10"
              preserveAspectRatio="none"
            >
              <path
                d="M2 6 C 60 2, 110 9, 170 5 S 260 2, 298 6"
                fill="none"
                stroke="#c9a96e"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </h1>

          <p className="max-w-sm text-sm leading-relaxed text-black/50">
            Every piece measured, cut, and finished by hand — built to
            wear in, not just wear out.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-1 flex w-full max-w-sm items-center gap-2.5 border-b border-black/20 pb-2.5 transition-colors focus-within:border-black/60"
          >
            <Search size={16} className="shrink-0 text-black/35" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-transparent text-sm text-black outline-none placeholder-black/30"
            />
          </form>

          <div className="flex items-center gap-6 pt-1">
            <div className="flex flex-col">
              <span className="font-mono text-base font-medium text-black">120+</span>
              <span className="text-[11px] text-black/40">pieces in stock</span>
            </div>
            <span className="h-7 w-px bg-black/10" />
            <div className="flex flex-col">
              <span className="font-mono text-base font-medium text-black">4.8</span>
              <span className="text-[11px] text-black/40">customer rating</span>
            </div>
          </div>
        </div>

       <div className="relative mx-auto grid w-full max-w-sm grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-10 sm:gap-y-12">
  {board.map((img, i) => (
    <MarkedPhoto
      key={i}
      src={img}
      className="aspect-square"
      code={`FIG.${String(i + 1).padStart(2, "0")}`}
    />
  ))}
</div>
      </div>
    </div>
  );
};

