import { Truck, RotateCcw, Clock, Globe } from "lucide-react";

const SHIPPING_TIERS = [
  { label: "Standard Shipping", time: "5–7 business days", cost: "Free over $150, otherwise $9.95" },
  { label: "Express Shipping", time: "2–3 business days", cost: "$14.95" },
];

const RETURN_STEPS = [
  { title: "Request a return", desc: "Go to Orders → select the order → 'Start a Return', within 30 days of delivery." },
  { title: "Pack your item", desc: "Use the original packaging where possible, with tags still attached." },
  { title: "Ship it back", desc: "Use the prepaid return label emailed to you — no cost to you." },
  { title: "Get refunded", desc: "Refunds are issued to your original payment method within 5–7 business days of receipt." },
];

const ShippingReturns = () => {
  return (
    <section className="min-h-screen bg-white px-4 py-16 sm:px-8 md:px-12 lg:px-20 xl:px-28">
      <div className="mx-auto max-w-4xl">
        <div className="mb-14 text-center">
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-black">
            Shipping & Returns
          </h1>
          <p className="mt-3 text-sm text-black/50">
            Clear, simple policies — because good service is part of good design.
          </p>
        </div>

        {/* Shipping */}
        <div className="mb-16">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
              <Truck size={18} />
            </div>
            <h2 className="text-xl font-semibold text-black">Shipping</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SHIPPING_TIERS.map((tier) => (
              <div key={tier.label} className="rounded-2xl bg-[#f8f8f8] p-6">
                <p className="font-medium text-black">{tier.label}</p>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-black/60">
                  <Clock size={14} /> {tier.time}
                </p>
                <p className="mt-1 text-sm text-black/60">{tier.cost}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-black/10 p-5">
            <Globe size={18} className="mt-0.5 shrink-0 text-black/50" />
            <p className="text-sm text-black/60">
              We currently ship to the countries listed at checkout. Delivery estimates begin from the day
              your order is confirmed, not the day it's placed, and orders placed on weekends or holidays
              are processed the next business day.
            </p>
          </div>
        </div>

        {/* Returns */}
        <div>
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
              <RotateCcw size={18} />
            </div>
            <h2 className="text-xl font-semibold text-black">Returns</h2>
          </div>

          <p className="mb-6 max-w-2xl text-sm leading-relaxed text-black/60">
            We want you to love what you ordered. If something isn't right, you have 30 days from the date
            of delivery to return it for a full refund, provided the item is unworn, unwashed, and has its
            original tags attached.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {RETURN_STEPS.map((step, i) => (
              <div key={step.title} className="flex gap-4 rounded-2xl bg-[#f8f8f8] p-5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                  {i + 1}
                </div>
                <div>
                  <p className="font-medium text-black">{step.title}</p>
                  <p className="mt-1 text-sm text-black/60">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingReturns;
