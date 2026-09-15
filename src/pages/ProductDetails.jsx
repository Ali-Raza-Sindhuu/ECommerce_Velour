import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  Minus,
  Plus,
  Check,
  Send,
} from "lucide-react";
import { products } from "../data/products";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import { openCart } from "../store/slice/Uislice";
import { parsePrice } from "../utils/price";
import SampleProduct from "../components/SampleProduct";

const SIZES = ["S", "M", "L", "XL"];

// Deterministic "look real" rating derived from the slug so it stays
// consistent across renders/visits instead of jumping around randomly.
const ratingFromSlug = (slug = "") => {
  const seed = slug
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const rating = 4.5 + (seed % 5) / 10; // 4.5 – 4.9
  const reviews = 80 + (seed % 40) * 7; // roughly 80 – 350
  return { rating: Number(rating.toFixed(1)), reviews };
};

const discountPercent = (price, discount) => {
  if (!price || !discount) return null;
  const pct = Math.round(((discount - price) / discount) * 100);
  return pct > 0 ? pct : null;
};

// Star-count breakdown that always resolves to 100% and skews positive,
// derived deterministically from the product slug.
const ratingBreakdown = (slug = "") => {
  const seed = slug
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const five = 62 + (seed % 15);
  const four = 20 + (seed % 8);
  const three = 8 + (seed % 4);
  const two = 4 + (seed % 3);
  const total = five + four + three + two;
  const one = Math.max(0, 100 - total);
  return [
    { stars: 5, pct: five },
    { stars: 4, pct: four },
    { stars: 3, pct: three },
    { stars: 2, pct: two },
    { stars: 1, pct: one },
  ];
};

// ─── Write a review — name, star picker, comment ────────────────────────
const WriteReview = () => {
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !comment.trim() || selectedRating === 0) return;
    setSubmitted(true);
    setEmail("");
    setComment("");
    setSelectedRating(0);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="rounded-2xl bg-[#f7f7f5] p-6 sm:p-8">
      <h3 className="text-base font-semibold text-black">Write a Review</h3>
      <p className="mt-1 text-sm text-black/50">
        Share what you thought — it helps other shoppers decide.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => {
            const value = i + 1;
            const filled = value <= (hoverRating || selectedRating);
            return (
              <button
                key={value}
                type="button"
                aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
                onClick={() => setSelectedRating(value)}
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-0.5"
              >
                <Star
                  size={22}
                  className={filled ? "fill-black text-black" : "text-black/20"}
                />
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-black outline-none placeholder:text-black/35 focus:border-black/30"
          />
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us about the fit, quality, and how it wears..."
          rows={4}
          className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none placeholder:text-black/35 focus:border-black/30"
        />

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="flex h-11 items-center justify-center gap-2 rounded-full bg-black px-6 text-sm font-medium text-white transition-all hover:bg-black/90 active:scale-[0.98]"
          >
            {submitted ? (
              <>
                <Check size={16} /> Submitted
              </>
            ) : (
              <>
                <Send size={15} /> Submit Review
              </>
            )}
          </button>
          {submitted && (
            <span className="text-sm text-black/50">Thanks for your feedback!</span>
          )}
        </div>
      </form>
    </div>
  );
};

