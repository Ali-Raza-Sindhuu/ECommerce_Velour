import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart, Trash2 } from "lucide-react";
import { products } from "../data/products";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";
import { openCart } from "../store/slice/Uislice";
import { parsePrice, formatPrice } from "../utils/price";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistSlugs = useSelector((state) => state.wishlist?.items) || [];
  const wishlistProducts = products.filter((p) => wishlistSlugs.includes(p.slug));

  const handleMoveToBag = (product) => {
    dispatch(
      addToCart({
        id: product.slug,
        slug: product.slug,
        title: product.title,
        price: parsePrice(product.price),
        image: product.img1,
        quantity: 1,
      }),
    );
    dispatch(removeFromWishlist(product.slug));
    dispatch(openCart());
  };

  return (
    <section className="min-h-screen bg-white px-4 py-16 sm:px-8 md:px-12 lg:px-20 xl:px-28">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-black">
          Your Wishlist
        </h1>

        {wishlistProducts.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-[#f8f8f8] py-20 text-center">
            <Heart size={28} className="text-black/30" />
            <p className="text-black/60">Nothing saved here yet.</p>
            <Link to="/shops" className="text-sm font-medium text-black underline">
              Discover pieces you'll love
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {wishlistProducts.map((product) => (
              <div key={product.slug} className="flex flex-col gap-3">
                <Link to={`/shop/${product.slug}`} className="relative block aspect-4/5 overflow-hidden rounded-2xl bg-[#ededed]">
                  <img src={product.img1} alt={product.title} className="h-full w-full object-cover" />
                </Link>
                <div className="flex items-start justify-between gap-3 px-1">
                  <div className="min-w-0 flex-1">
                    <Link to={`/shop/${product.slug}`} className="truncate text-[15px] font-semibold text-black hover:underline">
                      {product.title}
                    </Link>
                    <p className="mt-1 font-price text-sm font-bold text-black">{formatPrice(parsePrice(product.price))}</p>
                  </div>
                  <button
                    aria-label="Remove from wishlist"
                    onClick={() => dispatch(removeFromWishlist(product.slug))}
                    className="text-black/40 transition hover:text-black"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
                <button
                  onClick={() => handleMoveToBag(product)}
                  className="mt-1 rounded-full bg-black py-2.5 text-sm font-medium text-white transition hover:bg-black/90"
                >
                  Move to Bag
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
