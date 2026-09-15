import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";

// Easing curve used across the hero — matches the "Unveil" choreography.
const EASE = [0.22, 1, 0.36, 1];

const HeroSection = ({
  image = "",
  secondaryImage = "",
  badge,
  heading,
  subtext,
  primaryLink = "/shops",
  primaryLabel = "See Collection",
  secondaryLink = "/contact",
  secondaryLabel = "Contact us",
  mode = "hero",
  showScrollCue = true,
  indexLabel = "01",
  totalLabel = "05",
  children,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // ─── SCROLL CHOREOGRAPHY (hero mode only) — "Editorial Grid Motion" ────
  // Grid fragments separate apart at different scroll-speed ratios, like
  // pulling apart a folded magazine page.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const mainImageY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const secondaryImageY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const labelY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Magnetic hover for the micro-labels ("SCROLL", index number) — labels
  // nudge 4–6px toward the cursor when it's nearby. Local to this section,
  // desktop only, independent of the global mouse tracker below.
  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  const springMagnetX = useSpring(magnetX, { stiffness: 250, damping: 18 });
  const springMagnetY = useSpring(magnetY, { stiffness: 250, damping: 18 });

  const handleMagnetMove = (e) => {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    magnetX.set(x * 0.3);
    magnetY.set(y * 0.3);
  };
  const handleMagnetLeave = () => {
    magnetX.set(0);
    magnetY.set(0);
  };


  // Split the heading into lines so each line can mask-up independently,
  // staggered 80ms apart. Falls back gracefully if heading has no natural
  // line breaks — it will simply animate as a single line.
  const headingLines = useMemo(
    () => (heading ? heading.split("\n").filter(Boolean) : []),
    [heading]
  );

  // ─── HERO MODE — "EDITORIAL GRID MOTION" ───────────────────────────────
  if (mode === "hero") {
    return (
      <section
        ref={sectionRef}
        className="relative flex min-h-[100dvh] w-full items-center overflow-hidden bg-[#F5F3EF] py-24 lg:py-0"
      >
        {/* Grid lines — draw in first (1px, thin), establishing the editorial frame */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
          style={{ opacity: gridOpacity }}
        >
          <motion.div
            className="absolute left-[8%] top-0 h-full w-px bg-neutral-900/10 origin-top"
            initial={{ scaleY: 0 }}
            animate={isLoaded ? { scaleY: 1 } : {}}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          <motion.div
            className="absolute left-[62%] top-0 h-full w-px bg-neutral-900/10 origin-top"
            initial={{ scaleY: 0 }}
            animate={isLoaded ? { scaleY: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
          />
          <motion.div
            className="absolute top-[14%] left-0 h-px w-full bg-neutral-900/10 origin-left"
            initial={{ scaleX: 0 }}
            animate={isLoaded ? { scaleX: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
          />
        </motion.div>

        {/* Index / season marker — top-left, oversized detail with monospace texture */}
        <motion.div
          className="absolute left-6 top-8 z-10 sm:left-10 lg:left-[9%] lg:top-10"
          style={{ y: labelY }}
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <motion.div
            className="flex items-baseline gap-1 font-mono text-[11px] tracking-[0.15em] text-neutral-500"
            style={{ x: springMagnetX, y: springMagnetY }}
            onMouseMove={handleMagnetMove}
            onMouseLeave={handleMagnetLeave}
          >
            <span className="text-neutral-900">{indexLabel}</span>
            <span className="text-neutral-400"> / {totalLabel}</span>
          </motion.div>
        </motion.div>

        {/* Editorial micro-label, e.g. collection/season */}
        {badge && (
          <motion.div
            className="absolute right-6 top-8 z-10 font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500 sm:right-10 lg:right-[9%] lg:top-10"
            onMouseMove={handleMagnetMove}
            onMouseLeave={handleMagnetLeave}
            style={{ x: springMagnetX, y: springMagnetY }}
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            {badge.label} {badge.text}
          </motion.div>
        )}


        {/* Content grid: asymmetric 3-column layout */}
        <div className="relative z-[2] mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-x-8 gap-y-10 px-6 sm:px-10 lg:grid-cols-12 lg:gap-y-0 lg:px-[6%]">
          {/* Headline block — spans left columns, overlaps the image edge on desktop */}
          <motion.div
            className="order-2 flex flex-col justify-center lg:order-1 lg:col-span-6 lg:pr-8 lg:pt-24"
            style={{ y: headlineY }}
          >
            <h1 className="font-display text-balance text-[clamp(2.6rem,6.5vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.02em] text-neutral-900">
              {(headingLines.length ? headingLines : [heading]).map(
                (line, i) => (
                  <span key={i} className="block overflow-hidden">
                    <motion.span
                      className="block"
                      initial={{ clipPath: "inset(0 100% 0 0)" }}
                      animate={
                        isLoaded ? { clipPath: "inset(0 0% 0 0)" } : {}
                      }
                      transition={{
                        duration: 0.6,
                        delay: 0.5 + i * 0.1,
                        ease: EASE,
                      }}
                    >
                      {line}
                    </motion.span>
                  </span>
                )
              )}
            </h1>

            {subtext && (
              <motion.p
                className="mt-6 max-w-sm text-[14px] leading-[1.7] text-neutral-500"
                initial={{ y: 12, opacity: 0 }}
                animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.9, ease: EASE }}
              >
                {subtext}
              </motion.p>
            )}

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3"
              initial={{ y: 12, opacity: 0 }}
              animate={isLoaded ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.0, ease: EASE }}
            >
              <Link
                to={primaryLink}
                className="group inline-flex items-center gap-2.5 border-b border-neutral-900 pb-1 text-[13px] font-medium uppercase tracking-[0.08em] text-neutral-900 transition-colors duration-300"
              >
                {primaryLabel}
                <svg
                  className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
              <Link
                to={secondaryLink}
                onMouseMove={handleMagnetMove}
                onMouseLeave={handleMagnetLeave}
                className="text-[12px] font-mono uppercase tracking-[0.1em] text-neutral-400 transition-colors duration-300 hover:text-neutral-900"
              >
                — {secondaryLabel}
              </Link>
            </motion.div>
          </motion.div>

          {/* Main image — bleeds off the top edge, uncontained, magazine-style */}
          <motion.div
            className="relative order-1 -mt-10 aspect-[4/5] w-full overflow-hidden lg:order-2 lg:col-span-6 lg:-mt-24 lg:aspect-auto lg:h-[86vh]"
            style={{ y: mainImageY }}
          >
            <motion.img
              src={image}
              alt=""
              onLoad={() => setIsLoaded(true)}
              initial={{ scale: 1.05, opacity: 0 }}
              animate={isLoaded ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Secondary image fragment — small, offset, bottom-right of the composition */}
          {secondaryImage && (
            <motion.div
              className="relative order-3 -mt-16 ml-auto aspect-[3/4] w-[45%] max-w-[220px] overflow-hidden self-end sm:w-[35%] lg:absolute lg:bottom-[8%] lg:left-[8%] lg:col-span-2 lg:mt-0 lg:w-[16%] lg:max-w-none"
              style={{ y: secondaryImageY }}
            >
              <motion.img
                src={secondaryImage}
                alt=""
                initial={{ scale: 1.05, opacity: 0 }}
                animate={isLoaded ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
                className="h-full w-full object-cover"
              />
            </motion.div>
          )}
        </div>

        {/* Scroll cue — editorial footnote style, bottom-center */}
        {showScrollCue && (
          <motion.div
            className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-3 lg:flex"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.2 }}
          >
            <div className="h-8 w-px overflow-hidden bg-neutral-900/15">
              <div
                className="h-full w-full bg-neutral-900/50"
                style={{ animation: "scrollDown 2.2s ease-in-out infinite" }}
              />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
              Scroll
            </span>
          </motion.div>
        )}

        <style>{`
          @keyframes scrollDown {
            0% { transform: translateY(-100%); }
            50% { transform: translateY(0%); }
            100% { transform: translateY(100%); }
          }
        `}</style>
      </section>
    );
  }

  // ─── BLOG MODE ────────────────────────────────────────────────────────────
  if (mode === "blog") {
    return (
      <section className="relative flex min-h-[55dvh] w-full items-end overflow-hidden bg-[#080808] sm:min-h-[60dvh]">
        <div className="absolute inset-0 z-0">
          <img src={image} alt="" className={`h-full w-full object-cover object-top transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`} onLoad={() => setIsLoaded(true)} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,8,8,0.4) 0%, rgba(8,8,8,0.55) 50%, rgba(8,8,8,0.85) 100%)" }} />
        </div>
        <div className="relative z-10 w-full px-6 pb-14 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl text-center">
            {badge && (
              <p className={`mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white/35 transition-all duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "100ms" }}>Blog</p>
            )}
            <h1 className={`font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.0] tracking-[-0.03em] text-white transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "200ms" }}>{heading}</h1>
            {subtext && <p className={`mx-auto mt-4 max-w-sm text-[14px] text-white/40 transition-all duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "400ms" }}>{subtext}</p>}
            {children && (
              <div className={`mt-8 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "550ms" }}>{children}</div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ─── CONTACT MODE ─────────────────────────────────────────────────────────
  if (mode === "contact") {
    return (
      <section className="relative flex min-h-[55dvh] w-full items-end overflow-hidden bg-[#080808] sm:min-h-[60dvh]">
        <div className="absolute inset-0 z-0">
          <img src={image} alt="" className={`h-full w-full object-cover transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`} onLoad={() => setIsLoaded(true)} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,8,8,0.4) 0%, rgba(8,8,8,0.55) 50%, rgba(8,8,8,0.85) 100%)" }} />
        </div>
        <div className="relative z-10 w-full px-6 pb-14 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl text-center">
            {badge && (
              <p className={`mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white/35 transition-all duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "100ms" }}>Contact</p>
            )}
            <h1 className={`font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.0] tracking-[-0.03em] text-white transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "200ms" }}>{heading}</h1>
            {subtext && <p className={`mx-auto mt-4 max-w-sm text-[14px] text-white/40 transition-all duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "400ms" }}>{subtext}</p>}
            {children && (
              <div className={`mt-8 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "550ms" }}>{children}</div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ─── ABOUT MODE ───────────────────────────────────────────────────────────
  if (mode === "about") {
    return (
      <section className="relative flex min-h-[55dvh] w-full items-end overflow-hidden bg-[#080808] sm:min-h-[60dvh]">
        <div className="absolute inset-0 z-0">
          <img src={image} alt="" className={`h-full w-full object-cover transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`} onLoad={() => setIsLoaded(true)} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,8,8,0.4) 0%, rgba(8,8,8,0.55) 50%, rgba(8,8,8,0.85) 100%)" }} />
        </div>
        <div className="relative z-10 w-full px-6 pb-14 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl text-center">
            {badge && (
              <p className={`mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white/35 transition-all duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "100ms" }}>ABOUT</p>
            )}
            <h1 className={`font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.0] tracking-[-0.03em] text-white transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "200ms" }}>{heading}</h1>
            {subtext && <p className={`mx-auto mt-4 max-w-sm text-[14px] text-white/40 transition-all duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "400ms" }}>{subtext}</p>}
            {children && (
              <div className={`mt-8 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "550ms" }}>{children}</div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ─── SHOP MODE ────────────────────────────────────────────────────────────
  if (mode === "shop") {
    return (
      <section className="relative flex min-h-[55dvh] w-full items-end overflow-hidden bg-[#080808] sm:min-h-[60dvh]">
        <div className="absolute inset-0 z-0">
          <img src={image} alt="" className={`h-full w-full object-cover transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`} onLoad={() => setIsLoaded(true)} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,8,8,0.4) 0%, rgba(8,8,8,0.55) 50%, rgba(8,8,8,0.85) 100%)" }} />
        </div>
        <div className="relative z-10 w-full px-6 pb-14 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl text-center">
            {badge && (
              <p className={`mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white/35 transition-all duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "100ms" }}>{badge.label}</p>
            )}
            <h1 className={`font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.0] tracking-[-0.03em] text-white transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "200ms" }}>{heading}</h1>
            {subtext && <p className={`mx-auto mt-4 max-w-sm text-[14px] text-white/40 transition-all duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "400ms" }}>{subtext}</p>}
            {children && (
              <div className={`mt-8 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "550ms" }}>{children}</div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ─── COLLECTION MODE ──────────────────────────────────────────────────────
  if (mode === "collection") {
    return (
      <section className="relative flex min-h-[50dvh] w-full items-center overflow-hidden bg-[#080808] sm:min-h-[55dvh]">
        <div className="absolute inset-0 z-0">
          <img src={image} alt="" className={`h-full w-full object-cover transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`} onLoad={() => setIsLoaded(true)} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,8,8,0.25) 0%, rgba(8,8,8,0.6) 100%)" }} />
        </div>
        <div className="relative z-10 w-full px-6 text-center sm:px-10 lg:px-16">
          {badge && (
            <p className={`mb-5 text-[10px] font-medium uppercase tracking-[0.3em] text-white/40 transition-all duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "150ms" }}>{badge.label}</p>
          )}
          <h1 className={`font-display text-[clamp(2.5rem,6vw,5rem)] font-medium tracking-[0.05em] text-white transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "250ms" }}>{heading}</h1>
          {subtext && <p className={`mx-auto mt-4 max-w-sm text-[12px] uppercase tracking-[0.15em] text-white/70 transition-all duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "450ms" }}>{subtext}</p>}
          <div className={`mt-8 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "600ms" }}>
            <Link to={primaryLink} className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/8 px-7 py-3 text-[13px] font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/15 active:scale-[0.97]">
              {primaryLabel}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return null;
};

export default HeroSection;