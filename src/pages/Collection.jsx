import { ArrowRight } from "lucide-react";
import hero01 from "../assets/collectionHero.jpg";
import CollectionStory from "../components/sections/CollectionStory";
import CollectionCard from "../components/sections/CollectionCard";
import CollectionHero from '../components/sections/CollectionHero'
import ProductSection from "../components/sections/ProductSection";
import { useNavigate } from "react-router-dom";


const Collection = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col divide-y divide-black/6 bg-[#f8f8f8]">
    <CollectionHero
  image={hero01}
  heading="The Essentials"
  subtext="Minimal pieces for maximum impact"
  primaryLabel="View all"
/>

      <CollectionStory />
      <CollectionCard />

      {/* ─── Featured look — pinned spec ticket, not a gradient overlay ── */}
<section className="bg-[#f8f8f8] px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-12 lg:py-14 xl:px-20 xl:py-16 2xl:px-28">
  <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/7]">
    <img
      src="https://framerusercontent.com/images/HaLbFMQL3UBYnLDE5V1KjUjLbU.jpg"
      alt="Featured Look"
      className="h-full w-full object-cover object-top"
    />

    {/* just enough grounding for the ticket to sit on, not a scrim over the whole photo */}
    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/35 to-transparent sm:h-1/2" />

    {/* the ticket */}
    <div className="absolute bottom-5 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-sm md:left-12 lg:left-16">
      <div className="relative -rotate-1 rounded-lg bg-[#f4f2ec] p-5 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:rotate-0 sm:p-7">
        <div
          className="pointer-events-none absolute inset-2 rounded-md"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(0,0,0,0.2) 0, rgba(0,0,0,0.2) 4px, transparent 4px, transparent 9px), repeating-linear-gradient(0deg, rgba(0,0,0,0.2) 0, rgba(0,0,0,0.2) 4px, transparent 4px, transparent 9px)",
            backgroundRepeat: "repeat-x, repeat-y",
            backgroundSize: "9px 1px, 1px 9px",
            backgroundPosition: "top, left",
            maskImage:
              "linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent calc(100% - 1px), black calc(100% - 1px)), linear-gradient(to right, black 0, black 1px, transparent 1px, transparent calc(100% - 1px), black calc(100% - 1px))",
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
          }}
        />

        <div className="relative flex items-start justify-between gap-3">
          <span className="font-mono text-[10px] tracking-widest text-black/40">
            FEATURED — NO. 07
          </span>
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#c9a96e]" />
        </div>

        <h3 className="relative mt-3 font-display text-2xl font-medium leading-[1.05] text-black sm:text-3xl">
          The Signature
          <br />
          Winter Edit
        </h3>

        <p className="relative mt-3 text-[13px] leading-relaxed text-black/50 sm:text-sm">
          Our most refined pieces brought together — layered, minimal,
          and built to move with you.
        </p>

        <button
          onClick={() => navigate("/shops")}
          className="group relative mt-5 inline-flex w-fit cursor-pointer items-center gap-2 border-t border-dashed border-black/20 pt-4 text-sm font-medium text-black transition-colors hover:text-black/60"
        >
          Shop the look
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>
  </div>
</section>

      <ProductSection />
    </div>
  );
};

export default Collection;