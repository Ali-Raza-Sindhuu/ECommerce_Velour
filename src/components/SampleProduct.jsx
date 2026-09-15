import { LuSparkles } from "react-icons/lu";
import { Link } from "react-router-dom";

const SampleProduct = ({ img1, title, price, discount, slug }) => {
  return (
    <Link to={`/shop/${slug}`}>
      <div className="group flex cursor-pointer flex-col gap-2.5">
        <div className="relative aspect-[5/4] w-full overflow-hidden rounded-xl bg-[#ededed]">
          <span className="absolute left-2.5 top-2.5 z-10 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-black shadow-sm backdrop-blur-sm">
            <LuSparkles size={10} />
            New
          </span>

          <img
            src={img1}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />

          {discount && (
            <div className="absolute -right-1 top-4 z-10 flex items-center">
              <span className="relative bg-black px-2.5 py-1 text-[10px] font-medium tracking-wide text-white">
                -{discount}%
                <span className="absolute -left-[7px] top-0 h-0 w-0 border-y-[11px] border-r-[7px] border-y-transparent border-r-black" />
              </span>
              <span className="ml-[1px] h-1.5 w-1.5 rounded-full border border-white/70 bg-black" />
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/10 to-transparent" />
        </div>

        <div className="flex items-start justify-between gap-3 border-t border-dashed border-black/10 px-0.5 pt-2">
          <p className="truncate text-[13px] font-medium text-black">
            {title}
          </p>
          <span className="shrink-0 font-mono text-[12px] tabular-nums text-black/70">
            {price}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SampleProduct;