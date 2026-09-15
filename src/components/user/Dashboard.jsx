import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Package, Heart, User as UserIcon, MapPin, LogOut } from "lucide-react";

const TABS = [
  { key: "overview", label: "Overview", icon: UserIcon },
  { key: "orders", label: "Orders", icon: Package },
  { key: "wishlist", label: "Wishlist", icon: Heart },
  { key: "addresses", label: "Addresses", icon: MapPin },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:px-12 lg:px-20 xl:px-28">
      <h1 className="mb-8 text-2xl font-semibold sm:text-3xl">
        {user?.name ? `Welcome back, ${user.name}` : "My Account"}
      </h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar nav */}
        <aside className="flex shrink-0 gap-2 overflow-x-auto lg:w-56 lg:flex-col lg:overflow-visible">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                activeTab === key
                  ? "bg-black text-white"
                  : "bg-[#f4f4f4] text-black/70 hover:bg-black/5"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}

          <button
            className="mt-2 flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
            onClick={() => {
              // TODO: wire up logout thunk/action
            }}
          >
            <LogOut size={16} />
            Log out
          </button>
        </aside>

        {/* Content */}
        <div className="min-h-[300px] flex-1 rounded-2xl border border-black/10 p-6 sm:p-8">
          {activeTab === "overview" && (
            <div className="flex flex-col gap-2 text-sm text-black/60">
              <p className="text-base font-medium text-black">Account overview</p>
              <p>Name: {user?.name || "—"}</p>
              <p>Email: {user?.email || "—"}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link to="/orders" className="rounded-full bg-black px-4 py-2 text-xs font-medium text-white">
                  View Orders
                </Link>
                <Link to="/wishlist" className="rounded-full border border-black/15 px-4 py-2 text-xs font-medium text-black">
                  View Wishlist
                </Link>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="text-sm text-black/60">
              <p className="mb-3 text-base font-medium text-black">Recent orders</p>
              <p>
                Order history lives on the{" "}
                <Link to="/orders" className="underline">
                  Orders page
                </Link>
                . TODO: pull the latest 3–5 orders in here directly.
              </p>
            </div>
          )}

          {activeTab === "wishlist" && (
            <div className="text-sm text-black/60">
              <p className="mb-3 text-base font-medium text-black">Wishlist</p>
              <p>
                TODO: render saved items here, or deep-link to the{" "}
                <Link to="/wishlist" className="underline">
                  Wishlist page
                </Link>
                .
              </p>
            </div>
          )}

          {activeTab === "addresses" && (
            <div className="text-sm text-black/60">
              <p className="mb-3 text-base font-medium text-black">Saved addresses</p>
              <p>TODO: address book — add/edit/delete shipping addresses.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
