import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_SECTIONS = [
  {
    category: "Ordering",
    items: [
      {
        q: "How do I place an order?",
        a: "Browse the shop, choose a product, select your size and color, then add it to your bag. When you're ready, head to your bag and proceed to checkout.",
      },
      {
        q: "Can I change or cancel my order after placing it?",
        a: "Orders can be changed or cancelled within 1 hour of placing them. After that, they move into processing and can no longer be edited — please contact support as soon as possible.",
      },
      {
        q: "Do you offer gift cards?",
        a: "Gift cards are coming soon. Sign up for our newsletter in the footer to be notified when they launch.",
      },
    ],
  },
  {
    category: "Shipping",
    items: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping takes 5–7 business days. Express shipping arrives in 2–3 business days. Delivery estimates are shown at checkout before you place your order.",
      },
      {
        q: "Is shipping free?",
        a: "Yes — standard shipping is free on all orders over $150. Orders below that threshold have a flat shipping fee calculated at checkout.",
      },
      {
        q: "Do you ship internationally?",
        a: "We currently ship within the countries listed at checkout. If your country isn't listed, join our newsletter for updates on new shipping regions.",
      },
    ],
  },
  {
    category: "Returns",
    items: [
      {
        q: "What is your return policy?",
        a: "We offer easy, hassle-free returns within 30 days of delivery, provided items are unworn, unwashed, and have their original tags attached.",
      },
      {
        q: "How do I start a return?",
        a: "Go to your Orders page, select the order, and choose 'Start a Return'. You'll receive a prepaid return label by email.",
      },
      {
        q: "When will I get my refund?",
        a: "Refunds are processed within 5–7 business days after we receive your returned item, back to your original payment method.",
      },
    ],
  },
  {
    category: "Sizing",
    items: [
      {
        q: "How do I find my size?",
        a: "Each product page lists available sizes. If you're between sizes, we generally recommend sizing up for a more relaxed, VELOUR-style fit.",
      },
      {
        q: "Do your sizes run true to size?",
        a: "Most pieces run true to size with a relaxed cut. Fitted pieces are noted as such on the product page.",
      },
      {
        q: "Can I exchange for a different size?",
        a: "Yes — size exchanges are treated as a free return plus a new order, so you get the correct size shipped out as quickly as possible.",
      },
    ],
  },
];

const AccordionItem = ({ item, isOpen, onToggle }) => (
  <div className="border-b border-black/10">
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-4 py-5 text-left"
    >
      <span className="text-[15px] font-medium text-black">{item.q}</span>
      <ChevronDown
        size={18}
        className={`shrink-0 text-black/50 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
    <div
      className={`grid overflow-hidden transition-all duration-300 ${
        isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
        <p className="max-w-2xl text-sm leading-relaxed text-black/60">{item.a}</p>
      </div>
    </div>
  </div>
);

const FAQ = () => {
  const [openKey, setOpenKey] = useState(null);

  return (
    <section className="min-h-screen bg-white px-4 py-16 sm:px-8 md:px-12 lg:px-20 xl:px-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-black">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-sm text-black/50">
            Everything you need to know about ordering, shipping, returns, and sizing.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {FAQ_SECTIONS.map((section) => (
            <div key={section.category}>
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8a7148]">
                {section.category}
              </h2>
              <div>
                {section.items.map((item, i) => {
                  const key = `${section.category}-${i}`;
                  return (
                    <AccordionItem
                      key={key}
                      item={item}
                      isOpen={openKey === key}
                      onToggle={() => setOpenKey(openKey === key ? null : key)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
