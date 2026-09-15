import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const SectionHeader = ({
  badge,
  icon,
  heading,
  ctaLabel,
  ctaLink,
  ctaOnClick,
}) => {
  const cta = ctaLabel && (
    <span className="inline-flex items-center gap-1.5">
      {ctaLabel}
      <ArrowRight
        size={14}
        className="transition-transform group-hover:translate-x-1"
      />
    </span>
  );

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
      <div className="flex max-w-2xl flex-col gap-4">
        {badge && (
          <span className="inline-flex w-fit items-center gap-2.5">
            {icon ? (
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-black/10 bg-white text-black/60">
                {icon}
              </span>
            ) : (
              <span className="h-1.5 w-1.5 rounded-full bg-[#c9a96e]" />
            )}
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-black/40">
              {badge}
            </span>
          </span>
        )}

        <h2 className="font-display text-[clamp(2rem,4vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-black">
          {heading}
        </h2>
      </div>

      {ctaLabel &&
        (ctaLink ? (
          <Link
            to={ctaLink}
            className="group inline-flex w-fit shrink-0 items-center border-b border-black/20 pb-1 text-sm font-medium text-black transition-colors hover:border-black/50 hover:text-black/60"
          >
            {cta}
          </Link>
        ) : (
          <button
            onClick={ctaOnClick}
            className="group inline-flex w-fit shrink-0 items-center border-b border-black/20 pb-1 text-sm font-medium text-black transition-colors hover:border-black/50 hover:text-black/60"
          >
            {cta}
          </button>
        ))}
    </div>
  );
};

export default SectionHeader;