// ─── Reviews section — full width, below the main product row ──────────
const ReviewsSection = ({ product, rating, reviews }) => {
  const breakdown = ratingBreakdown(product.slug);

  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-xl font-semibold tracking-[-0.02em] text-black sm:text-2xl">
        Reviews ({reviews.toLocaleString()})
      </h2>

      {/* Summary */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-12">
        <div className="flex shrink-0 flex-col items-start gap-1.5">
          <span className="text-4xl font-bold text-black">{rating}</span>
          <RatingStars rating={rating} size={15} />
          <span className="text-xs text-black/45">
            Based on {reviews.toLocaleString()} reviews
          </span>
        </div>

        <div className="flex w-full max-w-md flex-col gap-2">
          {breakdown.map((row) => (
            <div key={row.stars} className="flex items-center gap-3">
              <span className="w-3 text-xs text-black/50">{row.stars}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/10">
                <div
                  className="h-full rounded-full bg-black"
                  style={{ width: `${row.pct}%` }}
                />
              </div>
              <span className="w-8 text-right text-xs text-black/40">
                {row.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Write a review */}
      <WriteReview />
    </div>
  );
};

// ─── Rating stars ─────────────────────────────────────────────────────────
const RatingStars = ({ rating, size = 14 }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => {
      const filled = i + 1 <= Math.round(rating);
      return (
        <Star
          key={i}
          size={size}
          className={filled ? "fill-black text-black" : "text-black/20"}
        />
      );
    })}
  </div>
);

// ─── Main Component ─────────────────────────────────────────────────────
const ProductDetails = ({ breadcrumbBase = "/shop" }) => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(SIZES[1]);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const wishlistItems = useSelector((state) => state.wishlist?.items) || [];
  const isWishlisted = wishlistItems.includes(slug);

  const product = products.find((item) => item.slug === slug);

  const related = useMemo(() => {
    if (!product) return [];
    const sameCategory = products.filter(
      (item) => item.slug !== product.slug && item.category === product.category,
    );
    const others = products.filter(
      (item) => item.slug !== product.slug && item.category !== product.category,
    );
    return [...sameCategory, ...others].slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center gap-3 bg-white text-center">
        <p className="text-lg font-semibold text-black">Product not found</p>
        <Link to={breadcrumbBase} className="text-sm text-black/60 underline">
          Back to shop
        </Link>
      </section>
    );
  }

  const images = [product.img1, product.img2].filter(Boolean);
  const price = parsePrice(product.price);
  const discount = product.discount ? parsePrice(product.discount) : null;
  const savePct = discountPercent(price, discount);
  const { rating, reviews } = ratingFromSlug(product.slug);

  const handleQuantity = (delta) =>
    setQuantity((prev) => Math.min(10, Math.max(1, prev + delta)));

  const handleAddToBag = () => {
    dispatch(
      addToCart({
        id: product.slug,
        slug: product.slug,
        title: product.title,
        price,
        image: images[0],
        quantity,
        size: selectedSize,
      }),
    );
    dispatch(openCart());
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <section className="min-h-screen bg-white pt-24 sm:pt-28 md:pt-32">
      <div className="mx-auto max-w-[1200px] px-5 pb-8 sm:pb-10">
        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-1.5 text-[13px] text-black/45">
          <Link to="/" className="transition-colors hover:text-black">
            Home
          </Link>
          <span>/</span>
          <Link to={breadcrumbBase} className="transition-colors hover:text-black">
            Shop
          </Link>
          {product.category && (
            <>
              <span>/</span>
              <span>{product.category}</span>
            </>
          )}
          <span>/</span>
          <span className="text-black/70">{product.title}</span>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          {/* ─── LEFT: Image Gallery (widened, height unchanged) ────────── */}
          <div className="flex w-full flex-col gap-3 lg:w-[42%] lg:sticky lg:top-28 lg:self-start">
            <div className="relative mx-auto aspect-[5/4] w-full max-w-[420px] overflow-hidden rounded-2xl bg-[#f5f5f3] lg:max-w-none">
              <img
                src={images[activeImage]}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
              {product.badge && (
                <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black shadow-sm">
                  {product.badge}
                </div>
              )}
              {savePct && (
                <div className="absolute right-4 top-4 rounded-full bg-black px-3 py-1.5 text-xs font-semibold text-white">
                  -{savePct}%
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="mx-auto flex w-full max-w-[420px] gap-2.5 lg:max-w-none">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative aspect-square w-16 shrink-0 overflow-hidden rounded-xl transition-all ${
                      activeImage === index
                        ? "ring-2 ring-black ring-offset-2"
                        : "ring-1 ring-black/10 hover:ring-black/30"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} view ${index + 1}`}
                      className="h-full w-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ─── RIGHT: Product Details ───────────────────────────────── */}
          <div className="flex w-full flex-col gap-5 lg:w-[58%]">
            <div className="flex flex-col gap-3">
              <h1 className="text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-black">
                {product.title}
              </h1>

              <div className="flex items-center gap-2.5">
                <RatingStars rating={rating} />
                <span className="text-sm font-medium text-black">{rating}</span>
                <span className="text-sm text-black/40">
                  ({reviews.toLocaleString()} reviews)
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-3 border-b border-black/10 pb-5">
              <span className="font-price text-2xl font-bold text-black">
                ${price.toFixed(2)}
              </span>
              {discount && (
                <span className="font-price text-base text-black/35 line-through">
                  ${discount.toFixed(2)}
                </span>
              )}
              {savePct && (
                <span className="rounded-full bg-[#f2f2f0] px-2.5 py-1 text-xs font-semibold text-black/70">
                  Save {savePct}%
                </span>
              )}
            </div>

            {/* Size selector */}
            <div className="flex flex-col gap-2.5">
              <span className="text-sm font-medium text-black">
                Size <span className="text-black/40">— {selectedSize}</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex h-11 min-w-11 items-center justify-center rounded-full px-4 text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-[#f2f2f0] text-black hover:bg-black/10"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity — label and stepper aligned on one row */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-sm font-medium text-black">Quantity</span>
              <div className="flex items-center rounded-full bg-[#f2f2f0]">
                <button
                  onClick={() => handleQuantity(-1)}
                  aria-label="Decrease quantity"
                  className="flex h-11 w-11 items-center justify-center rounded-full text-black/60 transition-colors hover:text-black disabled:opacity-30"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center text-sm font-semibold text-black">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantity(1)}
                  aria-label="Increase quantity"
                  className="flex h-11 w-11 items-center justify-center rounded-full text-black/60 transition-colors hover:text-black disabled:opacity-30"
                  disabled={quantity >= 10}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions — Add to Bag takes the lead, wishlist stays a fixed square beside it */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddToBag}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-black text-[15px] font-medium text-white transition-all hover:bg-black/90 active:scale-[0.98]"
              >
                {justAdded ? (
                  <>
                    <Check size={16} /> Added to Bag
                  </>
                ) : (
                  "Add to Bag"
                )}
              </button>

              <button
                onClick={() => dispatch(toggleWishlist(product.slug))}
                aria-label="Toggle wishlist"
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ring-1 transition-all active:scale-[0.97] ${
                  isWishlisted
                    ? "bg-black text-white ring-black"
                    : "bg-white text-black ring-black/10 hover:ring-black/30"
                }`}
              >
                <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Fills the space below the actions — quick shipping/return/security facts */}
            <div className="grid grid-cols-1 divide-y divide-black/5 rounded-2xl bg-[#f7f7f5] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="flex items-center gap-3 p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black/70 shadow-sm">
                  <Truck size={16} />
                </span>
                <div className="flex flex-col">
                  <span className="text-[13px] font-medium text-black">Free Shipping</span>
                  <span className="text-[11px] text-black/45">On orders over $80</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black/70 shadow-sm">
                  <RotateCcw size={16} />
                </span>
                <div className="flex flex-col">
                  <span className="text-[13px] font-medium text-black">Easy Returns</span>
                  <span className="text-[11px] text-black/45">30-day window</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black/70 shadow-sm">
                  <ShieldCheck size={16} />
                </span>
                <div className="flex flex-col">
                  <span className="text-[13px] font-medium text-black">Secure Checkout</span>
                  <span className="text-[11px] text-black/45">Encrypted payments</span>
                </div>
              </div>
            </div>

            {/* Description — plain section, below the primary action (not a tab anymore) */}
            <div className="flex flex-col gap-2 border-t border-black/10 pt-6">
              <h3 className="text-sm font-semibold text-black">Description</h3>
              <p className="text-sm leading-relaxed text-black/65">
                {product.description || "No description available for this product yet."}
              </p>
            </div>

            {/* Specifications — plain section, stacked below Description */}
            <div className="flex flex-col gap-3 border-t border-black/10 pt-6">
              <h3 className="text-sm font-semibold text-black">Specifications</h3>
              <dl className="flex flex-col gap-2.5">
                {product.material && (
                  <div className="flex items-center justify-between border-b border-black/5 pb-2">
                    <dt className="text-sm text-black/45">Material</dt>
                    <dd className="text-sm font-medium text-black">{product.material}</dd>
                  </div>
                )}
                {product.category && (
                  <div className="flex items-center justify-between border-b border-black/5 pb-2">
                    <dt className="text-sm text-black/45">Category</dt>
                    <dd className="text-sm font-medium text-black">{product.category}</dd>
                  </div>
                )}
                {product.warranty && (
                  <div className="flex items-center justify-between border-b border-black/5 pb-2">
                    <dt className="text-sm text-black/45">Warranty</dt>
                    <dd className="text-sm font-medium text-black">{product.warranty}</dd>
                  </div>
                )}
                <div className="flex items-center justify-between border-b border-black/5 pb-2">
                  <dt className="text-sm text-black/45">Origin</dt>
                  <dd className="text-sm font-medium text-black">Made responsibly</dd>
                </div>
              </dl>
            </div>

          </div>
        </div>

        {/* ─── Reviews (full width, own breathing room) ────────────────── */}
        <div className="mt-16 border-t border-black/10 pt-14 sm:mt-20 sm:pt-16">
          <ReviewsSection product={product} rating={rating} reviews={reviews} />
        </div>

        {/* ─── You May Also Like ───────────────────────────────────────── */}
        {related.length > 0 && (
          <div className="mt-16 border-t border-black/10 pt-10">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-black sm:text-2xl">
                You May Also Like
              </h2>
              <Link
                to={breadcrumbBase}
                className="text-sm font-medium text-black/50 transition-colors hover:text-black"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((item) => (
                <SampleProduct key={item.slug} {...item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;