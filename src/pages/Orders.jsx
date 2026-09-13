import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Package } from "lucide-react";
import { formatPrice } from "../utils/price";

const statusStyles = {
  Processing: "bg-amber-100 text-amber-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-emerald-100 text-emerald-700",
};

const Orders = () => {
  const orders = useSelector((state) => state.orders?.orders) || [];

  return (
    <section className="min-h-screen bg-white px-4 py-16 sm:px-8 md:px-12 lg:px-20 xl:px-28">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-black">
          Your Orders
        </h1>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-[#f8f8f8] py-20 text-center">
            <Package size={28} className="text-black/30" />
            <p className="text-black/60">You haven't placed any orders yet.</p>
            <Link to="/shops" className="text-sm font-medium text-black underline">
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                to={`/orders/${order.id}`}
                className="flex flex-col gap-4 rounded-2xl border border-black/10 p-5 transition hover:border-black/25 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-mono text-sm font-semibold text-black">{order.id}</p>
                  <p className="mt-1 text-xs text-black/50">
                    {new Date(order.date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    · {order.items.length} item{order.items.length > 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[order.status] || "bg-black/5 text-black/60"}`}
                  >
                    {order.status}
                  </span>
                  <span className="text-sm font-semibold text-black">{formatPrice(order.total)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Orders;
