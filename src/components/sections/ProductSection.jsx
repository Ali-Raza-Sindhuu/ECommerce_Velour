import { LuSparkles } from "react-icons/lu";
import { useMemo } from "react";
import SampleProduct from "../SampleProduct";
import SectionHeader from "../SectionHeader";
import { products } from "../../data/products";

const ProductSection = () => {
  const visibleProducts = useMemo(() => products.slice(0, 3), []);
  const restProducts = useMemo(() => products.slice(3), []);

  return (
    <section className="bg-[#f8f8f8] px-5 py-14 sm:px-8 sm:py-16 md:px-12 lg:px-20 xl:px-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:gap-10">
        <div className="flex items-end justify-between gap-4">
          <SectionHeader
            badge="New arrivals"
            icon={<LuSparkles size={13} />}
            heading={
              <>
                Fresh fits in <br /> our latest drop
              </>
            }
            ctaLabel="See all collections"
            ctaLink="/collections"
          />
        </div>

        {/* stitched rule under the header, echoing the seam divider elsewhere */}
        <div
          className="h-px w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(0,0,0,0.14) 0, rgba(0,0,0,0.14) 6px, transparent 6px, transparent 12px)",
          }}
        />

        <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-y-10">
          {visibleProducts.map((product, index) => (
            <div key={index} className="flex flex-col gap-2.5">
              <span className="font-mono text-[10px] text-black/30">
                0{index + 1}
              </span>
              <SampleProduct {...product} />
            </div>
          ))}

          <div className="hidden sm:contents">
            {restProducts.map((product, index) => (
              <div key={index + 3} className="flex flex-col gap-2.5">
                <span className="font-mono text-[10px] text-black/30">
                  {String(index + 4).padStart(2, "0")}
                </span>
                <SampleProduct {...product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;