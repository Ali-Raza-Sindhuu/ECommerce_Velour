import { Handbag, Search, User, List, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  openLogin,
  closeAuth,
  openCart,
  closeCart,
  openSearch,
  closeSearch,
} from "../../store/slice/Uislice";
import AuthModal from "../auth/AuthModal";
import CartSidebar from "../cart/CartSidebar";
import SearchModal from "../searchModal";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

const NAV_LINKS = [
  { name: "HOME", path: "/" },
  { name: "ABOUT", path: "/about" },
  { name: "SHOP", path: "/shops" },
  { name: "COLLECTION", path: "/collections" },
  { name: "CONTACT", path: "/contact" },
];

const TICKER_ITEMS = [
  "FREE SHIPPING OVER $150",
  "NEW SEASON — SS26",
  "30-DAY RETURNS",
];

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const authModal = useSelector((state) => state.ui.authModal);
  const isCartOpen = useSelector((state) => state.ui.isCartOpen);
  const isSearchOpen = useSelector((state) => state.ui.isSearchOpen);
  const cartCount = useSelector((state) =>
    (state.cart?.items || []).reduce((sum, item) => sum + item.quantity, 0),
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const whiteNavbarPages = ["/checkout", "/cart", "/product", "/shop/:slug"];
  const isWhiteNavbar = whiteNavbarPages.some((pattern) => {
    const regexStr = "^" + pattern.replace(/:[^/]+/g, "[^/]+") + "(/.*)?$";
    return new RegExp(regexStr).test(location.pathname);
  });

  const lightHeroPages = ["/shops", "/collections"];
  const isLightHeroPage = lightHeroPages.some((pattern) => {
    const regexStr = "^" + pattern.replace(/:[^/]+/g, "[^/]+") + "(/.*)?$";
    return new RegExp(regexStr).test(location.pathname);
  });

  // solid/pill chrome appears once scrolled (or on inherently white pages, or mobile menu open)
  const showChrome = isWhiteNavbar || isScrolled || isMobileMenuOpen;
  // text is dark whenever there's chrome behind it, OR when sitting on a light-bg hero with no chrome
  const dark = showChrome || isLightHeroPage;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const iconClass = (variant = "default") => {
    if (variant === "ghost") {
      return `cursor-pointer rounded-full p-2 backdrop-blur-lg transition-colors duration-200 ${
        dark
          ? "bg-black/10 text-black hover:bg-black/15"
          : "bg-white/15 text-white hover:bg-white/25"
      }`;
    }
    return `cursor-pointer rounded-full p-2 transition-colors duration-200 ${
      dark
        ? "bg-black text-white hover:bg-black/80"
        : "bg-white text-black hover:bg-white/90"
    }`;
  };

  return (
    <>
      {/* ─── Ticker strip ─────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 z-50 h-8 w-full overflow-hidden bg-black">
        <div className="flex h-full w-max animate-[marquee_28s_linear_infinite] items-center gap-10 whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-10 font-mono text-[10px] tracking-[0.2em] text-[#c9a96e]"
            >
              {t}
              <span className="h-1 w-1 rounded-full bg-[#c9a96e]/40" />
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>

      {/* outer nav: fixed padding, never changes — no layout jump */}
      <nav className="fixed top-8 left-0 z-50 w-full px-4 py-4 md:px-7 md:py-5">
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-6 rounded-full px-5 py-2.5 transition-all duration-300 md:px-6 ${
            showChrome
              ? "border border-black/8 bg-[#f8f8f8]/95 shadow-[0_8px_20px_-10px_rgba(0,0,0,0.25)] backdrop-blur-md"
              : "border border-transparent bg-transparent shadow-none"
          }`}
        >
          {/* logo + links grouped on the left */}
          <div className="flex items-center gap-10">
            <Link
              to="/"
              className={`group relative cursor-pointer font-display text-[20px] font-semibold tracking-wide transition-all duration-200 md:text-[22px] ${
                dark ? "text-black" : "text-white"
              }`}
            >
              VELOUR
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#c9a96e] transition-all duration-300 group-hover:w-full" />
            </Link>

            <div className="hidden items-center lg:flex">
              {NAV_LINKS.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`group relative flex items-center gap-1.5 px-3.5 py-2 font-mono text-[12px] uppercase tracking-[0.06em] no-underline transition-colors duration-200 ${
                      isActive
                        ? dark
                          ? "text-black"
                          : "text-white"
                        : dark
                        ? "text-black/60 hover:text-black"
                        : "text-white/75 hover:text-white"
                    }`}
                  >
                    <span
                      className={`font-mono text-[9px] transition-colors duration-200 ${
                        isActive
                          ? "text-[#c9a96e]"
                          : "text-[#c9a96e]/0 group-hover:text-[#c9a96e]/60"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    {link.name}
                    <span
                      className={`absolute bottom-0.5 left-3.5 right-3.5 h-px origin-left bg-[#c9a96e] transition-transform duration-200 ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* icons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => dispatch(openSearch())}
              className={iconClass("ghost")}
              aria-label="Open search"
            >
              <Search size={16} />
            </button>
            <button
              onClick={() => dispatch(openCart())}
              className={`relative ${iconClass()}`}
              aria-label="Open cart"
            >
              <Handbag size={16} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c9a96e] px-1 text-[10px] font-semibold text-black">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => dispatch(openLogin())}
              className={iconClass()}
              aria-label="Open login"
            >
              <User size={16} />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className={`ml-1 cursor-pointer rounded-full p-2 transition-colors duration-200 lg:hidden ${
                dark
                  ? "bg-black/10 text-black hover:bg-black/15"
                  : "bg-black/20 text-white hover:bg-black/30"
              }`}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={18} /> : <List size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* mobile menu unchanged */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/35 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-[#f8f8f8] shadow-2xl transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* ...unchanged... */}
        </div>
      </div>

      <AuthModal view={authModal} onClose={() => dispatch(closeAuth())} />
      <CartSidebar isOpen={isCartOpen} onClose={() => dispatch(closeCart())} />
      <SearchModal isOpen={isSearchOpen} onClose={() => dispatch(closeSearch())} />
    </>
  );
};

export default Navbar;