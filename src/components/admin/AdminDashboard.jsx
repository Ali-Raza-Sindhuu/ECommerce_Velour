import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  LayoutGrid,
  Package,
  ShoppingCart,
  Users,
  LogOut,
} from "lucide-react";

const TABS = [
  { key: "overview", label: "Overview", icon: LayoutGrid },
  { key: "products", label: "Products", icon: Package },
  { key: "orders", label: "Orders", icon: ShoppingCart },
  { key: "users", label: "Users", icon: Users },
];

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      {/* Sidebar */}
      <aside className="flex w-60 shrink-0 flex-col gap-1 border-r border-black/10 bg-white p-5">
        <div className="mb-6 px-2">
          <p className="text-lg font-semibold tracking-wide">VELOUR</p>
          <p className="text-xs text-black/40">Admin panel</p>
        </div>

        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              activeTab === key
                ? "bg-black text-white"
                : "text-black/70 hover:bg-black/5"
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}

        <div className="mt-auto flex flex-col gap-1 pt-6">
          <Link
            to="/"
            className="rounded-lg px-3 py-2.5 text-sm font-medium text-black/60 hover:bg-black/5"
          >
            ← Back to store
          </Link>
          <button
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
            onClick={() => {
              // TODO: wire up logout thunk/action
            }}
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold capitalize">{activeTab}</h1>
          {user?.name && (
            <p className="text-sm text-black/50">Signed in as {user.name}</p>
          )}
        </div>

        <div className="min-h-[400px] rounded-2xl border border-black/10 bg-white p-8">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {["Total Orders", "Total Revenue", "Active Users"].map((label) => (
                <div key={label} className="rounded-xl border border-black/10 p-5">
                  <p className="text-xs uppercase tracking-wide text-black/40">{label}</p>
                  <p className="mt-2 text-2xl font-semibold">—</p>
                  <p className="mt-1 text-xs text-black/30">TODO: connect to backend metrics</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "products" && (
            <p className="text-sm text-black/60">
              TODO: product table — list, create, edit, delete products; manage stock and images.
            </p>
          )}

          {activeTab === "orders" && (
            <p className="text-sm text-black/60">
              TODO: order management table — filter by status, view details, update fulfillment.
            </p>
          )}

          {activeTab === "users" && (
            <p className="text-sm text-black/60">
              TODO: user management table — view customers/admins, manage roles.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};
