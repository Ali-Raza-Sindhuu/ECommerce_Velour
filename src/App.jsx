import { BrowserRouter, Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Collection from "./pages/Collection";
import MainLayout from "./components/layout/MainLayout";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ScrollToTop from "./components/ScrollToTop";
import ProductDetails from "./pages/ProductDetails";
import ProtectedRoute from "./components/protection/ProtectedRoute";
import Dashboard from "./components/user/Dashboard";
import AdminRoute from "./components/protection/AdminRoute";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import Wishlist from "./pages/Wishlist";
import FAQ from "./pages/FAQ";
import ShippingReturns from "./pages/ShippingReturns";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/shop/:slug" element={<ProductDetails/>} />
          <Route path="/collections" element={<Collection />} />
          <Route path='/contact' element={<Contact/>} />
          <Route path="/blog" element={<Blog/>} />
          <Route path="/blog/:slug" element={<BlogPost/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/order-success/:orderId" element={<OrderSuccess/>} />
          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/faq" element={<FAQ/>} />
          <Route path="/shipping-returns" element={<ShippingReturns/>} />

          <Route path="/orders" element={
              <ProtectedRoute>
                <Orders/>
              </ProtectedRoute>
          }/>
          <Route path="/orders/:orderId" element={
              <ProtectedRoute>
                <OrderDetail/>
              </ProtectedRoute>
          }/>
        </Route>

        <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
        }/>

        <Route path="/adminDashboard" element={
          <AdminRoute>
            <AdminDashboard/>
          </AdminRoute>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
