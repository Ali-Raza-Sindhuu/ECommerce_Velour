import { ArrowRight, Layers } from "lucide-react";
import SectionHeader from "../SectionHeader";
import { Link } from "react-router-dom";

const COLLECTIONS = [
  {
    label: "AW 2025",
    name: "Arctic Minimal",
    desc: "Clean cuts and muted tones inspired by the stillness of winter landscapes.",
    image: "https://framerusercontent.com/images/g813yVl0fq2gEobS7kOZx537SY.jpg",
    tag: "New Season",
  },
  {
    label: "SS 2025",
    name: "Urban Warmth",
    desc: "Relaxed silhouettes built for the city — soft fabrics, sharp details.",
    image: "https://framerusercontent.com/images/Or4CSjqekPU2Ug6V0zSDTbgtg.jpg",
    tag: "Bestseller",
  },
  {
    label: "Resort 2025",
    name: "Quiet Luxury",
    desc: "Premium essentials that carry you from morning light to evening ease.",
    image: "https://framerusercontent.com/images/YI6OX1Ix0QFPJHufS272fscYaI.jpg",
    tag: "Limited",
  },
];

const CollectionCard = () => {
  return (
    <section className="bg-[#f8f8f8] px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-12 lg:py-14 xl:px-20 xl:py-16 2xl:px-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:gap-8 md:gap-10">
        <SectionHeader
          badge="Current Collections"
          icon={<Layers size={13} />}
          heading={
            <>
              Curated drops, <br className="hidden sm:block" /> built to last
            </>
          }
          ctaLabel="View all"
          ctaLink="/collections"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-7 lg:gap-6 xl:gap-7">
          {COLLECTIONS.map((col, i) => (
            <Link key={i} to="/collections" className="group block">
              <div className="relative overflow-hidden rounded-t-2xl bg-black/5 aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5]">
                <img
                  src={col.image}
                  alt={col.name}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* just enough shade for the top label to sit on the photo */}
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent" />

                <div className="absolute left-3.5 top-3.5 flex items-center gap-2 sm:left-4 sm:top-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c9a96e]" />
                  <span className="font-mono text-[10px] tracking-[0.15em] text-white/85">
                    {col.tag}
                  </span>
                </div>

                <span className="absolute right-3.5 top-3.5 font-mono text-[10px] text-white/50 sm:right-4 sm:top-4">
                  0{i + 1}
                </span>
              </div>

              {/* card face — info lives here, not stacked on the photo */}
              <div className="relative rounded-b-2xl border border-t-0 border-black/8 bg-white px-5 py-5 sm:px-6 sm:py-6">
                <div
                  className="pointer-events-none absolute inset-x-5 top-0 h-px sm:inset-x-6"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, rgba(0,0,0,0.18) 0, rgba(0,0,0,0.18) 4px, transparent 4px, transparent 8px)",
                  }}
                />

                <span className="font-mono text-[10px] uppercase tracking-widest text-black/35">
                  {col.label}
                </span>

                <h4 className="mt-2 font-display text-xl font-medium tracking-tight text-black sm:text-2xl">
                  {col.name}
                </h4>

                <p className="mt-2 text-[13px] leading-relaxed text-black/50 sm:text-sm">
                  {col.desc}
                </p>

                <span className="mt-4 inline-flex w-fit items-center gap-1.5 text-[13px] font-medium text-black transition-colors group-hover:text-black/60">
                  Explore collection
                  <ArrowRight
                    size={13}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionCard;