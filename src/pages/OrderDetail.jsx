import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CheckCircle2, PackageCheck, Truck, ClipboardList } from "lucide-react";
import { formatPrice } from "../utils/price";

const STAGES = [
  { key: "Processing", label: "Order Placed", icon: ClipboardList },
  { key: "Packed", label: "Packed", icon: PackageCheck },
  { key: "Shipped", label: "Shipped", icon: Truck },
  { key: "Delivered", label: "Delivered", icon: CheckCircle2 },
];

const OrderDetail = () => {
  const { orderId } = useParams();
  const order = useSelector((state) =>
    (state.orders?.orders || []).find((o) => o.id === orderId),
  );

  if (!order) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-white px-6 text-center">
        <p className="text-lg font-semibold text-black">We couldn't find that order</p>
        <Link to="/orders" className="text-sm text-black/60 underline">
          Back to orders
        </Link>
      </section>
    );
  }

  // Mock: all fresh orders sit at "Processing" until a real backend updates status.
  const currentStageIndex = STAGES.findIndex((s) => s.key === order.status) === -1
    ? 0
    : STAGES.findIndex((s) => s.key === order.status);

  return (
    <section className="min-h-screen bg-white px-4 py-16 sm:px-8 md:px-12 lg:px-20 xl:px-28">
      <div className="mx-auto max-w-3xl">
        <Link to="/orders" className="text-sm text-black/50 underline hover:text-black">
          ← Back to orders
        </Link>

        <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-mono text-xl font-semibold text-black">{order.id}</h1>
          <p className="text-sm text-black/50">
            Placed{" "}
            {new Date(order.date).toLocaleDateString(undefined, {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Tracking timeline */}
        <div className="my-10 flex items-center justify-between">
          {STAGES.map((stage, i) => {
            const Icon = stage.icon;
            const reached = i <= currentStageIndex;
            return (
              <div key={stage.key} className="flex flex-1 flex-col items-center gap-2 text-center">
                <div className="flex w-full items-center">
                  {i > 0 && (
                    <div className={`h-px flex-1 ${reached ? "bg-black" : "bg-black/10"}`} />
                  )}
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      reached ? "bg-black text-white" : "bg-black/5 text-black/30"
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                  {i < STAGES.length - 1 && (
                    <div className={`h-px flex-1 ${i < currentStageIndex ? "bg-black" : "bg-black/10"}`} />
                  )}
                </div>
                <span className={`text-[11px] font-medium ${reached ? "text-black" : "text-black/35"}`}>
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl bg-[#f8f8f8] p-6">
          <div className="flex flex-col gap-4 border-b border-black/10 pb-4">
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

          <div className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-black/40">Shipping To</p>
              <p className="mt-2 text-sm text-black">
                {order.address?.fullName}
                <br />
                {order.address?.street}, {order.address?.city} {order.address?.postalCode}
                <br />
                {order.address?.country}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-black/40">Payment</p>
              <p className="mt-2 text-sm capitalize text-black">
                {order.paymentMethod === "cod" ? "Cash on Delivery" : "Credit Card"}
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.15em] text-black/40">Total</p>
              <p className="mt-2 text-base font-semibold text-black">{formatPrice(order.total)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;
