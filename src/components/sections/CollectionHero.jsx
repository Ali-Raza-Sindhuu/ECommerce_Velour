// CollectionHero.jsx
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { MarkedPhoto } from "./ShopHero";

const CollectionHero = ({
  image,
  eyebrow = "SS26 — CURRENT DROP",
  heading,
  subtext,
  primaryLabel,
  primaryLink = "/shops",
}) => {
  return (
    <div className="relative overflow-hidden bg-[#f4f2ec] px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-14 md:px-10 lg:px-16 xl:px-28">
      {/* pattern-paper grid, same as ShopHero */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* left: copy — same structure/scale as ShopHero */}
        <div className="flex flex-col items-start gap-5">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-black/40">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c9a96e]" />
            {eyebrow}
          </span>

          <h1 className="max-w-lg text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-black sm:text-5xl">
            {heading}
          </h1>

          {subtext && (
            <p className="max-w-sm text-sm leading-relaxed text-black/50">
              {subtext}
            </p>
          )}

          {primaryLabel && (
            <Link
              to={primaryLink}
              className="group mt-1 inline-flex w-fit items-center gap-2 border-b border-black/20 pb-1 text-sm font-medium text-black transition-colors hover:border-black/50 hover:text-black/60"
            >
              {primaryLabel}
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          )}
        </div>

        {/* right: single marked photo, same footprint as a ShopHero swatch tile */}
      {/* right: single marked photo, capped width at every breakpoint */}
<div className="mx-auto w-full max-w-sm sm:max-w-md lg:max-w-sm">
  <MarkedPhoto
    src={image}
    className="aspect-square"
    code="FIG.01 — LEAD IMAGE"
  />
</div>
      </div>
    </div>
  );
};

export default CollectionHero;