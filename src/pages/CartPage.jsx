import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";
import { formatPrice } from "../utils/price";

const FREE_SHIPPING_THRESHOLD = 150;
const VALID_PROMO_CODES = { VELOUR10: 0.1, WELCOME15: 0.15 };

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart?.items) || [];
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedPromo ? subtotal * appliedPromo.rate : 0;
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 9.95;
  const total = Math.max(subtotal - discount + shipping, 0);
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  const progressPct = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (VALID_PROMO_CODES[code]) {
      setAppliedPromo({ code, rate: VALID_PROMO_CODES[code] });
      setPromoError("");
    } else {
      setAppliedPromo(null);
      setPromoError("That code isn't valid.");
    }
  };

  if (items.length === 0) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-white px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f3f3f3]">
          <ShoppingBag size={26} className="text-black/40" />
        </div>
        <p className="text-xl font-semibold text-black">Your bag is empty</p>
        <p className="max-w-xs text-sm text-black/50">
          Looks like you haven't added anything yet. Explore the collection to find something you'll love.
        </p>
        <Link
          to="/shops"
          className="mt-2 inline-flex items-center justify-center rounded-full bg-black px-7 py-3 text-sm font-medium text-white transition hover:bg-black/90"
        >
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white px-4 py-10 sm:px-8 md:px-12 lg:px-20 xl:px-28">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-black">
          Your Bag
        </h1>

        {/* Free shipping progress */}
        <div className="mb-8 rounded-2xl bg-[#f8f8f8] p-5">
          {amountToFreeShipping > 0 ? (
            <p className="mb-3 text-sm text-black/70">
              Add <span className="font-semibold text-black">{formatPrice(amountToFreeShipping)}</span> more to unlock free shipping.
            </p>
          ) : (
            <p className="mb-3 text-sm font-medium text-black">You've unlocked free shipping!</p>
          )}
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/10">
            <div
              className="h-full rounded-full bg-[#c9a96e] transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row">
          {/* Items */}
          <div className="flex-1 divide-y divide-black/8">
            {items.map((item) => (
              <div key={`${item.id}-${item.size ?? ""}-${item.color ?? ""}`} className="flex gap-4 py-6 first:pt-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-28 w-24 shrink-0 rounded-xl object-cover"
                />
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-black">{item.title}</p>
                      {item.size && <p className="mt-1 text-xs text-black/50">Size: {item.size}</p>}
                      {item.color && <p className="text-xs text-black/50">Color: {item.color}</p>}
                    </div>
                    <button
                      aria-label="Remove item"
                      onClick={() =>
                        dispatch(removeFromCart({ id: item.id, size: item.size, color: item.color }))
                      }
                      className="text-black/40 transition hover:text-black"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 rounded-full border border-black/10 px-2.5 py-1.5">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              size: item.size,
                              color: item.color,
                              quantity: item.quantity - 1,
                            }),
                          )
                        }
                        className="text-black/60 hover:text-black"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-price text-sm font-medium tabular-nums text-black">
                        {item.quantity}
                      </span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              size: item.size,
                              color: item.color,
                              quantity: item.quantity + 1,
                            }),
                          )
                        }
                        className="text-black/60 hover:text-black"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-price text-sm font-semibold tabular-nums text-black">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="w-full shrink-0 lg:w-[360px]">
            <div className="sticky top-24 flex flex-col gap-5 rounded-2xl bg-[#f8f8f8] p-6">
              <h2 className="text-lg font-semibold text-black">Order Summary</h2>

              <form onSubmit={handleApplyPromo} className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code"
                    className="flex-1 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-black outline-none focus:border-black/30"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-black/90"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-xs text-red-500">{promoError}</p>}
                {appliedPromo && (
                  <p className="text-xs text-[#8a7148]">
                    Code {appliedPromo.code} applied ({appliedPromo.rate * 100}% off)
                  </p>
                )}
                <p className="text-[11px] text-black/35">Try VELOUR10 or WELCOME15</p>
              </form>

              <div className="flex flex-col gap-2 border-t border-black/10 pt-4 text-sm">
                <div className="flex justify-between text-black/70">
                  <span>Subtotal</span>
                  <span className="tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-[#8a7148]">
                    <span>Discount</span>
                    <span className="tabular-nums">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-black/70">
                  <span>Shipping</span>
                  <span className="tabular-nums">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-black/10 pt-3 text-base font-semibold text-black">
                  <span>Total</span>
                  <span className="tabular-nums">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="mt-2 w-full rounded-xl bg-black py-3.5 text-sm font-medium text-white transition hover:bg-black/90"
              >
                Proceed to Checkout
              </button>
              <Link to="/shops" className="text-center text-sm text-black/50 underline hover:text-black">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
