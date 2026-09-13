# VELOUR (Shop Sphere) — Complete Frontend Audit & Master AI Prompt

An in-depth codebase audit covering missing features, unfinished components, technical debt, and a master turnkey prompt for single-turn execution.

The full audit artifact has been generated. Key highlights below:

## Core Fractures Detected
1. **Broken Product Routing & Details**: Catalog items link to `/shop/undefined` because `slug` was omitted in `Shops.jsx` & `BestSeller.jsx`. ProductDetails expects `name` and `images`, but the mock data specifies `title` and `img1`/`img2`.
2. **Missing Cart Slice**: Redux store has NO `cart` slice, rendering `CartSidebar` static and inoperable.
3. **Inverted Route Guards**: `ProtectedRoute` checks truthiness of `state.auth` (which is an object) and immediately kicks all authenticated users back to `/`. `AdminRoute` has a typo (`authenticad`) and crashes with `TypeError` on null user.
4. **Branding Conflict**: Mixed brand names across pages (**VELOUR**, **Wearix**, and **shop_sphere**).
5. **Empty Pages**: User Dashboard and Admin Dashboard are empty single-line `<div>` tags; no Checkout, Order Success, Wishlist, or dedicated Cart pages exist.

See the complete prompt inside this report or pass the Master Prompt section directly to Claude.
