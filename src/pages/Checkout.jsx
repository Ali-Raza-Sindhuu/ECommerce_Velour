import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Lock, Truck, Zap, Banknote, CreditCard } from "lucide-react";
import { clearCart } from "../features/cart/cartSlice";
import { addOrder } from "../features/orders/ordersSlice";
import { formatPrice } from "../utils/price";

const SHIPPING_METHODS = [
  { id: "standard", label: "Standard Shipping", eta: "5–7 business days", cost: 0, icon: Truck },
  { id: "express", label: "Express Shipping", eta: "2–3 business days", cost: 14.95, icon: Zap },
];

const generateOrderId = () =>
  `VEL-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`;

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart?.items) || [];

  const [contact, setContact] = useState({ email: "" });
  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "" });
  const [submitting, setSubmitting] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const selectedShipping = SHIPPING_METHODS.find((m) => m.id === shippingMethod);
  const shippingCost = subtotal === 0 ? 0 : selectedShipping.cost;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const handleAddressChange = (e) =>
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCardChange = (e) =>
    setCard((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);

    const orderId = generateOrderId();
    const order = {
      id: orderId,
      date: new Date().toISOString(),
      status: "Processing",
      items,
      contact,
      address,
      shippingMethod,
      paymentMethod,
      subtotal,
      shipping: shippingCost,
      tax,
      total,
    };

    dispatch(addOrder(order));
    dispatch(clearCart());
    navigate(`/order-success/${orderId}`);
  };

  if (items.length === 0) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-white px-6 text-center">
        <p className="text-xl font-semibold text-black">Your bag is empty</p>
        <p className="max-w-xs text-sm text-black/50">
          Add something to your bag before checking out.
        </p>
        <Link
          to="/shops"
          className="mt-2 inline-flex items-center justify-center rounded-full bg-black px-7 py-3 text-sm font-medium text-white transition hover:bg-black/90"
        >
          Browse Shop
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white px-4 py-10 sm:px-8 md:px-12 lg:px-20 xl:px-28">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-black">
          Checkout
        </h1>

        <form onSubmit={handlePlaceOrder} className="flex flex-col gap-10 lg:flex-row">
          {/* Left column */}
          <div className="flex-1 flex flex-col gap-8">
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-black/50">
                Contact
              </h2>
              <input
                required
                type="email"
                placeholder="you@example.com"
                value={contact.email}
                onChange={(e) => setContact({ email: e.target.value })}
                className="w-full rounded-xl border border-black/10 bg-[#f8f8f8] px-4 py-3 text-sm text-black outline-none focus:border-black/30 focus:bg-white"
              />
            </div>

            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-black/50">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  required
                  name="fullName"
                  placeholder="Full name"
                  value={address.fullName}
                  onChange={handleAddressChange}
                  className="rounded-xl border border-black/10 bg-[#f8f8f8] px-4 py-3 text-sm text-black outline-none focus:border-black/30 focus:bg-white sm:col-span-2"
                />
                <input
                  required
                  name="street"
                  placeholder="Street address"
                  value={address.street}
                  onChange={handleAddressChange}
                  className="rounded-xl border border-black/10 bg-[#f8f8f8] px-4 py-3 text-sm text-black outline-none focus:border-black/30 focus:bg-white sm:col-span-2"
                />
                <input
                  required
                  name="city"
                  placeholder="City"
                  value={address.city}
                  onChange={handleAddressChange}
                  className="rounded-xl border border-black/10 bg-[#f8f8f8] px-4 py-3 text-sm text-black outline-none focus:border-black/30 focus:bg-white"
                />
                <input
                  required
                  name="postalCode"
                  placeholder="Postal code"
                  value={address.postalCode}
                  onChange={handleAddressChange}
                  className="rounded-xl border border-black/10 bg-[#f8f8f8] px-4 py-3 text-sm text-black outline-none focus:border-black/30 focus:bg-white"
                />
                <input
                  required
                  name="country"
                  placeholder="Country"
                  value={address.country}
                  onChange={handleAddressChange}
                  className="rounded-xl border border-black/10 bg-[#f8f8f8] px-4 py-3 text-sm text-black outline-none focus:border-black/30 focus:bg-white sm:col-span-2"
                />
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-black/50">
                Shipping Method
              </h2>
              <div className="flex flex-col gap-3">
                {SHIPPING_METHODS.map((method) => {
                  const Icon = method.icon;
                  const active = shippingMethod === method.id;
                  return (
                    <button
                      type="button"
                      key={method.id}
                      onClick={() => setShippingMethod(method.id)}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-left transition ${
                        active ? "border-black bg-black/5" : "border-black/10 hover:border-black/25"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={18} className="text-black/60" />
                        <span>
                          <span className="block text-sm font-medium text-black">{method.label}</span>
                          <span className="block text-xs text-black/50">{method.eta}</span>
                        </span>
                      </span>
                      <span className="text-sm font-medium text-black">
                        {method.cost === 0 ? "Free" : formatPrice(method.cost)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-black/50">
                Payment
              </h2>
              <div className="mb-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                    paymentMethod === "card" ? "border-black bg-black/5 text-black" : "border-black/10 text-black/60 hover:border-black/25"
                  }`}
                >
                  <CreditCard size={16} /> Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                    paymentMethod === "cod" ? "border-black bg-black/5 text-black" : "border-black/10 text-black/60 hover:border-black/25"
                  }`}
                >
                  <Banknote size={16} /> Cash on Delivery
                </button>
              </div>

              {paymentMethod === "card" && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    required
                    name="number"
                    placeholder="Card number"
                    value={card.number}
                    onChange={handleCardChange}
                    className="rounded-xl border border-black/10 bg-[#f8f8f8] px-4 py-3 text-sm text-black outline-none focus:border-black/30 focus:bg-white sm:col-span-2"
                  />
                  <input
                    required
                    name="expiry"
                    placeholder="MM/YY"
                    value={card.expiry}
                    onChange={handleCardChange}
                    className="rounded-xl border border-black/10 bg-[#f8f8f8] px-4 py-3 text-sm text-black outline-none focus:border-black/30 focus:bg-white"
                  />
                  <input
                    required
                    name="cvc"
                    placeholder="CVC"
                    value={card.cvc}
                    onChange={handleCardChange}
                    className="rounded-xl border border-black/10 bg-[#f8f8f8] px-4 py-3 text-sm text-black outline-none focus:border-black/30 focus:bg-white"
                  />
                </div>
              )}
              {paymentMethod === "cod" && (
                <p className="rounded-xl bg-[#f8f8f8] p-4 text-sm text-black/60">
                  Pay with cash when your order arrives at your door.
                </p>
              )}
              <p className="mt-3 flex items-center gap-1.5 text-xs text-black/40">
                <Lock size={12} /> Payments are simulated in this demo — no real card is charged.
              </p>
            </div>
          </div>

          {/* Right column: sticky summary */}
          <div className="w-full shrink-0 lg:w-[360px]">
            <div className="sticky top-24 flex flex-col gap-5 rounded-2xl bg-[#f8f8f8] p-6">
              <h2 className="text-lg font-semibold text-black">Order Summary</h2>
              <div className="flex max-h-64 flex-col gap-4 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size ?? ""}-${item.color ?? ""}`} className="flex gap-3">
                    <div className="relative h-16 w-14 shrink-0">
                      <img src={item.image} alt={item.title} className="h-full w-full rounded-lg object-cover" />
                      <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex flex-1 items-center justify-between">
                      <p className="text-sm text-black/80">{item.title}</p>
                      <p className="text-sm font-medium text-black">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 border-t border-black/10 pt-4 text-sm">
                <div className="flex justify-between text-black/70">
                  <span>Subtotal</span>
                  <span className="tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-black/70">
                  <span>Shipping</span>
                  <span className="tabular-nums">{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-black/70">
                  <span>Tax (est.)</span>
                  <span className="tabular-nums">{formatPrice(tax)}</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-black/10 pt-3 text-base font-semibold text-black">
                  <span>Total</span>
                  <span className="tabular-nums">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 w-full rounded-xl bg-black py-3.5 text-sm font-medium text-white transition hover:bg-black/90 disabled:opacity-60"
              >
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
