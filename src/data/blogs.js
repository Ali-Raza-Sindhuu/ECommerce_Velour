import blog1 from "../assets/blog_01.avif";
import blog2 from "../assets/blog_02.avif";
import blog3 from "../assets/blog_03.avif";

export const blogs = [
  {
    slug: "minimal-street-style",
    img: blog1,
    category: "Style Guide",
    title: "How to master the art of minimal street style",
    desc: "Build a timeless wardrobe with high-quality fabrics, muted tones, and effortless oversized fits.",
    read: "8 min read",
    date: "Jan 29, 2026",
    author: "Amara Osei",
    content: [
      "Minimal street style isn't about owning less — it's about choosing better. The wardrobes that read as effortlessly cool are almost always built on a tight rotation of high-quality basics rather than a closet stuffed with trend pieces.",
      "Start with fabric. A plain white tee in heavyweight combed cotton will always look more considered than a printed one in thin jersey. The same logic applies across every category: trousers, outerwear, knitwear. Texture and drape do more visual work than pattern.",
      "Stick to a muted palette — black, off-white, stone, charcoal — and let silhouette carry the interest. An oversized coat over a fitted layer, or wide-leg trousers with a cropped jacket, creates shape without needing color or logos to stand out.",
      "Finally, edit ruthlessly. The goal isn't more pieces, it's fewer, better ones that all work together. If something doesn't pair with at least three other items you own, it's probably not earning its space in your rotation.",
    ],
  },
  {
    slug: "elevate-everyday-outfits",
    img: blog2,
    category: "Fashion Tips",
    title: "Elevate everyday outfits using modern minimalist styling",
    desc: "Simple changes to your daily outfit that make a dramatic difference in how you present yourself.",
    read: "6 min read",
    date: "Dec 30, 2025",
    author: "Jonas Reyes",
    content: [
      "Most 'boring' outfits aren't boring because of the pieces — they're boring because of the fit. Before buying anything new, get your current basics tailored. A properly hemmed trouser or a jacket taken in at the waist can transform how an outfit reads.",
      "Layering with intention is the next lever. Instead of throwing on any jacket, think about proportion: a longer outer layer over a shorter inner layer (or vice versa) creates visual rhythm that a single flat layer never will.",
      "Small material upgrades — swapping a plastic-feeling puffer for a wool overshirt, or a basic cotton tee for one in a slightly heavier weight — raise the perceived quality of an entire outfit at almost no extra effort.",
      "Lastly, pay attention to your shoes. They're the single most-noticed accessory in any outfit; clean, well-kept footwear in a neutral tone will make even a simple tee-and-jeans combination look deliberate.",
    ],
  },
  {
    slug: "capsule-wardrobe-year-round",
    img: blog3,
    category: "Style Guide",
    title: "Build a capsule wardrobe that works year round",
    desc: "Invest in fewer, better pieces that mix and match effortlessly across every season.",
    read: "5 min read",
    date: "Nov 22, 2025",
    author: "Amara Osei",
    content: [
      "A true capsule wardrobe is built around a single, consistent color story so that every piece can be worn with almost every other piece. Before adding anything new, ask whether it fits the existing palette — not whether you like it in isolation.",
      "Prioritize transitional fabrics: mid-weight cotton, wool blends, and technical layers that perform well across a 15–20 degree temperature swing. This lets a handful of pieces do the work of an entire seasonal wardrobe.",
      "Layering is what makes a capsule work year-round. The same base tee can go under a linen shirt in summer or a wool sweater and coat in winter — the key is designing each piece to layer cleanly with the others.",
      "Review the capsule every few months. Remove anything that hasn't been worn, and replace it thoughtfully rather than impulsively, keeping the total count roughly constant.",
    ],
  },
  {
    slug: "velour-origin-story",
    img: blog1,
    category: "Brand Stories",
    title: "How VELOUR started with one jacket and a vision",
    desc: "The origin story of VELOUR — from a small studio to a global minimal fashion label.",
    read: "10 min read",
    date: "Oct 10, 2025",
    author: "The VELOUR Team",
    content: [
      "VELOUR began with a single utility jacket, designed and sewn in a small studio by a founder frustrated with the gap between 'fast fashion' and 'quiet luxury' — everything felt either disposable or unreachable.",
      "That first jacket sold out in a weekend, entirely through word of mouth. What followed was a slow, deliberate build: a handful of new styles per season, always in the same restrained palette, always focused on fabric quality over logo visibility.",
      "Today VELOUR works with a small number of long-term textile partners rather than chasing the cheapest supplier each season — a decision that shapes both the durability of the clothes and the pace at which new collections are released.",
      "The vision hasn't changed since that first jacket: fewer, better pieces, designed to be worn for years rather than a single season.",
    ],
  },
  {
    slug: "five-colours-wardrobe",
    img: blog2,
    category: "Fashion Tips",
    title: "The only 5 colours you need in your wardrobe",
    desc: "A practical guide to building a neutral-forward palette that works for every occasion.",
    read: "4 min read",
    date: "Sep 5, 2025",
    author: "Jonas Reyes",
    content: [
      "Black, white, stone, charcoal, and a single accent tone — that's the entire palette needed to build a wardrobe where every item works with every other item.",
      "The accent color is the only one that should vary by person: navy, olive, or the gold-sand tone VELOUR uses in its own collections all work well as the one note of warmth against an otherwise neutral base.",
      "Resist the urge to add a sixth or seventh color 'just for variety.' Variety in a minimal wardrobe comes from texture, silhouette, and layering — not from expanding the color palette.",
      "When shopping, hold any prospective new piece up next to what you already own. If it doesn't visually belong in the same five-color family, it's a trend purchase, not a wardrobe investment.",
    ],
  },
  {
    slug: "sustainability-promise",
    img: blog3,
    category: "Brand Stories",
    title: "Behind the fabric — our sustainability promise",
    desc: "How we source, test, and choose the materials that go into every VELOUR piece.",
    read: "7 min read",
    date: "Aug 18, 2025",
    author: "The VELOUR Team",
    content: [
      "Every fabric that reaches a VELOUR collection has gone through the same three checks: fiber origin, mill certification, and a wear-test that simulates roughly two years of regular use.",
      "Organic cotton and recycled polyester make up the majority of our current lineup, sourced from mills that publish independent audits of their water and energy usage.",
      "We deliberately produce in smaller batches. It costs more per unit, but it means we're not sitting on unsold seasonal stock that eventually gets discounted or discarded.",
      "This is an ongoing project, not a finished one — each season we aim to move a slightly larger share of the collection to lower-impact materials without compromising on the fit and durability customers expect.",
    ],
  },
];

export const getBlogBySlug = (slug) => blogs.find((b) => b.slug === slug);
