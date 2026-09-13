import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CheckCircle2, Package } from "lucide-react";
import { formatPrice } from "../utils/price";

const OrderSuccess = () => {
  const { orderId } = useParams();
  const order = useSelector((state) =>
    (state.orders?.orders || []).find((o) => o.id === orderId),
  );

  if (!order) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-white px-6 text-center">
        <p className="text-lg font-semibold text-black">We couldn't find that order</p>
        <Link to="/shops" className="text-sm text-black/60 underline">
          Back to shop
        </Link>
      </section>
    );
  }

  const eta = new Date(order.date);
  eta.setDate(eta.getDate() + (order.shippingMethod === "express" ? 3 : 6));

  return (
    <section className="min-h-screen bg-white px-4 py-16 sm:px-8 md:px-12 lg:px-20 xl:px-28">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#c9a96e]/15">
          <CheckCircle2 size={32} className="text-[#8a7148]" />
        </div>
        <h1 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-black">
          Order Confirmed
        </h1>
        <p className="mt-3 text-sm text-black/60">
          Thank you — your order has been placed successfully. A confirmation has been sent to{" "}
          <span className="font-medium text-black">{order.contact?.email}</span>.
        </p>

        <div className="mt-8 flex flex-col gap-1 rounded-2xl bg-[#f8f8f8] p-6 text-left">
          <div className="flex items-center justify-between border-b border-black/10 pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-black/40">Order Number</p>
              <p className="mt-1 font-mono text-sm font-semibold text-black">{order.id}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-[0.15em] text-black/40">Estimated Delivery</p>
              <p className="mt-1 text-sm font-medium text-black">
                {eta.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 py-4">
            {order.items.map((item) => (
              <div key={`${item.id}-${item.size ?? ""}`} className="flex items-center gap-4">
                <img src={item.image} alt={item.title} className="h-16 w-14 rounded-lg object-cover" />
                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black">{item.title}</p>
                    <p className="text-xs text-black/50">Qty {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-black">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 border-t border-black/10 pt-4 text-sm">
            <div className="flex justify-between text-black/70">
              <span>Delivery Address</span>
            </div>
            <p className="text-black">
              {order.address?.fullName}
              <br />
              {order.address?.street}, {order.address?.city} {order.address?.postalCode}
              <br />
              {order.address?.country}
            </p>
          </div>

          <div className="mt-4 flex justify-between border-t border-black/10 pt-4 text-base font-semibold text-black">
            <span>Total Paid</span>
            <span className="tabular-nums">{formatPrice(order.total)}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/shops"
            className="inline-flex items-center justify-center rounded-full bg-black px-7 py-3 text-sm font-medium text-white transition hover:bg-black/90"
          >
            Continue Shopping
          </Link>
          <Link
            to={`/orders/${order.id}`}
            className="inline-flex items-center gap-2 text-sm text-black/60 underline hover:text-black"
          >
            <Package size={15} /> Track this order
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccess;
