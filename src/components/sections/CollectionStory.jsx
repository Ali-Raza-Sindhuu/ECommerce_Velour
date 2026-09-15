import { ArrowRight, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "../SectionHeader";

const CollectionStory = () => {
  return (
    <section className="bg-[#f8f8f8] px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-12 lg:py-16 xl:px-20 xl:py-20 2xl:px-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:gap-8 md:gap-10">
        <SectionHeader
          badge="Our Story"
          icon={<Layers size={13} />}
          heading={
            <>
              Behind every piece, <br className="hidden sm:block" /> a purpose
            </>
          }
          ctaLabel="Learn more"
          ctaLink="/about"
        />

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          {/* image with a hanging tag, not a glass badge */}
          <div className="relative pb-8 pl-2 pr-6 pt-2 sm:pb-10">
            <div className="relative overflow-hidden rounded-2xl h-[240px] sm:h-[320px] md:h-[400px] lg:h-[460px] xl:h-[500px]">
              <img
                src="https://framerusercontent.com/images/nvGX8w2EmNhLJbIVjLMsGKTV4I.jpeg"
                alt="Collection Story"
                className="h-full w-full object-cover object-top"
              />
            </div>

            <div className="absolute -bottom-2 left-6 z-10 w-40 rotate-[-6deg] rounded-md bg-[#f4f2ec] px-3.5 py-3 shadow-[0_16px_30px_-10px_rgba(0,0,0,0.4)] transition-transform duration-500 hover:rotate-0 sm:w-44 sm:left-8">
              <div className="pointer-events-none absolute left-1/2 -top-3 h-4 w-px -translate-x-1/2 bg-black/15" />
              <div className="absolute left-1/2 -top-4 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-black/25 bg-[#f8f8f8]" />

              <span className="block font-mono text-[9px] tracking-widest text-black/40 uppercase">
                AW 2025
              </span>
              <span className="mt-1 block text-[13px] font-medium text-black">
                Arctic Minimal
              </span>
              <span className="mt-1.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c9a96e]" />
                <span className="font-mono text-[9px] text-black/35">
                  01 OF 12
                </span>
              </span>
            </div>
          </div>

          {/* copy */}
          <div className="flex flex-col gap-6 sm:gap-7 md:gap-8">
            <span className="font-mono text-[10px] tracking-widest text-black/30 uppercase sm:text-xs">
              Our philosophy
            </span>

            <h2 className="font-display text-2xl leading-tight text-black sm:text-3xl md:text-4xl lg:text-5xl">
              Clothes that work
              <br />
              harder, so you
              <br />
              don't have to.
            </h2>

            <p className="max-w-xl text-sm leading-relaxed text-black/50 sm:text-base md:text-[1.05rem]">
              Velour collections are built around one idea — timeless cuts,
              honest materials, and details that reveal themselves slowly
              over time. Nothing loud. Nothing wasted.
            </p>

            {/* measured strip instead of a plain stat grid */}
            <div className="relative flex items-stretch gap-0 border-y border-black/8 py-5 sm:py-6">
              {[
                ["12+", "Collections"],
                ["340", "Pieces"],
                ["10M+", "Worn daily"],
              ].map(([num, label], i) => (
                <div
                  key={i}
                  className={`flex flex-1 flex-col gap-1 px-4 sm:px-6 ${
                    i > 0 ? "border-l border-dashed border-black/15" : "pl-0"
                  }`}
                >
                  <span className="font-mono text-lg font-medium tabular-nums text-black sm:text-xl md:text-2xl">
                    {num}
                  </span>
                  <span className="text-[11px] tracking-wide text-black/40 sm:text-xs">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="group inline-flex w-fit items-center gap-2 border-b border-black/20 pb-1 text-sm font-medium text-black transition-colors hover:border-black/50 hover:text-black/60"
            >
              Read our story
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionStory;